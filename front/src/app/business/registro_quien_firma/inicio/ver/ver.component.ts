import { Component, ChangeDetectionStrategy, inject } from '@angular/core'; 
import { ActivatedRoute, Router } from '@angular/router';
import { registro_quien_firmaTable } from '../../../../interfaces/registro_quien_firma/registro_quien_firma-table.interface';
import { registro_quien_firmaService } from '../../../../service/registro_quien_firma/registro_quien_firma.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import  VerComponentcat_firmante  from '../../cat_firmante/ver/ver.component';




@Component({
  selector: 'app-ver-registro_quien_firma',
  standalone: true,
  imports: [MatCardModule,MatIconModule,MatFormFieldModule,
             MatInputModule,FormsModule, ReactiveFormsModule,
             MatSlideToggleModule, MatDialogModule, MatButtonModule,
             VerComponentcat_firmante,
           ],
  templateUrl: './ver.component.html',
  styleUrl: './ver.component.scss'
})

export default class VerComponentregistro_quien_firma {
  id_cat_firmante: number | any; 
  id_registro_quien_firma: number |any; 
  listregistro_quien_firma: registro_quien_firmaTable[] = [];
  readonly dialog = inject(MatDialog);
  token      : string |any; 
  id_usuario : string |any; 
  id_rol     : string |any; 
  imp        : string |any; 
  edit       : string |any; 
  elim       : string |any; 
  nuev       : string |any; 
  img        : string |any; 
  constructor( private aRouter:ActivatedRoute, private _registro_quien_firmaServices: registro_quien_firmaService,private router: Router) {
    this.id_registro_quien_firma = aRouter.snapshot.paramMap.get('id_registro_quien_firma');
    this.id_cat_firmante = aRouter.snapshot.paramMap.get('id_cat_firmante');
    
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
    this.router.navigate(['/index/registro_quien_firma']);
  }
}
