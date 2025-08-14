import { Component, ChangeDetectionStrategy, inject } from '@angular/core'; 
import { ActivatedRoute, Router } from '@angular/router';
import { catalogo_empleadosTable } from '../../../../interfaces/catalogo_empleados/catalogo_empleados-table.interface';
import { catalogo_empleadosService } from '../../../../service/catalogo_empleados/catalogo_empleados.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import  VerComponentcat_empleado  from '../../cat_empleados/ver/ver.component';




@Component({
  selector: 'app-ver-catalogo_empleados',
  standalone: true,
  imports: [MatCardModule,MatIconModule,MatFormFieldModule,
             MatInputModule,FormsModule, ReactiveFormsModule,
             MatSlideToggleModule, MatDialogModule, MatButtonModule,
             VerComponentcat_empleado,
           ],
  templateUrl: './ver.component.html',
  styleUrl: './ver.component.scss'
})

export default class VerComponentcatalogo_empleados {
  id_cat_empleados: number | any; 
  id_catalogo_empleados: number |any; 
  listcatalogo_empleados: catalogo_empleadosTable[] = [];
  readonly dialog = inject(MatDialog);
  token      : string |any; 
  id_usuario : string |any; 
  id_rol     : string |any; 
  imp        : string |any; 
  edit       : string |any; 
  elim       : string |any; 
  nuev       : string |any; 
  img        : string |any; 
  constructor( private aRouter:ActivatedRoute, private _catalogo_empleadosServices: catalogo_empleadosService,private router: Router) {
    this.id_catalogo_empleados = aRouter.snapshot.paramMap.get('id_catalogo_empleados');
    this.id_cat_empleados = aRouter.snapshot.paramMap.get('id_cat_empleados');
    
    this.token      = localStorage.getItem('token');
    this.id_usuario = localStorage.getItem('id_usuario');
    this.id_rol     = localStorage.getItem('id_rol');
    this.imp        = localStorage.getItem('imp');
    this.edit       = localStorage.getItem('edit');
    this.elim       = localStorage.getItem('elim');
    this.nuev       = localStorage.getItem('nuev');
    this.img        = localStorage.getItem('img');
  }
  goInicio() {
    this.router.navigate(['/index/catalogo_empleados']);
  }
}
