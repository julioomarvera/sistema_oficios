import { Component , ChangeDetectionStrategy , inject , ViewChild } from '@angular/core'; 
import { ActivatedRoute, Router } from '@angular/router';
import { estatuscatalogo_areasTable }   from '../../../../../interfaces/catalogo_areas/estatus/estatuscatalogo_areas-table.interface';
import { estatuscatalogo_areasService } from '../../../../../service/catalogo_areas/estatus/estatuscatalogo_areas.service';
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
  selector: 'app-actualizar-catalogo_areas',
  standalone: true,
  imports: [MatCardModule,MatIconModule,MatFormFieldModule,
             MatInputModule,FormsModule, ReactiveFormsModule,
             MatSlideToggleModule, MatDialogModule, MatButtonModule,
           ],
  templateUrl: './actualizar.component.html',
  styleUrl: './actualizar.component.scss'
})

export default class ActualizarComponentcatalogo_areas {
  id_estatuscatalogo_areas: number |any; 
  descripcion : number |any = ''; 
  listcatalogo_areas: estatuscatalogo_areasTable[] = [];
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

  constructor( private aRouter:ActivatedRoute, private _estatuscatalogo_areasServices: estatuscatalogo_areasService,private router: Router) {
    this.id_estatuscatalogo_areas = aRouter.snapshot.paramMap.get('id_estatuscatalogo_areas');
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
    if(this.id_estatuscatalogo_areas != '' ){ 
      this. _estatuscatalogo_areasServices.estatusByIdcatalogo_areas(this.id_estatuscatalogo_areas , this.id_usuario).subscribe((data:estatuscatalogo_areasTable)=>{   
        this.descripcion = data.descripcion;   
      }) 
    } 
  } 
  actualizarEstatus(){ 
    const estatus  : estatuscatalogo_areasTable={
      id_estatuscatalogo_areas  : this.id_estatuscatalogo_areas, 
      descripcion : this.descripcion,
      id_usuario : this.id_usuario, 
      activo : 1, 
    } 
    this. _estatuscatalogo_areasServices.updateestatuscatalogo_areas(estatus).subscribe({ 
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
    this.router.navigate(['/index/estatuscatalogo_areas']);
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
