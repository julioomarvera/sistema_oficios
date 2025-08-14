import { Component, ChangeDetectionStrategy, inject } from '@angular/core'; 
import { ActivatedRoute, Router } from '@angular/router';
import { estatuscatalogo_empleadosTable }   from '../../../../../interfaces/catalogo_empleados/estatus/estatuscatalogo_empleados-table.interface';
import { estatuscatalogo_empleadosService } from '../../../../../service/catalogo_empleados/estatus/estatuscatalogo_empleados.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';



@Component({
  selector: 'app-ver-catalogo_empleados',
  standalone: true,
  imports: [MatCardModule,MatIconModule,MatFormFieldModule,
             MatInputModule,FormsModule, ReactiveFormsModule,
             MatSlideToggleModule, MatDialogModule, MatButtonModule,
           ],
  templateUrl: './ver.component.html',
  styleUrl: './ver.component.scss'
})

export default class VerComponentcatalogo_empleados {
    id_estatuscatalogo_empleados: number |any; 
  listcatalogo_empleados: estatuscatalogo_empleadosTable[] = [];
  readonly dialog = inject(MatDialog);
  token      : string |any; 
  id_usuario : string |any; 
  id_rol     : string |any; 
  imp        : string |any; 
  edit       : string |any; 
  elim       : string |any; 
  nuev       : string |any; 
  img        : string |any; 
  descripcion: string |any; 
  constructor( private aRouter:ActivatedRoute,private _estatuscatalogo_empleadosServices: estatuscatalogo_empleadosService,private router: Router) {
    this.id_estatuscatalogo_empleados = aRouter.snapshot.paramMap.get('id_estatuscatalogo_empleados');
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


  goInicio() {
    this.router.navigate(['/index/estatuscatalogo_empleados']);
  }

  getInformacionById(){
    if(this.id_estatuscatalogo_empleados != '' ){
      this._estatuscatalogo_empleadosServices.estatusByIdcatalogo_empleados(this.id_estatuscatalogo_empleados,this.id_usuario).subscribe((data : estatuscatalogo_empleadosTable) =>{
         this.descripcion = data.descripcion;  
      })
    }
  }
}

