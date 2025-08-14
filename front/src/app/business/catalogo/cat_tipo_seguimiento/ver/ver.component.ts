import { Component, ChangeDetectionStrategy, inject } from '@angular/core'; 
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { cat_tipo_seguimientoTable } from '../../../../interfaces/catalogo/cat_tipo_seguimiento/cat_tipo_seguimiento-table.interface';
import { cat_tipo_seguimientoService } from '../../../../service/catalogo/cat_tipo_seguimiento/cat_tipo_seguimiento.service';
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
  selector: 'app-ver-cat_tipo_seguimiento',
  standalone: true,
  imports: [MatCardModule,MatIconModule,MatFormFieldModule,
             MatInputModule,FormsModule, ReactiveFormsModule,
             MatSlideToggleModule, MatDialogModule, MatButtonModule],
  templateUrl: './ver.component.html',
  styleUrl: './ver.component.scss'
})

export default class VerComponentcat_tipo_seguimiento {
  id_catalogo : number | any; 
  listcat_tipo_seguimiento: cat_tipo_seguimientoTable[] = [];
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
  id_cat_tipo_seguimiento : number|any = '';
  resultadoid_cat_tipo_seguimiento: boolean = false; 
  errorid_cat_tipo_seguimiento: boolean = false; 

  descripcion : string|any = '';
  resultadodescripcion: boolean = false; 
  errordescripcion: boolean = false; 

  constructor(private _cat_tipo_seguimientoServices: cat_tipo_seguimientoService, private router: Router, private aRouter:ActivatedRoute, private _sanitizer: DomSanitizer) {
    this.id_catalogo = aRouter.snapshot.paramMap.get('id_catalogo');
    this.id_cat_tipo_seguimiento = aRouter.snapshot.paramMap.get('id_cat_tipo_seguimiento');
    this.getInformacionById();
    this.token        = localStorage.getItem('token');
    this.id_usuario   = localStorage.getItem('id_usuario');
    this.id_rol       = localStorage.getItem('id_rol');
    this.imp          = localStorage.getItem('imp');
    this.edit         = localStorage.getItem('edit');
    this.elim         = localStorage.getItem('elim');
    this.nuev         = localStorage.getItem('nuev');
    this.img          = localStorage.getItem('img');
    this.PaginaActual = '/index/nuevocat_tipo_seguimiento';
    this.finalizado   = 1;
  }

  openHelper() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);
      dialogRef.afterClosed().subscribe(result => {
         console.log(`Dialog result: ${result}`);
      });
  }

  goInicio() {
    this.router.navigate(['/index/cat_tipo_seguimiento']);
  }

  getInformacionById(){
    if(this.id_cat_tipo_seguimiento !== '' ){
      this._cat_tipo_seguimientoServices.getcat_tipo_seguimiento(this.id_cat_tipo_seguimiento,this.id_usuario).subscribe((data : cat_tipo_seguimientoTable) =>{
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
