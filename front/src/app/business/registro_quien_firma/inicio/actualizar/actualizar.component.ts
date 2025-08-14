import { Component , ChangeDetectionStrategy , inject , ViewChild } from '@angular/core'; 
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
import Swal from 'sweetalert2'
import  ActualizarComponentcat_firmante  from '../../cat_firmante/actualizar/actualizar.component';




@Component({
  selector: 'app-actualizar-registro_quien_firma',
  standalone: true,
  imports: [MatCardModule,MatIconModule,MatFormFieldModule,
             MatInputModule,FormsModule, ReactiveFormsModule,
             MatSlideToggleModule, MatDialogModule, MatButtonModule,
             ActualizarComponentcat_firmante,
           ],
  templateUrl: './actualizar.component.html',
  styleUrl: './actualizar.component.scss'
})

export default class ActualizarComponentregistro_quien_firma {
  id_cat_firmante: number | any; 
    id_registro_quien_firma: number |any; 
  listregistro_quien_firma: registro_quien_firmaTable[] = [];
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
  @ViewChild(ActualizarComponentcat_firmante) childcat_firmante: any;
   
  comandoVerificacioncat_firmante:string |any  = 'no';
  respuestaVerificioncat_firmante:string  |any  = 'no';
  comandoActualizarcat_firmante:string  |any = 'no';

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
  comandoVerificacionActualizacion(){
    this.loading = true;
    this.comandoVerificacionActualizacioncat_firmante();
  }
  comandoVerificacionActualizacioncat_firmante(){ 
    if(this.id_cat_firmante != 'null'){ 
      this.comandoVerificacioncat_firmante= 'verificar';
    }
    else{
     this.comandoActualizacion()
    }

  }

  //Recibir Mensaje--------------------------------------------------------------

  recibirMensajecat_firmante(mensaje:string){
    this.respuestaVerificioncat_firmante = mensaje;
    if(this.respuestaVerificioncat_firmante == 'OK'){
      this.comandoActualizacion();
    }
    else{
      this.loading = false;
    }
  }

  //Comando Actualizacion--------------------------------------------------------------

  comandoActualizacion(){
    setTimeout(() => {
      this.comandoActualizacioncat_firmante();
    }, 100);
  }
  comandoActualizacioncat_firmante(){ 
    if(this.id_cat_firmante != 'null'){ 
      this.comandoActualizarcat_firmante= 'actualizar';
    }
    else{ 
      this.finActualizacion(); 
    }
  }


  //Recibir Mensaje Actualizacion--------------------------------------------------------------

  recibirMensajeActualizacioncat_firmante(mensaje:string){
    this.comandoActualizarcat_firmante = mensaje;
    if(this.comandoActualizarcat_firmante == 'OK'){
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
    this.router.navigate(['/index/registro_quien_firma']);
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
