import {Component, ChangeDetectionStrategy, inject, signal} from '@angular/core'; 
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
import { Router, RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormControl, FormsModule, ReactiveFormsModule, Validators, FormBuilder, FormGroup, } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { merge } from 'rxjs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSlideToggleModule, _MatSlideToggleRequiredValidatorModule, } from '@angular/material/slide-toggle';
import Swal from 'sweetalert2'
import { Nuevorolles } from '../../../interfaces/rolles/rolles-response.interface';
import { rollesService } from '../../../service/rolles/rolles.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from '../../../service/error.service';



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
  loading : boolean = false; 
  readonly dialog = inject(MatDialog);
  errorMessage = signal('');
  token      : string |any; 
  id_usuario : string |any; 
  id_rol     : string |any; 
  imp        : string |any; 
  edit       : string |any; 
  elim       : string |any; 
  nuev       : string |any; 
  img        : string |any; 
  descripcion : string = '';
  resultadodescripcion: boolean = false; 
  errordescripcion: boolean = false; 

  crear : string = '';
  resultadocrear: boolean = false; 
  errorcrear: boolean = false; 

  ver : string = '';
  resultadover: boolean = false; 
  errorver: boolean = false; 

  editar : string = '';
  resultadoeditar: boolean = false; 
  erroreditar: boolean = false; 

  eliminar : string = '';
  resultadoeliminar: boolean = false; 
  erroreliminar: boolean = false; 

  constructor(private router: Router, private _formBuilder: FormBuilder, private rolles_Service : rollesService,private toastr: ToastrService,private _errorService:ErrorService) {
    this.crear= 'NO'; 
    this.ver= 'NO'; 
    this.editar= 'NO'; 
    this.eliminar= 'NO'; 
    this.token      = localStorage.getItem('token');
    this.id_usuario = localStorage.getItem('id_usuario');
    this.id_rol     = localStorage.getItem('id_rol');
    this.imp        = localStorage.getItem('imp');
    this.edit       = localStorage.getItem('edit');
    this.elim       = localStorage.getItem('elim');
    this.nuev       = localStorage.getItem('nuev');
    this.img        = localStorage.getItem('img');
  }

  openHelper() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);
      dialogRef.afterClosed().subscribe(result => {
         console.log(`Dialog result: ${result}`);
      });
  }

  goInicio() {
    this.router.navigate(['/index/rolles']);
  }

  Evaluacion(parametro: number) { 
    switch (parametro) { 
      case(3):
        this.errorcrear= false; 
        if (this.resultadocrear == false) { 
          this.crear = 'NO'; 
        } 
        else{ 
          this.crear = 'SI'; 
        } 
      break; 
      case(4):
        this.errorver= false; 
        if (this.resultadover == false) { 
          this.ver = 'NO'; 
        } 
        else{ 
          this.ver = 'SI'; 
        } 
      break; 
      case(5):
        this.erroreditar= false; 
        if (this.resultadoeditar == false) { 
          this.editar = 'NO'; 
        } 
        else{ 
          this.editar = 'SI'; 
        } 
      break; 
      case(6):
        this.erroreliminar= false; 
        if (this.resultadoeliminar == false) { 
          this.eliminar = 'NO'; 
        } 
        else{ 
          this.eliminar = 'SI'; 
        } 
      break; 
    } 
  } 

  save(){
    this.errordescripcion = false; 
    this.errorcrear = false; 
    this.errorver = false; 
    this.erroreditar = false; 
    this.erroreliminar = false; 
    if(this.descripcion == ''){
      if(this.descripcion == '') {
        this.errordescripcion= true; 
        this.mensajeAlertaError('Error: falta el Informacíon en el parámetro descripcion')
      }
      if(this.crear == '') {
        this.errorcrear= true; 
        this.mensajeAlertaError('Error: falta el Informacíon en el parámetro crear')
      }
      if(this.ver == '') {
        this.errorver= true; 
        this.mensajeAlertaError('Error: falta el Informacíon en el parámetro ver')
      }
      if(this.editar == '') {
        this.erroreditar= true; 
        this.mensajeAlertaError('Error: falta el Informacíon en el parámetro editar')
      }
      if(this.eliminar == '') {
        this.erroreliminar= true; 
        this.mensajeAlertaError('Error: falta el Informacíon en el parámetro eliminar')
      }
    }
    else { 
      this.saveParams();
    }
  }

  saveParams(){
    this.loading = true;
    const rolles  : Nuevorolles={
      id_usuario : this.id_usuario,
      descripcion: this.descripcion,  
      crear: this.crear,  
      ver: this.ver,  
      editar: this.editar,  
      eliminar: this.eliminar,  
      activo : 1
    }
    this.rolles_Service.newrolles(rolles).subscribe({
      next: (v) => {
        this.toastr.success('Registro almacenado Correctamente', 'Correcto',  { "positionClass" : "toast-bottom-center"});
        this.router.navigate(['/index/rolles']);
      },
      error: (event: HttpErrorResponse) => {
        this._errorService.msjError(event);
        this.loading = false;
      },
      complete: () => console.info('complete') 
    })
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
