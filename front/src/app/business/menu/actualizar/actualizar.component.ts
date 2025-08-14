import { Component, ChangeDetectionStrategy, inject, signal} from '@angular/core'; 
import { ActivatedRoute, Router } from '@angular/router';
import { menuTable } from '../../../interfaces/menu/menu-table.interface';
import { menuService } from '../../../service/menu/menu.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import Swal from 'sweetalert2'
import { Nuevomenu } from '../../../interfaces/menu/menu-response.interface';
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
  listmenu: menuTable[] = [];
  readonly dialog = inject(MatDialog);
  token      : string |any; 
  id_usuario : string |any; 
  id_rol     : string |any; 
  imp        : string |any; 
  edit       : string |any; 
  elim       : string |any; 
  nuev       : string |any; 
  img        : string |any; 
  id_menu : number|any = '';;
  resultadoid_menu: boolean = false; 
  errorid_menu: boolean = false; 

  id_roll : string|any = '';;
  resultadoid_roll: boolean = false; 
  errorid_roll: boolean = false; 

  titulo : string|any = '';;
  resultadotitulo: boolean = false; 
  errortitulo: boolean = false; 

  direccion_url : string|any = '';;
  resultadodireccion_url: boolean = false; 
  errordireccion_url: boolean = false; 

  constructor( private aRouter:ActivatedRoute, private _menuServices: menuService,private router: Router,private toastr: ToastrService,private _errorService:ErrorService) {
    this.token      = localStorage.getItem('token');
    this.id_usuario = localStorage.getItem('id_usuario');
    this.id_rol     = localStorage.getItem('id_rol');
    this.imp        = localStorage.getItem('imp');
    this.edit       = localStorage.getItem('edit');
    this.elim       = localStorage.getItem('elim');
    this.nuev       = localStorage.getItem('nuev');
    this.img        = localStorage.getItem('img');
    this.id_menu  = aRouter.snapshot.paramMap.get('id');
    this.getInformacionById();
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

  getInformacionById(){
    if(this.id_menu !== '' ){
      this._menuServices.getmenu(this.id_menu,this.id_usuario).subscribe((data : menuTable) =>{
        this.id_roll = data.id_roll;  
        this.titulo = data.titulo;  
        this.direccion_url = data.direccion_url;  

      })
    }
  }


  actualizar(){
    this.errorid_menu = false; 
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
    const menu  : menuTable={
      id_usuario: this.id_usuario,
      id_menu: this.id_menu,  
      id_roll: this.id_roll,  
      titulo: this.titulo,  
      direccion_url: this.direccion_url,  
      activo : 1
    }
    this._menuServices.updatemenu(menu).subscribe({
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
   selector: 'actualizar-dialog',
   templateUrl: 'actualizar-dialog.html',
   standalone: true,
   imports: [MatDialogModule, MatButtonModule],
   changeDetection: ChangeDetectionStrategy.OnPush,
 })
 export class DialogContentExampleDialog { }
