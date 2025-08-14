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
import { Nuevocat_areas } from '../../../../interfaces/catalogo_areas/cat_areas/cat_areas-response.interface';
import { cat_areasService } from '../../../../service/catalogo_areas/cat_areas/cat_areas.service';
import { estatuscatalogo_areasTable }   from '../../../../interfaces/catalogo_areas/estatus/estatuscatalogo_areas-table.interface';
import { estatuscatalogo_areasService } from '../../../../service/catalogo_areas/estatus/estatuscatalogo_areas.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from '../../../../service/error.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { cat_areasTable} from '../../../../interfaces/catalogo_areas/cat_areas/cat_areas-table.interface';
import { cat_direccionesTable } from   '../../../../interfaces/catalogo/cat_direcciones/cat_direcciones-table.interface';
import { cat_direccionesService } from '../../../../service/catalogo/cat_direcciones/cat_direcciones.service';



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
  id_catalogo_areas : number | any; 
  loading : boolean = false; 
  listcat_areas: cat_areasTable[] = [];
  listestatuscatalogo_areas : estatuscatalogo_areasTable[] = []; 
  id_estatuscatalogo_areas :number | any;  
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
  id_direccion : string | any ='';
  resultadoid_direccion: boolean = false; 
  errorid_direccion: boolean = false; 

  text_direccion : string | any ='';
  resultadotext_direccion: boolean = false; 
  errortext_direccion: boolean = false; 

  resultadodescripcion: boolean = false; 
  errordescripcion: boolean = false; 

  listcat_direcciones:cat_direccionesTable[] = [];

  private fileTmp:any; 
  constructor(private router: Router, private _formBuilder: FormBuilder, private cat_areas_Service : cat_areasService,private toastr: ToastrService,private _errorService:ErrorService, private aRouter:ActivatedRoute,private _cat_direccionesServices: cat_direccionesService, private _sanitizer: DomSanitizer,private _estatuscatalogo_areasServices:  estatuscatalogo_areasService ) {
    this.id_catalogo_areas = aRouter.snapshot.paramMap.get('id_catalogo_areas');
    this.estatus            = aRouter.snapshot.paramMap.get('estatus');
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


  save(){
    this.errorid_direccion = false; 
    this.errortext_direccion = false; 
    this.errordescripcion = false; 
    if(this.id_direccion == '') {
      this.errorid_direccion= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro id_direccion')
    }
    else if(this.text_direccion == '') {
      this.errortext_direccion= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro text_direccion')
    }
    else if(this.descripcion == '') {
      this.errordescripcion= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro descripcion')
    }
    else{
      this.saveParams();
    }
  }

  saveParams(){
    this.loading = true;
    const cat_areas  : Nuevocat_areas={
      id_catalogo_areas : this.id_catalogo_areas,
      id_usuario   : this.id_usuario,
      id_estatuscatalogo_areas : this.estatus,
      PaginaActual : this.PaginaActual,
      finalizado   : this.finalizado,
      id_direccion: this.id_direccion,  
      text_direccion: this.text_direccion,  
      descripcion: this.descripcion,  
      activo : 1
    }
    this.cat_areas_Service.newcat_areas(cat_areas).subscribe({
      next: (v) => {
        this.toastr.success('Registro almacenado Correctamente', 'Correcto',  { "positionClass" : "toast-bottom-center"});
        this.router.navigate(['/index/catalogo_areas']);
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
      this.cat_areas_Service.sendFilecat_areas(body,tipo, this.id_catalogo_areas).subscribe({
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
