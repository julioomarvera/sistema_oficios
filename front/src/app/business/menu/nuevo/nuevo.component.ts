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
import { Nuevomenu } from '../../../interfaces/menu/menu-response.interface';
import { menuService } from '../../../service/menu/menu.service';
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
  id_roll : string = '';
  resultadoid_roll: boolean = false; 
  errorid_roll: boolean = false; 

  titulo : string = '';
  resultadotitulo: boolean = false; 
  errortitulo: boolean = false; 

  direccion_url : string = '';
  resultadodireccion_url: boolean = false; 
  errordireccion_url: boolean = false; 

  constructor(private router: Router, private _formBuilder: FormBuilder, private menu_Service : menuService,private toastr: ToastrService,private _errorService:ErrorService) {
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
    this.router.navigate(['/index/menu']);
  }


  save(){
    this.errorid_roll = false; 
    this.errortitulo = false; 
    this.errordireccion_url = false; 
    if(this.id_roll == '' || this.titulo == '' || this.direccion_url == ''){
      if(this.id_roll == '') {
        this.errorid_roll= true; 
        this.mensajeAlertaError('Error: falta el Informacíon en el parámetro id_roll')
      }
      if(this.titulo == '') {
        this.errortitulo= true; 
        this.mensajeAlertaError('Error: falta el Informacíon en el parámetro titulo')
      }
      if(this.direccion_url == '') {
        this.errordireccion_url= true; 
        this.mensajeAlertaError('Error: falta el Informacíon en el parámetro direccion_url')
      }
    }
    else { 
      this.saveParams();
    }
  }

  saveParams(){
    this.loading = true;
    const menu  : Nuevomenu={
      id_usuario : this.id_usuario,
      id_roll: this.id_roll,  
      titulo: this.titulo,  
      direccion_url: this.direccion_url,  
      activo : 1
    }
    this.menu_Service.newmenu(menu).subscribe({
      next: (v) => {
        this.toastr.success('Registro almacenado Correctamente', 'Correcto',  { "positionClass" : "toast-bottom-center"});
        this.router.navigate(['/index/menu']);
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
