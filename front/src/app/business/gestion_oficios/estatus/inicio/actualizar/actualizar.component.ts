import { Component , ChangeDetectionStrategy , inject , ViewChild } from '@angular/core'; 
import { ActivatedRoute, Router } from '@angular/router';
import { estatusgestion_oficiosTable }   from '../../../../../interfaces/gestion_oficios/estatus/estatusgestion_oficios-table.interface';
import { estatusgestion_oficiosService } from '../../../../../service/gestion_oficios/estatus/estatusgestion_oficios.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import Swal from 'sweetalert2'
import { HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: 'app-actualizar-gestion_oficios',
  standalone: true,
  imports: [MatCardModule,MatIconModule,MatFormFieldModule,
             MatInputModule,FormsModule, ReactiveFormsModule,
             MatSlideToggleModule, MatDialogModule, MatButtonModule,
           ],
  templateUrl: './actualizar.component.html',
  styleUrl: './actualizar.component.scss'
})

export default class ActualizarComponentgestion_oficios {
  id_estatusgestion_oficios: number |any; 
  descripcion : number |any = ''; 
  listgestion_oficios: estatusgestion_oficiosTable[] = [];
  readonly dialog = inject(MatDialog);
  token                      : string |any; 
  id_usuario                 : string |any; 
  id_rol                     : string |any; 
  imp                        : string |any; 
  edit                       : string |any; 
  elim                       : string |any; 
  nuev                       : string |any; 
  img                        : string |any; 
  Actualizacion              : string |any; 
  estatusActualizacion  : string |any; 
  finalizado                 : number |any; 
  loading : boolean = false; 

  constructor( private aRouter:ActivatedRoute, private _estatusgestion_oficiosServices: estatusgestion_oficiosService,private router: Router) {
    this.id_estatusgestion_oficios = aRouter.snapshot.paramMap.get('id_estatusgestion_oficios');
    this.token      = localStorage.getItem('token');
    this.id_usuario = localStorage.getItem('id_usuario');
    this.id_rol     = localStorage.getItem('id_rol');
    this.imp        = localStorage.getItem('imp');
    this.edit       = localStorage.getItem('edit');
    this.elim       = localStorage.getItem('elim');
    this.nuev       = localStorage.getItem('nuev');
    this.img        = localStorage.getItem('img');
    this.getInformacionById();
  }
  getInformacionById(){ 
    if(this.id_estatusgestion_oficios != '' ){ 
      this. _estatusgestion_oficiosServices.estatusByIdgestion_oficios(this.id_estatusgestion_oficios , this.id_usuario).subscribe((data:estatusgestion_oficiosTable)=>{   
        this.descripcion = data.descripcion;   
      }) 
    } 
  } 
  actualizarEstatus(){ 
    const estatus  : estatusgestion_oficiosTable={
      id_estatusgestion_oficios  : this.id_estatusgestion_oficios, 
      descripcion : this.descripcion,
      id_usuario : this.id_usuario, 
      activo : 1, 
    } 
    this. _estatusgestion_oficiosServices.updateestatusgestion_oficios(estatus).subscribe({ 
    next: (v) => { 
            this.mensajeAlertaSuccess('Parámetro almacenado correctamente'); 
            this.goInicio(); 
    }, 
    error: (event: HttpErrorResponse) => { 
            this.mensajeAlertaError('No fue posible actualizar el parámetro, favor de intentar nuevamente'); 
    }, 
    complete: () => console.info('complete')  
    }) 
  } 
  goInicio() {
    this.router.navigate(['/index/estatusgestion_oficios']);
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
