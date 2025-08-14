import { Component, ChangeDetectionStrategy, inject } from '@angular/core'; 
import { ActivatedRoute, Router } from '@angular/router';
import { rollesTable } from '../../../interfaces/rolles/rolles-table.interface';
import { rollesService } from '../../../service/rolles/rolles.service';
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
  listrolles: rollesTable[] = [];
  readonly dialog = inject(MatDialog);
  token      : string |any; 
  id_usuario : string |any; 
  id_rol     : string |any; 
  imp        : string |any; 
  edit       : string |any; 
  elim       : string |any; 
  nuev       : string |any; 
  img        : string |any; 
  id_roll : number|any = '';
  resultadoid_roll: boolean = false; 
  errorid_roll: boolean = false; 

  descripcion : string|any = '';
  resultadodescripcion: boolean = false; 
  errordescripcion: boolean = false; 

  crear : boolean|any = false;
  resultadocrear: boolean = false; 
  errorcrear: boolean = false; 

  ver : boolean|any = false;
  resultadover: boolean = false; 
  errorver: boolean = false; 

  editar : boolean|any = false;
  resultadoeditar: boolean = false; 
  erroreditar: boolean = false; 

  eliminar : boolean|any = false;
  resultadoeliminar: boolean = false; 
  erroreliminar: boolean = false; 

  constructor( private aRouter:ActivatedRoute,private _rollesServices: rollesService,private router: Router) {
    this.id_roll = aRouter.snapshot.paramMap.get('id');
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
    this.router.navigate(['/index/rolles']);
  }

  getInformacionById(){
    if(this.id_roll !== '' ){
      this._rollesServices.getrolles(this.id_roll,this.id_usuario).subscribe((data : rollesTable) =>{
        this.descripcion = data.descripcion;  
        this.crear = data.crear;  
        this.ver = data.ver;  
        this.editar = data.editar;  
        this.eliminar = data.eliminar;  

        if(this.crear == true ){  
          this.resultadocrear = true;
          this.crear = 'SI';
        }
        else{
          this.crear = 'NO';
        }
        if(this.ver == true ){  
          this.resultadover = true;
          this.ver = 'SI';
        }
        else{
          this.ver = 'NO';
        }
        if(this.editar == true ){  
          this.resultadoeditar = true;
          this.editar = 'SI';
        }
        else{
          this.editar = 'NO';
        }
        if(this.eliminar == true ){  
          this.resultadoeliminar = true;
          this.eliminar = 'SI';
        }
        else{
          this.eliminar = 'NO';
        }
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
