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
import { Nuevocat_empleados } from '../../../../interfaces/catalogo_empleados/cat_empleados/cat_empleados-response.interface';
import { cat_empleadosService } from '../../../../service/catalogo_empleados/cat_empleados/cat_empleados.service';
import { estatuscatalogo_empleadosTable }   from '../../../../interfaces/catalogo_empleados/estatus/estatuscatalogo_empleados-table.interface';
import { estatuscatalogo_empleadosService } from '../../../../service/catalogo_empleados/estatus/estatuscatalogo_empleados.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from '../../../../service/error.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { cat_empleadosTable} from '../../../../interfaces/catalogo_empleados/cat_empleados/cat_empleados-table.interface';
import { cat_direccionesTable } from   '../../../../interfaces/catalogo/cat_direcciones/cat_direcciones-table.interface';
import { cat_direccionesService } from '../../../../service/catalogo/cat_direcciones/cat_direcciones.service';
import { cat_areasTable } from '../../../../interfaces/catalogo_areas/cat_areas/cat_areas-table.interface';
import { cat_areasService } from '../../../../service/catalogo_areas/cat_areas/cat_areas.service';



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
  id_catalogo_empleados : number | any; 
  loading : boolean = false; 
  listcat_empleados: cat_empleadosTable[] = [];
  listestatuscatalogo_empleados : estatuscatalogo_empleadosTable[] = []; 
  id_estatuscatalogo_empleados :number | any;  
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
  resultadoid_usuario: boolean = false; 
  errorid_usuario: boolean = false; 

  nombre_completo : string | any =''
  resultadonombre_completo: boolean = false; 
  errornombre_completo: boolean = false; 

  numero_empleado : number = 0;
  resultadonumero_empleado: boolean = false; 
  errornumero_empleado: boolean = false; 

  cargo : string | any =''
  resultadocargo: boolean = false; 
  errorcargo: boolean = false; 

  direccion : string | any ='';
  resultadodireccion: boolean = false; 
  errordireccion: boolean = false; 

  direccion_texto : string | any =''
  resultadodireccion_texto: boolean = false; 
  errordireccion_texto: boolean = false; 

  subdireccion : string | any =''
  resultadosubdireccion: boolean = false; 
  errorsubdireccion: boolean = false; 

  area : string | any ='';
  resultadoarea: boolean = false; 
  errorarea: boolean = false; 

  area_texto : string | any =''
  resultadoarea_texto: boolean = false; 
  errorarea_texto: boolean = false; 

  nombreJefe : string | any =''
  resultadonombreJefe: boolean = false; 
  errornombreJefe: boolean = false; 

  cargoJefe : string | any =''
  resultadocargoJefe: boolean = false; 
  errorcargoJefe: boolean = false; 

  correo_institucional : string | any =''
  resultadocorreo_institucional: boolean = false; 
  errorcorreo_institucional: boolean = false; 

  telefono_opdm : string | any =''
  resultadotelefono_opdm: boolean = false; 
  errortelefono_opdm: boolean = false; 

  url : string | any =''
  resultadourl: boolean = false; 
  errorurl: boolean = false; 

  codigo_qr : string | any =''
  resultadocodigo_qr: boolean = false; 
  errorcodigo_qr: boolean = false; 

  foto : string | any =''
  resultadofoto: boolean = false; 
  errorfoto: boolean = false; 

  listcat_direcciones:cat_direccionesTable[] = [];
listcat_areas:cat_areasTable[] = [];

  private fileTmp:any; 
  constructor(private router: Router, private _formBuilder: FormBuilder, private cat_empleados_Service : cat_empleadosService,private toastr: ToastrService,private _errorService:ErrorService, private aRouter:ActivatedRoute,private _cat_direccionesServices: cat_direccionesService,private _cat_areasServices: cat_areasService, private _sanitizer: DomSanitizer,private _estatuscatalogo_empleadosServices:  estatuscatalogo_empleadosService ) {
    this.id_catalogo_empleados = aRouter.snapshot.paramMap.get('id_catalogo_empleados');
    this.estatus            = aRouter.snapshot.paramMap.get('estatus');
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


  save(){
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
    }
    else if(this.nombre_completo == '') {
      this.errornombre_completo= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro nombre_completo')
    }
    else if(this.numero_empleado == 0) {
      this.errornumero_empleado= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro numero_empleado')
    }
    else if(this.cargo == '') {
      this.errorcargo= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro cargo')
    }
    else if(this.direccion == '') {
      this.errordireccion= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro direccion')
    }
    else if(this.direccion_texto == '') {
      this.errordireccion_texto= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro direccion_texto')
    }
    else if(this.subdireccion == '') {
      this.errorsubdireccion= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro subdireccion')
    }
    else if(this.area == '') {
      this.errorarea= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro area')
    }
    else if(this.area_texto == '') {
      this.errorarea_texto= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro area_texto')
    }
    else if(this.nombreJefe == '') {
      this.errornombreJefe= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro nombreJefe')
    }
    else if(this.cargoJefe == '') {
      this.errorcargoJefe= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro cargoJefe')
    }
    else if(this.correo_institucional == '') {
      this.errorcorreo_institucional= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro correo_institucional')
    }
    else if(this.telefono_opdm == '') {
      this.errortelefono_opdm= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro telefono_opdm')
    }
    else if(this.url == '') {
      this.errorurl= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro url')
    }
    else if(this.codigo_qr == '') {
      this.errorcodigo_qr= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro codigo_qr')
    }
    else if(this.foto == '') {
      this.errorfoto= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro foto')
    }
    else{
      this.saveParams();
    }
  }

  saveParams(){
    this.loading = true;
    const cat_empleados  : Nuevocat_empleados={
      id_catalogo_empleados : this.id_catalogo_empleados,
      id_usuario   : this.id_usuario,
      id_estatuscatalogo_empleados : this.estatus,
      PaginaActual : this.PaginaActual,
      finalizado   : this.finalizado,  
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
      activo : 1
    }
    this.cat_empleados_Service.newcat_empleados(cat_empleados).subscribe({
      next: (v) => {
        this.toastr.success('Registro almacenado Correctamente', 'Correcto',  { "positionClass" : "toast-bottom-center"});
        this.router.navigate(['/index/catalogo_empleados']);
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
      this.cat_empleados_Service.sendFilecat_empleados(body,tipo, this.id_catalogo_empleados).subscribe({
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
