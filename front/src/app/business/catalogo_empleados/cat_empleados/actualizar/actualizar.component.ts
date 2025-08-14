import { Component, ViewChild,ChangeDetectionStrategy, inject, signal, Input, EventEmitter, Output} from '@angular/core'; 
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { cat_empleadosTable } from '../../../../interfaces/catalogo_empleados/cat_empleados/cat_empleados-table.interface';
import { cat_empleadosService } from '../../../../service/catalogo_empleados/cat_empleados/cat_empleados.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import Swal from 'sweetalert2'
import { Nuevocat_empleados } from '../../../../interfaces/catalogo_empleados/cat_empleados/cat_empleados-response.interface';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../../../service/error.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {CommonModule } from '@angular/common';
import { estatuscatalogo_empleadosTable }   from '../../../../interfaces/catalogo_empleados/estatus/estatuscatalogo_empleados-table.interface';
import { estatuscatalogo_empleadosService } from '../../../../service/catalogo_empleados/estatus/estatuscatalogo_empleados.service';
import { cat_direccionesTable } from   '../../../../interfaces/catalogo/cat_direcciones/cat_direcciones-table.interface';
import { cat_direccionesService } from '../../../../service/catalogo/cat_direcciones/cat_direcciones.service';
import { cat_areasTable } from '../../../../interfaces/catalogo_areas/cat_areas/cat_areas-table.interface';
import { cat_areasService } from '../../../../service/catalogo_areas/cat_areas/cat_areas.service';



@Component({
  selector: 'app-actualizar-cat_empleados',
  standalone: true,
  imports: [MatCardModule,MatIconModule,MatFormFieldModule,
             MatInputModule,FormsModule, ReactiveFormsModule,
             MatSlideToggleModule, MatDialogModule, MatButtonModule,CommonModule 
  ],
  templateUrl: './actualizar.component.html',
  styleUrl: './actualizar.component.scss'
})

export default class ActualizarComponentcat_empleados {
  id_catalogo_empleados : number | any; 
  loading : boolean = false; 
  listcat_empleados: cat_empleadosTable[] = [];
  listestatuscatalogo_empleados : estatuscatalogo_empleadosTable[] = []; 
  id_estatuscatalogo_empleados :number | any;  
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

  id_cat_empleados : number|any = '';
  resultadoid_cat_empleados: boolean = false; 
  errorid_cat_empleados: boolean = false; 

  resultadoid_usuario: boolean = false; 
  errorid_usuario: boolean = false; 

  nombre_completo : string|any = '';
  resultadonombre_completo: boolean = false; 
  errornombre_completo: boolean = false; 

  numero_empleado : number|any = '';
  resultadonumero_empleado: boolean = false; 
  errornumero_empleado: boolean = false; 

  cargo : string|any = '';
  resultadocargo: boolean = false; 
  errorcargo: boolean = false; 

  direccion : string | any ='';
  resultadodireccion: boolean = false; 
  errordireccion: boolean = false; 

  direccion_texto : string|any = '';
  resultadodireccion_texto: boolean = false; 
  errordireccion_texto: boolean = false; 

  subdireccion : string|any = '';
  resultadosubdireccion: boolean = false; 
  errorsubdireccion: boolean = false; 

  area : string | any ='';
  resultadoarea: boolean = false; 
  errorarea: boolean = false; 

  area_texto : string|any = '';
  resultadoarea_texto: boolean = false; 
  errorarea_texto: boolean = false; 

  nombreJefe : string|any = '';
  resultadonombreJefe: boolean = false; 
  errornombreJefe: boolean = false; 

  cargoJefe : string|any = '';
  resultadocargoJefe: boolean = false; 
  errorcargoJefe: boolean = false; 

  correo_institucional : string|any = '';
  resultadocorreo_institucional: boolean = false; 
  errorcorreo_institucional: boolean = false; 

  telefono_opdm : string|any = '';
  resultadotelefono_opdm: boolean = false; 
  errortelefono_opdm: boolean = false; 

  url : string|any = '';
  resultadourl: boolean = false; 
  errorurl: boolean = false; 

  codigo_qr : string|any = '';
  resultadocodigo_qr: boolean = false; 
  errorcodigo_qr: boolean = false; 

  foto : string|any = '';
  resultadofoto: boolean = false; 
  errorfoto: boolean = false; 

  listcat_direcciones:cat_direccionesTable[] = [];
listcat_areas:cat_areasTable[] = [];

  listcat_direccionesFilter :cat_direccionesTable[] = [];
listcat_areasFilter :cat_areasTable[] = [];

  errorestatus: boolean = false; 
  private fileTmp:any; 
  constructor(private _cat_empleadosServices: cat_empleadosService,private router: Router,private toastr: ToastrService,private _errorService:ErrorService, private aRouter:ActivatedRoute ,private _cat_direccionesServices: cat_direccionesService,private _cat_areasServices: cat_areasService, private _sanitizer: DomSanitizer,private _estatuscatalogo_empleadosServices:  estatuscatalogo_empleadosService ) {
    this.id_catalogo_empleados = aRouter.snapshot.paramMap.get('id_catalogo_empleados');
    this.id_cat_empleados         = aRouter.snapshot.paramMap.get('id_cat_empleados');
    this.verificacion       = aRouter.snapshot.paramMap.get('verificacion');
    this.token              = localStorage.getItem('token');
    this.id_usuario         = localStorage.getItem('id_usuario');
    this.id_rol             = localStorage.getItem('id_rol');
    this.imp                = localStorage.getItem('imp');
    this.edit               = localStorage.getItem('edit');
    this.elim               = localStorage.getItem('elim');
    this.nuev               = localStorage.getItem('nuev');
    this.img                = localStorage.getItem('img');
    this.PaginaActual       = '/index/nuevocat_empleados';
    this.finalizado         = 1;
    this.getInformacionById();
    this.getCatEstatuscatalogo_empleados();
    this.getInfoCat_cat_direcciones();
    this.getInfoCat_cat_areas();
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
  openHelper() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);
      dialogRef.afterClosed().subscribe(result => {
         console.log(`Dialog result: ${result}`);
      });
  }
  getCatEstatuscatalogo_empleados(){
    this._estatuscatalogo_empleadosServices.getAllestatuscatalogo_empleados(this.id_usuario).subscribe((data) => { 
      this.listestatuscatalogo_empleados = data;  
    })
  }


  goInicio() {
    this.router.navigate(['/index/catalogo_empleados']);
  }

  getInformacionById(){
    if(this.id_cat_empleados != '' ){
      this._cat_empleadosServices.getcat_empleados(this.id_cat_empleados,this.id_usuario).subscribe((data : cat_empleadosTable) =>{
      this.estatus = data.id_estatuscatalogo_empleados;  
        this.id_usuario = data.id_usuario;  
        this.nombre_completo = data.nombre_completo;  
        this.numero_empleado = data.numero_empleado;  
        this.cargo = data.cargo;  
        this.direccion = data.direccion;  
        this.direccion_texto = data.direccion_texto;  
        this.subdireccion = data.subdireccion;  
        this.area = data.area;  
        this.area_texto = data.area_texto;  
        this.nombreJefe = data.nombreJefe;  
        this.cargoJefe = data.cargoJefe;  
        this.correo_institucional = data.correo_institucional;  
        this.telefono_opdm = data.telefono_opdm;  
        this.url = data.url;  
        this.codigo_qr = data.codigo_qr;  
        this.foto = data.foto;  

      })
    }
  }


  actualizar(){
    this.errorid_usuario = false; 
    this.errornombre_completo = false; 
    this.errornumero_empleado = false; 
    this.errorcargo = false; 
    this.errordireccion = false; 
    this.errordireccion_texto = false; 
    this.errorsubdireccion = false; 
    this.errorarea = false; 
    this.errorarea_texto = false; 
    this.errornombreJefe = false; 
    this.errorcargoJefe = false; 
    this.errorcorreo_institucional = false; 
    this.errortelefono_opdm = false; 
    this.errorurl = false; 
    this.errorcodigo_qr = false; 
    this.errorfoto = false; 
    if(this.id_usuario == '') {
      this.errorid_usuario= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro id_usuario')
       this.textoRespuestaVerificacion ='NO';
       this.enviarRespuestaVerificacion.emit(this.textoRespuestaVerificacion)
    }
    else if(this.nombre_completo == '') {
      this.errornombre_completo= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro nombre_completo')
       this.textoRespuestaVerificacion ='NO';
       this.enviarRespuestaVerificacion.emit(this.textoRespuestaVerificacion)
    }
    else if(this.numero_empleado == '') {
      this.errornumero_empleado= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro numero_empleado')
       this.textoRespuestaVerificacion ='NO';
       this.enviarRespuestaVerificacion.emit(this.textoRespuestaVerificacion)
    }
    else if(this.cargo == '') {
      this.errorcargo= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro cargo')
       this.textoRespuestaVerificacion ='NO';
       this.enviarRespuestaVerificacion.emit(this.textoRespuestaVerificacion)
    }
    else if(this.direccion == '') {
      this.errordireccion= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro direccion')
       this.textoRespuestaVerificacion ='NO';
       this.enviarRespuestaVerificacion.emit(this.textoRespuestaVerificacion)
    }
    else if(this.direccion_texto == '') {
      this.errordireccion_texto= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro direccion_texto')
       this.textoRespuestaVerificacion ='NO';
       this.enviarRespuestaVerificacion.emit(this.textoRespuestaVerificacion)
    }
    else if(this.subdireccion == '') {
      this.errorsubdireccion= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro subdireccion')
       this.textoRespuestaVerificacion ='NO';
       this.enviarRespuestaVerificacion.emit(this.textoRespuestaVerificacion)
    }
    else if(this.area == '') {
      this.errorarea= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro area')
       this.textoRespuestaVerificacion ='NO';
       this.enviarRespuestaVerificacion.emit(this.textoRespuestaVerificacion)
    }
    else if(this.area_texto == '') {
      this.errorarea_texto= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro area_texto')
       this.textoRespuestaVerificacion ='NO';
       this.enviarRespuestaVerificacion.emit(this.textoRespuestaVerificacion)
    }
    else if(this.nombreJefe == '') {
      this.errornombreJefe= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro nombreJefe')
       this.textoRespuestaVerificacion ='NO';
       this.enviarRespuestaVerificacion.emit(this.textoRespuestaVerificacion)
    }
    else if(this.cargoJefe == '') {
      this.errorcargoJefe= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro cargoJefe')
       this.textoRespuestaVerificacion ='NO';
       this.enviarRespuestaVerificacion.emit(this.textoRespuestaVerificacion)
    }
    else if(this.correo_institucional == '') {
      this.errorcorreo_institucional= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro correo_institucional')
       this.textoRespuestaVerificacion ='NO';
       this.enviarRespuestaVerificacion.emit(this.textoRespuestaVerificacion)
    }
    else if(this.telefono_opdm == '') {
      this.errortelefono_opdm= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro telefono_opdm')
       this.textoRespuestaVerificacion ='NO';
       this.enviarRespuestaVerificacion.emit(this.textoRespuestaVerificacion)
    }
    else if(this.url == '') {
      this.errorurl= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro url')
       this.textoRespuestaVerificacion ='NO';
       this.enviarRespuestaVerificacion.emit(this.textoRespuestaVerificacion)
    }
    else if(this.codigo_qr == '') {
      this.errorcodigo_qr= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro codigo_qr')
       this.textoRespuestaVerificacion ='NO';
       this.enviarRespuestaVerificacion.emit(this.textoRespuestaVerificacion)
    }
    else if(this.foto == '') {
      this.errorfoto= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro foto')
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
    const cat_empleados  : cat_empleadosTable={
      id_catalogo_empleados : this.id_catalogo_empleados,
      id_estatuscatalogo_empleados : this.estatus,  
      PaginaActual : this.PaginaActual,
      id_usuario   : this.id_usuario,
      finalizado   : this.finalizado,
      id_cat_empleados: this.id_cat_empleados,   
      nombre_completo: this.nombre_completo,  
      numero_empleado: this.numero_empleado,  
      cargo: this.cargo,  
      direccion: this.direccion,  
      direccion_texto: this.direccion_texto,  
      subdireccion: this.subdireccion,  
      area: this.area,  
      area_texto: this.area_texto,  
      nombreJefe: this.nombreJefe,  
      cargoJefe: this.cargoJefe,  
      correo_institucional: this.correo_institucional,  
      telefono_opdm: this.telefono_opdm,  
      url: this.url,  
      codigo_qr: this.codigo_qr,  
      foto: this.foto,  
      activo: 1
    }
    this._cat_empleadosServices.updatecat_empleados(cat_empleados).subscribe({
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
      this._cat_empleadosServices.sendFilecat_empleados(body,tipo, this.id_catalogo_empleados).subscribe({
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
