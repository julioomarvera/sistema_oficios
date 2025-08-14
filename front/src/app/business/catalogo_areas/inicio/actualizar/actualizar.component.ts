import { Component , ChangeDetectionStrategy , inject , ViewChild } from '@angular/core'; 
import { ActivatedRoute, Router } from '@angular/router';
import { catalogo_areasTable } from '../../../../interfaces/catalogo_areas/catalogo_areas-table.interface';
import { catalogo_areasService } from '../../../../service/catalogo_areas/catalogo_areas.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import Swal from 'sweetalert2'
import  ActualizarComponentcat_areas  from '../../cat_areas/actualizar/actualizar.component';




@Component({
  selector: 'app-actualizar-catalogo_areas',
  standalone: true,
  imports: [MatCardModule,MatIconModule,MatFormFieldModule,
             MatInputModule,FormsModule, ReactiveFormsModule,
             MatSlideToggleModule, MatDialogModule, MatButtonModule,
             ActualizarComponentcat_areas,
           ],
  templateUrl: './actualizar.component.html',
  styleUrl: './actualizar.component.scss'
})

export default class ActualizarComponentcatalogo_areas {
  id_cat_areas: number | any; 
    id_catalogo_areas: number |any; 
  listcatalogo_areas: catalogo_areasTable[] = [];
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
  @ViewChild(ActualizarComponentcat_areas) childcat_areas: any;
   
  comandoVerificacioncat_areas:string |any  = 'no';
  respuestaVerificioncat_areas:string  |any  = 'no';
  comandoActualizarcat_areas:string  |any = 'no';

  constructor( private aRouter:ActivatedRoute, private _catalogo_areasServices: catalogo_areasService,private router: Router) {
    this.id_catalogo_areas = aRouter.snapshot.paramMap.get('id_catalogo_areas');
    this.id_cat_areas = aRouter.snapshot.paramMap.get('id_cat_areas');
    
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
    this.comandoVerificacionActualizacioncat_areas();
  }
  comandoVerificacionActualizacioncat_areas(){ 
    if(this.id_cat_areas != 'null'){ 
      this.comandoVerificacioncat_areas= 'verificar';
    }
    else{
     this.comandoActualizacion()
    }

  }

  //Recibir Mensaje--------------------------------------------------------------

  recibirMensajecat_areas(mensaje:string){
    this.respuestaVerificioncat_areas = mensaje;
    if(this.respuestaVerificioncat_areas == 'OK'){
      this.comandoActualizacion();
    }
    else{
      this.loading = false;
    }
  }

  //Comando Actualizacion--------------------------------------------------------------

  comandoActualizacion(){
    setTimeout(() => {
      this.comandoActualizacioncat_areas();
    }, 100);
  }
  comandoActualizacioncat_areas(){ 
    if(this.id_cat_areas != 'null'){ 
      this.comandoActualizarcat_areas= 'actualizar';
    }
    else{ 
      this.finActualizacion(); 
    }
  }


  //Recibir Mensaje Actualizacion--------------------------------------------------------------

  recibirMensajeActualizacioncat_areas(mensaje:string){
    this.comandoActualizarcat_areas = mensaje;
    if(this.comandoActualizarcat_areas == 'OK'){
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
    this.router.navigate(['/index/catalogo_areas']);
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
