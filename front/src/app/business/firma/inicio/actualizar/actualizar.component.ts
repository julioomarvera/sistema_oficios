import { Component , ChangeDetectionStrategy , inject , ViewChild } from '@angular/core'; 
import { ActivatedRoute, Router } from '@angular/router';
import { firmaTable } from '../../../../interfaces/firma/firma-table.interface';
import { firmaService } from '../../../../service/firma/firma.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import Swal from 'sweetalert2'
import  ActualizarComponentfirma_coordinador  from '../../firma_coordinador/actualizar/actualizar.component';




@Component({
  selector: 'app-actualizar-firma',
  standalone: true,
  imports: [MatCardModule,MatIconModule,MatFormFieldModule,
             MatInputModule,FormsModule, ReactiveFormsModule,
             MatSlideToggleModule, MatDialogModule, MatButtonModule,
             ActualizarComponentfirma_coordinador,
           ],
  templateUrl: './actualizar.component.html',
  styleUrl: './actualizar.component.scss'
})

export default class ActualizarComponentfirma {
  id_firma_coordinador: number | any; 
    id_firma: number |any; 
  listfirma: firmaTable[] = [];
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
  @ViewChild(ActualizarComponentfirma_coordinador) childfirma_coordinador: any;
   
  comandoVerificacionfirma_coordinador:string |any  = 'no';
  respuestaVerificionfirma_coordinador:string  |any  = 'no';
  comandoActualizarfirma_coordinador:string  |any = 'no';

  constructor( private aRouter:ActivatedRoute, private _firmaServices: firmaService,private router: Router) {
    this.id_firma = aRouter.snapshot.paramMap.get('id_firma');
    this.id_firma_coordinador = aRouter.snapshot.paramMap.get('id_firma_coordinador');
    
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
    this.comandoVerificacionActualizacionfirma_coordinador();
  }
  comandoVerificacionActualizacionfirma_coordinador(){ 
    if(this.id_firma_coordinador != 'null'){ 
      this.comandoVerificacionfirma_coordinador= 'verificar';
    }
    else{
     this.comandoActualizacion()
    }

  }

  //Recibir Mensaje--------------------------------------------------------------

  recibirMensajefirma_coordinador(mensaje:string){
    this.respuestaVerificionfirma_coordinador = mensaje;
    if(this.respuestaVerificionfirma_coordinador == 'OK'){
      this.comandoActualizacion();
    }
    else{
      this.loading = false;
    }
  }

  //Comando Actualizacion--------------------------------------------------------------

  comandoActualizacion(){
    setTimeout(() => {
      this.comandoActualizacionfirma_coordinador();
    }, 100);
  }
  comandoActualizacionfirma_coordinador(){ 
    if(this.id_firma_coordinador != 'null'){ 
      this.comandoActualizarfirma_coordinador= 'actualizar';
    }
    else{ 
      this.finActualizacion(); 
    }
  }


  //Recibir Mensaje Actualizacion--------------------------------------------------------------

  recibirMensajeActualizacionfirma_coordinador(mensaje:string){
    this.comandoActualizarfirma_coordinador = mensaje;
    if(this.comandoActualizarfirma_coordinador == 'OK'){
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
    this.router.navigate(['/index/firma']);
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
