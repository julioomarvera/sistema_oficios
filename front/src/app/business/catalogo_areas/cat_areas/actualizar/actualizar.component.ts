import { Component, ViewChild,ChangeDetectionStrategy, inject, signal, Input, EventEmitter, Output} from '@angular/core'; 
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { cat_areasTable } from '../../../../interfaces/catalogo_areas/cat_areas/cat_areas-table.interface';
import { cat_areasService } from '../../../../service/catalogo_areas/cat_areas/cat_areas.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import Swal from 'sweetalert2'
import { Nuevocat_areas } from '../../../../interfaces/catalogo_areas/cat_areas/cat_areas-response.interface';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../../../service/error.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {CommonModule } from '@angular/common';
import { estatuscatalogo_areasTable }   from '../../../../interfaces/catalogo_areas/estatus/estatuscatalogo_areas-table.interface';
import { estatuscatalogo_areasService } from '../../../../service/catalogo_areas/estatus/estatuscatalogo_areas.service';
import { cat_direccionesTable } from   '../../../../interfaces/catalogo/cat_direcciones/cat_direcciones-table.interface';
import { cat_direccionesService } from '../../../../service/catalogo/cat_direcciones/cat_direcciones.service';



@Component({
  selector: 'app-actualizar-cat_areas',
  standalone: true,
  imports: [MatCardModule,MatIconModule,MatFormFieldModule,
             MatInputModule,FormsModule, ReactiveFormsModule,
             MatSlideToggleModule, MatDialogModule, MatButtonModule,CommonModule 
  ],
  templateUrl: './actualizar.component.html',
  styleUrl: './actualizar.component.scss'
})

export default class ActualizarComponentcat_areas {
  id_catalogo_areas : number | any; 
  loading : boolean = false; 
  listcat_areas: cat_areasTable[] = [];
  listestatuscatalogo_areas : estatuscatalogo_areasTable[] = []; 
  id_estatuscatalogo_areas :number | any;  
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

  id_cat_areas : number|any = '';
  resultadoid_cat_areas: boolean = false; 
  errorid_cat_areas: boolean = false; 

  id_direccion : string | any ='';
  resultadoid_direccion: boolean = false; 
  errorid_direccion: boolean = false; 

  text_direccion : string|any = '';
  resultadotext_direccion: boolean = false; 
  errortext_direccion: boolean = false; 

  resultadodescripcion: boolean = false; 
  errordescripcion: boolean = false; 

  listcat_direcciones:cat_direccionesTable[] = [];

  listcat_direccionesFilter :cat_direccionesTable[] = [];

  errorestatus: boolean = false; 
  private fileTmp:any; 
  constructor(private _cat_areasServices: cat_areasService,private router: Router,private toastr: ToastrService,private _errorService:ErrorService, private aRouter:ActivatedRoute ,private _cat_direccionesServices: cat_direccionesService, private _sanitizer: DomSanitizer,private _estatuscatalogo_areasServices:  estatuscatalogo_areasService ) {
    this.id_catalogo_areas = aRouter.snapshot.paramMap.get('id_catalogo_areas');
    this.id_cat_areas         = aRouter.snapshot.paramMap.get('id_cat_areas');
    this.verificacion       = aRouter.snapshot.paramMap.get('verificacion');
    this.token              = localStorage.getItem('token');
    this.id_usuario         = localStorage.getItem('id_usuario');
    this.id_rol             = localStorage.getItem('id_rol');
    this.imp                = localStorage.getItem('imp');
    this.edit               = localStorage.getItem('edit');
    this.elim               = localStorage.getItem('elim');
    this.nuev               = localStorage.getItem('nuev');
    this.img                = localStorage.getItem('img');
    this.PaginaActual       = '/index/nuevocat_areas';
    this.finalizado         = 1;
    this.getInformacionById();
    this.getCatEstatuscatalogo_areas();
    this.getInfoCat_cat_direcciones();
  }

  getInfoCat_cat_direcciones(){
     this._cat_direccionesServices.getAllcat_direcciones(this.id_usuario).subscribe(data => {
       this.listcat_direcciones = data;
     })
  }
  openHelper() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);
      dialogRef.afterClosed().subscribe(result => {
         console.log(`Dialog result: ${result}`);
      });
  }
  getCatEstatuscatalogo_areas(){
    this._estatuscatalogo_areasServices.getAllestatuscatalogo_areas(this.id_usuario).subscribe((data) => { 
      this.listestatuscatalogo_areas = data;  
    })
  }


  goInicio() {
    this.router.navigate(['/index/catalogo_areas']);
  }

  getInformacionById(){
    if(this.id_cat_areas != '' ){
      this._cat_areasServices.getcat_areas(this.id_cat_areas,this.id_usuario).subscribe((data : cat_areasTable) =>{
      this.estatus = data.id_estatuscatalogo_areas;  
        this.id_direccion = data.id_direccion;  
        this.text_direccion = data.text_direccion;  
        this.descripcion = data.descripcion;  

      })
    }
  }


  actualizar(){
    this.errorid_direccion = false; 
    this.errortext_direccion = false; 
    this.errordescripcion = false; 
    if(this.id_direccion == '') {
      this.errorid_direccion= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro id_direccion')
       this.textoRespuestaVerificacion ='NO';
       this.enviarRespuestaVerificacion.emit(this.textoRespuestaVerificacion)
    }
    else if(this.text_direccion == '') {
      this.errortext_direccion= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro text_direccion')
       this.textoRespuestaVerificacion ='NO';
       this.enviarRespuestaVerificacion.emit(this.textoRespuestaVerificacion)
    }
    else if(this.descripcion == '') {
      this.errordescripcion= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro descripcion')
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
    const cat_areas  : cat_areasTable={
      id_catalogo_areas : this.id_catalogo_areas,
      id_estatuscatalogo_areas : this.estatus,  
      PaginaActual : this.PaginaActual,
      id_usuario   : this.id_usuario,
      finalizado   : this.finalizado,
      id_cat_areas: this.id_cat_areas,  
      id_direccion: this.id_direccion,  
      text_direccion: this.text_direccion,  
      descripcion: this.descripcion,  
      activo: 1
    }
    this._cat_areasServices.updatecat_areas(cat_areas).subscribe({
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
      this._cat_areasServices.sendFilecat_areas(body,tipo, this.id_catalogo_areas).subscribe({
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
