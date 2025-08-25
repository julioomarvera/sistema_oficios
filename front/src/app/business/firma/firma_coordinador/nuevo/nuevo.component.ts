import {Component, ViewChild,ChangeDetectionStrategy, inject, signal,Pipe} from '@angular/core'; 
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormControl, FormsModule, ReactiveFormsModule, Validators, FormBuilder, FormGroup, } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { merge } from 'rxjs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSlideToggleModule, _MatSlideToggleRequiredValidatorModule, } from '@angular/material/slide-toggle';
import Swal from 'sweetalert2'
import { Nuevofirma_coordinador } from '../../../../interfaces/firma/firma_coordinador/firma_coordinador-response.interface';
import { firma_coordinadorService } from '../../../../service/firma/firma_coordinador/firma_coordinador.service';
import { estatusfirmaTable }   from '../../../../interfaces/firma/estatus/estatusfirma-table.interface';
import { estatusfirmaService } from '../../../../service/firma/estatus/estatusfirma.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from '../../../../service/error.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { firma_coordinadorTable} from '../../../../interfaces/firma/firma_coordinador/firma_coordinador-table.interface';



@Component({
  selector: 'app-nuevo',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatChipsModule,
            MatIconModule, CommonModule, MatFormFieldModule,
            MatTableModule, MatPaginatorModule, MatInputModule,
            MatSortModule, MatButtonModule, MatDialogModule,
            FormsModule, ReactiveFormsModule, MatDatepickerModule,
            MatSlideToggleModule, FormsModule, _MatSlideToggleRequiredValidatorModule,
            MatButtonModule, ReactiveFormsModule 
  ],
  templateUrl: './nuevo.component.html',
  styleUrl: './nuevo.component.scss'
})

export default class NuevoComponent {
  id_firma : number | any; 
  loading : boolean = false; 
  listfirma_coordinador: firma_coordinadorTable[] = [];
  listestatusfirma : estatusfirmaTable[] = []; 
  id_estatusfirma :number | any;  
  descripcion   : string|any;  
  estatus       : string|any;  
  readonly dialog = inject(MatDialog);
  errorMessage = signal('');
  token         : string |any; 
  id_usuario    : string |any; 
  id_rol        : string |any; 
  imp           : string |any; 
  edit          : string |any; 
  elim          : string |any; 
  nuev          : string |any; 
  img           : string |any; 
  PaginaActual  : string |any; 
  finalizado    : string |any; 
  id_gestion_oficio : string | any =''
  resultadoid_gestion_oficio: boolean = false; 
  errorid_gestion_oficio: boolean = false; 

  id_oficios : string | any =''
  resultadoid_oficios: boolean = false; 
  errorid_oficios: boolean = false; 

  id_direccion_coordinador : string | any =''
  resultadoid_direccion_coordinador: boolean = false; 
  errorid_direccion_coordinador: boolean = false; 

  text_direccion_coordinador : string | any =''
  resultadotext_direccion_coordinador: boolean = false; 
  errortext_direccion_coordinador: boolean = false; 

  id_area_coordinador : string | any =''
  resultadoid_area_coordinador: boolean = false; 
  errorid_area_coordinador: boolean = false; 

  text_area_coordinador : string | any =''
  resultadotext_area_coordinador: boolean = false; 
  errortext_area_coordinador: boolean = false; 

  id_direccion_peticion : string | any =''
  resultadoid_direccion_peticion: boolean = false; 
  errorid_direccion_peticion: boolean = false; 

  text_direccion_peticion : string | any =''
  resultadotext_direccion_peticion: boolean = false; 
  errortext_direccion_peticion: boolean = false; 

  id_area_peticion : string | any =''
  resultadoid_area_peticion: boolean = false; 
  errorid_area_peticion: boolean = false; 

  area_text_peticion : string | any =''
  resultadoarea_text_peticion: boolean = false; 
  errorarea_text_peticion: boolean = false; 

  numero_empleado_coordinador : string | any =''
  resultadonumero_empleado_coordinador: boolean = false; 
  errornumero_empleado_coordinador: boolean = false; 

  nombre_empleado_coordinador : string | any =''
  resultadonombre_empleado_coordinador: boolean = false; 
  errornombre_empleado_coordinador: boolean = false; 

  foto_empleado_coordinador : string | any =''
  resultadofoto_empleado_coordinador: boolean = false; 
  errorfoto_empleado_coordinador: boolean = false; 

  numero_empleado_peticion : string | any =''
  resultadonumero_empleado_peticion: boolean = false; 
  errornumero_empleado_peticion: boolean = false; 

  nombre_empleado_peticion : string | any =''
  resultadonombre_empleado_peticion: boolean = false; 
  errornombre_empleado_peticion: boolean = false; 

  foto_empleado_peticion : string | any =''
  resultadofoto_empleado_peticion: boolean = false; 
  errorfoto_empleado_peticion: boolean = false; 

  numero_empleado_secretaria : string | any =''
  resultadonumero_empleado_secretaria: boolean = false; 
  errornumero_empleado_secretaria: boolean = false; 

  nombre_secretaria : string | any =''
  resultadonombre_secretaria: boolean = false; 
  errornombre_secretaria: boolean = false; 

  foto_secretario : string | any =''
  resultadofoto_secretario: boolean = false; 
  errorfoto_secretario: boolean = false; 

  numero_empleado_tecnico : string | any =''
  resultadonumero_empleado_tecnico: boolean = false; 
  errornumero_empleado_tecnico: boolean = false; 

  nombre_tecnico : string | any =''
  resultadonombre_tecnico: boolean = false; 
  errornombre_tecnico: boolean = false; 

  foto_tecnico : string | any =''
  resultadofoto_tecnico: boolean = false; 
  errorfoto_tecnico: boolean = false; 

  numero_oficio : string | any =''
  resultadonumero_oficio: boolean = false; 
  errornumero_oficio: boolean = false; 

  numero_contestacion : string | any =''
  resultadonumero_contestacion: boolean = false; 
  errornumero_contestacion: boolean = false; 

  archivo_oficio : string | any =''
  resultadoarchivo_oficio: boolean = false; 
  errorarchivo_oficio: boolean = false; 

  archivo_sello : string | any =''
  resultadoarchivo_sello: boolean = false; 
  errorarchivo_sello: boolean = false; 

  archivo_evidencia : string | any =''
  resultadoarchivo_evidencia: boolean = false; 
  errorarchivo_evidencia: boolean = false; 

  archivo_contestacion_pdf : string | any =''
  resultadoarchivo_contestacion_pdf: boolean = false; 
  errorarchivo_contestacion_pdf: boolean = false; 

  archivo_contestacion_digital : string | any =''
  resultadoarchivo_contestacion_digital: boolean = false; 
  errorarchivo_contestacion_digital: boolean = false; 

  asunto : string | any =''
  resultadoasunto: boolean = false; 
  errorasunto: boolean = false; 

  descripcion_contestacion : string | any =''
  resultadodescripcion_contestacion: boolean = false; 
  errordescripcion_contestacion: boolean = false; 

  visto : string | any =''
  resultadovisto: boolean = false; 
  errorvisto: boolean = false; 

  fecha_contestacion : string | any =''
  resultadofecha_contestacion: boolean = false; 
  errorfecha_contestacion: boolean = false; 

  fecha_terminacion : string | any =''
  resultadofecha_terminacion: boolean = false; 
  errorfecha_terminacion: boolean = false; 

  tiempo_efectivo_contestacion : string | any =''
  resultadotiempo_efectivo_contestacion: boolean = false; 
  errortiempo_efectivo_contestacion: boolean = false; 

  otro : string | any =''
  resultadootro: boolean = false; 
  errorotro: boolean = false; 

  private fileTmp:any; 
  constructor(private router: Router, private _formBuilder: FormBuilder, private firma_coordinador_Service : firma_coordinadorService,private toastr: ToastrService,private _errorService:ErrorService, private aRouter:ActivatedRoute, private _sanitizer: DomSanitizer,private _estatusfirmaServices:  estatusfirmaService ) {
    this.id_firma = aRouter.snapshot.paramMap.get('id_firma');
    this.estatus            = aRouter.snapshot.paramMap.get('estatus');
    this.token              = localStorage.getItem('token');
    this.id_usuario         = localStorage.getItem('id_usuario');
    this.id_rol             = localStorage.getItem('id_rol');
    this.imp                = localStorage.getItem('imp');
    this.edit               = localStorage.getItem('edit');
    this.elim               = localStorage.getItem('elim');
    this.nuev               = localStorage.getItem('nuev');
    this.img                = localStorage.getItem('img');
    this.PaginaActual       = '/index/nuevofirma_coordinador';
    this.finalizado         = 1;
    this.getCatEstatusfirma();
  }

  openHelper() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);
      dialogRef.afterClosed().subscribe(result => {
         console.log(`Dialog result: ${result}`);
      });
  }
  getCatEstatusfirma(){
    this._estatusfirmaServices.getAllestatusfirma(this.id_usuario).subscribe((data) => { 
      this.listestatusfirma = data;  
    })
  }


  goInicio() {
    this.router.navigate(['/index/firma']);
  }


  save(){
    this.errorid_gestion_oficio = false; 
    this.errorid_oficios = false; 
    this.errorid_direccion_coordinador = false; 
    this.errortext_direccion_coordinador = false; 
    this.errorid_area_coordinador = false; 
    this.errortext_area_coordinador = false; 
    this.errorid_direccion_peticion = false; 
    this.errortext_direccion_peticion = false; 
    this.errorid_area_peticion = false; 
    this.errorarea_text_peticion = false; 
    this.errornumero_empleado_coordinador = false; 
    this.errornombre_empleado_coordinador = false; 
    this.errorfoto_empleado_coordinador = false; 
    this.errornumero_empleado_peticion = false; 
    this.errornombre_empleado_peticion = false; 
    this.errorfoto_empleado_peticion = false; 
    this.errornumero_empleado_secretaria = false; 
    this.errornombre_secretaria = false; 
    this.errorfoto_secretario = false; 
    this.errornumero_empleado_tecnico = false; 
    this.errornombre_tecnico = false; 
    this.errorfoto_tecnico = false; 
    this.errornumero_oficio = false; 
    this.errornumero_contestacion = false; 
    this.errorarchivo_oficio = false; 
    this.errorarchivo_sello = false; 
    this.errorarchivo_evidencia = false; 
    this.errorarchivo_contestacion_pdf = false; 
    this.errorarchivo_contestacion_digital = false; 
    this.errorasunto = false; 
    this.errordescripcion_contestacion = false; 
    this.errorvisto = false; 
    this.errorfecha_contestacion = false; 
    this.errorfecha_terminacion = false; 
    this.errortiempo_efectivo_contestacion = false; 
    this.errorotro = false; 
    if(this.id_gestion_oficio == '') {
      this.errorid_gestion_oficio= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro id_gestion_oficio')
    }
    else if(this.id_oficios == '') {
      this.errorid_oficios= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro id_oficios')
    }
    else if(this.id_direccion_coordinador == '') {
      this.errorid_direccion_coordinador= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro id_direccion_coordinador')
    }
    else if(this.text_direccion_coordinador == '') {
      this.errortext_direccion_coordinador= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro text_direccion_coordinador')
    }
    else if(this.id_area_coordinador == '') {
      this.errorid_area_coordinador= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro id_area_coordinador')
    }
    else if(this.text_area_coordinador == '') {
      this.errortext_area_coordinador= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro text_area_coordinador')
    }
    else if(this.id_direccion_peticion == '') {
      this.errorid_direccion_peticion= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro id_direccion_peticion')
    }
    else if(this.text_direccion_peticion == '') {
      this.errortext_direccion_peticion= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro text_direccion_peticion')
    }
    else if(this.id_area_peticion == '') {
      this.errorid_area_peticion= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro id_area_peticion')
    }
    else if(this.area_text_peticion == '') {
      this.errorarea_text_peticion= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro area_text_peticion')
    }
    else if(this.numero_empleado_coordinador == '') {
      this.errornumero_empleado_coordinador= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro numero_empleado_coordinador')
    }
    else if(this.nombre_empleado_coordinador == '') {
      this.errornombre_empleado_coordinador= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro nombre_empleado_coordinador')
    }
    else if(this.foto_empleado_coordinador == '') {
      this.errorfoto_empleado_coordinador= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro foto_empleado_coordinador')
    }
    else if(this.numero_empleado_peticion == '') {
      this.errornumero_empleado_peticion= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro numero_empleado_peticion')
    }
    else if(this.nombre_empleado_peticion == '') {
      this.errornombre_empleado_peticion= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro nombre_empleado_peticion')
    }
    else if(this.foto_empleado_peticion == '') {
      this.errorfoto_empleado_peticion= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro foto_empleado_peticion')
    }
    else if(this.numero_empleado_secretaria == '') {
      this.errornumero_empleado_secretaria= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro numero_empleado_secretaria')
    }
    else if(this.nombre_secretaria == '') {
      this.errornombre_secretaria= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro nombre_secretaria')
    }
    else if(this.foto_secretario == '') {
      this.errorfoto_secretario= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro foto_secretario')
    }
    else if(this.numero_empleado_tecnico == '') {
      this.errornumero_empleado_tecnico= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro numero_empleado_tecnico')
    }
    else if(this.nombre_tecnico == '') {
      this.errornombre_tecnico= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro nombre_tecnico')
    }
    else if(this.foto_tecnico == '') {
      this.errorfoto_tecnico= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro foto_tecnico')
    }
    else if(this.numero_oficio == '') {
      this.errornumero_oficio= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro numero_oficio')
    }
    else if(this.numero_contestacion == '') {
      this.errornumero_contestacion= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro numero_contestacion')
    }
    else if(this.archivo_oficio == '') {
      this.errorarchivo_oficio= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro archivo_oficio')
    }
    else if(this.archivo_sello == '') {
      this.errorarchivo_sello= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro archivo_sello')
    }
    else if(this.archivo_evidencia == '') {
      this.errorarchivo_evidencia= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro archivo_evidencia')
    }
    else if(this.archivo_contestacion_pdf == '') {
      this.errorarchivo_contestacion_pdf= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro archivo_contestacion_pdf')
    }
    else if(this.archivo_contestacion_digital == '') {
      this.errorarchivo_contestacion_digital= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro archivo_contestacion_digital')
    }
    else if(this.asunto == '') {
      this.errorasunto= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro asunto')
    }
    else if(this.descripcion_contestacion == '') {
      this.errordescripcion_contestacion= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro descripcion_contestacion')
    }
    else if(this.visto == '') {
      this.errorvisto= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro visto')
    }
    else if(this.fecha_contestacion == '') {
      this.errorfecha_contestacion= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro fecha_contestacion')
    }
    else if(this.fecha_terminacion == '') {
      this.errorfecha_terminacion= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro fecha_terminacion')
    }
    else if(this.tiempo_efectivo_contestacion == '') {
      this.errortiempo_efectivo_contestacion= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro tiempo_efectivo_contestacion')
    }
    else if(this.otro == '') {
      this.errorotro= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro otro')
    }
    else{
      this.saveParams();
    }
  }

  saveParams(){
    this.loading = true;
    const firma_coordinador  : Nuevofirma_coordinador={
      id_firma : this.id_firma,
      id_usuario   : this.id_usuario,
      id_estatusfirma : this.estatus,
      PaginaActual : this.PaginaActual,
      finalizado   : this.finalizado,
      id_gestion_oficio: this.id_gestion_oficio,  
      id_oficios: this.id_oficios,  
      id_direccion_coordinador: this.id_direccion_coordinador,  
      text_direccion_coordinador: this.text_direccion_coordinador,  
      id_area_coordinador: this.id_area_coordinador,  
      text_area_coordinador: this.text_area_coordinador,  
      id_direccion_peticion: this.id_direccion_peticion,  
      text_direccion_peticion: this.text_direccion_peticion,  
      id_area_peticion: this.id_area_peticion,  
      area_text_peticion: this.area_text_peticion,  
      numero_empleado_coordinador: this.numero_empleado_coordinador,  
      nombre_empleado_coordinador: this.nombre_empleado_coordinador,  
      foto_empleado_coordinador: this.foto_empleado_coordinador,  
      numero_empleado_peticion: this.numero_empleado_peticion,  
      nombre_empleado_peticion: this.nombre_empleado_peticion,  
      foto_empleado_peticion: this.foto_empleado_peticion,  
      numero_empleado_secretaria: this.numero_empleado_secretaria,  
      nombre_secretaria: this.nombre_secretaria,  
      foto_secretario: this.foto_secretario,  
      numero_empleado_tecnico: this.numero_empleado_tecnico,  
      nombre_tecnico: this.nombre_tecnico,  
      foto_tecnico: this.foto_tecnico,  
      numero_oficio: this.numero_oficio,  
      numero_contestacion: this.numero_contestacion,  
      archivo_oficio: this.archivo_oficio,  
      archivo_sello: this.archivo_sello,  
      archivo_evidencia: this.archivo_evidencia,  
      archivo_contestacion_pdf: this.archivo_contestacion_pdf,  
      archivo_contestacion_digital: this.archivo_contestacion_digital,  
      asunto: this.asunto,  
      descripcion_contestacion: this.descripcion_contestacion,  
      visto: this.visto,  
      fecha_contestacion: this.fecha_contestacion,  
      fecha_terminacion: this.fecha_terminacion,  
      tiempo_efectivo_contestacion: this.tiempo_efectivo_contestacion,  
      otro: this.otro,  
      activo : 1
    }
    this.firma_coordinador_Service.newfirma_coordinador(firma_coordinador).subscribe({
      next: (v) => {
        this.toastr.success('Registro almacenado Correctamente', 'Correcto',  { "positionClass" : "toast-bottom-center"});
        this.router.navigate(['/index/firma']);
      },
      error: (event: HttpErrorResponse) => {
        this._errorService.msjError(event);
        this.loading = false;
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
      this.firma_coordinador_Service.sendFilefirma_coordinador(body,tipo, this.id_firma).subscribe({
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
   selector: 'nuevo-dialog',
   templateUrl: 'nuevo-dialog.html',
   standalone: true,
   imports: [MatDialogModule, MatButtonModule],
   changeDetection: ChangeDetectionStrategy.OnPush,
 })
 export class DialogContentExampleDialog { }
