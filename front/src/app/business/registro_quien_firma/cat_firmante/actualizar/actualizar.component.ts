import { Component, ViewChild,ChangeDetectionStrategy, inject, signal, Input, EventEmitter, Output} from '@angular/core'; 
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { cat_firmanteTable } from '../../../../interfaces/registro_quien_firma/cat_firmante/cat_firmante-table.interface';
import { cat_firmanteService } from '../../../../service/registro_quien_firma/cat_firmante/cat_firmante.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import Swal from 'sweetalert2'
import { Nuevocat_firmante } from '../../../../interfaces/registro_quien_firma/cat_firmante/cat_firmante-response.interface';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../../../service/error.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {CommonModule } from '@angular/common';
import { estatusregistro_quien_firmaTable }   from '../../../../interfaces/registro_quien_firma/estatus/estatusregistro_quien_firma-table.interface';
import { estatusregistro_quien_firmaService } from '../../../../service/registro_quien_firma/estatus/estatusregistro_quien_firma.service';
import { cat_direccionesTable } from   '../../../../interfaces/catalogo/cat_direcciones/cat_direcciones-table.interface';
import { cat_direccionesService } from '../../../../service/catalogo/cat_direcciones/cat_direcciones.service';
import { cat_areasTable } from '../../../../interfaces/catalogo_areas/cat_areas/cat_areas-table.interface'; 
import { cat_areasService } from '../../../../service/catalogo_areas/cat_areas/cat_areas.service'; 
import { cat_empleadosTable } from '../../../../interfaces/catalogo_empleados/cat_empleados/cat_empleados-table.interface'; 
import { cat_empleadosService } from '../../../../service/catalogo_empleados/cat_empleados/cat_empleados.service'; 



@Component({
  selector: 'app-actualizar-cat_firmante',
  standalone: true,
  imports: [MatCardModule,MatIconModule,MatFormFieldModule,
             MatInputModule,FormsModule, ReactiveFormsModule,
             MatSlideToggleModule, MatDialogModule, MatButtonModule,CommonModule 
  ],
  templateUrl: './actualizar.component.html',
  styleUrl: './actualizar.component.scss'
})

export default class ActualizarComponentcat_firmante {
  id_registro_quien_firma : number | any; 
  loading : boolean = false; 
  listcat_firmante: cat_firmanteTable[] = [];
  listestatusregistro_quien_firma : estatusregistro_quien_firmaTable[] = []; 
  id_estatusregistro_quien_firma :number | any;  
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

  id_cat_firmante : number|any = '';
  resultadoid_cat_firmante: boolean = false; 
  errorid_cat_firmante: boolean = false; 

  id_direccion : string | any ='';
  resultadoid_direccion: boolean = false; 
  errorid_direccion: boolean = false; 

  text_direccion : string|any = '';
  resultadotext_direccion: boolean = false; 
  errortext_direccion: boolean = false; 

  id_area : string | any ='';
  resultadoid_area: boolean = false; 
  errorid_area: boolean = false; 

  area_texto : string|any = '';
  resultadoarea_texto: boolean = false; 
  errorarea_texto: boolean = false; 

  numero_empledo : string | any ='';
  resultadonumero_empledo: boolean = false; 
  errornumero_empledo: boolean = false; 

  text_nombre_empleado : string|any = '';
  resultadotext_nombre_empleado: boolean = false; 
  errortext_nombre_empleado: boolean = false; 

  foto : string|any = '';
  resultadofoto: boolean = false; 
  errorfoto: boolean = false; 

  id_oficio : string|any = '';
  resultadoid_oficio: boolean = false; 
  errorid_oficio: boolean = false; 

  otro : string|any = '';
  resultadootro: boolean = false; 
  errorotro: boolean = false; 

  listcat_direcciones:cat_direccionesTable[] = [];
listcat_areas:cat_areasTable[] = [];
listcat_empleados:cat_empleadosTable[] = [];

  listcat_direccionesFilter :cat_direccionesTable[] = [];
listcat_areasFilter :cat_areasTable[] = [];
listcat_empleadosFilter :cat_empleadosTable[] = [];
id_gestion_oficios:number=0;

  errorestatus: boolean = false; 
  private fileTmp:any; 
  constructor(private _cat_firmanteServices: cat_firmanteService,private router: Router,private toastr: ToastrService,private _errorService:ErrorService, private aRouter:ActivatedRoute ,private _cat_direccionesServices: cat_direccionesService,private _cat_areasServices: cat_areasService,private _cat_empleadosServices: cat_empleadosService, private _sanitizer: DomSanitizer,private _estatusregistro_quien_firmaServices:  estatusregistro_quien_firmaService ) {
    this.id_registro_quien_firma = aRouter.snapshot.paramMap.get('id_registro_quien_firma');
    this.id_cat_firmante         = aRouter.snapshot.paramMap.get('id_cat_firmante');
    this.verificacion       = aRouter.snapshot.paramMap.get('verificacion');
    this.token              = localStorage.getItem('token');
    this.id_usuario         = localStorage.getItem('id_usuario');
    this.id_rol             = localStorage.getItem('id_rol');
    this.imp                = localStorage.getItem('imp');
    this.edit               = localStorage.getItem('edit');
    this.elim               = localStorage.getItem('elim');
    this.nuev               = localStorage.getItem('nuev');
    this.img                = localStorage.getItem('img');
    this.PaginaActual       = '/index/nuevocat_firmante';
    this.finalizado         = 1;
    this.getInformacionById();
    this.getCatEstatusregistro_quien_firma();
    this.getInfoCat_cat_direcciones();
    this.getInfoCat_cat_areas();
    this.getInfoCat_cat_empleados();
  }

  getInfoCat_cat_direcciones(){
     this._cat_direccionesServices.getAllcat_direcciones(this.id_usuario).subscribe(data => {
       this.listcat_direcciones = data;
     })
  }
  getInfoCat_cat_areas(){
     this._cat_areasServices.getAllcat_areas(this.id_usuario).subscribe(data => {
       this.listcat_areas = data;
     })
  }
  getInfoCat_cat_empleados(){
     this._cat_empleadosServices.getAllcat_empleados(this.id_usuario).subscribe(data => {
       this.listcat_empleados = data;
     })
  }
  openHelper() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);
      dialogRef.afterClosed().subscribe(result => {
         console.log(`Dialog result: ${result}`);
      });
  }
  getCatEstatusregistro_quien_firma(){
    this._estatusregistro_quien_firmaServices.getAllestatusregistro_quien_firma(this.id_usuario).subscribe((data) => { 
      this.listestatusregistro_quien_firma = data;  
    })
  }


  goInicio() {
    this.router.navigate(['/index/registro_quien_firma']);
  }

  getInformacionById(){
    if(this.id_cat_firmante != '' ){
      this._cat_firmanteServices.getcat_firmante(this.id_cat_firmante,this.id_usuario).subscribe((data : cat_firmanteTable) =>{
      this.estatus = data.id_estatusregistro_quien_firma;  
        this.id_direccion = data.id_direccion;  
        this.text_direccion = data.text_direccion;  
        this.id_area = data.id_area;  
        this.area_texto = data.area_texto;  
        this.numero_empledo = data.numero_empledo;  
        this.text_nombre_empleado = data.text_nombre_empleado;  
        this.foto = data.foto;  
        this.id_oficio = data.id_oficio;  
        this.otro = data.otro;  

      })
    }
  }


  actualizar(){
    this.errorid_direccion = false; 
    this.errortext_direccion = false; 
    this.errorid_area = false; 
    this.errorarea_texto = false; 
    this.errornumero_empledo = false; 
    this.errortext_nombre_empleado = false; 
    this.errorfoto = false; 
    this.errorid_oficio = false; 
    this.errorotro = false; 
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
    else if(this.id_area == '') {
      this.errorid_area= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro id_area')
       this.textoRespuestaVerificacion ='NO';
       this.enviarRespuestaVerificacion.emit(this.textoRespuestaVerificacion)
    }
    else if(this.area_texto == '') {
      this.errorarea_texto= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro area_texto')
       this.textoRespuestaVerificacion ='NO';
       this.enviarRespuestaVerificacion.emit(this.textoRespuestaVerificacion)
    }
    else if(this.numero_empledo == '') {
      this.errornumero_empledo= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro numero_empledo')
       this.textoRespuestaVerificacion ='NO';
       this.enviarRespuestaVerificacion.emit(this.textoRespuestaVerificacion)
    }
    else if(this.text_nombre_empleado == '') {
      this.errortext_nombre_empleado= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro text_nombre_empleado')
       this.textoRespuestaVerificacion ='NO';
       this.enviarRespuestaVerificacion.emit(this.textoRespuestaVerificacion)
    }
    else if(this.foto == '') {
      this.errorfoto= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro foto')
       this.textoRespuestaVerificacion ='NO';
       this.enviarRespuestaVerificacion.emit(this.textoRespuestaVerificacion)
    }
    else if(this.id_oficio == '') {
      this.errorid_oficio= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro id_oficio')
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
    const cat_firmante  : cat_firmanteTable={
      id_registro_quien_firma : this.id_registro_quien_firma,
      id_estatusregistro_quien_firma : this.estatus,  
      id_gestion_oficios : this.id_gestion_oficios,
      PaginaActual : this.PaginaActual,
      id_usuario   : this.id_usuario,
      finalizado   : this.finalizado,
      id_cat_firmante: this.id_cat_firmante,  
      id_direccion: this.id_direccion,  
      text_direccion: this.text_direccion,  
      id_area: this.id_area,  
      area_texto: this.area_texto,  
      numero_empledo: this.numero_empledo,  
      text_nombre_empleado: this.text_nombre_empleado,  
      foto: this.foto,  
      id_oficio: this.id_oficio,  
      otro: this.otro,  
      activo: 1
    }
    this._cat_firmanteServices.updatecat_firmante(cat_firmante).subscribe({
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
      this._cat_firmanteServices.sendFilecat_firmante(body,tipo, this.id_registro_quien_firma).subscribe({
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
