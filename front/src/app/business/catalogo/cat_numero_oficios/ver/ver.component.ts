import { Component, ChangeDetectionStrategy, inject } from '@angular/core'; 
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { cat_numero_oficiosTable } from '../../../../interfaces/catalogo/cat_numero_oficios/cat_numero_oficios-table.interface';
import { cat_numero_oficiosService } from '../../../../service/catalogo/cat_numero_oficios/cat_numero_oficios.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';



@Component({
  selector: 'app-ver-cat_numero_oficios',
  standalone: true,
  imports: [MatCardModule,MatIconModule,MatFormFieldModule,
             MatInputModule,FormsModule, ReactiveFormsModule,
             MatSlideToggleModule, MatDialogModule, MatButtonModule],
  templateUrl: './ver.component.html',
  styleUrl: './ver.component.scss'
})

export default class VerComponentcat_numero_oficios {
  id_catalogo : number | any; 
  listcat_numero_oficios: cat_numero_oficiosTable[] = [];
  readonly dialog = inject(MatDialog);
  token      : string |any; 
  id_usuario : string |any; 
  id_rol     : string |any; 
  imp        : string |any; 
  edit       : string |any; 
  elim       : string |any; 
  nuev       : string |any; 
  img        : string |any; 
  PaginaActual  : string |any; 
  finalizado    : string |any; 
  id_cat_numero_oficios : number|any = '';
  resultadoid_cat_numero_oficios: boolean = false; 
  errorid_cat_numero_oficios: boolean = false; 

  descripcion : string|any = '';
  resultadodescripcion: boolean = false; 
  errordescripcion: boolean = false; 

  constructor(private _cat_numero_oficiosServices: cat_numero_oficiosService, private router: Router, private aRouter:ActivatedRoute, private _sanitizer: DomSanitizer) {
    this.id_catalogo = aRouter.snapshot.paramMap.get('id_catalogo');
    this.id_cat_numero_oficios = aRouter.snapshot.paramMap.get('id_cat_numero_oficios');
    this.getInformacionById();
    this.token        = localStorage.getItem('token');
    this.id_usuario   = localStorage.getItem('id_usuario');
    this.id_rol       = localStorage.getItem('id_rol');
    this.imp          = localStorage.getItem('imp');
    this.edit         = localStorage.getItem('edit');
    this.elim         = localStorage.getItem('elim');
    this.nuev         = localStorage.getItem('nuev');
    this.img          = localStorage.getItem('img');
    this.PaginaActual = '/index/nuevocat_numero_oficios';
    this.finalizado   = 1;
  }

  openHelper() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);
      dialogRef.afterClosed().subscribe(result => {
         console.log(`Dialog result: ${result}`);
      });
  }

  goInicio() {
    this.router.navigate(['/index/cat_numero_oficios']);
  }

  getInformacionById(){
    if(this.id_cat_numero_oficios !== '' ){
      this._cat_numero_oficiosServices.getcat_numero_oficios(this.id_cat_numero_oficios,this.id_usuario).subscribe((data : cat_numero_oficiosTable) =>{
        this.descripcion = data.descripcion;  

      })
    }
  }
}

//---------------------------------------------------------------------------->
//Modal
 @Component({
   selector: 'ver-dialog',
   templateUrl: 'ver-dialog.html',
   standalone: true,
   imports: [MatDialogModule, MatButtonModule],
   changeDetection: ChangeDetectionStrategy.OnPush,
 })
 export class DialogContentExampleDialog { }
