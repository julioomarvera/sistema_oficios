import { Component, ViewChild, ChangeDetectionStrategy, OnInit, Inject, inject, AfterViewInit, AfterContentInit, ElementRef, signal } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { oficiosTable } from '../../../interfaces/gestion_oficios/oficios/oficios-table.interface';
import { oficiosService } from '../../../service/gestion_oficios/oficios/oficios.service';
import { MatCardModule } from '@angular/material/card';
import { map, shareReplay } from 'rxjs/operators';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators, } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DomSanitizer, SafeHtml, SafeUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { estatusgestion_oficiosTable } from '../../../interfaces/gestion_oficios/estatus/estatusgestion_oficios-table.interface';
import { estatusgestion_oficiosService } from '../../../service/gestion_oficios/estatus/estatusgestion_oficios.service';
import { historialMastergestion_oficiosTable } from '../../../interfaces/gestion_oficios/historialMaster/historialMastergestion_oficios-table.interface';
import { historialMastergestion_oficiosService } from '../../../service/gestion_oficios/historialMaster/historialMastergestion_oficios.service';
import { cat_oficioTable } from '../../../interfaces/catalogo/cat_oficio/cat_oficio-table.interface';
import { cat_oficioService } from '../../../service/catalogo/cat_oficio/cat_oficio.service';
import { cat_tipo_oficiosTable } from '../../../interfaces/catalogo/cat_tipo_oficios/cat_tipo_oficios-table.interface';
import { cat_tipo_oficiosService } from '../../../service/catalogo/cat_tipo_oficios/cat_tipo_oficios.service';
import { cat_numero_oficiosTable } from '../../../interfaces/catalogo/cat_numero_oficios/cat_numero_oficios-table.interface';
import { cat_numero_oficiosService } from '../../../service/catalogo/cat_numero_oficios/cat_numero_oficios.service';
import { MatStepperModule } from '@angular/material/stepper';
//aqui va la intgracion del sello-------------------------------------------------------------------------------------------------->

import Swal from 'sweetalert2'
import { selloService } from '../../../service/evidencia_sello/sello/sello.service';
import { estatusevidencia_selloTable } from '../../../interfaces/evidencia_sello/estatus/estatusevidencia_sello-table.interface';
import { estatusevidencia_selloService } from '../../../service/evidencia_sello/estatus/estatusevidencia_sello.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from '../../../service/error.service';
import { selloTable } from '../../../interfaces/evidencia_sello/sello/sello-table.interface';
import { Nuevosello } from '../../../interfaces/evidencia_sello/sello/sello-response.interface';
import { jsPDF } from 'jspdf';
import { cat_destinatarioService } from '../../../service/registro_destinatario/cat_destinatario/cat_destinatario.service';
import { cat_destinatarioTable } from '../../../interfaces/registro_destinatario/cat_destinatario/cat_destinatario-table.interface';
import { cat_firmanteService } from '../../../service/registro_quien_firma/cat_firmante/cat_firmante.service';
import { cat_firmanteTable } from '../../../interfaces/registro_quien_firma/cat_firmante/cat_firmante-table.interface';
import * as QRCode from 'qrcode'; // Importa la librería qrcode
import { GlobalConstants } from '../../../common/global-constants';
import { cat_direccionesTable } from '../../../interfaces/catalogo/cat_direcciones/cat_direcciones-table.interface';
import { cat_areasTable } from '../../../interfaces/catalogo_areas/cat_areas/cat_areas-table.interface';
import { cat_empleadosTable } from '../../../interfaces/catalogo_empleados/cat_empleados/cat_empleados-table.interface';
import { Nuevocat_firmante } from '../../../interfaces/registro_quien_firma/cat_firmante/cat_firmante-response.interface';
import { Nueva_asignacion } from '../../../interfaces/asignacion/asignacion.interfaces';
import { asigacionService } from '../../../service/asignacion/asignacion_service';
import { asignacion } from '../../../interfaces/asignacion/asignacion_table.interface';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DestinatariosDireccionAsignacion } from '../../../interfaces/registro_destinatario/destinatario_direccion_asignacion.interface';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { MatExpansionModule } from '@angular/material/expansion';
import { trigger, transition, style, animate } from '@angular/animations';
import { MatChipsModule } from '@angular/material/chips';
import { tecnicoTable } from '../../../interfaces/seguimiento_tecnico/tecnico/tecnico-table.interface';



@Component({
  selector: 'app-ver',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatFormFieldModule, MatSortModule, MatTableModule,
    MatInputModule, FormsModule, ReactiveFormsModule, MatSortModule,
    MatSlideToggleModule, MatDialogModule, MatButtonModule, CommonModule, MatStepperModule, MatPaginatorModule,
    MatTooltipModule, MatProgressSpinnerModule, MatBottomSheetModule
  ],
  templateUrl: './ver.component.html',
  styleUrl: './ver.component.scss'
})
export default class VerComponent {
  id_gestion_oficios: number | any;
  listoficios: oficiosTable[] = [];
  listestatusgestion_oficios: estatusgestion_oficiosTable[] = [];
  listhistorialMastergestion_oficios: historialMastergestion_oficiosTable[] = [];
  list_cat_firmanteTable: cat_firmanteTable | any;
  id_estatusgestion_oficios: number | any;
  descripcion: string | any;
  estatus: string | any;
  readonly dialog = inject(MatDialog);
  token: string | any;
  id_usuario: string | any;
  id_rol: string | any;
  imp: string | any;
  edit: string | any;
  elim: string | any;
  nuev: string | any;
  img: string | any;
  PaginaActual: string | any;
  finalizado: string | any;
  dataSource: any = [];
  id_oficios: number | any = '';
  resultadoid_oficios: boolean = false;
  errorid_oficios: boolean = false;
  usuarioCuenta: string | any = '';
  oficio: string | any = '';
  resultadooficio: boolean = false;
  erroroficio: boolean = false;

  text_oficio: string | any = '';
  resultadotext_oficio: boolean = false;
  errortext_oficio: boolean = false;

  tipo_oficio: string | any = '';
  resultadotipo_oficio: boolean = false;
  errortipo_oficio: boolean = false;

  text_tipo: string | any = '';
  resultadotext_tipo: boolean = false;
  errortext_tipo: boolean = false;

  numero_oficio: string | any = '';
  resultadonumero_oficio: boolean = false;
  errornumero_oficio: boolean = false;

  fecha_hora: string | any = '';
  resultadofecha_hora: boolean = false;
  errorfecha_hora: boolean = false;

  caso_cop: string | any = '';
  resultadocaso_cop: boolean = false;
  errorcaso_cop: boolean = false;

  asunto: string | any = '';
  resultadoasunto: boolean = false;
  errorasunto: boolean = false;

  contenido: string | any = '';
  resultadocontenido: boolean = false;
  errorcontenido: boolean = false;

  archivo_oficio: string | any = '';
  resultadoarchivo_oficio: boolean = false;
  errorarchivo_oficio: boolean = false;

  otro: string | any = '';
  resultadootro: boolean = false;
  errorotro: boolean = false;

  listcat_oficios: cat_oficioTable[] = [];
  listcat_tipo_oficios: cat_tipo_oficiosTable[] = [];
  listcat_numero_oficios: cat_numero_oficiosTable[] = [];

  listcat_oficiosFilter: cat_oficioTable[] = [];
  listcat_tipo_oficiosFilter: cat_tipo_oficiosTable[] = [];
  listcat_numero_oficiosFilter: cat_numero_oficiosTable[] = [];

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


  private _formBuilder = inject(FormBuilder);

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;


  //SELLO---------------------------------------------------------------------------------->
  pdfUrl: SafeUrl | undefined;
  loading: boolean = false;

  errorid_gestion_oficios: boolean = false;
  errorid_direccion: boolean = false;
  errortext_direccion: boolean = false;
  errorid_area: boolean = false;
  errortext_area: boolean = false;
  errorfecha_creacion: boolean = false;
  errornombre_documento_oficio: boolean = false;
  errornombre_documento_sello_digital: boolean = false;
  errornombre_documento_sello: boolean = false;

  id_evidencia_sello: string | any = "";
  id_direccion: string | any = "";
  text_direccion: string | any = "";
  id_area: string | any = "";
  text_area: string | any = "";
  fecha_creacion: string | any = "";
  nombre_documento_oficio: string | any = "";
  nombre_documento_sello_digital: string | any = "";
  nombre_documento_sello: string | any = "";
  nombre_documento_sello_digitalImagen: string | any = '';
  nombre_documento_selloImagen: string | any = '';
  desactivarImagenSello: boolean = false;

  area_text_firmante: string = "";
  banderaActualizarSello: boolean = false;


  private fileTmp: any;
  private objectUrl: string | undefined;

  //-------------------------------------------------------------------------->
  //Asignacion --------------------------------------------------------------->

  listEncargadoArea: cat_empleadosTable | any;

  banderaBloqueo: boolean = true;
  listcat_direcciones: cat_direccionesTable[] = [];
  listcat_areas: cat_areasTable[] = [];
  listcat_empleados: cat_empleadosTable[] = [];
  listcat_asignado: asignacion[] = [];


  numero_empledo: string | any = '';
  resultadonumero_empledo: boolean = false;
  errornumero_empledo: boolean = false;

  text_nombre_empleado_asignacion: string | any = '';
  resultadotext_nombre_empleado_asignacion: boolean = false;


  foto_asignacion: string | any = '';
  resultadofoto: boolean = false;
  errorfoto: boolean = false;

  fotoCoordinador_asignacion: string | any = "";
  Nombre_coordinador: string | any = "";

  id_direcion_asignacion: string | any = "";
  text_direccion_base_asignacion: string | any = "";
  id_area_base_asignacion: string | any = "";
  text_area_base_asignacion: string | any = "";
  numero_empleado_asiganacion: string | any = "";
  area_texto_asigancion: string | any = "";
  fecha_asignacion: any = new Date();


  errorid_direccion_asignacion: boolean = false;
  errortext_direccion_asignacion: boolean = false;
  errorid_area_asignacion: boolean = false;
  errorarea_texto_asignacion: boolean = false;
  errornumero_empledo_asignacion: boolean = false;
  errortext_nombre_empleado_asignacion: boolean = false;
  errorfoto_asignacion: boolean = false;
  errorid_oficio_asignacion: boolean = false;
  errorotro_asignacion: boolean = false;
  errorAsignacion: boolean = false;

  nombreCoordinador: string | any = "";
  imagenCargada: boolean = false;

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  displayedColumns: string[] = ['activo', 'id_oficio', 'text_direccion', 'text_nombre_empleado_asignacion', 'foto', 'instrucciones', 'fecha_asignacion', 'estatus_oficio', 'Funciones'];

  instrucciones: string = "";
  total_tramites: number = 0;
  private _bottomSheet = inject(MatBottomSheet);
  numero_empleado_tecnico : number | any = "";
  foto_user: string | any = "";
  //-------------------------------------------------------------------------->

  constructor(private _oficiosServices: oficiosService, private router: Router,
    private aRouter: ActivatedRoute, private _cat_oficiosServices: cat_oficioService,
    private _cat_tipo_oficiosServices: cat_tipo_oficiosService,
    private _cat_numero_oficiosServices: cat_numero_oficiosService, private _sanitizer: DomSanitizer,
    private _estatusgestion_oficiosServices: estatusgestion_oficiosService,
    private _historialMastergestion_oficiosService: historialMastergestion_oficiosService,
    private sello_Service: selloService,
    private toastr: ToastrService,
    private _errorService: ErrorService,
    private sanitizer: DomSanitizer,
    private cat_firmante: cat_firmanteService,
    private asigacionService: asigacionService,
    private cat_destinatarioService: cat_destinatarioService,
  ) {
    this.page = 3;
    this.previousPage = 1;
    this.id_gestion_oficios = aRouter.snapshot.paramMap.get('id_gestion_oficios');
    this.id_oficios = aRouter.snapshot.paramMap.get('id_oficios');
    this.getInformacionById();
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
    this.numero_empleado_asiganacion= localStorage.getItem('numero_empleado');
    this.foto_user  = localStorage.getItem('foto');
    this.PaginaActual = '/index/nuevooficios';
    this.finalizado = 1;

    // this.getCatEstatusgestion_oficios();
    this.getInfoCat_cat_oficios();
    this.getInfoCat_cat_tipo_oficios();
    this.getInfoCat_cat_numero_oficios();
    this.getFirmante();
    this.getInformacionSelloById();
    this.getEncargado();
    this.get_personal_para_asignacion();
    this.getEncargadoid_gestion_oficios();
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



  getInfoCat_cat_oficios() {
    this._cat_oficiosServices.getAllcat_oficio(this.id_usuario).subscribe(data => {
      this.listcat_oficios = data;
    })
  }
  getInfoCat_cat_tipo_oficios() {
    this._cat_tipo_oficiosServices.getAllcat_tipo_oficios(this.id_usuario).subscribe(data => {
      this.listcat_tipo_oficios = data;
    })
  }
  getInfoCat_cat_numero_oficios() {
    this._cat_numero_oficiosServices.getAllcat_numero_oficios(this.id_usuario).subscribe(data => {
      this.listcat_numero_oficios = data;
    })
  }

  // getCatEstatusgestion_oficios() {
  //   this._estatusgestion_oficiosServices.getAllestatusgestion_oficios(this.id_usuario).subscribe((data) => {
  //     this.listestatusgestion_oficios = data;
  //   })
  // }

  getFirmante() {
    this.cat_firmante.getcat_firmanteByid_gestion_oficios(this.id_gestion_oficios).subscribe((data) => {
      this.list_cat_firmanteTable = data;
      this.area_text_firmante = data.area_texto;
      // if (this.area_text_firmante != "") {
      //   this.generatePdf();
      // }
    })
  }

  goInicio() {
    this.router.navigate(['/index/correspondencia']);
  }

  getInformacionById() {
    if (this.id_oficios !== '') {
      this._oficiosServices.getoficios(this.id_oficios, this.id_usuario).subscribe((data: oficiosTable) => {
        this.estatus = data.id_estatusgestion_oficios;
        this.oficio = data.oficio;
        this.text_oficio = data.text_oficio;
        this.tipo_oficio = data.tipo_oficio;
        this.text_tipo = data.text_tipo;
        this.numero_oficio = data.numero_oficio;
        this.fecha_hora = data.fecha_hora;
        this.caso_cop = data.caso_cop;
        this.asunto = data.asunto;
        this.contenido = data.contenido;
        this.archivo_oficio = data.archivo_oficio;
        this.otro = data.otro;
        this.nombre_documento_oficio = data.archivo_oficio;
        this.archivo_oficio = this._sanitizer.bypassSecurityTrustResourceUrl(this.archivo_oficio);
      })
    }
  }



  //logica sello digital------------------------------------------------------------------------------>


  getInformacionSelloById() {
    if (this.id_gestion_oficios !== '') {
      this.sello_Service.getselloByIdgestonOficios(this.id_gestion_oficios, this.id_usuario).subscribe((data: selloTable) => {
        // Aquí podrías validar si data tiene un valor esperado, por ejemplo:
        if (data && data.id_gestion_oficios) {
          // data es válido, puedes continuar
          this.estatus = data.id_estatusevidencia_sello;
          this.id_gestion_oficios = data.id_gestion_oficios;
          this.id_direccion = data.id_direccion;
          this.text_direccion = data.text_direccion;
          this.id_area = data.id_area;
          this.text_area = data.text_area;
          this.numero_oficio = data.numero_oficio;
          this.fecha_creacion = data.fecha_creacion;
          this.nombre_documento_oficio = data.nombre_documento_oficio;
          this.nombre_documento_sello_digital = data.nombre_documento_sello_digital;
          this.nombre_documento_sello = data.nombre_documento_sello;

          this.nombre_documento_sello_digitalImagen = this._sanitizer.bypassSecurityTrustResourceUrl(this.nombre_documento_sello_digital);
          if (this.nombre_documento_sello_digital != "") {
            this.desactivarImagenSello = true;
          }
          else {
            this.desactivarImagenSello = false;
          }
          this.nombre_documento_selloImagen = this._sanitizer.bypassSecurityTrustResourceUrl(this.nombre_documento_sello);
        }
      });
    }
  }



  getFile($event: any, tipo: any): void {
    const [file] = $event.target.files;
    this.fileTmp = {
      fileRaw: file,
      fileName: file.name
    }

    if (file != null) {
      this.sendFile(tipo);
    }
  }

  sendFile(tipo: any): void {
    const body = new FormData();
    body.append('myfile', this.fileTmp.fileRaw, this.fileTmp.fileName);
    if (body) {
      this.sello_Service.sendFilesello(body, tipo, this.id_gestion_oficios).subscribe({
        next: (v) => {
          console.log(v);
          this.transform(v.url, tipo);
        },
        error: (event: HttpErrorResponse) => {
          this._errorService.msjError(event);
          this.loading = false;
        },
        complete: () => console.info('complete')
      })
    }
  }
  transform(ruta: string, tipo: any): SafeHtml {
    switch (tipo) {
      case 'nombre_documento_sello_digital':
        this.nombre_documento_sello_digitalImagen = this._sanitizer.bypassSecurityTrustResourceUrl(ruta);
        this.nombre_documento_sello_digital = ruta;
        this.banderaActualizarSello = true;
        this.actualizarEstatusVisto(3);
        break;
      case 'nombre_documento_sello':
        this.nombre_documento_selloImagen = this._sanitizer.bypassSecurityTrustResourceUrl(ruta);
        this.nombre_documento_sello = ruta;
        this.banderaActualizarSello = true
        this.actualizarEstatusVisto(3);
        break;
    }
    return (ruta);
  }


  save_sello() {
    if (this.banderaActualizarSello == true) {
      this.errorid_gestion_oficios = false;
      this.errorid_direccion = false;
      this.errortext_direccion = false;
      this.errorid_area = false;
      this.errortext_area = false;
      this.errornumero_oficio = false;
      this.errorfecha_creacion = false;
      this.errornombre_documento_oficio = false;
      this.errornombre_documento_sello_digital = false;
      this.errornombre_documento_sello = false;
      if (this.id_gestion_oficios == 0) {
        this.errorid_gestion_oficios = true;
        this.mensajeAlertaError('Error: falta el Informacíon en el parámetro id_gestion_oficios')
      }
      else if (this.id_direccion == '') {
        this.errorid_direccion = true;
        this.mensajeAlertaError('Error: falta el Informacíon en el parámetro id_direccion')
      }
      else if (this.text_direccion == '') {
        this.errortext_direccion = true;
        this.mensajeAlertaError('Error: falta el Informacíon en el parámetro text_direccion')
      }
      else if (this.id_area == '') {
        this.errorid_area = true;
        this.mensajeAlertaError('Error: falta el Informacíon en el parámetro id_area')
      }
      else if (this.text_area == '') {
        this.errortext_area = true;
        this.mensajeAlertaError('Error: falta el Informacíon en el parámetro text_area')
      }
      else if (this.numero_oficio == '') {
        this.errornumero_oficio = true;
        this.mensajeAlertaError('Error: falta el Informacíon en el parámetro numero_oficio')
      }
      // else if (this.fecha_creacion == '') {
      //   this.errorfecha_creacion = true;
      //   this.mensajeAlertaError('Error: falta el Informacíon en el parámetro fecha_creacion')
      // }
      else if (this.nombre_documento_oficio == '') {
        this.errornombre_documento_oficio = true;
        this.mensajeAlertaError('Error: falta el Informacíon en el parámetro nombre_documento_oficio')
      }
      else if (this.nombre_documento_sello_digital == '') {
        this.errornombre_documento_sello_digital = true;
        this.mensajeAlertaError('Error: falta el Informacíon en el parámetro nombre_documento_sello_digital')
      }
      else {
        this.saveParamsSello();
      }
    }
    else {
      this.mensajeAlertaError('Error: No existen campos para actualizar en la Información del sello')
    }
  }

  saveParamsSello() {
    this.loading = true;
    const sello: Nuevosello = {
      id_evidencia_sello: this.id_evidencia_sello,
      id_usuario: this.id_usuario,
      id_estatusevidencia_sello: this.estatus,
      PaginaActual: this.PaginaActual,
      finalizado: this.finalizado,
      id_gestion_oficios: this.id_gestion_oficios,
      id_direccion: this.id_direccion,
      text_direccion: this.text_direccion,
      id_area: this.id_area,
      text_area: this.text_area,
      numero_oficio: this.numero_oficio,
      fecha_creacion: this.fecha_creacion,
      nombre_documento_oficio: this.nombre_documento_oficio,
      nombre_documento_sello_digital: this.nombre_documento_sello_digital,
      nombre_documento_sello: this.nombre_documento_sello,
      numero_empleado_secretaria: this.numero_empleado_asiganacion,
      foto_secretaria: this.foto_user,
      activo: 1
    }
    this.sello_Service.newsello(sello).subscribe({
      next: (v) => {
        this.toastr.success('Registro almacenado Correctamente', 'Correcto', { "positionClass": "toast-bottom-center" });
      },
      error: (event: HttpErrorResponse) => {

        if (event.error === "Registro de la tabla : sello  actualizado correctamente") {
          this._errorService.msjWarning(event);
        }
        else {
          this._errorService.msjError(event);
        }
        this.loading = false;
      },
      complete: () => console.info('complete')
    })
  }
  //-------------------------------------------------------------------------------------------------->
  // Asignacion--------------------------------------------------------------------------------------->

  public getEncargadoid_gestion_oficios() {
    if (this.id_gestion_oficios != '') {
      this.asigacionService.getAllcat_empleadosByid_gestion_oficios(this.id_gestion_oficios).subscribe(data => {
        this.listcat_asignado = data;
        this.dataSource = new MatTableDataSource<asignacion>(this.listcat_asignado);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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

  getEncargado() {
    if (this.id_gestion_oficios != '') {
      this.asigacionService.getEncargadoArea(this.id_direccion, this.id_area).subscribe(data => {
        this.nombreCoordinador = data.nombreJefe;
        this.fotoCoordinador_asignacion = data.foto;
        this.id_direcion_asignacion = data.direccion;
        this.text_area = data.area_texto;
        this.area_texto_asigancion = data.area;
        this.text_direccion_base_asignacion = data.direccion_texto;
        this.id_area_base_asignacion = data.area;
      });
    }
  }
  get_personal_para_asignacion() {
    if (this.id_gestion_oficios != '') {
      this.asigacionService.getAllcat_empleadosByDireccionAreas(this.id_gestion_oficios, this.id_direccion, this.id_area).subscribe(data => {
        this.listcat_empleados = data;
      });
    }
  }

  get_info_empleado_by_numero_empleado(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const numero = +selectElement.value;
    const empleado = this.listcat_empleados.find(e => e.numero_empleado === numero);
    if (empleado) {
      this.numero_empleado_tecnico = empleado.numero_empleado;
      this.text_nombre_empleado_asignacion = empleado.nombre_completo;
      this.foto_asignacion = empleado.foto;
      this.total_tramites = empleado.total_tramites;
    }
  }

  mostrarImagenFallback() {
    this.imagenCargada = false;
  }

  saveAsignacion() {
    this.errorAsignacion = false;
    this.errorid_direccion_asignacion = false;
    this.errortext_direccion_asignacion = false;
    this.errorid_area_asignacion = false;
    this.errorarea_texto_asignacion = false;
    this.errornumero_empledo_asignacion = false;
    this.errortext_nombre_empleado_asignacion = false;
    this.errorfoto_asignacion = false;
    this.errorid_oficio_asignacion = false;
    this.errorotro_asignacion = false;

    if (this.id_direcion_asignacion == '') {
      this.errorid_direccion_asignacion = true;
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro id_direccion')
    }
    else if (this.text_direccion_base_asignacion == '') {
      this.errortext_direccion_asignacion = true;
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro text_direccion')
    }
    else if (this.id_area_base_asignacion == '') {
      this.errorid_area_asignacion = true;
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro id_area')
    }
    else if (this.area_texto_asigancion == '') {
      this.errorarea_texto_asignacion = true;
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro area_texto')
    }
    else if (this.numero_empleado_asiganacion == '') {
      this.errornumero_empledo_asignacion = true;
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro numero_empledo')
    }
    else if (this.text_nombre_empleado_asignacion == '') {
      this.errortext_nombre_empleado_asignacion = true;
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro text_nombre_empleado')
    }
    else if (this.fotoCoordinador_asignacion == '') {
      this.errorfoto = true;
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro foto')
    }
    else if (this.instrucciones == "") {
      this.mensajeAlertaError('Error: falta información en el parámetro Instrucciones')
    }
    // else if (this.id_oficio == '') {
    //   this.errorid_oficio = true;
    //   this.mensajeAlertaError('Error: falta el Informacíon en el parámetro id_oficio')
    // }
    // else if(this.otro == '') {
    //   this.errorotro= true; 
    //   this.mensajeAlertaError('Error: falta el Informacíon en el parámetro otro')
    // }
    else {
      this.saveParamsAsignacion();
    }
  }

  saveParamsAsignacion() {
    this.loading = true;
    const asigacion: Nueva_asignacion = {
      id_usuario_quien_asigna: this.id_usuario,
      id_gestion_oficios: this.id_gestion_oficios,
      id_oficio: this.id_oficios,
      id_direccion_asignacion: this.id_direcion_asignacion,
      id_area_asignacion: this.id_area_base_asignacion,
      numero_empledo_asignacion: this.numero_empleado_tecnico,
      text_direccion: this.text_direccion,
      text_area: this.text_area,
      text_nombre_empleado_asignacion: this.text_nombre_empleado_asignacion,
      foto: this.foto_asignacion,
      fecha_asignacion: this.fecha_asignacion,
      estatus_oficio: 1,
      instrucciones: this.instrucciones,
      numero_empleado_tecnico : this.numero_empleado_tecnico,
      fecha_terminacion : this.fecha_hora,
      numero_empleado_secretaria: this.numero_empleado_asiganacion,
      foto_empleado_secretaria:this.foto_user,
      numero_oficio:this.numero_oficio,
    }
    this.asigacionService.new_asignacion(asigacion).subscribe({
      next: (v) => {

        this.toastr.success('Registro almacenado Correctamente', 'Correcto', { "positionClass": "toast-bottom-center" });
        this.text_nombre_empleado_asignacion = "";
        this.loading = false;
        // this.banderaBloqueo = true;
        this.get_personal_para_asignacion();
        this.getEncargadoid_gestion_oficios();
        this.actualizarEstatusVisto(4);

      },
      error: (event: HttpErrorResponse) => {
        this._errorService.msjError(event);
        this.loading = false;
      },
      complete: () => console.info('complete')
    })
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


  verAvance(id_gestion_oficios: string) {
    if (id_gestion_oficios) {
      this.router.navigate(['/index/vercorrespondencia/' + id_gestion_oficios]);
    }
  }
  DeleteAsignado(id_gestion_oficios: number, numero_empleado: number) {
    if (numero_empleado != 0) {
      Swal.fire({
        title: '¿Desea eliminar al usuario con numero de empleado :' + numero_empleado + ' del oficio con numero : ' + this.numero_oficio + ' ?',
        text: '',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'SI',
        cancelButtonText: 'NO',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteParam(id_gestion_oficios, numero_empleado);
        }
      });
    }
  }

  deleteParam(id_gestion_oficios: number, numero_empleado: number) {
    if (id_gestion_oficios != 0) {
      this.asigacionService.delete_asignacion(this.id_usuario, id_gestion_oficios, numero_empleado).subscribe({
        next: (v) => {
          this.toastr.warning('Registro eliminado correctamente', 'Correcto', { 'positionClass': 'toast-bottom-center' });
          this.get_personal_para_asignacion();

          this.asigacionService.getAllcat_empleadosByid_gestion_oficios(this.id_gestion_oficios).subscribe(data => {
            this.listcat_asignado = data;
            this.dataSource = new MatTableDataSource<asignacion>(this.listcat_asignado);
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
    // this.getOficioByArea();
  }

  agregarInstrucciones() {
    if (this.instrucciones.length > 5) {
      this.banderaBloqueo = false;
    }
    else {
      this.banderaBloqueo = true;
    }

  }





  actualizarEstatusVisto(estatus: number): Promise<number> {
    return new Promise<number>((resolve) => {
      if (this.id_gestion_oficios != "" && this.id_direccion != "" && this.id_area != "") {
        this.cat_destinatarioService.actualizarEstatusDestinatario(this.id_gestion_oficios, this.id_direccion, this.id_area, estatus).subscribe(data => {
          if (Number(data) === 1) {
            resolve(1);
          } else {
            resolve(0);
          }
        }, () => {
          resolve(0);
        });
      } else {
        resolve(0);
      }
    });
  }

  //-------------------------------------------------------------------------------------------------->


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

  //Oficio de sellor------------------------------------------------------------------------>
  async generatePdf(): Promise<void> {
    const fechaEnString = new Date().toLocaleString();
    const partesFechaHora = fechaEnString.split(', ');
    const partesFecha = partesFechaHora[0].split('/');
    const partesHora = partesFechaHora[1].split(':');
    const dia = parseInt(partesFecha[0], 10);
    const mes = parseInt(partesFecha[1], 10) - 1;
    const anio = parseInt(partesFecha[2], 10);

    const hora = parseInt(partesHora[0], 10);
    const minutos = parseInt(partesHora[1], 10);
    const segundos = parseInt(partesHora[2], 10);
    const fecha = new Date(anio, mes, dia, hora, minutos, segundos);
    const meses = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];

    // Extraer las partes de la fecha
    const diaFormateado = fecha.getDate();
    const mesFormateado = meses[fecha.getMonth()];
    const anioFormateado = fecha.getFullYear();


    const fechaFormateada = `${diaFormateado} de ${mesFormateado} de ${anioFormateado}`;
    const fechaActual = new Date();

    // Para tener el formato "31 de julio de 2025"
    const meses2 = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];

    const dias = fechaActual.getDate();
    const mess = meses[fechaActual.getMonth()];
    const anios = fechaActual.getFullYear();

    const fechaActualFormateada = `${dias} de ${mess} de ${anios}`;
    // Crear un objeto Date con la fecha y hora actuale
    const horas = fechaActual.getHours();
    const minutoss = fechaActual.getMinutes();
    const segundoss = fechaActual.getSeconds();

    // Opcional: Formatear la hora con un cero al principio si es menor que 10
    const horasFormateadas = horas < 10 ? `0${horas}` : horas;
    const minutosFormateados = minutoss < 10 ? `0${minutoss}` : minutoss;
    const segundosFormateados = segundoss < 10 ? `0${segundoss}` : segundoss;

    // Construir la cadena de la hora
    const horaFormateada = `${horasFormateadas}:${minutosFormateados}:${segundosFormateados}`;

    // Revocamos la URL anterior si existe para liberar memoria
    if (this.objectUrl) {
      URL.revokeObjectURL(this.objectUrl);
    }
    const ip = GlobalConstants.appURL

    // *** Datos para el código QR ***
    // Puedes poner una URL, un ID o cualquier texto que quieras codificar
    const qrData = ip + 'evidencia_sello/sello/nombre_documento_sello_digital/' + this.id_gestion_oficios + '.pdf';
    let qrCodeBase64: string;
    try {
      qrCodeBase64 = await QRCode.toDataURL(qrData);
    } catch (err) {
      console.error('Error al generar el código QR:', err);
      // En caso de error, puedes generar un PDF sin el QR
      return;
    }


    const doc = new jsPDF();
    const img = new Image();
    const imagenFonfo = new Image();
    const imagenFooter = new Image();
    const imagenSello = new Image();

    img.src = '/element_oficio/headerPlantilla.png';
    imagenFonfo.src = '/element_oficio/cuerpoPlantilla.png';
    imagenFooter.src = '/element_oficio/footerPlantilla.png';
    imagenSello.src = '/element_oficio/imagenSello.png';
    // *** Aquí está el cambio clave ***
    // Toda la lógica de generación del PDF debe estar dentro del onload
    img.onload = () => {
      // x=->   y=| ancho, lago  
      doc.addImage(img, 'PNG', 30, 5, 140, 30);
      doc.addImage(imagenFonfo, 'PNG', 30, 80, 160, 150);
      doc.addImage(imagenFooter, 'PNG', 30, 260, 180, 30);


      //AREA----------------------------------------------------------------->
      doc.setFontSize(15);
      doc.setFont('helvetica', 'bold');
      doc.text(this.area_text_firmante + '.', 40, 42);
      //--------------------------------------------------------------------->

      //OFICIO--------------------------------------------------------------->
      doc.setFontSize(15);
      doc.setFont('helvetica', 'bold');
      doc.text('OFICIO:' + this.numero_oficio + '.', 102, 50);
      //---------------------------------------------------------------------->

      //Asunto---------------------------------------------------------------->
      doc.setFontSize(15);
      doc.setFont('helvetica', 'bold');
      doc.text('ASUNTO:' + this.asunto, 190, 58, { align: 'right', maxWidth: 135 });


      //Direecion del municipio------------------------------------------------>
      doc.setFontSize(15);
      doc.setFont('helvetica', '');
      doc.text('Tlalnepantla de Baz, Estado de Mexicoa a ' + fechaFormateada, 59, 75);


      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(0, 0, 0);
      doc.rect(60, 120, 120, 90, 'S');

      doc.addImage(imagenSello, 'PNG', 88, 125, 55, 30);

      //Direccion Firmante 

      doc.setFontSize(15);
      doc.setFont('helvetica', 'bold');
      doc.text(this.text_direccion, 90, 160);

      doc.setFontSize(15);
      doc.setFont('helvetica', 'bold');
      doc.text(this.text_area, 120, 170, { align: 'center', maxWidth: 135 });

      doc.setFontSize(15);
      doc.setFont('helvetica', 'bold');
      doc.text(fechaActualFormateada + '  a las ' + horaFormateada, 70, 190);

      doc.setFontSize(15);
      doc.setFont('helvetica', 'bold');
      doc.text(this.usuarioCuenta, 62, 200);


      doc.addImage(qrCodeBase64, 'PNG', 10, 220, 40, 40);

      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('Para verificar la validez de este sello, por favor, escaneé este QR ', 50, 240);

      // // 3. Genera el PDF como un blob
      // const pdfBlob = doc.output('blob');

      // // 4. Crea una URL de objeto a partir del blob
      // this.objectUrl = URL.createObjectURL(pdfBlob);

      // // 5. Sanitiza y asigna la URL para el iframe
      // this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.objectUrl);

      // doc.save('oficio_sellado.pdf');

      // 1. Genera el PDF como un blob (el archivo en memoria)
      const pdfBlob = doc.output('blob');

      // 2. Crea un objeto File a partir del blob
      // Le damos un nombre de archivo y el tipo MIME 'application/pdf'
      const pdfFile = new File([pdfBlob], 'oficio_sellado.pdf', { type: 'application/pdf' });

      // 3. Llama a tu método 'getFile' y pásale el nuevo archivo
      // Simulamos el evento que tu función espera
      const fakeEvent = { target: { files: [pdfFile] } };
      this.getFile(fakeEvent, 'nombre_documento_sello_digital');

      // Opcional: Si aún quieres que se descargue, puedes agregar el doc.save()
      // doc.save('oficio_sellado.pdf');
    };

    img.onerror = () => {
      console.error('Error al cargar la imagen. ¿Es correcta la ruta?');
      // Podrías generar un PDF sin la imagen en caso de error
      doc.text('Error al cargar la imagen. No se pudo mostrar.', 10, 10);
      this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        URL.createObjectURL(doc.output('blob'))
      );
    };
  }

  //------------------------------------------------------------------------------------------------->

  openDialogContrasenia(id_asignacion: number, numero_empledo_asignacion: number, instrucciones: string, foto: string,) {
    // Pass the 'usuario' data in the 'data' property of the configuration object
    const dialogRef = this.dialog.open(DialogContentExampleDialog, {
      data: {
        id_asignacion: id_asignacion,
        numero_empledo_asignacion: numero_empledo_asignacion,
        instrucciones: instrucciones,
        foto: foto,
        tipo: 1,
        refrescar: () => this.getEncargadoid_gestion_oficios()

      } // <-- **THIS IS THE CRUCIAL CHANGE!**
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog was closed');
      // The line 'usuario : this.usuario;' here doesn't do anything useful.
      // If the dialog returns a result, it would be in the 'result' variable.
    });
  }

  openHelper() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog, {
      data: {
        id_direccion: this.id_direccion,
        id_area: this.id_area,
        tipo: 2,

      } // <-- **THIS IS THE CRUCIAL CHANGE!**
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog was closed');
      // The line 'usuario : this.usuario;' here doesn't do anything useful.
      // If the dialog returns a result, it would be in the 'result' variable.
    });
  }



  openBottomSheet(): void {
    const misDatos = {
      id_direccion: this.id_direccion, id_area: this.id_area,
    };

    // Abrimos el BottomSheet y le pasamos los datos en la propiedad 'data'
    this._bottomSheet.open(BottomSheetOverviewExampleSheet, {
      data: misDatos
    });
    // this._bottomSheet.open(BottomSheetOverviewExampleSheet);
  }



}

//---------------------------------------------------------------------------->
//Modal
@Component({
  selector: 'nuevo-dialog',
  templateUrl: 'dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, FormsModule, MatCardModule, CommonModule, MatProgressSpinnerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './ver.component.scss'
})
export class DialogContentExampleDialog {
  usuario: string = '';
  id_asignacion: number | any;
  numero_empledo_asignacion: number | any;
  instrucciones: string = '';
  nuevaIntruccion: string = '';
  foto: string = '';
  errorActualizar: boolean = false;
  id_direccion: any = '';
  id_area: any = '';
  tipo: string = '';

  loading: boolean = false;
  @ViewChild('btnCargar') btnCargar!: ElementRef<HTMLButtonElement>;

  constructor(public dialogRef: MatDialogRef<DialogContentExampleDialog>, @Inject(MAT_DIALOG_DATA)
  public data: {
    id_asignacion: any,
    numero_empledo_asignacion: any,
    instrucciones: any,
    foto: any,
    refrescar: () => void
  }, // <-- Aquí inyectas los datos
    private asigacionService: asigacionService, private router: Router) {
    // Aquí puedes acceder a los datos pasados desde el componente que abre el diálogo
    this.id_asignacion = this.data.id_asignacion;
    this.numero_empledo_asignacion = this.data.numero_empledo_asignacion;
    this.instrucciones = this.data.instrucciones;
    this.foto = this.data.foto;

  }




  // Puedes añadir métodos para cerrar el diálogo si es necesario
  onNoClick(): void {
    this.dialogRef.close();
  }


  actualizar() {
    if (this.nuevaIntruccion != "") {
      this.asigacionService.update_firmante_instrucciones(this.id_asignacion, this.numero_empledo_asignacion, this.nuevaIntruccion).subscribe({
        next: (v) => {

          // this.toastr.success('Registro almacenado Correctamente', 'Correcto', { "positionClass": "toast-bottom-center" });
          // this.text_nombre_empleado_asignacion = "";
          // this.loading = false;
          // // this.banderaBloqueo = true;
          // this.get_personal_para_asignacion();
          // this.getEncargadoid_gestion_oficios();

          Swal.fire({
            position: "center",
            icon: "success",
            title: "Las Instrucciones se almacenaron correctamente",
            showConfirmButton: false,
            timer: 1500
          });

          this.onNoClick();
          this.data.refrescar();
        },
        error: (event: HttpErrorResponse) => {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: event.error,
            footer: '<a href="#">Si necesitas ayuda, contacta al administrador.</a>'
          });
        },
        complete: () => console.info('complete')
      })

    }
    else {
      this.errorActualizar = true;
    }

  }

}

@Component({
  selector: 'bottom-sheet-overview-example-sheet',
  templateUrl: 'bottom-sheet-overview-example-sheet.html',
  standalone: true,
  imports: [MatListModule, MatButtonModule, MatCardModule, CommonModule, MatExpansionModule, MatIconModule,MatChipsModule,],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ]

})
export class BottomSheetOverviewExampleSheet {
  datosRecibidos: any;


  // private _bottomSheetRef =
  //   inject<MatBottomSheetRef<BottomSheetOverviewExampleSheet>>(MatBottomSheetRef);

  // openLink(event: MouseEvent): void {
  //   this._bottomSheetRef.dismiss();
  //   event.preventDefault();
  // }
  id_direccion: any;
  id_area: any;
  list_cat_empleadosArea: DestinatariosDireccionAsignacion[] = [];
  list_asignacion_estatus: tecnicoTable[] = [];
  readonly panelOpenState = signal(false);

  resumenPorEmpleado: {
    [numero_empleado: number]: {
      sinVisto: number;
      enProceso: number;
      enPausa: number;
      concluidos: number;
      total: number;
    }
  } = {};





  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any, private asigacionService: asigacionService, private router: Router) {
    //this.datosRecibidos = data;
    this.id_direccion = data.id_direccion;
    this.id_area = data.id_area;
    if (this.id_direccion != "" && this.id_area != "") {

      this.getPersonalArea();
    }

  }

  getPersonalArea() {

    this.asigacionService.getEncargadosPorDireccionArea(this.id_direccion, this.id_area).subscribe({
      next: (data) => {
        
        this.list_cat_empleadosArea = data;
      },
      error: (error) => {
        console.error('Error cargando empleados', error);
      }
    });
  }

getServiciosRealizados(numero_empleado: number) {
  this.asigacionService.getAsignacionesByNumeroEmpleado(numero_empleado).subscribe({
    next: (data: tecnicoTable[]) => {
      this.list_asignacion_estatus = data;
      const resumen = {
        sinVisto: data.filter(a => String(a.estatus_seguimiento).toLowerCase() === '').length, //en proceso
        enProceso: data.filter(a => String(a.estatus_seguimiento).toLowerCase() === '2').length, //en proceso
        enPausa: data.filter(a => String(a.estatus_seguimiento).toLowerCase() === '3').length,//en pausa
        concluidos: data.filter(a => String(a.estatus_seguimiento).toLowerCase() === '4').length,//concluidos
        total: data.length
      };
      this.resumenPorEmpleado[numero_empleado] = resumen;
    },
    error: (error) => {
      console.error('Error cargando empleados', error);
    }
  });
}




}