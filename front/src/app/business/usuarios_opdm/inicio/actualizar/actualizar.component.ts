import { Component , ChangeDetectionStrategy , inject , ViewChild } from '@angular/core'; 
import { ActivatedRoute, Router } from '@angular/router';
import { usuarios_opdmTable } from '../../../../interfaces/usuarios_opdm/usuarios_opdm-table.interface';
import { usuarios_opdmService } from '../../../../service/usuarios_opdm/usuarios_opdm.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import Swal from 'sweetalert2'
import  ActualizarComponentusers_opdm  from '../../users_opdm/actualizar/actualizar.component';




@Component({
  selector: 'app-actualizar-usuarios_opdm',
  standalone: true,
  imports: [MatCardModule,MatIconModule,MatFormFieldModule,
             MatInputModule,FormsModule, ReactiveFormsModule,
             MatSlideToggleModule, MatDialogModule, MatButtonModule,
             ActualizarComponentusers_opdm,
           ],
  templateUrl: './actualizar.component.html',
  styleUrl: './actualizar.component.scss'
})

export default class ActualizarComponentusuarios_opdm {
  id_users_opdm: number | any; 
    id_usuarios_opdm: number |any; 
  listusuarios_opdm: usuarios_opdmTable[] = [];
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
  @ViewChild(ActualizarComponentusers_opdm) childusers_opdm: any;
   
  comandoVerificacionusers_opdm:string |any  = 'no';
  respuestaVerificionusers_opdm:string  |any  = 'no';
  comandoActualizarusers_opdm:string  |any = 'no';

  constructor( private aRouter:ActivatedRoute, private _usuarios_opdmServices: usuarios_opdmService,private router: Router) {
    this.id_usuarios_opdm = aRouter.snapshot.paramMap.get('id_usuarios_opdm');
    this.id_users_opdm = aRouter.snapshot.paramMap.get('id_users_opdm');
    
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
    this.comandoVerificacionActualizacionusers_opdm();
  }
  comandoVerificacionActualizacionusers_opdm(){ 
    if(this.id_users_opdm != 'null'){ 
      this.comandoVerificacionusers_opdm= 'verificar';
    }
    else{
     this.comandoActualizacion()
    }

  }

  //Recibir Mensaje--------------------------------------------------------------

  recibirMensajeusers_opdm(mensaje:string){
    this.respuestaVerificionusers_opdm = mensaje;
    if(this.respuestaVerificionusers_opdm == 'OK'){
      this.comandoActualizacion();
    }
    else{
      this.loading = false;
    }
  }

  //Comando Actualizacion--------------------------------------------------------------

  comandoActualizacion(){
    setTimeout(() => {
      this.comandoActualizacionusers_opdm();
    }, 100);
  }
  comandoActualizacionusers_opdm(){ 
    if(this.id_users_opdm != 'null'){ 
      this.comandoActualizarusers_opdm= 'actualizar';
    }
    else{ 
      this.finActualizacion(); 
    }
  }


  //Recibir Mensaje Actualizacion--------------------------------------------------------------

  recibirMensajeActualizacionusers_opdm(mensaje:string){
    this.comandoActualizarusers_opdm = mensaje;
    if(this.comandoActualizarusers_opdm == 'OK'){
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
    this.router.navigate(['/index/usuarios_opdm']);
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
