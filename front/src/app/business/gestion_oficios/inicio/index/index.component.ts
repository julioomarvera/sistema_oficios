import { Component, ViewChild, Inject, inject, afterNextRender, ChangeDetectionStrategy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { DOCUMENT, CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Router } from '@angular/router';
import { gestion_oficiosTable } from '../../../../interfaces/gestion_oficios/gestion_oficios-table.interface';
import { gestion_oficiosService } from '../../../../service/gestion_oficios/gestion_oficios.service';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatTooltipModule } from '@angular/material/tooltip';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../../../service/error.service';
import { ExporterService } from '../../../../service/exporter/exporter.service';
import { estatusgestion_oficiosTable } from '../../../../interfaces/gestion_oficios/estatus/estatusgestion_oficios-table.interface';
import { estatusgestion_oficiosService } from '../../../../service/gestion_oficios/estatus/estatusgestion_oficios.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { FormBuilder, FormsModule, NgControl, ReactiveFormsModule, Validators } from '@angular/forms'
import { cat_destinatarioService } from '../../../../service/registro_destinatario/cat_destinatario/cat_destinatario.service';
import { cat_destinatarioTable } from '../../../../interfaces/registro_destinatario/cat_destinatario/cat_destinatario-table.interface';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'; // Add MAT_DIALOG_DATA and MatDialogRef
import { MatStepperIntl, MatStepperModule } from '@angular/material/stepper';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatChipsModule, MatDialogModule,
    MatIconModule, CommonModule, MatFormFieldModule,
    MatTableModule, MatPaginatorModule, MatInputModule,
    MatSortModule, MatTooltipModule, FormsModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})



export default class IndexComponent {
  readonly dialog = inject(MatDialog);
  displayedColumns: string[] = ['activo', 'id_usuario', 'id_oficios', 'destinatarios', 'asunto', 'estatus', 'createdAt', 'Funciones'];
  dataSource: any = [];
  listEstatus: estatusgestion_oficiosTable[] = [];
  token: string | any;
  id_usuario: string | any;
  id_rol: string | any;
  imp: string | any;
  edit: string | any;
  elim: string | any;
  nuev: string | any;
  img: string | any;
  estatus: number | any = 0;
  activo: number | any = 1;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  listgestion_oficios: gestion_oficiosTable[] = [];
  listgestion_oficiosFilter: gestion_oficiosTable[] = [];
  listcat_destinatarioTable: cat_destinatarioTable[] = [];
  //cuerpo ------------------------------------------------------------
  id_oficios: number | any;
  createdAt: string | any;
  //esto es el ejemplo//------------------------------------------------ 
  page: number;
  previousPage: number;
  //-------------------------------------------------------------------- 
  length = 100;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  hidePageSize = true;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;
  showFiller = true;
  private breakpointObserver = inject(BreakpointObserver);
  estatusPage: string | any;
  id_eliminar: number | any;

  resumen: { total: number, finalizados: number, errores: number, porcentajeFinalizados: number, porcentajeErrores: number } = {
    total: 0,
    finalizados: 0,
    errores: 0,
    porcentajeFinalizados: 0,
    porcentajeErrores: 0
  };


  constructor(@Inject(DOCUMENT) private document: Document, private router: Router, private _gestion_oficiosServices: gestion_oficiosService,
    private toastr: ToastrService, private _errorService: ErrorService, private excelService: ExporterService,
    private _estatusgestion_oficiosService: estatusgestion_oficiosService, private cat_destinatarioService: cat_destinatarioService) {
    this.page = 3;
    this.previousPage = 1;
    this.token = localStorage.getItem('token');
    this.id_usuario = localStorage.getItem('id_usuario');
    this.id_rol = localStorage.getItem('id_rol');
    this.imp = localStorage.getItem('imp');
    this.edit = localStorage.getItem('edit');
    this.elim = localStorage.getItem('elim');
    this.nuev = localStorage.getItem('nuev');
    this.img = localStorage.getItem('img');

    afterNextRender(() => {
      const storedData = localStorage.getItem('token');
      if (storedData) {
        try {
          this.token = JSON.parse(storedData);
        }
        catch (err) {
        }
      }
    });

  }

  openHelper(id_estatusgestion_oficios: any) {
    if (id_estatusgestion_oficios != '') {
      localStorage.setItem('id_estatusgestion_oficios', 'id_estatusgestion_oficios');
      const dialogRef = this.dialog.open(DialogContentExampleDialog);
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
  }
  ngOnInit(): void {
    this.page = 3;
    this.previousPage = 1;
    this.getBotoneraEstatus();
    this.tablegestion_oficios();
  }

  tablegestion_oficios() {
    this._gestion_oficiosServices.getAllgestion_oficios(this.id_usuario, this.id_rol, this.estatus, this.activo).subscribe(data => {
      this.listgestion_oficios = data;
      this.dataSource = new MatTableDataSource<gestion_oficiosTable>(this.listgestion_oficios);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      // Iterate through each oficio and fetch its destinatarios
      this.listgestion_oficios.forEach((oficio) => {
        const id = oficio.id_gestion_oficios;
        this.cat_destinatarioService.getregistro_destinatarioByid_gestion_oficios(id).subscribe((destinatarios) => {
          oficio.destinatarios = destinatarios; // Corrected: Assign to the 'destinatarios' property
          // Manually trigger a refresh for the specific row or the entire table
          // This is often needed with asynchronous data loading into a MatTable
          this.dataSource.data = [...this.dataSource.data]; // This forces the table to re-render
        });
      });

    });

  }

getTiempoTranscurrido(fechaCreacion: string | Date): string {
  let fechaInicio: Date;

  if (typeof fechaCreacion === 'string') {
    // Detectar si es formato ISO
    const esISO = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/.test(fechaCreacion);

    if (esISO) {
      fechaInicio = new Date(fechaCreacion);
    } else {
      const partes = fechaCreacion.split(',');
      if (partes.length < 2) {
        console.warn('Formato inesperado en fechaCreacion:', fechaCreacion);
        return 'Fecha inválida';
      }

      const [dia, mes, año] = partes[0].split('/');
      const hora = partes[1]?.trim() ?? '00:00:00';

      if (!dia || !mes || !año) {
        console.warn('Fecha incompleta:', partes[0]);
        return 'Fecha inválida';
      }

      fechaInicio = new Date(`${año}-${mes}-${dia}T${hora}`);
    }
  } else {
    fechaInicio = fechaCreacion;
  }

  const fechaActual = new Date();
  const milisegundos = fechaActual.getTime() - fechaInicio.getTime();

  const dias = Math.floor(milisegundos / (1000 * 60 * 60 * 24));
  const horas = Math.floor((milisegundos / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((milisegundos / (1000 * 60)) % 60);

  return `${dias} días, ${horas} hrs, ${minutos} min`;
}



  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(result => result.matches),
    shareReplay()
  );

  onChange(newValue: boolean): void {
    console.log(newValue);
    if (newValue) {
      this.document.body.classList.add('dark-mode');
    }
    else {
      this.document.body.classList.remove('dark-mode');
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  agregargestion_oficios(evt: MouseEvent) {
    this.estatus = 1;
    this._gestion_oficiosServices.newgestion_oficios(this.id_usuario).subscribe({
      next: (v: any) => {
        var id_gestion_oficios = v.msg;
        this.toastr.success('Registro almacenado Correctamente', 'Correcto', { 'positionClass': 'toast-bottom-center' });
        this.router.navigate(['/index/nuevooficios', id_gestion_oficios, this.estatus]);
      },
      error: (event: HttpErrorResponse) => {
        this._errorService.msjError(event);
      },
      complete: () => console.info('complete')
    })
  }

  continuarTramite(paginaActual: any, id_tramite: any) {
    if (paginaActual != '' && id_tramite != '') {
      this.router.navigate(['' + paginaActual + '/' + id_tramite]);
    }
  }
  vergestion_oficios(id_gestion_oficios: string, id_oficios: string) {
    if (id_gestion_oficios != '' && id_oficios != '') {
      this.router.navigate(['/index/vergestion_oficios/' + id_gestion_oficios + '/' + id_oficios]);
    }
  }

  updategestion_oficios(id_gestion_oficios: string, id_oficios: string, estatus: any) {
    if (id_gestion_oficios != '' && id_oficios != '') {
      this.router.navigate(['/index/actualizargestion_oficios/' + id_gestion_oficios + '/' + id_oficios + '/' + estatus]);
    }
  }

  Deletegestion_oficios(id: number) {
    if (id != 0) {
      Swal.fire({
        title: '¿Desea eliminar el registro con número ' + id + ' ?',
        text: '',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'SI',
        cancelButtonText: 'NO',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteParam(id);
        }
      });
    }
  }

  deleteParam(id: number) {
    if (id != 0) {
      this._gestion_oficiosServices.delgestion_oficios(id, this.id_usuario).subscribe({
        next: (v) => {
          this.toastr.warning('Registro eliminado correctamente', 'Correcto', { 'positionClass': 'toast-bottom-center' });
          this._gestion_oficiosServices.getAllgestion_oficios(this.id_usuario, this.id_rol, this.estatus, this.activo).subscribe(data => {
            this.listgestion_oficios = data;
            this.dataSource = new MatTableDataSource<gestion_oficiosTable>(this.listgestion_oficios);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          })
        },
        error: (event: HttpErrorResponse) => {
          this._errorService.msjError(event);
        },
        complete: () => console.info('complete')
      })
    }
    this.tablegestion_oficios();
  }

  editarVerificaciongestion_oficios(id_gestion_oficios: string, id_oficios: string) {
    if (id_gestion_oficios != '' && id_oficios != '') {
      this.router.navigate(['/index/actualizargestion_oficios/' + id_gestion_oficios + '/' + id_oficios + "/1"]);
    }
  }
  exportAsXLSX(): void {
    this.excelService.exportToExcel(this.listgestion_oficios, 'my_export')
  }

  cambiarColor(numero: any): any {
    switch (numero) {
      case 0:
        return 'rgba(241, 255, 236, 0)';
        break;
      case 1://sin evaluacion
        return 'rgba(255, 255, 255, 0.5)';
        break;
      case 2:// en proceso de evaluacion
        return 'rgba(242, 169, 51,1)';
        break;
      case 3://tramite Finalizado
        return 'rgba(144, 238, 144, 1 )';
        break;
      case 4://tramite con errores
        return 'rgba( 255, 182, 193, 1 )';
        break;
    }
  }
  cambiarColorActivo(numero: any): any {
    switch (numero) {
      case 0:
        return 'rgba(241, 255, 236, 0)';
        break;
      case 1://sin evaluacion
        return 'rgba(255, 255, 255, 0.5)';
        break;
    }
  }

  getBotoneraEstatus() {
    this._estatusgestion_oficiosService.getAllestatusgestion_oficios(this.id_usuario).subscribe(data => {
      this.listEstatus = data;
    })
  }

  goMenu(estatus: number) {
    if (estatus > 0) {
      this.estatus = estatus
      this.tablegestion_oficios();
    }
  }

  activadoDesactivado(activo: any) {
    if (activo == 0) {
      this.activo = 1;
    }
    else {
      this.activo = 0;
    }
    this.tablegestion_oficios();
  }

  vertodo() {
    this.activo = 2;
    this.tablegestion_oficios();
  }

  getInfo(id_gestion_oficios: any) {
    const activeElement = document.activeElement as HTMLElement;
    if (activeElement) {
      activeElement.blur(); // Evita que el foco quede en un elemento ocultado por aria-hidden
    }

    if (id_gestion_oficios !== '') { // Use strict inequality for comparison
      const dialogRef = this.dialog.open(DialogContentExampleDialog, {

        data: {
          id_gestion_oficios: id_gestion_oficios
        },
        // --- Ajustes de estilo para posicionar el diálogo ---
        width: '900px',         // Puedes ajustar el ancho como prefieras
        height: '100vh',        // Alto completo de la pantalla
        position: { right: '0' } // Lo posiciona al extremo derecho

      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
  }


  //Mensaje de Swal/--------------------------------------------------------->
  mensajeAlertaError(titulo: string) {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: titulo,
      showConfirmButton: false,
      timer: 2000
    });
  }

  mensajeAlertaSuccess(titulo: string) {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: titulo,
      showConfirmButton: false,
      timer: 1500
    });
  }

}


//Modal------------------------------------------------------>
@Component({
  selector: 'index-dialog',
  templateUrl: 'index-dialog.html',
  styleUrl: 'index.component.scss',
  standalone: true,
  imports: [MatCardModule, MatChipsModule, MatDialogModule,
    MatIconModule, CommonModule,
    MatTableModule, MatPaginatorModule,
    MatSortModule, MatTooltipModule, MatCardModule, MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,],
    

})
export class DialogContentExampleDialog {

  readonly dialog = inject(MatDialog);
  listEstatus: estatusgestion_oficiosTable[] = [];
  id_usuario: any = '';
  estatus: any = '';
  id_gestion_oficios: any = '';
  descripcion: any = '';
  id_estatusgestion_oficios: any = '';
  list_destinatary: cat_destinatarioTable[] = [];

  private _formBuilder = inject(FormBuilder);

  firstFormGroup = this._formBuilder.group({

  });
  secondFormGroup = this._formBuilder.group({

  });



  constructor(@Inject(MAT_DIALOG_DATA) public data: { id_gestion_oficios: any },
    private cat_destinatarioService: cat_destinatarioService) {
    // this.id_usuario = localStorage.getItem('id_usuario');
    // this.id_usuario = localStorage.getItem('id_usuario');
    this.id_estatusgestion_oficios = localStorage.getItem('id_estatusgestion_oficios');
    this.id_gestion_oficios = data.id_gestion_oficios; // Get the ID passed from the parent component
    if (this.id_gestion_oficios) {
    this.getInfoFolioByIdGestion(this.id_gestion_oficios);
    
    }
   
  }
  // ngOnInit() {
    
      
  //   }
  // }

  getInfoFolioByIdGestion(id_gestion_oficios: number) {

    this.cat_destinatarioService.getregistro_destinatarioByid_gestion_oficios(id_gestion_oficios).subscribe(data => {
      this.list_destinatary = data;
    });
  }

  getPasoActual(item: cat_destinatarioTable): number {
    if (item.estatus === 0) return 0;
    else if (item.estatus === 1) return 1;
    else if (item.estatus === 2) return 2;
    else if (item.estatus === 3) return 3;
    else if (item.estatus === 4) return 4;
    return 0; // fallback
  }

  getPorcentajeAvance(item: cat_destinatarioTable): number {
  const totalPasos = 4; // del 0 al 4
  const avance = item.estatus; // suponiendo que estatus va de 0 a 4
  return Math.round((avance / totalPasos) * 100);
}

getColorAvance(item: cat_destinatarioTable): string {
  const porcentaje = this.getPorcentajeAvance(item);
  if (porcentaje < 25) return 'bg-danger';
  else if (porcentaje < 50) return 'bg-warning';
  else if (porcentaje < 75) return 'bg-info';
  else return 'bg-success';
}







  // getBotoneraEstatus() {
  //   this._estatusgestion_oficiosService.getAllestatusgestion_oficios(this.id_usuario).subscribe(data => {
  //     this.listEstatus = data;
  //   })
  // }
  // almacenarEstatus() {
  //   if (this.estatus == '' && this.descripcion == '') {
  //     this.mensajeAlertaError('Error: falta el Informacíon en el parámetro descripcion')
  //   }
  //   else {
  //     this.saveEstatus();
  //   }

  // }
  // saveEstatus() {
  //   this._gestion_oficiosServices.actualizarEstatusgestion_oficios(this.id_usuario, this.id_estatusgestion_oficios, this.estatus, this.descripcion).subscribe({
  //     next: (v: any) => {
  //       const dialogRef = this.dialog.closeAll();
  //       this.mensajeAlertaSuccess('Estatus almacenado correctamente');
  //       window.location.reload();
  //     },
  //     error: (event: HttpErrorResponse) => {
  //       this.mensajeAlertaError('Error al intentar almacenar el estatus, intenté nuevamente');
  //     },
  //     complete: () => console.info('complete')
  //   })
  // }


}

