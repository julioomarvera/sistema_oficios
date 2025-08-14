import {Component, ChangeDetectionStrategy, inject, signal,Pipe} from '@angular/core'; 
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
import { Nuevocat_tipo_seguimiento } from '../../../../interfaces/catalogo/cat_tipo_seguimiento/cat_tipo_seguimiento-response.interface';
import { cat_tipo_seguimientoService } from '../../../../service/catalogo/cat_tipo_seguimiento/cat_tipo_seguimiento.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from '../../../../service/error.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';



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
  id_catalogo : number | any; 
  loading : boolean = false; 
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
  descripcion : string = '';
  resultadodescripcion: boolean = false; 
  errordescripcion: boolean = false; 

  private fileTmp:any; 
  constructor(private router: Router, private _formBuilder: FormBuilder, private cat_tipo_seguimiento_Service : cat_tipo_seguimientoService,private toastr: ToastrService,private _errorService:ErrorService, private aRouter:ActivatedRoute,private _sanitizer: DomSanitizer) {
    this.id_catalogo = aRouter.snapshot.paramMap.get('id_catalogo');
    this.token              = localStorage.getItem('token');
    this.id_usuario         = localStorage.getItem('id_usuario');
    this.id_rol             = localStorage.getItem('id_rol');
    this.imp                = localStorage.getItem('imp');
    this.edit               = localStorage.getItem('edit');
    this.elim               = localStorage.getItem('elim');
    this.nuev               = localStorage.getItem('nuev');
    this.img                = localStorage.getItem('img');
    this.PaginaActual       = '/index/nuevocat_tipo_seguimiento';
    this.finalizado         = 1;
  }

  openHelper() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);
      dialogRef.afterClosed().subscribe(result => {
         console.log(`Dialog result: ${result}`);
      });
  }

  goInicio() {
    this.router.navigate(['/index/cat_tipo_seguimiento']);
  }


  save(){
    this.errordescripcion = false; 
    if(this.descripcion == '') {
      this.errordescripcion= true; 
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro descripcion')
    }
    else{
      this.saveParams();
    }
  }

  saveParams(){
    this.loading = true;
    const cat_tipo_seguimiento  : Nuevocat_tipo_seguimiento={
      id_catalogo : this.id_catalogo,
      id_usuario   : this.id_usuario,
      PaginaActual : this.PaginaActual,
      finalizado   : this.finalizado,
      descripcion: this.descripcion,  
      activo : 1
    }
    this.cat_tipo_seguimiento_Service.newcat_tipo_seguimiento(cat_tipo_seguimiento).subscribe({
      next: (v) => {
        this.loading = true;
        this.toastr.success('Registro almacenado Correctamente', 'Correcto',  { "positionClass" : "toast-bottom-center"});
        this. goInicio();
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
      this.cat_tipo_seguimiento_Service.sendFilecat_tipo_seguimiento(body,tipo, this.id_catalogo).subscribe({
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
