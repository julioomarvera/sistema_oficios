import { Component, ViewChild,ChangeDetectionStrategy, inject, signal, Input, EventEmitter, Output} from '@angular/core'; 
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { oficiosTable } from '../../../../interfaces/gestion_oficios/oficios/oficios-table.interface';
import { oficiosService } from '../../../../service/gestion_oficios/oficios/oficios.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import Swal from 'sweetalert2'
import { Nuevooficios } from '../../../../interfaces/gestion_oficios/oficios/oficios-response.interface';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../../../service/error.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {CommonModule } from '@angular/common';
import { estatusgestion_oficiosTable }   from '../../../../interfaces/gestion_oficios/estatus/estatusgestion_oficios-table.interface';
import { estatusgestion_oficiosService } from '../../../../service/gestion_oficios/estatus/estatusgestion_oficios.service';
import { cat_oficioTable } from '../../../../interfaces/catalogo/cat_oficio/cat_oficio-table.interface';
import { cat_oficioService } from '../../../../service/catalogo/cat_oficio/cat_oficio.service';
import { cat_tipo_oficiosTable } from   '../../../../interfaces/catalogo/cat_tipo_oficios/cat_tipo_oficios-table.interface';
import { cat_tipo_oficiosService } from '../../../../service/catalogo/cat_tipo_oficios/cat_tipo_oficios.service';
import { cat_numero_oficiosTable } from   '../../../../interfaces/catalogo/cat_numero_oficios/cat_numero_oficios-table.interface';
import { cat_numero_oficiosService } from '../../../../service/catalogo/cat_numero_oficios/cat_numero_oficios.service';



@Component({
  selector: 'app-actualizar-oficios',
  standalone: true,
  imports: [MatCardModule,MatIconModule,MatFormFieldModule,
             MatInputModule,FormsModule, ReactiveFormsModule,
             MatSlideToggleModule, MatDialogModule, MatButtonModule,CommonModule 
  ],
  templateUrl: './actualizar.component.html',
  styleUrl: './actualizar.component.scss'
})

export default class ActualizarComponentoficios {
  id_gestion_oficios : number | any; 
  loading : boolean = false; 
  listoficios: oficiosTable[] = [];
  listestatusgestion_oficios : estatusgestion_oficiosTable[] = []; 
  id_estatusgestion_oficios :number | any;  
  descripcion   : string|any;  
  estatus       : string|any;  
  readonly dialog = inject(MatDialog);
  token         : string | any; 
  id_usuario    : string | any; 
  id_rol        : string | any; 
  imp           : string | any; 
  edit          : string | any; 
  elim          : string | any; 
  nuev          : string | any; 
  img           : string | any; 
  PaginaActual  : string | any; 
  finalizado    : string | any; 
  message       : string | any; 
  verificacion  : string | any = '';  

  //Recibir el primer parametro de verificacion

  @Input()
  set peticionVerificacion (value:string){
    value = value || '';
    if(value == 'verificar'){
      this.actualizar();
    }
  }

  //Enviar el primer parametro de verificacion

  @Output()
  enviarRespuestaVerificacion: EventEmitter<string> = new EventEmitter<string>();
  textoRespuestaVerificacion : string = '';

  @Input()
  set peticionActualizacion (value:string){
    value = value || '';
    if(value == 'actualizar'){
      this.saveParams();
    }
  }

  //Enviar el segundo parametro de Actualizacion

  @Output()
  enviarRespuestaActualizacion: EventEmitter<string> = new EventEmitter<string>();
  textoRespuestaActualizacion : string = '';

  id_oficios : number|any = '';
  resultadoid_oficios: boolean = false; 
  errorid_oficios: boolean = false; 

  oficio : string | any ='';
  resultadooficio: boolean = false; 
  erroroficio: boolean = false; 

  text_oficio : string|any = '';
  resultadotext_oficio: boolean = false; 
  errortext_oficio: boolean = false; 

  tipo_oficio : string | any ='';
  resultadotipo_oficio: boolean = false; 
  errortipo_oficio: boolean = false; 

  text_tipo : string|any = '';
  resultadotext_tipo: boolean = false; 
  errortext_tipo: boolean = false; 

  numero_oficio : string | any ='';
  resultadonumero_oficio: boolean = false; 
  errornumero_oficio: boolean = false; 

  fecha_hora : string|any = '';
  resultadofecha_hora: boolean = false; 
  errorfecha_hora: boolean = false; 

  caso_cop : string|any = '';
  resultadocaso_cop: boolean = false; 
  errorcaso_cop: boolean = false; 

  asunto : string|any = '';
  resultadoasunto: boolean = false; 
  errorasunto: boolean = false; 

  contenido : string|any = '';
  resultadocontenido: boolean = false; 
  errorcontenido: boolean = false; 

  archivo_oficio : string | any ='';
  archivo_oficioImagen  :  string | any ='';
  resultadoarchivo_oficio: boolean = false; 
  errorarchivo_oficio: boolean = false; 

  otro : string|any = '';
  resultadootro: boolean = false; 
  errorotro: boolean = false; 

  listcat_oficios:cat_oficioTable[] = [];
listcat_tipo_oficios:cat_tipo_oficiosTable[] = [];
listcat_numero_oficios:cat_numero_oficiosTable[] = [];

  listcat_oficiosFilter :cat_oficioTable[] = [];
listcat_tipo_oficiosFilter :cat_tipo_oficiosTable[] = [];
listcat_numero_oficiosFilter :cat_numero_oficiosTable[] = [];

  errorestatus: boolean = false; 
  private fileTmp:any; 
  constructor(private _oficiosServices: oficiosService,private router: Router,private toastr: ToastrService,private _errorService:ErrorService, private aRouter:ActivatedRoute ,private _cat_oficiosServices: cat_oficioService,private _cat_tipo_oficiosServices: cat_tipo_oficiosService,private _cat_numero_oficiosServices: cat_numero_oficiosService, private _sanitizer: DomSanitizer,private _estatusgestion_oficiosServices:  estatusgestion_oficiosService ) {
    this.id_gestion_oficios = aRouter.snapshot.paramMap.get('id_gestion_oficios');
    this.id_oficios         = aRouter.snapshot.paramMap.get('id_oficios');
    this.verificacion       = aRouter.snapshot.paramMap.get('verificacion');
    this.token              = localStorage.getItem('token');
    this.id_usuario         = localStorage.getItem('id_usuario');
    this.id_rol             = localStorage.getItem('id_rol');
    this.imp                = localStorage.getItem('imp');
    this.edit               = localStorage.getItem('edit');
    this.elim               = localStorage.getItem('elim');
    this.nuev               = localStorage.getItem('nuev');
    this.img                = localStorage.getItem('img');
    this.PaginaActual       = '/index/nuevooficios';
    this.finalizado         = 1;
    this.getInformacionById();
    this.getCatEstatusgestion_oficios();
    this.getInfoCat_cat_oficios();
    this.getInfoCat_cat_tipo_oficios();
    this.getInfoCat_cat_numero_oficios();
  }

  getInfoCat_cat_oficios(){
     this._cat_oficiosServices.getAllcat_oficio(this.id_usuario).subscribe(data => {
       this.listcat_oficios = data;
     })
  }
  getInfoCat_cat_tipo_oficios(){
     this._cat_tipo_oficiosServices.getAllcat_tipo_oficios(this.id_usuario).subscribe(data => {
       this.listcat_tipo_oficios = data;
     })
  }
  getInfoCat_cat_numero_oficios(){
     this._cat_numero_oficiosServices.getAllcat_numero_oficios(this.id_usuario).subscribe(data => {
       this.listcat_numero_oficios = data;
     })
  }
  openHelper() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);
      dialogRef.afterClosed().subscribe(result => {
         console.log(`Dialog result: ${result}`);
      });
  }
  getCatEstatusgestion_oficios(){
    this._estatusgestion_oficiosServices.getAllestatusgestion_oficios(this.id_usuario).subscribe((data) => { 
      this.listestatusgestion_oficios = data;  
    })
  }


  goInicio() {
    this.router.navigate(['/index/gestion_oficios']);
  }

  getInformacionById(){
    if(this.id_oficios != '' ){
      this._oficiosServices.getoficios(this.id_oficios,this.id_usuario).subscribe((data : oficiosTable) =>{
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

        this.archivo_oficioImagen = this._sanitizer.bypassSecurityTrustResourceUrl(this.archivo_oficio);
      })
    }
  }


  actualizar(){
    this.erroroficio = false; 
    this.errortext_oficio = false; 
    this.errortipo_oficio = false; 
    this.errortext_tipo = false; 
    this.errornumero_oficio = false; 
    this.errorfecha_hora = false; 
    this.errorcaso_cop = false; 
    this.errorasunto = false; 
    this.errorcontenido = false; 
    this.errorarchivo_oficio = false; 
    this.errorotro = false; 
    if(this.oficio == '') {
      this.erroroficio= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro oficio')
       this.textoRespuestaVerificacion ='NO';
       this.enviarRespuestaVerificacion.emit(this.textoRespuestaVerificacion)
    }
    else if(this.text_oficio == '') {
      this.errortext_oficio= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro text_oficio')
       this.textoRespuestaVerificacion ='NO';
       this.enviarRespuestaVerificacion.emit(this.textoRespuestaVerificacion)
    }
    else if(this.tipo_oficio == '') {
      this.errortipo_oficio= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro tipo_oficio')
       this.textoRespuestaVerificacion ='NO';
       this.enviarRespuestaVerificacion.emit(this.textoRespuestaVerificacion)
    }
    else if(this.text_tipo == '') {
      this.errortext_tipo= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro text_tipo')
       this.textoRespuestaVerificacion ='NO';
       this.enviarRespuestaVerificacion.emit(this.textoRespuestaVerificacion)
    }
    else if(this.numero_oficio == '') {
      this.errornumero_oficio= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro numero_oficio')
       this.textoRespuestaVerificacion ='NO';
       this.enviarRespuestaVerificacion.emit(this.textoRespuestaVerificacion)
    }
    else if(this.fecha_hora == '') {
      this.errorfecha_hora= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro fecha_hora')
       this.textoRespuestaVerificacion ='NO';
       this.enviarRespuestaVerificacion.emit(this.textoRespuestaVerificacion)
    }
    else if(this.caso_cop == '') {
      this.errorcaso_cop= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro caso_cop')
       this.textoRespuestaVerificacion ='NO';
       this.enviarRespuestaVerificacion.emit(this.textoRespuestaVerificacion)
    }
    else if(this.asunto == '') {
      this.errorasunto= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro asunto')
       this.textoRespuestaVerificacion ='NO';
       this.enviarRespuestaVerificacion.emit(this.textoRespuestaVerificacion)
    }
    else if(this.contenido == '') {
      this.errorcontenido= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro contenido')
       this.textoRespuestaVerificacion ='NO';
       this.enviarRespuestaVerificacion.emit(this.textoRespuestaVerificacion)
    }
    else if(this.archivo_oficio == '') {
      this.errorarchivo_oficio= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro archivo_oficio')
       this.textoRespuestaVerificacion ='NO';
       this.enviarRespuestaVerificacion.emit(this.textoRespuestaVerificacion)
    }
    else if(this.otro == '') {
      this.errorotro= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro otro')
       this.textoRespuestaVerificacion ='NO';
       this.enviarRespuestaVerificacion.emit(this.textoRespuestaVerificacion)
    }
    else if(this.estatus == '') {
      this.errorestatus = true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro Estatus')
       this.textoRespuestaVerificacion ='NO';
       this.enviarRespuestaVerificacion.emit(this.textoRespuestaVerificacion)
    }
    else { 
       this.textoRespuestaVerificacion ='OK';
       this.enviarRespuestaVerificacion.emit(this.textoRespuestaVerificacion)
    }
  }

  saveParams(){
    this.loading = true;
    const oficios  : oficiosTable={

      id_gestion_oficios : this.id_gestion_oficios,
      id_estatusgestion_oficios : this.estatus,  
      PaginaActual : this.PaginaActual,
      id_usuario   : this.id_usuario,
      finalizado   : this.finalizado,
      id_oficios: this.id_oficios,  
      oficio: this.oficio,  
      text_oficio: this.text_oficio,  
      tipo_oficio: this.tipo_oficio,  
      text_tipo: this.text_tipo,  
      numero_oficio: this.numero_oficio,  
      fecha_hora: this.fecha_hora,  
      caso_cop: this.caso_cop,  
      asunto: this.asunto,  
      contenido: this.contenido,  
      archivo_oficio: this.archivo_oficio,  
      otro: this.otro,  
      activo: 1
    }
    this._oficiosServices.updateoficios(oficios).subscribe({
      next: (v) => {
        this.toastr.success('Registro almacenado Correctamente', 'Correcto',  { "positionClass" : "toast-bottom-center"});
         this.textoRespuestaActualizacion ='OK';
         this.enviarRespuestaActualizacion.emit(this.textoRespuestaActualizacion)
      },
      error: (event: HttpErrorResponse) => {
        this._errorService.msjError(event);
        this.loading = false;
         this.textoRespuestaActualizacion ='OK';
         this.enviarRespuestaActualizacion.emit(this.textoRespuestaActualizacion)
      },
      complete: () => console.info('complete') 
    })
  }

  getFile($event:any,tipo : any):void{
    const [ file ] = $event.target.files;
    this.fileTmp = {
      fileRaw:file,
      fileName:file.name
    }

    if(file != null){
      this.sendFile(tipo);
    }
  }

  sendFile(tipo:any):void{
    const body = new FormData();
    body.append('myfile',this.fileTmp.fileRaw, this.fileTmp.fileName);
    if(body){
      this._oficiosServices.sendFileoficios(body,tipo, this.id_gestion_oficios).subscribe({
        next: (v) => {
          console.log(v);
          this.transform(v.url,tipo);
        },
        error: (event: HttpErrorResponse) => {
          this._errorService.msjError(event);
          this.loading = false;
        },
        complete: () => console.info('complete') 
      })
    }
  }
  transform(ruta: string, tipo:any): SafeHtml {
    switch(tipo){
      case 'archivo_oficio':
        this.archivo_oficioImagen =  this._sanitizer.bypassSecurityTrustResourceUrl(ruta);
        this.archivo_oficio = ruta;
      break;
    }
    return(ruta);
  }
  //Mensaje de Swal/--------------------------------------------------------->
  mensajeAlertaError(titulo:string){  
    Swal.fire({ 
      position: 'center',
      icon: 'error',
      title: titulo,
      showConfirmButton: false,
      timer: 2000
    });
  }

  mensajeAlertaSuccess(titulo:string){ 
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
