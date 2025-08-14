import { Component, ViewChild, ChangeDetectionStrategy, inject, signal, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { users_opdmTable } from '../../../../interfaces/usuarios_opdm/users_opdm/users_opdm-table.interface';
import { users_opdmService } from '../../../../service/usuarios_opdm/users_opdm/users_opdm.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleChange, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import Swal from 'sweetalert2'
import { Nuevousers_opdm } from '../../../../interfaces/usuarios_opdm/users_opdm/users_opdm-response.interface';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../../../service/error.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { estatususuarios_opdmTable } from '../../../../interfaces/usuarios_opdm/estatus/estatususuarios_opdm-table.interface';
import { estatususuarios_opdmService } from '../../../../service/usuarios_opdm/estatus/estatususuarios_opdm.service';
import { cat_direccionesTable } from '../../../../interfaces/catalogo/cat_direcciones/cat_direcciones-table.interface';
import { cat_direccionesService } from '../../../../service/catalogo/cat_direcciones/cat_direcciones.service';
import { cat_areasTable } from '../../../../interfaces/catalogo_areas/cat_areas/cat_areas-table.interface';
import { cat_areasService } from '../../../../service/catalogo_areas/cat_areas/cat_areas.service';
import { rollesService } from '../../../../service/rolles/rolles.service';
import { rollesTable } from '../../../../interfaces/rolles/rolles-table.interface';
import { MatOptionSelectionChange } from '@angular/material/core';
import { cat_direcciones_areas_Service } from '../../../../service/catalogo/cat_direcciones_areas/cat_direcciones_areas.service';



@Component({
  selector: 'app-actualizar-users_opdm',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatFormFieldModule,
    MatInputModule, FormsModule, ReactiveFormsModule,
    MatSlideToggleModule, MatDialogModule, MatButtonModule, CommonModule
  ],
  templateUrl: './actualizar.component.html',
  styleUrl: './actualizar.component.scss'
})

export default class ActualizarComponentusers_opdm {
  id_usuarios_opdm: number | any;
  loading: boolean = false;
  listusers_opdm: users_opdmTable[] = [];
  listestatususuarios_opdm: estatususuarios_opdmTable[] = [];
  id_estatususuarios_opdm: number | any;
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
  message: string | any;
  verificacion: string | any = '';

  //Recibir el primer parametro de verificacion

  @Input()
  set peticionVerificacion(value: string) {
    value = value || '';
    if (value == 'verificar') {
      this.actualizar();
    }
  }

  //Enviar el primer parametro de verificacion

  @Output()
  enviarRespuestaVerificacion: EventEmitter<string> = new EventEmitter<string>();
  textoRespuestaVerificacion: string = '';

  @Input()
  set peticionActualizacion(value: string) {
    value = value || '';
    if (value == 'actualizar') {
      this.saveParams();
    }
  }

  //Enviar el segundo parametro de Actualizacion

  @Output()
  enviarRespuestaActualizacion: EventEmitter<string> = new EventEmitter<string>();
  textoRespuestaActualizacion: string = '';

  id_users_opdm: number | any = '';
  resultadoid_users_opdm: boolean = false;
  errorid_users_opdm: boolean = false;

  id_roll: string | any = '';
  resultadoid_roll: boolean = false;
  errorid_roll: boolean = false;

  usuario: string | any = '';
  resultadousuario: boolean = false;
  errorusuario: boolean = false;

  clave: string | any = '';
  resultadoclave: boolean = false;
  errorclave: boolean = false;

  nombre: string | any = '';
  resultadonombre: boolean = false;
  errornombre: boolean = false;

  apepa: string | any = '';
  resultadoapepa: boolean = false;
  errorapepa: boolean = false;

  apema: string | any = '';
  resultadoapema: boolean = false;
  errorapema: boolean = false;

  genero: number | any = '';
  resultadogenero: boolean = false;
  errorgenero: boolean = false;

  correo: string | any = '';
  resultadocorreo: boolean = false;
  errorcorreo: boolean = false;

  telefono: string | any = '';
  resultadotelefono: boolean = false;
  errortelefono: boolean = false;

  fec_ingreso: string | any = '';
  resultadofec_ingreso: boolean = false;
  errorfec_ingreso: boolean = false;


  resultadoimp: boolean = false;
  errorimp: boolean = false;


  resultadoedit: boolean = false;
  erroredit: boolean = false;


  resultadoelim: boolean = false;
  errorelim: boolean = false;


  resultadonuev: boolean = false;
  errornuev: boolean = false;


  resultadoimg: boolean = false;
  errorimg: boolean = false;

  id_direccion: string | any = '';
  resultadoid_direccion: boolean = false;
  errorid_direccion: boolean = false;

  texto_direccion: string | any = '';
  resultadotexto_direccion: boolean = false;
  errortexto_direccion: boolean = false;

  id_area: string | any = '';
  resultadoid_area: boolean = false;
  errorid_area: boolean = false;

  texto_area: string | any = '';
  resultadotexto_area: boolean = false;
  errortexto_area: boolean = false;

  numero_empleado: string | any = '';
  resultadonumero_empleado: boolean = false;
  errornumero_empleado: boolean = false;

  foto: string | any = '';
  fotoImagen: string | any = '';
  resultado_foto: boolean = false;
  error_foto: boolean = false;

  listcat_direcciones: cat_direccionesTable[] = [];
  listcat_areas: cat_areasTable[] = [];

  listcat_direccionesFilter: cat_direccionesTable[] = [];
  listcat_areasFilter: cat_areasTable[] = [];
  listRooles: rollesTable[] = [];
  banderaCambioContrasenia: boolean = true;
  respuestaCambioCOntrasenia: string = 'NO';

  errorestatus: boolean = false;
  private fileTmp: any;
  constructor(private _users_opdmServices: users_opdmService, private router: Router,
    private toastr: ToastrService, private _errorService: ErrorService,
    private aRouter: ActivatedRoute, private _cat_direccionesServices: cat_direccionesService,
    private _cat_areasServices: cat_areasService,
    private _sanitizer: DomSanitizer,
    private _estatususuarios_opdmServices: estatususuarios_opdmService,
    private _rollesServices: rollesService,
    private _cat_direcciones_areas_Service: cat_direcciones_areas_Service
  ) {
    this.id_usuarios_opdm = aRouter.snapshot.paramMap.get('id_usuarios_opdm');
    this.id_users_opdm = aRouter.snapshot.paramMap.get('id_users_opdm');
    this.verificacion = aRouter.snapshot.paramMap.get('verificacion');
    this.token = localStorage.getItem('token');
    this.id_usuario = localStorage.getItem('id_usuario');
    this.id_rol = localStorage.getItem('id_rol');
    this.imp = localStorage.getItem('imp');
    this.edit = localStorage.getItem('edit');
    this.elim = localStorage.getItem('elim');
    this.nuev = localStorage.getItem('nuev');
    this.img = localStorage.getItem('img');
    this.PaginaActual = '/index/nuevousers_opdm';
    this.finalizado = 1;
    this.getInformacionById();
    this.getCatEstatususuarios_opdm();
    this.getInfoCat_cat_direcciones();
    this.getInfoCat_cat_areas();
    this.getInformacionRooles();
  }

  getInformacionRooles() {
    this._rollesServices.getAllrolles(this.id_usuario).subscribe(data => {
      this.listRooles = data;
    })
  }

  getPrivileges(): void {
    if (this.id_roll) {
      this._rollesServices.getrolles(this.id_roll, this.id_usuario).subscribe((data: rollesTable) => {
        this.imp = 1;
        this.edit = data.editar;
        this.elim = data.eliminar;
        this.nuev = data.crear;
        this.img = 1;
      })
    }
  }

  onDireccionSelect(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedIndex = selectElement.selectedIndex;
    const selectedText = selectElement.options[selectedIndex].text;
    this.texto_direccion = selectedText;

    if (this.id_direccion != "") {
      this._cat_direcciones_areas_Service.getAreaByIdDireccion(this.id_direccion).subscribe(data => {
        this.listcat_areas = data;
      })
    }

  }

  onAreaChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedIndex = selectElement.selectedIndex;
    const selectedText = selectElement.options[selectedIndex].text;
    this.texto_area = selectedText;
  }

  getInfoCat_cat_direcciones() {
    this._cat_direccionesServices.getAllcat_direcciones(this.id_usuario).subscribe(data => {
      this.listcat_direcciones = data;
    })
  }
  getInfoCat_cat_areas() {
    this._cat_areasServices.getAllcat_areas(this.id_usuario).subscribe(data => {
      this.listcat_areas = data;
    })
  }
  openHelper() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  getCatEstatususuarios_opdm() {
    this._estatususuarios_opdmServices.getAllestatususuarios_opdm(this.id_usuario).subscribe((data) => {
      this.listestatususuarios_opdm = data;
    })
  }


  goInicio() {
    this.router.navigate(['/index/usuarios_opdm']);
  }

  getInformacionById() {
    if (this.id_users_opdm != '') {
      this._users_opdmServices.getusers_opdm(this.id_users_opdm, this.id_usuario).subscribe((data: users_opdmTable) => {
        this.estatus = data.id_estatususuarios_opdm;
        this.id_roll = data.id_roll;
        this.usuario = data.usuario;
        this.clave = data.clave;
        this.nombre = data.nombre;
        this.apepa = data.apepa;
        this.apema = data.apema;
        this.genero = data.genero;
        this.correo = data.correo;
        this.telefono = data.telefono;
        this.fec_ingreso = data.fec_ingreso;
        this.imp = data.imp;
        this.edit = data.edit;
        this.elim = data.elim;
        this.nuev = data.nuev;
        this.img = data.img;
        this.id_direccion = data.id_direccion;
        this.texto_direccion = data.texto_direccion;
        this.id_area = data.id_area;
        this.texto_area = data.texto_area;
        this.numero_empleado = data.numero_empleado;
        this.foto = data.foto;

        this.fotoImagen = this._sanitizer.bypassSecurityTrustResourceUrl(this.foto);
        this.onDireccion();
        this.onArea();
      })
    }
  }

  onDireccion() {
    if (this.id_direccion != "") {
      this._cat_direcciones_areas_Service.getAreaByIdDireccion(this.id_direccion).subscribe(data => {
        this.listcat_areas = data;
      })
    }
  }

  onArea() {
    if (this.id_area) {
      this._cat_direcciones_areas_Service.getAreaByIdArea(this.id_area).subscribe(data => {
        this.listcat_areas = data;
      })
    }
  }


  actualizar() {
    this.errorid_roll = false;
    this.errorusuario = false;
    this.errorclave = false;
    this.errornombre = false;
    this.errorapepa = false;
    this.errorapema = false;
    this.errorgenero = false;
    this.errorcorreo = false;
    this.errortelefono = false;
    this.errorfec_ingreso = false;
    this.errorimp = false;
    this.erroredit = false;
    this.errorelim = false;
    this.errornuev = false;
    this.errorimg = false;
    this.errorid_direccion = false;
    this.errortexto_direccion = false;
    this.errorid_area = false;
    this.errortexto_area = false;
    this.errornumero_empleado = false;
    this.error_foto = false;

    if (this.banderaCambioContrasenia == true) {
      if (this.id_roll == '') {
        this.errorid_roll = true;
        this.mensajeAlertaError('Error: falta el Informacíon en el parámetro id_roll')
        this.textoRespuestaVerificacion = 'NO';
        this.enviarRespuestaVerificacion.emit(this.textoRespuestaVerificacion)
      }
      else if (this.nombre == '') {
        this.errornombre = true;
        this.mensajeAlertaError('Error: falta el Informacíon en el parámetro nombre')
        this.textoRespuestaVerificacion = 'NO';
        this.enviarRespuestaVerificacion.emit(this.textoRespuestaVerificacion)
      }
      else if (this.apepa == '') {
        this.errorapepa = true;
        this.mensajeAlertaError('Error: falta el Informacíon en el parámetro apepa')
        this.textoRespuestaVerificacion = 'NO';
        this.enviarRespuestaVerificacion.emit(this.textoRespuestaVerificacion)
      }
      else if (this.apema == '') {
        this.errorapema = true;
        this.mensajeAlertaError('Error: falta el Informacíon en el parámetro apema')
        this.textoRespuestaVerificacion = 'NO';
        this.enviarRespuestaVerificacion.emit(this.textoRespuestaVerificacion)
      }
      else if (this.genero == '') {
        this.errorgenero = true;
        this.mensajeAlertaError('Error: falta el Informacíon en el parámetro genero')
        this.textoRespuestaVerificacion = 'NO';
        this.enviarRespuestaVerificacion.emit(this.textoRespuestaVerificacion)
      }
      else if (this.correo == '') {
        this.errorcorreo = true;
        this.mensajeAlertaError('Error: falta el Informacíon en el parámetro correo')
        this.textoRespuestaVerificacion = 'NO';
        this.enviarRespuestaVerificacion.emit(this.textoRespuestaVerificacion)
      }
      else if (this.telefono == '') {
        this.errortelefono = true;
        this.mensajeAlertaError('Error: falta el Informacíon en el parámetro telefono')
        this.textoRespuestaVerificacion = 'NO';
        this.enviarRespuestaVerificacion.emit(this.textoRespuestaVerificacion)
      } 
      else if (this.id_direccion == '') {
        this.errorid_direccion = true;
        this.mensajeAlertaError('Error: falta el Informacíon en el parámetro id_direccion')
        this.textoRespuestaVerificacion = 'NO';
        this.enviarRespuestaVerificacion.emit(this.textoRespuestaVerificacion)
      }
      else if (this.texto_direccion == '') {
        this.errortexto_direccion = true;
        this.mensajeAlertaError('Error: falta el Informacíon en el parámetro texto_direccion')
        this.textoRespuestaVerificacion = 'NO';
        this.enviarRespuestaVerificacion.emit(this.textoRespuestaVerificacion)
      }
      else if (this.id_area == '') {
        this.errorid_area = true;
        this.mensajeAlertaError('Error: falta el Informacíon en el parámetro id_area')
        this.textoRespuestaVerificacion = 'NO';
        this.enviarRespuestaVerificacion.emit(this.textoRespuestaVerificacion)
      }
      else if (this.texto_area == '') {
        this.errortexto_area = true;
        this.mensajeAlertaError('Error: falta el Informacíon en el parámetro texto_area')
        this.textoRespuestaVerificacion = 'NO';
        this.enviarRespuestaVerificacion.emit(this.textoRespuestaVerificacion)
      }
      else if (this.numero_empleado == '') {
        this.errornumero_empleado = true;
        this.mensajeAlertaError('Error: falta el Informacíon en el parámetro numero_empleado')
        this.textoRespuestaVerificacion = 'NO';
        this.enviarRespuestaVerificacion.emit(this.textoRespuestaVerificacion)
      }
      else if (this.foto == '') {
        this.error_foto = true;
        this.mensajeAlertaError('Error: falta el Informacíon en el parámetro  foto')
        this.textoRespuestaVerificacion = 'NO';
        this.enviarRespuestaVerificacion.emit(this.textoRespuestaVerificacion)
      }
      else if (this.estatus == '') {
        this.errorestatus = true;
        this.mensajeAlertaError('Error: falta el Informacíon en el parámetro Estatus')
        this.textoRespuestaVerificacion = 'NO';
        this.enviarRespuestaVerificacion.emit(this.textoRespuestaVerificacion)
      }
      else {
        this.textoRespuestaVerificacion = 'OK';
        this.enviarRespuestaVerificacion.emit(this.textoRespuestaVerificacion)
      }
    }
    else{
       if (this.id_roll == '') {
        this.errorid_roll = true;
        this.mensajeAlertaError('Error: falta el Informacíon en el parámetro id_roll')
        this.textoRespuestaVerificacion = 'NO';
        this.enviarRespuestaVerificacion.emit(this.textoRespuestaVerificacion)
      }
      else if (this.usuario == '') {
        this.errorusuario = true;
        this.mensajeAlertaError('Error: falta el Informacíon en el parámetro usuario')
        this.textoRespuestaVerificacion = 'NO';
        this.enviarRespuestaVerificacion.emit(this.textoRespuestaVerificacion)
      }
      else if (this.clave == '') {
        this.errorclave = true;
        this.mensajeAlertaError('Error: falta el Informacíon en el parámetro clave')
        this.textoRespuestaVerificacion = 'NO';
        this.enviarRespuestaVerificacion.emit(this.textoRespuestaVerificacion)
      }
      else if (this.nombre == '') {
        this.errornombre = true;
        this.mensajeAlertaError('Error: falta el Informacíon en el parámetro nombre')
        this.textoRespuestaVerificacion = 'NO';
        this.enviarRespuestaVerificacion.emit(this.textoRespuestaVerificacion)
      }
      else if (this.apepa == '') {
        this.errorapepa = true;
        this.mensajeAlertaError('Error: falta el Informacíon en el parámetro apepa')
        this.textoRespuestaVerificacion = 'NO';
        this.enviarRespuestaVerificacion.emit(this.textoRespuestaVerificacion)
      }
      else if (this.apema == '') {
        this.errorapema = true;
        this.mensajeAlertaError('Error: falta el Informacíon en el parámetro apema')
        this.textoRespuestaVerificacion = 'NO';
        this.enviarRespuestaVerificacion.emit(this.textoRespuestaVerificacion)
      }
      else if (this.genero == '') {
        this.errorgenero = true;
        this.mensajeAlertaError('Error: falta el Informacíon en el parámetro genero')
        this.textoRespuestaVerificacion = 'NO';
        this.enviarRespuestaVerificacion.emit(this.textoRespuestaVerificacion)
      }
      else if (this.correo == '') {
        this.errorcorreo = true;
        this.mensajeAlertaError('Error: falta el Informacíon en el parámetro correo')
        this.textoRespuestaVerificacion = 'NO';
        this.enviarRespuestaVerificacion.emit(this.textoRespuestaVerificacion)
      }
      else if (this.telefono == '') {
        this.errortelefono = true;
        this.mensajeAlertaError('Error: falta el Informacíon en el parámetro telefono')
        this.textoRespuestaVerificacion = 'NO';
        this.enviarRespuestaVerificacion.emit(this.textoRespuestaVerificacion)
      }
      else if (this.id_direccion == '') {
        this.errorid_direccion = true;
        this.mensajeAlertaError('Error: falta el Informacíon en el parámetro id_direccion')
        this.textoRespuestaVerificacion = 'NO';
        this.enviarRespuestaVerificacion.emit(this.textoRespuestaVerificacion)
      }
      else if (this.texto_direccion == '') {
        this.errortexto_direccion = true;
        this.mensajeAlertaError('Error: falta el Informacíon en el parámetro texto_direccion')
        this.textoRespuestaVerificacion = 'NO';
        this.enviarRespuestaVerificacion.emit(this.textoRespuestaVerificacion)
      }
      else if (this.id_area == '') {
        this.errorid_area = true;
        this.mensajeAlertaError('Error: falta el Informacíon en el parámetro id_area')
        this.textoRespuestaVerificacion = 'NO';
        this.enviarRespuestaVerificacion.emit(this.textoRespuestaVerificacion)
      }
      else if (this.texto_area == '') {
        this.errortexto_area = true;
        this.mensajeAlertaError('Error: falta el Informacíon en el parámetro texto_area')
        this.textoRespuestaVerificacion = 'NO';
        this.enviarRespuestaVerificacion.emit(this.textoRespuestaVerificacion)
      }
      else if (this.numero_empleado == '') {
        this.errornumero_empleado = true;
        this.mensajeAlertaError('Error: falta el Informacíon en el parámetro numero_empleado')
        this.textoRespuestaVerificacion = 'NO';
        this.enviarRespuestaVerificacion.emit(this.textoRespuestaVerificacion)
      }
      else {
        this.textoRespuestaVerificacion = 'OK';
        this.enviarRespuestaVerificacion.emit(this.textoRespuestaVerificacion)
      }
    }
  }

  saveParams() {
    this.loading = true;
    const users_opdm: users_opdmTable = {
      id_usuarios_opdm: this.id_usuarios_opdm,
      id_estatususuarios_opdm: this.estatus,
      PaginaActual: this.PaginaActual,
      id_usuario: this.id_usuario,
      finalizado: this.finalizado,
      id_users_opdm: this.id_users_opdm,
      id_roll: this.id_roll,
      usuario: this.usuario,
      clave: this.clave,
      nombre: this.nombre,
      apepa: this.apepa,
      apema: this.apema,
      genero: this.genero,
      correo: this.correo,
      telefono: this.telefono,
      fec_ingreso: this.fec_ingreso,
      imp: this.imp,
      edit: this.edit,
      elim: this.elim,
      nuev: this.nuev,
      img: this.img,
      id_direccion: this.id_direccion,
      texto_direccion: this.texto_direccion,
      id_area: this.id_area,
      texto_area: this.texto_area,
      numero_empleado: this.numero_empleado,
      foto: "http://www.qr.opdmtlalnepantla.gob.mx:3001/catalogo_empleados_opdm/cat_empleador_opdm/foto/"+this.numero_empleado +".png",
      banderaCambioContrasenia : this.banderaCambioContrasenia,
      activo: 1
    }
    this._users_opdmServices.updateusers_opdm(users_opdm).subscribe({
      next: (v) => {
        this.toastr.success('Registro almacenado Correctamente', 'Correcto', { "positionClass": "toast-bottom-center" });
        this.textoRespuestaActualizacion = 'OK';
        this.enviarRespuestaActualizacion.emit(this.textoRespuestaActualizacion)
      },
      error: (event: HttpErrorResponse) => {
        this._errorService.msjError(event);
        this.loading = false;
        this.textoRespuestaActualizacion = 'OK';
        this.enviarRespuestaActualizacion.emit(this.textoRespuestaActualizacion)
      },
      complete: () => console.info('complete')
    })
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
      this._users_opdmServices.sendFileusers_opdm(body, tipo, this.id_usuarios_opdm).subscribe({
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
      case ' foto':
        this.fotoImagen = this._sanitizer.bypassSecurityTrustResourceUrl(ruta);
        this.foto = ruta;
        break;
    }
    return (ruta);
  }

  onToggleChange() {
    ;
    if (this.banderaCambioContrasenia == false) {
      this.banderaCambioContrasenia = true;
      this.respuestaCambioCOntrasenia = 'NO';
    }
    else if (this.banderaCambioContrasenia == true) {
      this.banderaCambioContrasenia = false;
      this.respuestaCambioCOntrasenia = 'SI';
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
//---------------------------------------------------------------------------->
//Modal
@Component({
  selector: 'actualizar-dialog',
  templateUrl: 'actualizar-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogContentExampleDialog { }
