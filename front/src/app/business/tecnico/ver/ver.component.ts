import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { gestion_oficiosService } from '../../../service/gestion_oficios/gestion_oficios.service';
import { cat_firmanteService } from '../../../service/registro_quien_firma/cat_firmante/cat_firmante.service';
import { cat_firmanteTable } from '../../../interfaces/registro_quien_firma/cat_firmante/cat_firmante-table.interface';
import { oficiosService } from '../../../service/gestion_oficios/oficios/oficios.service';
import { MatButtonModule } from '@angular/material/button';
import { DomSanitizer, SafeHtml, SafeUrl } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { tecnicoService } from '../../../service/seguimiento_tecnico/tecnico/tecnico.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../../service/error.service';
import { ToastrService } from 'ngx-toastr';
import { Nuevotecnico } from '../../../interfaces/seguimiento_tecnico/tecnico/tecnico-response.interface';
import Swal from 'sweetalert2'
import { asigacionService } from '../../../service/asignacion/asignacion_service';
import { MatCommonModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { ProgressBarMode, MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-ver',

  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatCommonModule, FormsModule, MatSliderModule, MatProgressBarModule, MatCardModule,CommonModule],
  templateUrl: './ver.component.html',
  styleUrl: './ver.component.scss',
  standalone: true,
})
export default class VerComponent {

  numero_empleado: string | any = "";
  token: string | any;
  id_usuario: string | any;
  id_rol: string | any;
  imp: string | any;
  edit: string | any;
  elim: string | any;
  nuev: string | any;
  img: string | any;
  id_gestion_oficios: number | any;
  list_cat_firmante: cat_firmanteTable | any;

  // datos del firmante

  id_direccion: number | any;
  text_direccion: string | any;
  id_area: number | any;
  area_texto: string | any;
  text_nombre_empleado: string | any;
  foto_firmante: string | any;


  //Datos del oficio

  archivo_oficio: string | any = '';
  asunto: string | any = '';
  contenido: string | any = '';

  loading: boolean = false;
  readonly dialog = inject(MatDialog);

  id_gestion_oficio: number = 0;
  resultadoid_gestion_oficio: boolean = false;
  errorid_gestion_oficio: boolean = false;

  id_oficio: string | any = "";
  resultadoid_oficio: boolean = false;
  errorid_oficio: boolean = false;

  numero_oficio: string | any = '';
  resultadonumero_oficio: boolean = false;
  errornumero_oficio: boolean = false;

  id_direcion_firmante: number = 0;
  resultadoid_direcion_firmante: boolean = false;
  errorid_direcion_firmante: boolean = false;

  text_direccion_firmante: string | any = '';
  resultadotext_direccion_firmante: boolean = false;
  errortext_direccion_firmante: boolean = false;

  id_area_firmante: number = 0;
  resultadoid_area_firmante: boolean = false;
  errorid_area_firmante: boolean = false;

  text_area_firmante: string | any = '';
  resultadotext_area_firmante: boolean = false;
  errortext_area_firmante: boolean = false;

  numero_empleado_firmante: string | any = '';
  resultadonumero_empleado_firmante: boolean = false;
  errornumero_empleado_firmante: boolean = false;

  id_direccion_asignacion: number = 0;
  resultadoid_direccion_asignacion: boolean = false;
  errorid_direccion_asignacion: boolean = false;

  text_direccion_asignacion: string | any = '';
  resultadotext_direccion_asignacion: boolean = false;
  errortext_direccion_asignacion: boolean = false;

  id_area_asignacion: number = 0;
  resultadoid_area_asignacion: boolean = false;
  errorid_area_asignacion: boolean = false;

  text_area_asignacion: string | any = '';
  resultadotext_area_asignacion: boolean = false;
  errortext_area_asignacion: boolean = false;

  numero_empleado_asignacion: string | any = '';
  resultadonumero_empleado_asignacion: boolean = false;
  errornumero_empleado_asignacion: boolean = false;

  fecha_asignacion: string | any = '';
  resultadofecha_asignacion: boolean = false;
  errorfecha_asignacion: boolean = false;

  estatus_seguimiento: string | any = '';
  resultadoestatus_seguimiento: boolean = false;
  errorestatus_seguimiento: boolean = false;

  observaciones: string | any = '';
  resultadoobservaciones: boolean = false;
  errorobservaciones: boolean = false;

  resultadoporcentaje_seguimiento: boolean = false;
  errorporcentaje_seguimiento: boolean = false;

  fecha_contestacion: Date = new Date();
  resultadofecha_contestacion: boolean = false;
  errorfecha_contestacion: boolean = false;

  evidencia: string | any = '';
  evidenciaImagen: string | any = '';
  resultadoevidencia: boolean = false;
  errorevidencia: boolean = false;

  documento_oficio: string | any = '';
  resultadodocumento_oficio: boolean = false;
  errordocumento_oficio: boolean = false;

  text_nombre_empleado_quien_asignacion: string | any = '';
  foto_quien_asigno: string | any = '';
  instrucciones: string | any = "";


  porcentaje_seguimiento: number = 0;

  value: number = 40;        // Porcentaje de progreso
  bufferValue: number = 60;  // Porcentaje de buffer


  escuchando: boolean = false;
  recognition: any;

  id_asignacion :string | any = "";
  numero_empleado_tecnico: string |any; 

  usuario:string | any = "";
  foto:string | any = "";


  private fileTmp: any;
  constructor(private aRouter: ActivatedRoute, private gestion_oficiosService: gestion_oficiosService,
    private cat_firmanteService: cat_firmanteService,
    private oficiosService: oficiosService,
    private _sanitizer: DomSanitizer,
    private router: Router,
    private tecnico_Service: tecnicoService,
    private _errorService: ErrorService,
    private toastr: ToastrService,
    private asigacionService: asigacionService,
    private cdr: ChangeDetectorRef
  ) {
    this.id_oficio = aRouter.snapshot.paramMap.get('id_oficios');
    this.numero_empleado = aRouter.snapshot.paramMap.get('numero_empleado');
    this.id_asignacion = aRouter.snapshot.paramMap.get('id_asignacion');
    this.token = localStorage.getItem('token');
    this.id_usuario = localStorage.getItem('id_usuario');
    this.id_rol = localStorage.getItem('id_rol');
    this.imp = localStorage.getItem('imp');
    this.edit = localStorage.getItem('edit');
    this.elim = localStorage.getItem('elim');
    this.nuev = localStorage.getItem('nuev');
    this.img = localStorage.getItem('img');
    this.usuario = localStorage.getItem('usuario');
    this.foto = localStorage.getItem('foto');
    this.numero_empleado_tecnico = localStorage.getItem('numero_empleado');


    if (this.id_oficio != "") {
      this.getId_gestion_oficio(this.id_oficio);
      this.getInformacionOficio(this.id_oficio);

    }


  }

  getId_gestion_oficio(id_oficios: number) {
    if (id_oficios != null) {
      this.gestion_oficiosService.getId_gestion_oficios(id_oficios).subscribe(data => {
        let response = typeof data === 'string' ? JSON.parse(data) : data;
        this.id_gestion_oficio = response.id_gestion_oficios;
        if (this.id_gestion_oficio != null) {
          this.getinformacionFirmante(this.id_gestion_oficio);
          this.getInformacionAsignacion(this.id_gestion_oficio, this.numero_empleado)
          this.getInstrucciones(this.id_gestion_oficio);
        }
      })
    }
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

    })
  }

  getInformacionOficio(id_oficios: any) {
    this.oficiosService.getOficio_by_id_oficio(id_oficios).subscribe(data => {
      this.numero_oficio = data.numero_oficio;
      this.archivo_oficio = data.archivo_oficio;
      this.asunto = data.asunto;
      this.contenido = data.contenido;
      this.documento_oficio = this.archivo_oficio;
      this.fecha_asignacion = data.fecha_hora;
      this.archivo_oficio = this._sanitizer.bypassSecurityTrustResourceUrl(this.archivo_oficio);

    })
  }

  getInformacionAsignacion(id_gestion_oficio: number, numero_empleado: number) {
    this.asigacionService.getInfo_quien_solicito(id_gestion_oficio, numero_empleado,this.id_rol).subscribe(data => {
      this.id_direccion_asignacion = data.id_direccion;
      this.id_area_asignacion = data.id_area;
      this.numero_empleado_asignacion = data.numero_empleado;
      this.text_direccion_asignacion = data.texto_direccion;
      this.text_area_asignacion = data.texto_area;
      this.text_nombre_empleado_quien_asignacion = data.nombre + " " + data.apepa + " " + data.apema;
      this.foto_quien_asigno = data.foto;
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

  goInicio() {
    this.router.navigate(['/index/tecnico']);
  }

  openHelper() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
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
    const name = this.id_oficio + "-" + this.numero_empleado;
    const body = new FormData();
    body.append('myfile', this.fileTmp.fileRaw, this.fileTmp.fileName);
    if (body) {
      this.tecnico_Service.sendFiletecnico(body, tipo, name).subscribe({
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
      case 'evidencia':
        this.evidenciaImagen = this._sanitizer.bypassSecurityTrustResourceUrl(ruta);
        this.evidencia = ruta;
        break;
    }
    return (ruta);
  }



  save() {
    this.errorid_gestion_oficio = false;
    this.errorid_oficio = false;
    this.errornumero_oficio = false;
    this.errorid_direcion_firmante = false;
    this.errortext_direccion_firmante = false;
    this.errorid_area_firmante = false;
    this.errortext_area_firmante = false;
    this.errornumero_empleado_firmante = false;
    this.errorid_direccion_asignacion = false;
    this.errortext_direccion_asignacion = false;
    this.errorid_area_asignacion = false;
    this.errortext_area_asignacion = false;
    this.errornumero_empleado_asignacion = false;
    this.errorfecha_asignacion = false;
    this.errorestatus_seguimiento = false;
    this.errorobservaciones = false;
    this.errorporcentaje_seguimiento = false;
    this.errorfecha_contestacion = false;
    this.errorevidencia = false;
    this.errordocumento_oficio = false;
    if (this.id_gestion_oficio == 0) {
      this.errorid_gestion_oficio = true;
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro id_gestion_oficio')
    }
    else if (this.id_oficio == 0) {
      this.errorid_oficio = true;
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro id_oficio')
    }
    else if (this.numero_oficio == '') {
      this.errornumero_oficio = true;
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro numero_oficio')
    }
    else if (this.id_direcion_firmante == 0) {
      this.errorid_direcion_firmante = true;
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro id_direcion_firmante')
    }
    else if (this.text_direccion_firmante == '') {
      this.errortext_direccion_firmante = true;
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro text_direccion_firmante')
    }
    else if (this.id_area_firmante == 0) {
      this.errorid_area_firmante = true;
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro id_area_firmante')
    }
    else if (this.text_area_firmante == '') {
      this.errortext_area_firmante = true;
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro text_area_firmante')
    }
    else if (this.numero_empleado_firmante == '') {
      this.errornumero_empleado_firmante = true;
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro numero_empleado_firmante')
    }
    else if (this.id_direccion_asignacion == 0) {
      this.errorid_direccion_asignacion = true;
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro id_direccion_asignacion')
    }
    else if (this.text_direccion_asignacion == '') {
      this.errortext_direccion_asignacion = true;
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro text_direccion_asignacion')
    }
    else if (this.id_area_asignacion == 0) {
      this.errorid_area_asignacion = true;
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro id_area_asignacion')
    }
    else if (this.text_area_asignacion == '') {
      this.errortext_area_asignacion = true;
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro text_area_asignacion')
    }
    else if (this.numero_empleado_asignacion == '') {
      this.errornumero_empleado_asignacion = true;
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro numero_empleado_asignacion')
    }
    else if (this.fecha_asignacion == '') {
      this.errorfecha_asignacion = true;
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro fecha_asignacion')
    }
    else if (this.estatus_seguimiento == '') {
      this.errorestatus_seguimiento = true;
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro estatus_seguimiento')
    }
    else if (this.observaciones == '') {
      this.errorobservaciones = true;
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro observaciones')
    }
    else if (this.porcentaje_seguimiento == 0) {
      this.errorporcentaje_seguimiento = true;
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro porcentaje_seguimiento')
    }
    // else if (this.fecha_contestacion == '') {
    //   this.errorfecha_contestacion = true;
    //   this.mensajeAlertaError('Error: falta el Informacíon en el parámetro fecha_contestacion')
    // }
    // else if (this.evidencia == '') {
    //   this.errorevidencia = true;
    //   this.mensajeAlertaError('Error: falta el Informacíon en el parámetro evidencia')
    // }
    else if (this.documento_oficio == '') {
      this.errordocumento_oficio = true;
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro documento_oficio')
    }
    else {
      this.saveParams();
    }
  }

  saveParams() {
    this.loading = true;
    const tecnico: Nuevotecnico = {
      id_asignacion : this.id_asignacion,
      id_usuario: this.id_usuario,
      id_estatusseguimiento_tecnico: 1,
      finalizado: 1,
      id_gestion_oficio: this.id_gestion_oficio,
      id_oficio: this.id_oficio,
      numero_oficio: this.numero_oficio,
      id_direcion_firmante: this.id_direcion_firmante,
      text_direccion_firmante: this.text_direccion_firmante,
      id_area_firmante: this.id_area_firmante,
      text_area_firmante: this.text_area_firmante,
      numero_empleado_firmante: this.numero_empleado_firmante,
      id_direccion_asignacion: this.id_direccion_asignacion,
      text_direccion_asignacion: this.text_direccion_asignacion,
      id_area_asignacion: this.id_area_asignacion,
      text_area_asignacion: this.text_area_asignacion,
      numero_empleado_asignacion: this.numero_empleado_asignacion,
      fecha_asignacion: this.fecha_asignacion,
      estatus_seguimiento: this.estatus_seguimiento,
      observaciones: this.observaciones,
      porcentaje_seguimiento: this.porcentaje_seguimiento,
      fecha_contestacion: this.fecha_contestacion,
      evidencia: this.evidencia,
      documento_oficio: this.documento_oficio,
      activo: 1,
      numero_empleado_tecnico: this.numero_empleado_tecnico,
      nombre_tecnico: this.usuario, 
      foto_tecnico: this.foto,
    }
    this.tecnico_Service.newtecnico(tecnico).subscribe({
      next: (v) => {
        this.toastr.success('Registro almacenado Correctamente', 'Correcto', { "positionClass": "toast-bottom-center" });
        this.router.navigate(['/index/tecnico']);
      },
      error: (event: HttpErrorResponse) => {
        this._errorService.msjError(event);
        this.loading = false;
      },
      complete: () => console.info('complete')
    })
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

  toggleDictado(): void {
    if (this.escuchando) {
      this.detenerDictado();
    } else {
      this.iniciarDictado();
    }
  }


iniciarDictado(): void {
  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  this.recognition = new SpeechRecognition();

  this.recognition.lang = 'es-MX';
  this.recognition.interimResults = true;
  this.recognition.continuous = true;

  let finalTranscript = this.observaciones || ''; // 👈 Mantiene lo anterior

  this.recognition.onresult = (event: any) => {
    let interimTranscript = '';

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      const transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        finalTranscript += transcript + ' ';
      } else {
        interimTranscript += transcript;
      }
    }

    this.observaciones = finalTranscript + interimTranscript;
    this.cdr.detectChanges();
  };

  this.recognition.onerror = (event: any) => {
    console.error('Error de dictado:', event.error);
    this.detenerDictado();
  };

  this.recognition.onend = () => {
    this.escuchando = false;
    this.cdr.detectChanges();
  };

  this.recognition.start();
  this.escuchando = true;
}

  detenerDictado(): void {
    if (this.recognition) {
      this.recognition.stop();
    }
    this.escuchando = false;
  }
}




//---------------------------------------------------------------------------->
//Modal
@Component({
  selector: 'nuevo-dialog',
  templateUrl: 'nuevo-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogContentExampleDialog { }

