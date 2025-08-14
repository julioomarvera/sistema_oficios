import { Component , ChangeDetectionStrategy , inject , ViewChild } from '@angular/core'; 
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
import Swal from 'sweetalert2'
import  ActualizarComponentcat_destinatario  from '../../cat_destinatario/actualizar/actualizar.component';




@Component({
  selector: 'app-actualizar-registro_destinatario',
  standalone: true,
  imports: [MatCardModule,MatIconModule,MatFormFieldModule,
             MatInputModule,FormsModule, ReactiveFormsModule,
             MatSlideToggleModule, MatDialogModule, MatButtonModule,
             ActualizarComponentcat_destinatario,
           ],
  templateUrl: './actualizar.component.html',
  styleUrl: './actualizar.component.scss'
})

export default class ActualizarComponentregistro_destinatario {
  id_cat_destinatario: number | any; 
    id_registro_destinatario: number |any; 
  listregistro_destinatario: registro_destinatarioTable[] = [];
  readonly dialog = inject(MatDialog);
  token                      : string |any; 
  id_usuario                 : string |any; 
  id_rol                     : string |any; 
  imp                        : string |any; 
  edit                       : string |any; 
  elim                       : string |any; 
  nuev                       : string |any; 
  img                        : string |any; 
  Actualizacion              : string |any; 
  VerificacionActualizacion  : string |any; 
  loading : boolean = false; 
  @ViewChild(ActualizarComponentcat_destinatario) childcat_destinatario: any;
   
  comandoVerificacioncat_destinatario:string |any  = 'no';
  respuestaVerificioncat_destinatario:string  |any  = 'no';
  comandoActualizarcat_destinatario:string  |any = 'no';

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
  comandoVerificacionActualizacion(){
    this.loading = true;
    this.comandoVerificacionActualizacioncat_destinatario();
  }
  comandoVerificacionActualizacioncat_destinatario(){ 
    if(this.id_cat_destinatario != 'null'){ 
      this.comandoVerificacioncat_destinatario= 'verificar';
    }
    else{
     this.comandoActualizacion()
    }

  }

  //Recibir Mensaje--------------------------------------------------------------

  recibirMensajecat_destinatario(mensaje:string){
    this.respuestaVerificioncat_destinatario = mensaje;
    if(this.respuestaVerificioncat_destinatario == 'OK'){
      this.comandoActualizacion();
    }
    else{
      this.loading = false;
    }
  }

  //Comando Actualizacion--------------------------------------------------------------

  comandoActualizacion(){
    setTimeout(() => {
      this.comandoActualizacioncat_destinatario();
    }, 100);
  }
  comandoActualizacioncat_destinatario(){ 
    if(this.id_cat_destinatario != 'null'){ 
      this.comandoActualizarcat_destinatario= 'actualizar';
    }
    else{ 
      this.finActualizacion(); 
    }
  }


  //Recibir Mensaje Actualizacion--------------------------------------------------------------

  recibirMensajeActualizacioncat_destinatario(mensaje:string){
    this.comandoActualizarcat_destinatario = mensaje;
    if(this.comandoActualizarcat_destinatario == 'OK'){
      setTimeout(() => {
        this.finActualizacion();
      }, 300);
    }
    else{
      this.loading = false;
    }
  }

  //Fin de Actualizacion--------------------------------------------------------------

  finActualizacion(){
    this.goInicio();
  }
  goInicio() {
    this.router.navigate(['/index/registro_destinatario']);
  }

  //Mensaje de Swal/--------------------------------------------------------->
  mensajeAlertaError(titulo:string){  
    Swal.fire({ 
      position: 'center',
      icon: 'error',
      title: titulo,
      showConfirmButton: false,
      timer: 2000
    });
  }

  mensajeAlertaSuccess(titulo:string){ 
    Swal.fire({
      position: 'center', 
      icon: 'success', 
      title: titulo, 
      showConfirmButton: false, 
      timer: 1500 
    }); 
  } 

}
