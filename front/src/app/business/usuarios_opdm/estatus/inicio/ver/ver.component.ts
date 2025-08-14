import { Component, ChangeDetectionStrategy, inject } from '@angular/core'; 
import { ActivatedRoute, Router } from '@angular/router';
import { estatususuarios_opdmTable }   from '../../../../../interfaces/usuarios_opdm/estatus/estatususuarios_opdm-table.interface';
import { estatususuarios_opdmService } from '../../../../../service/usuarios_opdm/estatus/estatususuarios_opdm.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';



@Component({
  selector: 'app-ver-usuarios_opdm',
  standalone: true,
  imports: [MatCardModule,MatIconModule,MatFormFieldModule,
             MatInputModule,FormsModule, ReactiveFormsModule,
             MatSlideToggleModule, MatDialogModule, MatButtonModule,
           ],
  templateUrl: './ver.component.html',
  styleUrl: './ver.component.scss'
})

export default class VerComponentusuarios_opdm {
    id_estatususuarios_opdm: number |any; 
  listusuarios_opdm: estatususuarios_opdmTable[] = [];
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
  constructor( private aRouter:ActivatedRoute,private _estatususuarios_opdmServices: estatususuarios_opdmService,private router: Router) {
    this.id_estatususuarios_opdm = aRouter.snapshot.paramMap.get('id_estatususuarios_opdm');
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
    this.router.navigate(['/index/estatususuarios_opdm']);
  }

  getInformacionById(){
    if(this.id_estatususuarios_opdm != '' ){
      this._estatususuarios_opdmServices.estatusByIdusuarios_opdm(this.id_estatususuarios_opdm,this.id_usuario).subscribe((data : estatususuarios_opdmTable) =>{
         this.descripcion = data.descripcion;  
      })
    }
  }
}

