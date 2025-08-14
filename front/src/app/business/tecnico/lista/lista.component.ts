import { Component, ViewChild, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators, } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DomSanitizer, SafeHtml, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { asigacionService } from '../../../service/asignacion/asignacion_service';
import { asignacion } from '../../../interfaces/asignacion/asignacion_table.interface';
import { oficiosTable } from '../../../interfaces/gestion_oficios/oficios/oficios-table.interface';
import { MatChip } from "@angular/material/chips";




@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatFormFieldModule,
    MatSortModule, MatTableModule, MatInputModule,
    FormsModule, ReactiveFormsModule,
    MatSlideToggleModule, MatDialogModule, MatButtonModule,
    CommonModule, MatPaginatorModule,
    MatTooltipModule, MatChip],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.scss'
})

export default class ListaComponent {

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  displayedColumns: string[] = ['activo', 'text_oficio', 'text_tipo', 'numero_oficio', 'asunto', 'estatus', 'archivo_oficio', 'fecha_hora', 'Funciones'];

  page: number;
  previousPage: number;
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
  document: any;
  readonly dialog = inject(MatDialog);
  token: string | any;
  id_usuario: string | any;
  id_rol: string | any;
  imp: string | any;
  edit: string | any;
  elim: string | any;
  nuev: string | any;
  img: string | any;
  id_gestion_oficios: number | any;
  id_oficios: number | any = '';
  id_direccion: string | any = "";
  text_direccion: string | any = "";
  id_area: string | any = "";
  text_area: string | any = "";
  fecha_creacion: string | any = "";
  usuarioCuenta: string | any = '';
  PaginaActual: string | any;
  finalizado: string | any;
  dataSource: any = [];
  listoficios_tecnico: oficiosTable[] = [];
  numero_empleado: string | any = "";
  id_asignacion: number = 0;
  descripcionEstatus: string = "";
  botonActivo: number = 5;



  constructor(private router: Router,
    private sanitizer: DomSanitizer,
    private asigacionService: asigacionService,
  ) {
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
    this.id_direccion = localStorage.getItem('id_direcion');
    this.text_direccion = localStorage.getItem('text_direccion');
    this.id_area = localStorage.getItem('id_area');
    this.text_area = localStorage.getItem('text_area');
    this.usuarioCuenta = localStorage.getItem('usuario');
    this.numero_empleado = localStorage.getItem('numero_empleado');
    this.PaginaActual = '/index/nuevooficios';
    this.finalizado = 1;
    if (this.numero_empleado != "" && this.id_direccion != "" && this.id_area != "") {
      this.getInformacionById(5);
    }



  }

  getInformacionById(estatus_seguimiento: number) { //1 inicio 2 en preoceso 3 en pausa 4 concluidos
    if (this.numero_empleado != "" && this.id_direccion != "" && this.id_area != "" && estatus_seguimiento) {
      this.asigacionService.getOficiosByNumeroEmpleado(this.numero_empleado, this.id_direccion, this.id_area, estatus_seguimiento, this.id_rol).subscribe(data => {
        this.listoficios_tecnico = data;
        this.dataSource = new MatTableDataSource<oficiosTable>(this.listoficios_tecnico);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.botonActivo = estatus_seguimiento;
      });
    }
  }

    openHelper() {
      const dialogRef = this.dialog.open(DialogContentExampleDialog);
        dialogRef.afterClosed().subscribe(result => {
           console.log(`Dialog result: ${result}`);
        });
    }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getTiempoTranscurrido(fechaCreacion: string | Date): string {
    let fechaInicio: Date;
    if (typeof fechaCreacion === 'string') {
      const partes = fechaCreacion.split(','); // ["30/07/2025", " 11:28:21"]
      const [dia, mes, año] = partes[0].split('/');
      const hora = partes[1].trim();
      fechaInicio = new Date(`${año}-${mes}-${dia}T${hora}`);
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

  verAvance(id_oficios: string, id_asignacion: number) {
    if (id_oficios != "") {
      this.router.navigate(['/index/ver_oficio_tecnico/' + id_oficios + '/' + this.numero_empleado + '/' + id_asignacion]);
    }
  }

  actualizarSeguimiento(id_oficios: string, id_asignacion: number) {
    if (id_oficios != "") {
      this.router.navigate(['/index/actualizar_oficio_tecnico/' + id_oficios + '/' + this.numero_empleado + '/' + id_asignacion]);
    }
  }

  getPdfUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }




getChipColor(estatus: number): string {
  switch (estatus) {
    case 1: return 'primary';     // Azul
    case 2: return 'accent';      // Rosa
    case 3: return 'warn';        // Rojo
    case 4: return 'success';     // Verde (si tienes tema personalizado)
    default: return '';
  }
}


estatusVisualMap: Record<number, { label: string; icon: string; color: string }> = {
  1: { label: 'Nuevo oficio', icon: 'fiber_new', color: 'primary' },
  2: { label: 'Visto', icon: 'visibility', color: 'accent' },
  3: { label: 'Sellado', icon: 'verified', color: 'warn' },
  4: { label: 'Asignado', icon: 'assignment_turned_in', color: 'success' } // 'success' si tienes tema extendido
};

getEstatusVisual(estatus: number) {
  return this.estatusVisualMap[estatus] || { label: 'Desconocido', icon: 'help', color: '' };
}


}

//---------------------------------------------------------------------------->
//Modal
 @Component({
   selector: 'actualizar-dialog',
   templateUrl: 'help-dialog.html',
   standalone: true,
   imports: [MatDialogModule, MatButtonModule],
   changeDetection: ChangeDetectionStrategy.OnPush,
   
 })
 export class DialogContentExampleDialog { }


