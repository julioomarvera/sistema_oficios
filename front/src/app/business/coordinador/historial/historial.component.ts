import { ChangeDetectionStrategy, Component, inject, OnInit, signal, viewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { gestion_oficiosService } from '../../../service/gestion_oficios/gestion_oficios.service';
import { oficiosService } from '../../../service/gestion_oficios/oficios/oficios.service';
import { DomSanitizer, SafeHtml, SafeUrl } from '@angular/platform-browser';
import { cat_firmanteService } from '../../../service/registro_quien_firma/cat_firmante/cat_firmante.service';
import { asigacionService } from '../../../service/asignacion/asignacion_service';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCommonModule } from '@angular/material/core';
import Swal from 'sweetalert2'
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { ProgressBarMode, MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { tecnicoService } from '../../../service/seguimiento_tecnico/tecnico/tecnico.service';
import { tecnicoTable } from '../../../interfaces/seguimiento_tecnico/tecnico/tecnico-table.interface';
import { asignacion } from '../../../interfaces/asignacion/asignacion_table.interface';
import { ContadorChipComponent } from "../../../tools/pipes/contador.chip.component";
import { users_opdmTable } from '../../../interfaces/usuarios_opdm/users_opdm/users_opdm-table.interface';
import { selloService } from '../../../service/evidencia_sello/sello/sello.service';
import { PieChartComponent } from "../../../tools/pie-chart/pie-chart.component";
import { Nuevotecnico } from '../../../interfaces/seguimiento_tecnico/tecnico/tecnico-response.interface';
import { EvidenciaModularComponent } from "../../../tools/evidencia-modular/evidencia-modular.component";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import { EstatusTecnicoComponent } from '../../../tools/estatus-tecnico/estatus-tecnico.component';
import { ProgresoOficioComponent } from '../../../tools/progreso.oficio/progreso.oficio.component';
//esta paqueteria es elemental 

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [MatIconModule, MatInputModule, MatFormFieldModule,
    MatDialogModule, MatCommonModule, FormsModule,
    MatSliderModule, MatCardModule, CommonModule,
    MatButtonModule, MatProgressBarModule, ContadorChipComponent, MatButtonModule,
    MatExpansionModule,
    MatDatepickerModule, PieChartComponent,
    EstatusTecnicoComponent,EvidenciaModularComponent,ProgresoOficioComponent,
    
  ],
  
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.scss'
})
export default class HistorialComponent implements OnInit {
  accordion = viewChild.required(MatAccordion);
  numero_empleado: string | any = "";
  token: string | any;
  id_usuario: string | any;
  id_rol: string | any;
  imp: string | any;
  edit: string | any;
  elim: string | any;
  nuev: string | any;
  img: string | any;
  id_direcion_actual: any;
  text_direccion_actual: any;
  id_area_actual: string | any;
  text_area_actual: string | any;


  loading: boolean = false;
  id_gestion_oficios: number | any;
  id_oficios: number | any = '';
  id_gestion_oficio: number = 0;
  numero_oficio: string | any = '';
  archivo_oficio: string | any = '';
  asunto: string | any = '';
  contenido: string | any = '';
  documento_oficio: string | any = '';
  fecha_asignacion: string | any = '';
  id_direcion_firmante: number = 0;
  text_direccion_firmante: string | any = '';
  id_area_firmante: number = 0;
  area_texto: string | any;
  text_area_firmante: string | any = '';
  numero_empleado_firmante: string | any = '';
  foto_firmante: string | any;
  text_nombre_empleado: string | any;
  id_direccion_asignacion: number = 0;
  id_area_asignacion: number = 0;
  numero_empleado_asignacion: string | any = '';
  text_direccion_asignacion: string | any = '';
  text_area_asignacion: string | any = '';
  text_nombre_empleado_quien_asignacion: string | any = '';
  foto_quien_asigno: string | any = '';
  instrucciones: string | any = "";
  estatus_seguimiento: string | any = '';
  porcentaje_seguimiento: number = 0;
  observaciones: string | any = '';
  evidenciaImagen: string | any = '';
  id_asignacion_tecnico: string | any = "";
  id_seguimiento_tecnico_tecnico: string | any = "";
  PaginaActual_tecnico: string | any = "";
  finalizado_tecnico: string | any = "";
  id_tecnico_tecnico: string | any = "";
  id_gestion_oficio_tecnico: string | any = "";
  id_oficio_tecnico: string | any = "";
  numero_oficio_tecnico: string | any = "";
  id_direcion_firmante_tecnico: string | any = "";
  text_direccion_firmante_tecnico: string | any = "";
  id_area_firmante_tecnico: string | any = "";
  text_area_firmante_tecnico: string | any = "";
  numero_empleado_firmante_tecnico: string | any = "";
  id_direccion_asignacion_tecnico: string | any = "";
  text_direccion_asignacion_tecnico: string | any = "";
  id_area_asignacion_tecnico: string | any = "";
  text_area_asignacion_tecnico: string | any = "";
  numero_empleado_asignacion_tecnico: string | any = "";
  fecha_asignacion_tecnico: string | any = "";
  estatus_seguimiento_tecnico: string | any = "";
  observaciones_tecnico: string | any = "";
  porcentaje_seguimiento_tecnico: string | any = "";
  fecha_contestacion_tecnico: string | any = "";
  evidencia_tecnico: string | any = "";
  documento_oficio_tecnico: string | any = "";
  id_estatusseguimiento_tecnico_tecnico: string | any = "";
  activo_tecnico: string | any = "";
  id_usuario_tecnico: string | any = "";
  foto_tecnico: string | any = "";
  nombre_tecnico: string | any = "";
  numeroSecretarias: any;
  nombre_documento_sello_digital: string | any = "";
  nombre_documento_sello: string | any = "";
  createdAt_sello: string | any = "";
  numero_empleado_secretaria: string | any = "";
  foto_secretaria: string | any = "";
  readonly dialog = inject(MatDialog);
  estatus_seguimiento_tec: string | any = "";
  observaciones_tec: string | any = "";
  porcentaje_seguimiento_tec: number = 0;
  fecha_contestacion_tec: string | any = "";
  evidencia_tec: string | any = "";
  createdAt_tec: string | any = "";
  foto_tecnico_tec: string | any = "";

  verInformacion: number = 1;
  list_tecnicos: asignacion[] = [];
  list_secretaria: users_opdmTable[] = [];
  list_oficio_secretaria: asignacion[] = [];
  list_info_tecnicos: Nuevotecnico[] = [];

  contadorFirmante: number = 0;
  contadorSecretaria: number = 0;
  contadorTecnicos: number = 0;
  posicion: number = 0;
  tipoPanel: number = 1;
  fechaCreacionOficio: string | any = "";
  datosCargados: boolean = false;
  time = 0;
  display = '';
  intervalId: any;
  maxTime = 10;
  porcentajeFinal : number =0;


  readonly panelOpenState = signal(false);

  constructor(private aRouter: ActivatedRoute,
    private gestion_oficiosService: gestion_oficiosService,
    private oficiosService: oficiosService,
    private _sanitizer: DomSanitizer,
    private cat_firmanteService: cat_firmanteService,
    private asigacionService: asigacionService,
    private router: Router,
    private tecnicoService: tecnicoService,
    private selloService: selloService
  ) {
    this.id_gestion_oficios = aRouter.snapshot.paramMap.get('id_gestion_oficios');
    this.id_oficios = aRouter.snapshot.paramMap.get('id_oficios');
    this.token = localStorage.getItem('token');
    this.id_usuario = localStorage.getItem('id_usuario');
    this.id_rol = localStorage.getItem('id_rol');
    this.imp = localStorage.getItem('imp');
    this.edit = localStorage.getItem('edit');
    this.elim = localStorage.getItem('elim');
    this.nuev = localStorage.getItem('nuev');
    this.img = localStorage.getItem('img');
    this.id_direcion_actual = localStorage.getItem('id_direcion');
    this.text_direccion_actual = localStorage.getItem('text_direccion');
    this.id_area_actual = localStorage.getItem('id_area');
    this.text_area_actual = localStorage.getItem('text_area');
    this.numero_empleado = localStorage.getItem('numero_empleado');
    this.loading = true;

   
      
  }

 
  ngOnInit(): void {
       if (this.id_oficios != "" && this.id_gestion_oficios != "") {
      this.getId_gestion_oficio(this.id_oficios);
      this.getInformacionOficio(this.id_oficios);
      this.getInformacionSecretaria(this.id_gestion_oficios, this.id_oficios, this.id_direcion_actual, this.id_area_actual);
      this.getTecnicosAsignacionByIdgectionIdOficios(this.id_gestion_oficios, this.id_oficios, this.id_direcion_actual, this.id_area_actual);
      this.getInformacionEstatus(this.id_gestion_oficios, this.id_oficios);
    }
    this.loading = false;
  }



  


  getId_gestion_oficio(id_oficios: number) {
    if (id_oficios != null) {
      this.gestion_oficiosService.getId_gestion_oficios(id_oficios).subscribe(data => {
        let response = typeof data === 'string' ? JSON.parse(data) : data;
        this.id_gestion_oficio = response.id_gestion_oficios;
        if (this.id_gestion_oficio != null) {
          this.getinformacionFirmante(this.id_gestion_oficio);

        }
      })
    }
  }

  getInformacionOficio(id_oficios: any) {
    this.oficiosService.getOficio_by_id_oficio(id_oficios).subscribe(data => {
      this.numero_oficio = data.numero_oficio;
      this.archivo_oficio = data.archivo_oficio;
      this.asunto = data.asunto;
      this.contenido = data.contenido;
      this.documento_oficio = this.archivo_oficio;
      this.fecha_asignacion = data.fecha_hora;
      this.fechaCreacionOficio = data.createdAt;
      this.archivo_oficio = this._sanitizer.bypassSecurityTrustResourceUrl(this.archivo_oficio);

    })
  }


  getinformacionFirmante(id_gestion_oficios: any) {
    this.cat_firmanteService.getcat_firmanteByid_gestion_oficios(id_gestion_oficios).subscribe(data => {
      this.id_direcion_firmante = data.id_direccion;
      this.text_direccion_firmante = data.text_direccion;
      this.id_area_firmante = data.id_area;
      this.area_texto = data.area_texto;
      this.text_area_firmante = data.area_texto;
      this.numero_empleado_firmante = data.numero_empledo;
      this.foto_firmante = data.foto;
      this.text_nombre_empleado = data.text_nombre_empleado;
      this.contadorFirmante = 1;
    })
  }

  getInformacionSecretaria(id_gestion_oficio: number, id_oficios: number, id_direcion_actual: number, id_area_actual: number) {
    this.asigacionService.getSecretariasAsignadosByid_gestion_oficioBydireccion(id_gestion_oficio, id_oficios, id_direcion_actual, id_area_actual).subscribe(data => {
      this.list_secretaria = data;
      this.contadorSecretaria = this.list_secretaria.length;
    })



  }

  getTecnicosAsignacionByIdgectionIdOficios(id_gestion_oficio: number, id_oficios: number, id_direcion_actual: number, id_area_actual: number) {
    this.asigacionService.getTecnicosAsignadosByid_gestion_oficioBydireccion(id_gestion_oficio, id_oficios, id_direcion_actual, id_area_actual).subscribe(data => {
      this.list_tecnicos = data;
      this.contadorTecnicos = this.list_tecnicos.length;
      
    })
  }




  getInformacionEstatus(id_gestion_oficio: number, id_oficios: number) {
    this.tecnicoService.get_oficio_tecnico_by_id_gestion_oficio_id_oficios(id_gestion_oficio, id_oficios).subscribe(data => {
      // debugger;
      // this.id_asignacion_tecnico = data.id_asignacion;
      // this.id_seguimiento_tecnico_tecnico = data.id_seguimiento_tecnico;
      // this.PaginaActual_tecnico = data.PaginaActual;
      // this.finalizado_tecnico = data.finalizado;
      // this.id_tecnico_tecnico = data.id_tecnico;
      // this.id_gestion_oficio_tecnico = data.id_gestion_oficio;
      // this.id_oficio_tecnico = data.id_oficio;
      // this.numero_oficio_tecnico = data.numero_oficio;
      // this.id_direcion_firmante_tecnico = data.id_direcion_firmante;
      // this.text_direccion_firmante_tecnico = data.text_direccion_firmante;
      // this.id_area_firmante_tecnico = data.id_area_firmante;
      // this.text_area_firmante_tecnico = data.text_area_firmante;
      // this.numero_empleado_firmante_tecnico = data.numero_empleado_firmante;
      // this.id_direccion_asignacion_tecnico = data.id_direccion_asignacion;
      // this.text_direccion_asignacion_tecnico = data.text_direccion_asignacion;
      // this.id_area_asignacion_tecnico = data.id_area_asignacion;
      // this.text_area_asignacion_tecnico = data.text_area_asignacion;
      // this.numero_empleado_asignacion_tecnico = data.numero_empleado_asignacion;
      // this.fecha_asignacion_tecnico = data.fecha_asignacion;
      // this.estatus_seguimiento_tecnico = data.estatus_seguimiento;
      // this.observaciones_tecnico = data.observaciones;
      // this.porcentaje_seguimiento_tecnico = data.porcentaje_seguimiento;
      // this.fecha_contestacion_tecnico = data.fecha_contestacion;
      // this.evidencia_tecnico = data.evidencia;
      // this.documento_oficio_tecnico = data.documento_oficio;
      // this.id_estatusseguimiento_tecnico_tecnico = data.id_estatusseguimiento_tecnico;
      // this.activo_tecnico = data.activo;
      // this.id_usuario_tecnico = data.id_usuario;
      // this.foto_tecnico = data.foto_tecnico;
      // this.nombre_tecnico = data.nombre_tecnico;
      this.porcentajeFinal = data.porcentaje_seguimiento;
    })

  }

  getInstrucciones(id_gestion_oficio: number) {
    this.asigacionService.getInstruccion(id_gestion_oficio).subscribe(data => {
      if (data != null) {
        this.instrucciones = data.instrucciones;
      } else {
        this.instrucciones = 'Sin instrucciones disponibles';
      }
    }, error => {
      console.error('Error al obtener instrucciones:', error);
      this.instrucciones = 'Error al cargar instrucciones';
    });
    
  }

  informacionOficio(tipo: number, posicion: number, numero_empleado: number) { //tipo es 1 = firmate , 2 = secretaria, 3 = tecnicos
    let suma = 0;
    this.verInformacion = posicion;
    this.posicion = posicion;
    this.tipoPanel = tipo;
    if (tipo == 2) {
      this.getInformacionSello(numero_empleado);
      this.getInformacionOficioSecretaria(numero_empleado);
    }
    else if (tipo == 3) {
      this.getInformacionOficioTecnico(numero_empleado);
    }
  }

  getInformacionSello(numero_empleado: number) {

    this.selloService.getInformacionSello(this.id_gestion_oficio, this.id_direcion_actual, this.id_area_actual, numero_empleado).subscribe(data => {
      this.nombre_documento_sello_digital = data.nombre_documento_sello_digital;
      this.nombre_documento_sello = data.nombre_documento_sello;
      this.createdAt_sello = data.createdAt;
      this.numero_empleado_secretaria = data.numero_empleado_secretaria;
      this.foto_secretaria = data.foto_secretaria;
      if (this.nombre_documento_sello_digital != "") {
        this.nombre_documento_sello_digital = this._sanitizer.bypassSecurityTrustResourceUrl(this.nombre_documento_sello_digital);
      }
      if (this.nombre_documento_sello != "") {
        this.nombre_documento_sello = this._sanitizer.bypassSecurityTrustResourceUrl(this.nombre_documento_sello);
      }
    })
  }

  getInformacionOficioSecretaria(numero_empleado: number) {
    this.asigacionService.getSecretariasAsignadosByid_gestion_oficioBydireccionNumeroEmpleado(this.id_gestion_oficio, this.id_oficios, this.id_direcion_actual, this.id_area_actual, numero_empleado).subscribe(data => {
      this.list_oficio_secretaria = data;
    })
  }

getInformacionOficioTecnico(numero_empleado: number) {
  this.tecnicoService.get_oficio_tecnico_by_id_gestion_oficio_id_oficios_numero_empleado(this.id_gestion_oficio, this.id_oficios, numero_empleado).subscribe(data => {
    this.list_info_tecnicos = data;

      // Si el arreglo tiene al menos un elemento
      if (this.list_info_tecnicos.length > 0) {
        const ultimo = this.list_info_tecnicos[this.list_info_tecnicos.length - 1];
        const porcentajeFinal = ultimo.porcentaje_seguimiento;

        console.log('📊 Último porcentaje de avance:', porcentajeFinal);
        // Puedes guardarlo en una variable si lo necesitas en el HTML
        this.porcentajeFinal = porcentajeFinal;
      }
    });
}

getColorClass(porcentaje: number): string {
  if (porcentaje === 100) return 'bg-primary';   // Azul
  if (porcentaje >= 75) return 'bg-success';     // Verde
  if (porcentaje >= 50) return 'bg-warning';     // Amarillo
  return 'bg-danger';                            // Rojo
}

  goInicio() {
    this.router.navigate(['/index/coordinador']);
  }

  openHelper() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


}

//---------------------------------------------------------------------------->
//Modal
@Component({
  selector: 'historial-dialog',
  templateUrl: 'historial-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogContentExampleDialog { }

