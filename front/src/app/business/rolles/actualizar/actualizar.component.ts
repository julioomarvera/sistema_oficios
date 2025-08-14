import { Component, ChangeDetectionStrategy, inject, signal} from '@angular/core'; 
import { ActivatedRoute, Router } from '@angular/router';
import { rollesTable } from '../../../interfaces/rolles/rolles-table.interface';
import { rollesService } from '../../../service/rolles/rolles.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import Swal from 'sweetalert2'
import { Nuevorolles } from '../../../interfaces/rolles/rolles-response.interface';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../../service/error.service';



@Component({
  selector: 'app-actualizar',
  standalone: true,
  imports: [MatCardModule,MatIconModule,MatFormFieldModule,
             MatInputModule,FormsModule, ReactiveFormsModule,
             MatSlideToggleModule, MatDialogModule, MatButtonModule
  ],
  templateUrl: './actualizar.component.html',
  styleUrl: './actualizar.component.scss'
})

export default class ActualizarComponent {
  loading : boolean = false; 
  id:number|any = '';  
  listrolles: rollesTable[] = [];
  readonly dialog = inject(MatDialog);
  token      : string |any; 
  id_usuario : string |any; 
  id_rol     : string |any; 
  imp        : string |any; 
  edit       : string |any; 
  elim       : string |any; 
  nuev       : string |any; 
  img        : string |any; 
  id_roll : number|any = '';;
  resultadoid_roll: boolean = false; 
  errorid_roll: boolean = false; 

  descripcion : string|any = '';;
  resultadodescripcion: boolean = false; 
  errordescripcion: boolean = false; 

  crear : boolean|any = false;
  resultadocrear: boolean = false; 
  errorcrear: boolean = false; 

  ver : boolean|any = false;
  resultadover: boolean = false; 
  errorver: boolean = false; 

  editar : boolean|any = false;
  resultadoeditar: boolean = false; 
  erroreditar: boolean = false; 

  eliminar : boolean|any = false;
  resultadoeliminar: boolean = false; 
  erroreliminar: boolean = false; 

  constructor( private aRouter:ActivatedRoute, private _rollesServices: rollesService,private router: Router,private toastr: ToastrService,private _errorService:ErrorService) {
    this.token      = localStorage.getItem('token');
    this.id_usuario = localStorage.getItem('id_usuario');
    this.id_rol     = localStorage.getItem('id_rol');
    this.imp        = localStorage.getItem('imp');
    this.edit       = localStorage.getItem('edit');
    this.elim       = localStorage.getItem('elim');
    this.nuev       = localStorage.getItem('nuev');
    this.img        = localStorage.getItem('img');
    this.id_roll  = aRouter.snapshot.paramMap.get('id');
    this.crear= 'NO'; 
    this.ver= 'NO'; 
    this.editar= 'NO'; 
    this.eliminar= 'NO'; 
    this.getInformacionById();
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

  getInformacionById(){
    if(this.id_roll !== '' ){
      this._rollesServices.getrolles(this.id_roll,this.id_usuario).subscribe((data : rollesTable) =>{
        this.descripcion = data.descripcion;  
        this.crear = data.crear;  
        this.ver = data.ver;  
        this.editar = data.editar;  
        this.eliminar = data.eliminar;  

        if(this.crear == true ){  
          this.resultadocrear = true;
          this.crear = 'SI';
        }
        else{
          this.crear = 'NO';
        }
        if(this.ver == true ){  
          this.resultadover = true;
          this.ver = 'SI';
        }
        else{
          this.ver = 'NO';
        }
        if(this.editar == true ){  
          this.resultadoeditar = true;
          this.editar = 'SI';
        }
        else{
          this.editar = 'NO';
        }
        if(this.eliminar == true ){  
          this.resultadoeliminar = true;
          this.eliminar = 'SI';
        }
        else{
          this.eliminar = 'NO';
        }
      })
    }
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

  actualizar(){
    this.errorid_roll = false; 
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
    const rolles  : rollesTable={
      id_usuario: this.id_usuario,
      id_roll: this.id_roll,  
      descripcion: this.descripcion,  
      crear: this.resultadocrear,  
      ver: this.resultadover,  
      editar: this.resultadoeditar,  
      eliminar: this.resultadoeliminar,  
      imp: 1,  
      edit: 1,  
      elim: 1,  
      nuev: 1,  
      img: 1,  
      
      activo : 1
    }
    this._rollesServices.updaterolles(rolles).subscribe({
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
   selector: 'actualizar-dialog',
   templateUrl: 'actualizar-dialog.html',
   standalone: true,
   imports: [MatDialogModule, MatButtonModule],
   changeDetection: ChangeDetectionStrategy.OnPush,
 })
 export class DialogContentExampleDialog { }
