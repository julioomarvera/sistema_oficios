import { Component, ChangeDetectionStrategy, inject } from '@angular/core'; 
import { ActivatedRoute, Router } from '@angular/router';
import { registro_destinatarioTable } from '../../../../interfaces/registro_destinatario/registro_destinatario-table.interface';
import { registro_destinatarioService } from '../../../../service/registro_destinatario/registro_destinatario.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import  VerComponentcat_destinatario  from '../../cat_destinatario/ver/ver.component';




@Component({
  selector: 'app-ver-registro_destinatario',
  standalone: true,
  imports: [MatCardModule,MatIconModule,MatFormFieldModule,
             MatInputModule,FormsModule, ReactiveFormsModule,
             MatSlideToggleModule, MatDialogModule, MatButtonModule,
             VerComponentcat_destinatario,
           ],
  templateUrl: './ver.component.html',
  styleUrl: './ver.component.scss'
})

export default class VerComponentregistro_destinatario {
  id_cat_destinatario: number | any; 
  id_registro_destinatario: number |any; 
  listregistro_destinatario: registro_destinatarioTable[] = [];
  readonly dialog = inject(MatDialog);
  token      : string |any; 
  id_usuario : string |any; 
  id_rol     : string |any; 
  imp        : string |any; 
  edit       : string |any; 
  elim       : string |any; 
  nuev       : string |any; 
  img        : string |any; 
  constructor( private aRouter:ActivatedRoute, private _registro_destinatarioServices: registro_destinatarioService,private router: Router) {
    this.id_registro_destinatario = aRouter.snapshot.paramMap.get('id_registro_destinatario');
    this.id_cat_destinatario = aRouter.snapshot.paramMap.get('id_cat_destinatario');
    
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
    this.router.navigate(['/index/registro_destinatario']);
  }
}
