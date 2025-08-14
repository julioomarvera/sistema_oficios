import { CommonModule, DOCUMENT } from '@angular/common';
import { afterNextRender, Component, Inject, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { cat_destinatarioService } from '../../../service/registro_destinatario/cat_destinatario/cat_destinatario.service';
import { gestion_oficiosTable } from '../../../interfaces/gestion_oficios/gestion_oficios-table.interface';
import { gestion_oficiosService } from '../../../service/gestion_oficios/gestion_oficios.service';
import { cat_destinatarioTable } from '../../../interfaces/registro_destinatario/cat_destinatario/cat_destinatario-table.interface';
import { map, Observable, shareReplay } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { DialogContentExampleDialog } from '../../menu/nuevo/nuevo.component';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../../service/error.service';
import { ExporterService } from '../../../service/exporter/exporter.service';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatChipsModule, MatDialogModule,
    MatIconModule, CommonModule, MatFormFieldModule,
    MatTableModule, MatPaginatorModule, MatInputModule,
    MatSortModule, MatTooltipModule, FormsModule],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.scss'
})
export default class ListaComponent {
  readonly dialog = inject(MatDialog);
  displayedColumns: string[] = ['activo', 'id_usuario', 'id_gestion_oficios', 'id_oficios', 'asunto', 'estatus', 'createdAt', 'Funciones'];
  token: string | any;
  id_usuario: string | any;
  id_rol: string | any;
  imp: string | any;
  edit: string | any;
  elim: string | any;
  nuev: string | any;
  img: string | any;
  id_direcion: string | any;
  text_direccion: string | any;
  id_area: string | any;
  text_area: string | any;
  numero_empleado: string | any;
  dataSource: any = [];
  list_id_gestion_oficios: gestion_oficiosTable[] = [];
  listgestion_oficios: gestion_oficiosTable[] = [];
  listgestion_oficiosFilter: gestion_oficiosTable[] = [];
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  visualActual: string | any = "";
  private breakpointObserver = inject(BreakpointObserver);
  estatusConsulta


  constructor(@Inject(DOCUMENT) private document: Document,
    private cat_destinatarioService: cat_destinatarioService,
    private _gestion_oficiosServices: gestion_oficiosService,
    private router: Router,
    private _errorService: ErrorService,
    private toastr: ToastrService,
    private excelService: ExporterService) {

    this.token = localStorage.getItem('token');
    this.id_usuario = localStorage.getItem('id_usuario');
    this.id_rol = localStorage.getItem('id_rol');
    this.imp = localStorage.getItem('imp');
    this.edit = localStorage.getItem('edit');
    this.elim = localStorage.getItem('elim');
    this.nuev = localStorage.getItem('nuev');
    this.img = localStorage.getItem('img');
    this.id_direcion = localStorage.getItem('id_direcion');
    this.text_direccion = localStorage.getItem('text_direccion');
    this.id_area = localStorage.getItem('id_area');
    this.text_area = localStorage.getItem('text_area');
    this.numero_empleado = localStorage.getItem('numero_empleado');

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
    if (this.id_direcion != "" && this.id_area != "") {
      this.getOficioByArea();
    }


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


  getOficioByArea() {
    if (this.id_direcion !== "" && this.id_area !== "") {
      this.cat_destinatarioService.get_id_gestion_oficiosByArea(this.id_direcion, this.id_area,).subscribe(oficios => {
        const enrichedOficios: gestion_oficiosTable[] = [];
        let pending = oficios.length;
        oficios.forEach(oficio => {
          this.cat_destinatarioService
            .getEstatusDestinatario(oficio.id_gestion_oficios, this.id_direcion, this.id_area)
            .subscribe(data => {
              const estatus = data?.estatus;
              oficio.visual = this.statusVisualMap[estatus] || { label: 'Desconocido', icon: 'help', color: '' };
              enrichedOficios.push(oficio);
              // Esperamos a que todos los estatus se hayan cargado
              pending--;
              if (pending === 0) {
                this.dataSource = new MatTableDataSource<gestion_oficiosTable>(enrichedOficios);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
              }
            });
        });
      });
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

  // getTiempoRestante(fechaLimite: string | Date): string {
  //   let fechaFin: Date;

  //   if (!fechaLimite) return 'Fecha inválida';

  //   if (typeof fechaLimite === 'string') {
  //     if (fechaLimite.includes('T')) {
  //       fechaFin = new Date(fechaLimite);
  //     } else {
  //       const partes = fechaLimite.split(',');
  //       const fechaParte = partes[0]?.trim();
  //       const horaParte = partes[1]?.trim() || '23:59:59';

  //       if (!fechaParte) return 'Fecha inválida';

  //       const [dia, mes, año] = fechaParte.split('/');
  //       fechaFin = new Date(`${año}-${mes}-${dia}T${horaParte}`);
  //     }
  //   } else {
  //     fechaFin = fechaLimite;
  //   }

  //   const fechaActual = new Date();
  //   const milisegundos = fechaFin.getTime() - fechaActual.getTime();

  //   if (milisegundos < 0) return 'Plazo vencido';

  //   const horasTotales = milisegundos / (1000 * 60 * 60);
  //   const dias = Math.floor(horasTotales / 24);
  //   const horas = Math.floor(horasTotales % 24);
  //   const minutos = Math.floor((milisegundos / (1000 * 60)) % 60);

  //   // 🟡 Mensajes especiales
  //   if (horasTotales < 3) return '⏰ Últimas horas';
  //   if (horasTotales < 24) return '📅 Vence hoy';




  //   return `${dias} días, ${horas} hrs, ${minutos} min restantes`;
  // }
  getTiempoRestante(fechaLimite: string | Date): string {
    let fechaFin: Date;

    if (!fechaLimite) return 'Fecha inválida';

    if (typeof fechaLimite === 'string') {
      if (fechaLimite.includes('T')) {
        fechaFin = new Date(fechaLimite);
      } else {
        const partes = fechaLimite.split(',');
        const fechaParte = partes[0]?.trim();
        const horaParte = partes[1]?.trim();

        if (!fechaParte) return 'Fecha inválida';

        const [dia, mes, año] = fechaParte.split('/');
        // ⏰ Si no hay hora, asumimos fin del día
        const horaFinal = horaParte || '23:59:59';
        fechaFin = new Date(`${año}-${mes}-${dia}T${horaFinal}`);
      }
    } else {
      fechaFin = fechaLimite;
    }

    // ⏳ Ajustamos fechaFin al final del día si no tiene hora
    if (
      fechaFin.getHours() === 0 &&
      fechaFin.getMinutes() === 0 &&
      fechaFin.getSeconds() === 0
    ) {
      fechaFin.setHours(23, 59, 59, 999);
    }

    const fechaActual = new Date();
    const milisegundos = fechaFin.getTime() - fechaActual.getTime();

    if (milisegundos < 0) return '❌ Plazo vencido';

    const horasTotales = milisegundos / (1000 * 60 * 60);
    const dias = Math.ceil(horasTotales / 24); // ⬅️ usamos Math.ceil para incluir el día final
    const horas = Math.floor(horasTotales % 24);
    const minutos = Math.floor((milisegundos / (1000 * 60)) % 60);

    // 🧠 Mensajes expresivos
    if (dias === 1 && horasTotales < 3) return '⏰ Últimas horas';
    if (dias === 1) return '📅 Vence hoy';
    if (dias === 2) return '📆 Vence mañana';

    return `${dias} días, ${horas} hrs, ${minutos} min restantes`;
  }






  getSemaforoColor(fechaLimite: string | Date): 'verde' | 'amarillo' | 'rojo' {
    let fechaFin: Date;

    if (!fechaLimite) return 'rojo'; // por seguridad

    if (typeof fechaLimite === 'string') {
      if (fechaLimite.includes('T')) {
        fechaFin = new Date(fechaLimite);
      } else {
        const partes = fechaLimite.split(',');
        const fechaParte = partes[0]?.trim();
        const horaParte = partes[1]?.trim() || '23:59:59'; // ⬅️ default seguro

        if (!fechaParte) return 'rojo';

        const [dia, mes, año] = fechaParte.split('/');
        fechaFin = new Date(`${año}-${mes}-${dia}T${horaParte}`);
      }
    } else {
      fechaFin = fechaLimite;
    }

    // ⏳ Ajustar al final del día si no tiene hora
    if (
      fechaFin.getHours() === 0 &&
      fechaFin.getMinutes() === 0 &&
      fechaFin.getSeconds() === 0
    ) {
      fechaFin.setHours(23, 59, 59, 999);
    }

    const fechaActual = new Date();
    const milisegundos = fechaFin.getTime() - fechaActual.getTime();
    const diasRestantes = milisegundos / (1000 * 60 * 60 * 24);

    if (diasRestantes > 3) return 'verde';
    if (diasRestantes > 1) return 'amarillo';
    return 'rojo';
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


  continuarTramite(paginaActual: any, id_tramite: any) {
    if (paginaActual != '' && id_tramite != '') {
      this.router.navigate(['' + paginaActual + '/' + id_tramite]);
    }
  }
  async vercorrespondencia(id_gestion_oficios: string, id_oficios: string,) {
    if (id_gestion_oficios != '' && id_oficios != '') {
      let query = await this.actualizarEstatusVisto(id_gestion_oficios);
      if (query == 1) {
        this.router.navigate(['/index/vercorrespondencia/' + id_gestion_oficios + '/' + id_oficios]);
      }
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
          this._gestion_oficiosServices.getAllgestion_oficios(this.id_usuario, this.id_rol, 1, 1).subscribe(data => {
            this.list_id_gestion_oficios = data;
            this.dataSource = new MatTableDataSource<gestion_oficiosTable>(this.list_id_gestion_oficios);
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
    this.getOficioByArea();
  }

  editarVerificaciongestion_oficios(id_gestion_oficios: string, id_oficios: string) {
    if (id_gestion_oficios != '' && id_oficios != '') {
      this.router.navigate(['/index/actualizargestion_oficios/' + id_gestion_oficios + '/' + id_oficios + "/1"]);
    }
  }
  exportAsXLSX(): void {
    this.excelService.exportToExcel(this.list_id_gestion_oficios, 'my_export')
  }


  actualizarEstatusVisto(id_gestion_oficios: string): Promise<number> {
    return new Promise<number>((resolve) => {
      if (this.id_direcion != "" && this.id_area != "") {
        this.cat_destinatarioService.actualizarEstatusDestinatario(id_gestion_oficios, this.id_direcion, this.id_area, 2).subscribe({
          next: (data) => {
            if (Number(data) === 1) {
              resolve(1);
            } else {
              resolve(0);
            }
          },
          error: (event: HttpErrorResponse) => {
            this._errorService.msjError(event);
            resolve(0);
          },
          complete: () => console.info('complete')
        });
      } else {
        resolve(0);
      }
    });
  }

  statusVisualMap: Record<number, { label: string; icon: string; color: string }> = {
    1: { label: 'Nuevo oficio', icon: 'fiber_new', color: 'primary' },
    2: { label: 'Visto', icon: 'visibility', color: 'accent' },
    3: { label: 'Sellado', icon: 'verified', color: 'warn' },
    4: { label: 'Asignado', icon: 'assignment_turned_in', color: 'success' },
    5: { label: 'Firmado por coordinador', icon: 'edit_document', color: 'info' }
  };

  getEstatusVisual(id_gestion_oficios: string): void {
    this.cat_destinatarioService.getEstatusDestinatario(id_gestion_oficios, this.id_direcion, this.id_area)
      .subscribe(data => {
        const estatus = data?.estatus; // Asegúrate que el backend lo devuelve como número
        const visual = this.statusVisualMap[estatus] || { label: 'Desconocido', icon: 'help', color: '' };
        this.visualActual = visual;
      });
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

