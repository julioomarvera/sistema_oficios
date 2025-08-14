import { Component, ChangeDetectionStrategy, inject } from '@angular/core'; 
import { ActivatedRoute, Router } from '@angular/router';
import { menuTable } from '../../../interfaces/menu/menu-table.interface';
import { menuService } from '../../../service/menu/menu.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';



@Component({
  selector: 'app-ver',
  standalone: true,
  imports: [MatCardModule,MatIconModule,MatFormFieldModule,
             MatInputModule,FormsModule, ReactiveFormsModule,
             MatSlideToggleModule, MatDialogModule, MatButtonModule],
  templateUrl: './ver.component.html',
  styleUrl: './ver.component.scss'
})

export default class VerComponent {
  id:number|any = ''
  listmenu: menuTable[] = [];
  readonly dialog = inject(MatDialog);
  token      : string |any; 
  id_usuario : string |any; 
  id_rol     : string |any; 
  imp        : string |any; 
  edit       : string |any; 
  elim       : string |any; 
  nuev       : string |any; 
  img        : string |any; 
  id_menu : number|any = '';
  resultadoid_menu: boolean = false; 
  errorid_menu: boolean = false; 

  id_roll : string|any = '';
  resultadoid_roll: boolean = false; 
  errorid_roll: boolean = false; 

  titulo : string|any = '';
  resultadotitulo: boolean = false; 
  errortitulo: boolean = false; 

  direccion_url : string|any = '';
  resultadodireccion_url: boolean = false; 
  errordireccion_url: boolean = false; 

  constructor( private aRouter:ActivatedRoute,private _menuServices: menuService,private router: Router) {
    this.id_menu = aRouter.snapshot.paramMap.get('id');
    this.getInformacionById();
    this.token      = localStorage.getItem('token');
    this.id_usuario = localStorage.getItem('id_usuario');
    this.id_rol     = localStorage.getItem('id_rol');
    this.imp        = localStorage.getItem('imp');
    this.edit       = localStorage.getItem('edit');
    this.elim       = localStorage.getItem('elim');
    this.nuev       = localStorage.getItem('nuev');
    this.img        = localStorage.getItem('img');
  }

  openHelper() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);
      dialogRef.afterClosed().subscribe(result => {
         console.log(`Dialog result: ${result}`);
      });
  }

  goInicio() {
    this.router.navigate(['/index/menu']);
  }

  getInformacionById(){
    if(this.id_menu !== '' ){
      this._menuServices.getmenu(this.id_menu,this.id_usuario).subscribe((data : menuTable) =>{
        this.id_roll = data.id_roll;  
        this.titulo = data.titulo;  
        this.direccion_url = data.direccion_url;  

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
