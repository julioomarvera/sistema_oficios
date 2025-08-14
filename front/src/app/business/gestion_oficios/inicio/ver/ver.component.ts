import { Component, ChangeDetectionStrategy, inject } from '@angular/core'; 
import { ActivatedRoute, Router } from '@angular/router';
import { gestion_oficiosTable } from '../../../../interfaces/gestion_oficios/gestion_oficios-table.interface';
import { gestion_oficiosService } from '../../../../service/gestion_oficios/gestion_oficios.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import  VerComponentoficios  from '../../oficios/ver/ver.component';




@Component({
  selector: 'app-ver-gestion_oficios',
  standalone: true,
  imports: [MatCardModule,MatIconModule,MatFormFieldModule,
             MatInputModule,FormsModule, ReactiveFormsModule,
             MatSlideToggleModule, MatDialogModule, MatButtonModule,
             VerComponentoficios,
           ],
  templateUrl: './ver.component.html',
  styleUrl: './ver.component.scss'
})

export default class VerComponentgestion_oficios {
  id_oficios: number | any; 
  id_gestion_oficios: number |any; 
  listgestion_oficios: gestion_oficiosTable[] = [];
  readonly dialog = inject(MatDialog);
  token      : string |any; 
  id_usuario : string |any; 
  id_rol     : string |any; 
  imp        : string |any; 
  edit       : string |any; 
  elim       : string |any; 
  nuev       : string |any; 
  img        : string |any; 
  constructor( private aRouter:ActivatedRoute, private _gestion_oficiosServices: gestion_oficiosService,private router: Router) {
    this.id_gestion_oficios = aRouter.snapshot.paramMap.get('id_gestion_oficios');
    this.id_oficios = aRouter.snapshot.paramMap.get('id_oficios');
    
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
    this.router.navigate(['/index/gestion_oficios']);
  }
}
