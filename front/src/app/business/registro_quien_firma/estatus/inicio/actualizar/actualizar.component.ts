import { Component , ChangeDetectionStrategy , inject , ViewChild } from '@angular/core'; 
import { ActivatedRoute, Router } from '@angular/router';
import { estatusregistro_quien_firmaTable }   from '../../../../../interfaces/registro_quien_firma/estatus/estatusregistro_quien_firma-table.interface';
import { estatusregistro_quien_firmaService } from '../../../../../service/registro_quien_firma/estatus/estatusregistro_quien_firma.service';
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
  selector: 'app-actualizar-registro_quien_firma',
  standalone: true,
  imports: [MatCardModule,MatIconModule,MatFormFieldModule,
             MatInputModule,FormsModule, ReactiveFormsModule,
             MatSlideToggleModule, MatDialogModule, MatButtonModule,
           ],
  templateUrl: './actualizar.component.html',
  styleUrl: './actualizar.component.scss'
})

export default class ActualizarComponentregistro_quien_firma {
  id_estatusregistro_quien_firma: number |any; 
  descripcion : number |any = ''; 
  listregistro_quien_firma: estatusregistro_quien_firmaTable[] = [];
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

  constructor( private aRouter:ActivatedRoute, private _estatusregistro_quien_firmaServices: estatusregistro_quien_firmaService,private router: Router) {
    this.id_estatusregistro_quien_firma = aRouter.snapshot.paramMap.get('id_estatusregistro_quien_firma');
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
    if(this.id_estatusregistro_quien_firma != '' ){ 
      this. _estatusregistro_quien_firmaServices.estatusByIdregistro_quien_firma(this.id_estatusregistro_quien_firma , this.id_usuario).subscribe((data:estatusregistro_quien_firmaTable)=>{   
        this.descripcion = data.descripcion;   
      }) 
    } 
  } 
  actualizarEstatus(){ 
    const estatus  : estatusregistro_quien_firmaTable={
      id_estatusregistro_quien_firma  : this.id_estatusregistro_quien_firma, 
      descripcion : this.descripcion,
      id_usuario : this.id_usuario, 
      activo : 1, 
    } 
    this. _estatusregistro_quien_firmaServices.updateestatusregistro_quien_firma(estatus).subscribe({ 
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
    this.router.navigate(['/index/estatusregistro_quien_firma']);
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
