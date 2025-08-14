import { Component, ChangeDetectionStrategy, inject } from '@angular/core'; 
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



@Component({
  selector: 'app-ver-gestion_oficios',
  standalone: true,
  imports: [MatCardModule,MatIconModule,MatFormFieldModule,
             MatInputModule,FormsModule, ReactiveFormsModule,
             MatSlideToggleModule, MatDialogModule, MatButtonModule,
           ],
  templateUrl: './ver.component.html',
  styleUrl: './ver.component.scss'
})

export default class VerComponentgestion_oficios {
    id_estatusgestion_oficios: number |any; 
  listgestion_oficios: estatusgestion_oficiosTable[] = [];
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
  constructor( private aRouter:ActivatedRoute,private _estatusgestion_oficiosServices: estatusgestion_oficiosService,private router: Router) {
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


  goInicio() {
    this.router.navigate(['/index/estatusgestion_oficios']);
  }

  getInformacionById(){
    if(this.id_estatusgestion_oficios != '' ){
      this._estatusgestion_oficiosServices.estatusByIdgestion_oficios(this.id_estatusgestion_oficios,this.id_usuario).subscribe((data : estatusgestion_oficiosTable) =>{
         this.descripcion = data.descripcion;  
      })
    }
  }
}

