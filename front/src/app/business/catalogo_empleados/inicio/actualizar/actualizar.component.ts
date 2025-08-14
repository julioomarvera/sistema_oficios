import { Component , ChangeDetectionStrategy , inject , ViewChild } from '@angular/core'; 
import { ActivatedRoute, Router } from '@angular/router';
import { catalogo_empleadosTable } from '../../../../interfaces/catalogo_empleados/catalogo_empleados-table.interface';
import { catalogo_empleadosService } from '../../../../service/catalogo_empleados/catalogo_empleados.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import Swal from 'sweetalert2'
import  ActualizarComponentcat_empleados  from '../../cat_empleados/actualizar/actualizar.component';




@Component({
  selector: 'app-actualizar-catalogo_empleados',
  standalone: true,
  imports: [MatCardModule,MatIconModule,MatFormFieldModule,
             MatInputModule,FormsModule, ReactiveFormsModule,
             MatSlideToggleModule, MatDialogModule, MatButtonModule,
             ActualizarComponentcat_empleados,
           ],
  templateUrl: './actualizar.component.html',
  styleUrl: './actualizar.component.scss'
})

export default class ActualizarComponentcatalogo_empleados {
  id_cat_empleados: number | any; 
    id_catalogo_empleados: number |any; 
  listcatalogo_empleados: catalogo_empleadosTable[] = [];
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
  @ViewChild(ActualizarComponentcat_empleados) childcat_empleados: any;
   
  comandoVerificacioncat_empleados:string |any  = 'no';
  respuestaVerificioncat_empleados:string  |any  = 'no';
  comandoActualizarcat_empleados:string  |any = 'no';

  constructor( private aRouter:ActivatedRoute, private _catalogo_empleadosServices: catalogo_empleadosService,private router: Router) {
    this.id_catalogo_empleados = aRouter.snapshot.paramMap.get('id_catalogo_empleados');
    this.id_cat_empleados = aRouter.snapshot.paramMap.get('id_cat_empleados');
    
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
    this.comandoVerificacionActualizacioncat_empleados();
  }
  comandoVerificacionActualizacioncat_empleados(){ 
    if(this.id_cat_empleados != 'null'){ 
      this.comandoVerificacioncat_empleados= 'verificar';
    }
    else{
     this.comandoActualizacion()
    }

  }

  //Recibir Mensaje--------------------------------------------------------------

  recibirMensajecat_empleados(mensaje:string){
    this.respuestaVerificioncat_empleados = mensaje;
    if(this.respuestaVerificioncat_empleados == 'OK'){
      this.comandoActualizacion();
    }
    else{
      this.loading = false;
    }
  }

  //Comando Actualizacion--------------------------------------------------------------

  comandoActualizacion(){
    setTimeout(() => {
      this.comandoActualizacioncat_empleados();
    }, 100);
  }
  comandoActualizacioncat_empleados(){ 
    if(this.id_cat_empleados != 'null'){ 
      this.comandoActualizarcat_empleados= 'actualizar';
    }
    else{ 
      this.finActualizacion(); 
    }
  }


  //Recibir Mensaje Actualizacion--------------------------------------------------------------

  recibirMensajeActualizacioncat_empleados(mensaje:string){
    this.comandoActualizarcat_empleados = mensaje;
    if(this.comandoActualizarcat_empleados == 'OK'){
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
    this.router.navigate(['/index/catalogo_empleados']);
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
