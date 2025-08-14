import { Component, ViewChild, ChangeDetectionStrategy, inject, signal, Pipe, Input, Output, EventEmitter } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormControl, FormsModule, ReactiveFormsModule, Validators, FormBuilder, FormGroup, } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { merge } from 'rxjs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSlideToggleModule, _MatSlideToggleRequiredValidatorModule, } from '@angular/material/slide-toggle';
import Swal from 'sweetalert2'
import { Nuevocat_firmante } from '../../../../interfaces/registro_quien_firma/cat_firmante/cat_firmante-response.interface';
import { cat_firmanteService } from '../../../../service/registro_quien_firma/cat_firmante/cat_firmante.service';
import { estatusregistro_quien_firmaTable } from '../../../../interfaces/registro_quien_firma/estatus/estatusregistro_quien_firma-table.interface';
import { estatusregistro_quien_firmaService } from '../../../../service/registro_quien_firma/estatus/estatusregistro_quien_firma.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from '../../../../service/error.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { cat_firmanteTable } from '../../../../interfaces/registro_quien_firma/cat_firmante/cat_firmante-table.interface';
import { cat_direccionesTable } from '../../../../interfaces/catalogo/cat_direcciones/cat_direcciones-table.interface';
import { cat_direccionesService } from '../../../../service/catalogo/cat_direcciones/cat_direcciones.service';
import { cat_areasTable } from '../../../../interfaces/catalogo_areas/cat_areas/cat_areas-table.interface';
import { cat_areasService } from '../../../../service/catalogo_areas/cat_areas/cat_areas.service';
import { cat_empleadosTable } from '../../../../interfaces/catalogo_empleados/cat_empleados/cat_empleados-table.interface';
import { cat_empleadosService } from '../../../../service/catalogo_empleados/cat_empleados/cat_empleados.service';
import { _isNumberValue } from '@angular/cdk/coercion';
import { cat_direcciones_areas_Service } from '../../../../service/catalogo/cat_direcciones_areas/cat_direcciones_areas.service';
import { Firmante } from '../../../../interfaces/firmantes/firmante.interfaces';



@Component({
  selector: 'app-nuevo_firmante',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatChipsModule,
    MatIconModule, CommonModule, MatFormFieldModule,
    MatTableModule, MatPaginatorModule, MatInputModule,
    MatSortModule, MatButtonModule, MatDialogModule,
    FormsModule, ReactiveFormsModule, MatDatepickerModule,
    MatSlideToggleModule, FormsModule, _MatSlideToggleRequiredValidatorModule,
    MatButtonModule, ReactiveFormsModule
  ],
  templateUrl: './nuevo.component.html',
  styleUrl: './nuevo.component.scss'
})

export default class NuevoComponentFirmante {
  id_registro_quien_firma: number | any;
  loading: boolean = false;
  listcat_firmante: cat_firmanteTable | any;
  listestatusregistro_quien_firma: estatusregistro_quien_firmaTable[] = [];
  id_estatusregistro_quien_firma: number | any;
  descripcion: string | any;
  estatus: string | any;
  readonly dialog = inject(MatDialog);
  errorMessage = signal('');
  token: string | any;
  id_usuario: string | any;
  id_rol: string | any;
  imp: string | any;
  edit: string | any;
  elim: string | any;
  nuev: string | any;
  img: string | any;
  PaginaActual: string | any;
  finalizado: string | any;
  id_direccion: string | any = '';
  resultadoid_direccion: boolean = false;
  errorid_direccion: boolean = false;

  text_direccion: string | any = ''
  resultadotext_direccion: boolean = false;
  errortext_direccion: boolean = false;

  id_area: string | any = '';
  resultadoid_area: boolean = false;
  errorid_area: boolean = false;

  area_texto: string | any = ''
  resultadoarea_texto: boolean = false;
  errorarea_texto: boolean = false;

  numero_empledo: string | any = '';
  resultadonumero_empledo: boolean = false;
  errornumero_empledo: boolean = false;

  text_nombre_empleado: string | any = ''
  resultadotext_nombre_empleado: boolean = false;
  errortext_nombre_empleado: boolean = false;

  foto: string | any = ''
  resultadofoto: boolean = false;
  errorfoto: boolean = false;

  id_oficio: string | any = ''
  resultadoid_oficio: boolean = false;
  errorid_oficio: boolean = false;

  otro: string | any = ''
  resultadootro: boolean = false;
  errorotro: boolean = false;

  listcat_direcciones: cat_direccionesTable[] = [];
  listcat_areas: cat_areasTable[] = [];
  listcat_empleados: cat_empleadosTable[] = [];


  id_direcion: string | any = "";
  text_direccion_base: string | any = "";
  id_area_base: string | any = "";
  text_area_base: string | any = "";
  numero_empleado: string | any = "";


  fotoCoordinador: string | any = "";
  Nombre_coordinador: string | any = "";
  id_gestion_oficios : number | any = 0;

  @Input()
  set id_gestion_oficio(value: string) {
    value = value || '';
    if (_isNumberValue(value)) {
      this.id_gestion_oficios = value;
      this.verificarFirmante(this.id_gestion_oficios);
    }
  }

  @Output() firmanteSeleccionado = new EventEmitter<Firmante>();

  seleccionarFirmante(id_cat_firmante: Firmante) {
    this.firmanteSeleccionado.emit(id_cat_firmante);
  }

  banderaBloqueo : boolean = false;
  private fileTmp: any;
  constructor(private router: Router, private _formBuilder: FormBuilder, private cat_firmante_Service: cat_firmanteService,
    private toastr: ToastrService, private _errorService: ErrorService, private aRouter: ActivatedRoute,
    private _cat_direccionesServices: cat_direccionesService, private _cat_areasServices: cat_areasService,
    private _cat_empleadosServices: cat_empleadosService, private _sanitizer: DomSanitizer,
    private _estatusregistro_quien_firmaServices: estatusregistro_quien_firmaService,
    private cat_direcciones_areas_Service: cat_direcciones_areas_Service,
  ) {

    this.id_registro_quien_firma = aRouter.snapshot.paramMap.get('id_registro_quien_firma');
    this.estatus = aRouter.snapshot.paramMap.get('estatus');
    this.token = localStorage.getItem('token');
    this.id_usuario = localStorage.getItem('id_usuario');
    this.id_rol = localStorage.getItem('id_rol');
    this.imp = localStorage.getItem('imp');
    this.edit = localStorage.getItem('edit');
    this.elim = localStorage.getItem('elim');
    this.nuev = localStorage.getItem('nuev');
    this.img = localStorage.getItem('img');
    this.id_direccion = localStorage.getItem('id_direcion');
    this.text_direccion = localStorage.getItem('text_direccion');
    this.id_area = localStorage.getItem('id_area');
    this.area_texto = localStorage.getItem('text_area');
    this.numero_empleado = localStorage.getItem('numero_empleado');
    this.foto = localStorage.getItem('foto');
    this.text_nombre_empleado = localStorage.getItem('usuario');

    this.numero_empledo = parseInt(this.numero_empleado);
    if (this.numero_empledo != "") {
      this.getCoordinadorArea();
    }


    this.PaginaActual = '/index/nuevocat_firmante';
    this.finalizado = 1;
    this.getCatEstatusregistro_quien_firma();
    this.getInfoCat_cat_direcciones();
    // this.getInfoCat_cat_areas();
    this.getInfoCat_cat_empleados();
  }

  getCoordinadorArea() {
    this._cat_empleadosServices.get_coordinador_empleados(this.numero_empledo).subscribe(data => {
      this.fotoCoordinador = data.foto;
      this.Nombre_coordinador = data.nombre_completo;
    })
  }

  getInfoCat_cat_direcciones() {
    this._cat_direccionesServices.getAllcat_direcciones(this.id_usuario).subscribe(data => {
      this.listcat_direcciones = data;
      if (this.listcat_direcciones.length > 0) {
        this.getInfoCat_cat_areas()
      }
    })
  }


  getInfoCat_cat_areas() {
    this.cat_direcciones_areas_Service.getAreaByIdDireccion(this.id_direccion).subscribe(data => {
      this.listcat_areas = data;
    })
  }


  getInfoCat_cat_empleados() {
    this._cat_empleadosServices.getAllcat_empleadosByDireccionAreas(this.id_direccion, this.id_area).subscribe(data => {
      this.listcat_empleados = data;
    })
  }

  openHelper() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  getCatEstatusregistro_quien_firma() {
    this._estatusregistro_quien_firmaServices.getAllestatusregistro_quien_firma(this.id_usuario).subscribe((data) => {
      this.listestatusregistro_quien_firma = data;
    })
  }


  goInicio() {
    this.router.navigate(['/index/registro_quien_firma']);
  }


  save() {
    this.errorid_direccion = false;
    this.errortext_direccion = false;
    this.errorid_area = false;
    this.errorarea_texto = false;
    this.errornumero_empledo = false;
    this.errortext_nombre_empleado = false;
    this.errorfoto = false;
    this.errorid_oficio = false;
    this.errorotro = false;
    if (this.id_direccion == '') {
      this.errorid_direccion = true;
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro id_direccion')
    }
    else if (this.text_direccion == '') {
      this.errortext_direccion = true;
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro text_direccion')
    }
    else if (this.id_area == '') {
      this.errorid_area = true;
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro id_area')
    }
    else if (this.area_texto == '') {
      this.errorarea_texto = true;
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro area_texto')
    }
    else if (this.numero_empledo == '') {
      this.errornumero_empledo = true;
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro numero_empledo')
    }
    else if (this.text_nombre_empleado == '') {
      this.errortext_nombre_empleado = true;
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro text_nombre_empleado')
    }
    else if (this.foto == '') {
      this.errorfoto = true;
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro foto')
    }
    // else if (this.id_oficio == '') {
    //   this.errorid_oficio = true;
    //   this.mensajeAlertaError('Error: falta el Informacíon en el parámetro id_oficio')
    // }
    // else if(this.otro == '') {
    //   this.errorotro= true; 
    //   this.mensajeAlertaError('Error: falta el Informacíon en el parámetro otro')
    // }
    else {
      this.saveParams();
    }
  }

  saveParams() {
    this.loading = true;
    const cat_firmante: Nuevocat_firmante = {
      id_registro_quien_firma: this.id_registro_quien_firma,
      id_gestion_oficios:this.id_gestion_oficios,
      id_usuario: this.id_usuario,
      id_estatusregistro_quien_firma: this.estatus,
      PaginaActual: this.PaginaActual,
      finalizado: this.finalizado,
      id_direccion: this.id_direccion,
      text_direccion: this.text_direccion,
      id_area: this.id_area,
      area_texto: this.area_texto,
      numero_empledo: this.numero_empledo,
      text_nombre_empleado: this.text_nombre_empleado,
      foto: this.foto,
      id_oficio: this.id_oficio,
      otro: this.otro,
      activo: 1,
 
    }
    this.cat_firmante_Service.newcat_firmante(cat_firmante).subscribe({
      next: (v) => {
        this.seleccionarFirmante(v);
        // this.toastr.success('Registro almacenado Correctamente', 'Correcto', { "positionClass": "toast-bottom-center" });
        this.loading = false;
        this.banderaBloqueo = true;
        // this.router.navigate(['/index/registro_quien_firma']);
      },
      error: (event: HttpErrorResponse) => {
        this._errorService.msjError(event);
        this.loading = false;
      },
      complete: () => console.info('complete')
    })
  }

  getFile($event: any, tipo: any): void {
    const [file] = $event.target.files;
    this.fileTmp = {
      fileRaw: file,
      fileName: file.name
    }

    if (file != null) {
      this.sendFile(tipo);
    }
  }

  sendFile(tipo: any): void {
    const body = new FormData();
    body.append('myfile', this.fileTmp.fileRaw, this.fileTmp.fileName);
    if (body) {
      this.cat_firmante_Service.sendFilecat_firmante(body, tipo, this.id_registro_quien_firma).subscribe({
        next: (v) => {
          console.log(v);
          this.transform(v.url, tipo);
        },
        error: (event: HttpErrorResponse) => {
          this._errorService.msjError(event);
          this.loading = false;
        },
        complete: () => console.info('complete')
      })
    }
  }
  transform(ruta: string, tipo: any): SafeHtml {
    switch (tipo) {
    }
    return (ruta);
  }

  get_info_empleado(foto: string, numero_empleado: number, nombre_completo: string) {
    this.numero_empledo = numero_empleado;
    this.text_nombre_empleado = nombre_completo;
    this.foto = foto;
  }

  get_info_empleado_by_numero_empleado(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const numero = +selectElement.value;

    const empleado = this.listcat_empleados.find(e => e.numero_empleado === numero);
    if (empleado) {
      this.numero_empledo = empleado.numero_empleado;
      this.text_nombre_empleado = empleado.nombre_completo;
      this.foto = empleado.foto;
    }
  }

  verificarFirmante(id_gestion_oficios:number){
     this.cat_firmante_Service.getcat_firmanteByid_gestion_oficios(id_gestion_oficios).subscribe((data) => {
      const id_gestion_oficios_base = data.id_gestion_oficios;
      if(id_gestion_oficios_base == id_gestion_oficios){
        this.banderaBloqueo = true;
      }
      else{
         this.banderaBloqueo = false;
      }
    })
  }

  public cancelado(){
     this.banderaBloqueo = false;
  }

  public agregarFirmante(){
    this.save();
  }


  //Mensaje de Swal/--------------------------------------------------------->
  mensajeAlertaError(titulo: string) {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: titulo,
      showConfirmButton: false,
      timer: 2000
    });
  }

  mensajeAlertaSuccess(titulo: string) {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: titulo,
      showConfirmButton: false,
      timer: 1500
    });
  }

}
//---------------------------------------------------------------------------->
//Modal
@Component({
  selector: 'nuevo-dialog',
  templateUrl: 'nuevo-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogContentExampleDialog { }
