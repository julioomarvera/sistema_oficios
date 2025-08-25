import { Component, Inject, inject, ViewChild, afterNextRender } from '@angular/core';
import { gestion_oficiosTable } from '../../../interfaces/gestion_oficios/gestion_oficios-table.interface';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { BreakpointObserver } from '@angular/cdk/layout';
import { DOCUMENT, CommonModule } from '@angular/common';
import { cat_destinatarioService } from '../../../service/registro_destinatario/cat_destinatario/cat_destinatario.service';
import { gestion_oficiosService } from '../../../service/gestion_oficios/gestion_oficios.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../../service/error.service';
import { ExporterService } from '../../../service/exporter/exporter.service';
import { cat_destinatarioTable } from '../../../interfaces/registro_destinatario/cat_destinatario/cat_destinatario-table.interface';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DialogContentExampleDialog } from '../../menu/nuevo/nuevo.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';
import { ContadorChipComponent } from "../../../tools/pipes/contador.chip.component";
//  <----- HASTA AQUI ES DE FORMA GENERAL---------------------------------------> 


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatChipsModule, MatDialogModule,
    MatIconModule, CommonModule, MatFormFieldModule,
    MatTableModule, MatPaginatorModule, MatInputModule,
    MatSortModule, MatTooltipModule, FormsModule, ContadorChipComponent, //HASTA AQUI ES DE FORMA GENERAL

  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export default class ListComponent {
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
  estatusConsulta: number = 5;

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
      this.getOficioByArea(5);
      // this.getEstatus(5);
    }


  }

  getOficioByArea(estatus: number): void {
    if (!this.id_direcion || !this.id_area) return;

    this.cat_destinatarioService.get_id_gestion_oficiosByArea(this.id_direcion, this.id_area, estatus).subscribe({
      next: (oficios: cat_destinatarioTable[]) => {
        const enriched = oficios.map(oficio => ({
          ...oficio,
          visual: this.statusVisualMap[Number(oficio.estatus)] || {
            label: 'Desconocido',
            icon: 'help',
            color: ''
          }
        }));
        this.dataSource = new MatTableDataSource<cat_destinatarioTable>(enriched);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: err => {
        console.error('Error al obtener oficios:', err);
        this.dataSource = new MatTableDataSource<cat_destinatarioTable>([]);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }

  statusVisualMap: Record<number, { label: string; icon: string; color: string }> = {
    0: { label: 'Nuevo oficio', icon: 'fiber_new', color: 'primary' },
    1: { label: 'Nuevo oficio', icon: 'fiber_new', color: 'primary' },
    2: { label: 'Visto', icon: 'visibility', color: 'accent' },
    3: { label: 'Sellado', icon: 'verified', color: 'warn' },
    4: { label: 'Asignado', icon: 'assignment_turned_in', color: 'success' },

  };

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

  async vercorrespondencia(id_gestion_oficios: string, id_oficios: string,) {
    if (id_gestion_oficios != '' && id_oficios != '') {
      this.router.navigate(['/index/historialCoordinador/' + id_gestion_oficios + '/' + id_oficios]);
    }
  }

  editarVerificaciongestion_oficios(id_gestion_oficios: string, id_oficios: string) {
    if (id_gestion_oficios != '' && id_oficios != '') {
      this.router.navigate(['/index/actualizargestion_oficios/' + id_gestion_oficios + '/' + id_oficios + "/1"]);
    }
  }



}
