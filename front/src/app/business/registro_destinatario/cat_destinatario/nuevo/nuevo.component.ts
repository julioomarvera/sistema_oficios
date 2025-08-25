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
import { merge, Observable, of } from 'rxjs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSlideToggleModule, _MatSlideToggleRequiredValidatorModule, } from '@angular/material/slide-toggle';
import Swal from 'sweetalert2'
import { Nuevocat_destinatario } from '../../../../interfaces/registro_destinatario/cat_destinatario/cat_destinatario-response.interface';
import { cat_destinatarioService } from '../../../../service/registro_destinatario/cat_destinatario/cat_destinatario.service';
import { estatusregistro_destinatarioTable } from '../../../../interfaces/registro_destinatario/estatus/estatusregistro_destinatario-table.interface';
import { estatusregistro_destinatarioService } from '../../../../service/registro_destinatario/estatus/estatusregistro_destinatario.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from '../../../../service/error.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { cat_destinatarioTable } from '../../../../interfaces/registro_destinatario/cat_destinatario/cat_destinatario-table.interface';
import { cat_direccionesTable } from '../../../../interfaces/catalogo/cat_direcciones/cat_direcciones-table.interface';
import { cat_direccionesService } from '../../../../service/catalogo/cat_direcciones/cat_direcciones.service';
import { cat_areasTable } from '../../../../interfaces/catalogo_areas/cat_areas/cat_areas-table.interface';
import { cat_areasService } from '../../../../service/catalogo_areas/cat_areas/cat_areas.service';
import { cat_empleadosTable } from '../../../../interfaces/catalogo_empleados/cat_empleados/cat_empleados-table.interface';
import { cat_empleadosService } from '../../../../service/catalogo_empleados/cat_empleados/cat_empleados.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { map, startWith } from 'rxjs/operators'; // And these operators
import { MatNativeDateModule, MatOptionSelectionChange, provideNativeDateAdapter } from '@angular/material/core';
import { cat_direcciones_areas_Service } from '../../../../service/catalogo/cat_direcciones_areas/cat_direcciones_areas.service';
import { _isNumberValue } from '@angular/cdk/coercion';
import { Destinatario } from '../../../../interfaces/destinatrario/destinatario.interfaces';


@Component({
  selector: 'app-nuevo-destinatario',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatChipsModule,
    MatIconModule, CommonModule, MatFormFieldModule,
    MatTableModule, MatPaginatorModule, MatInputModule,
    MatSortModule, MatButtonModule, MatDialogModule,
    FormsModule, ReactiveFormsModule, MatDatepickerModule,
    MatSlideToggleModule, FormsModule, _MatSlideToggleRequiredValidatorModule,
    MatButtonModule, ReactiveFormsModule, MatAutocompleteModule, MatNativeDateModule
  ],
  templateUrl: './nuevo.component.html',
  styleUrl: './nuevo.component.scss'
})

export default class NuevoComponentDestinatario {
  id_registro_destinatario: number | any;
  loading: boolean = false;
  listcat_destinatario: cat_destinatarioTable[] = [];
  listestatusregistro_destinatario: estatusregistro_destinatarioTable[] = [];
  id_estatusregistro_destinatario: number | any;
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
  resultado_id_area: boolean = false;
  error_id_area: boolean = false;

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
  id_gestion_oficios: string | any = ''
  resultadoid_oficio: boolean = false;
  errorid_oficio: boolean = false;

  resultadoestatus: boolean = false;
  errorestatus: boolean = false;

  listcat_direcciones: cat_direccionesTable[] = [];
  listcat_areas: cat_areasTable[] = [];
  listcat_empleados: cat_empleadosTable[] = [];



  //esto es para el auto complete//----------------------------------
  myControlDirecciones = new FormControl('');
  filteredOptionsDirecciones!: Observable<cat_direccionesTable[]>; // This will hold your filtered options

  myControlAreas = new FormControl('');
  filteredOptionsAreas!: Observable<cat_areasTable[]>; // This will hold your filtered options

  shouldAnimateAreas = false;
  hasExtraAreaOptions = false;

  @Input()
  set id_gestion_oficio(value: string) {
    value = value || '';
    if (_isNumberValue(value)) {
      this.id_gestion_oficios = value;
    }
  }


  @Output() destinatarioSeleccionado = new EventEmitter<Destinatario>();

  seleccionarDestinatario(id_cat_destinatario: any) {
    this.destinatarioSeleccionado.emit(id_cat_destinatario);
  }

  private fileTmp: any;
  banderaSeleccion: boolean = false;
  areaFirmanteOcular: number = 0;
  areasSeleccionadas: number[] = []; // por ejemplo  
  contador_registro : number = 0;
  
  


  constructor(private router: Router, private _formBuilder: FormBuilder,
    private cat_destinatario_Service: cat_destinatarioService,
    private toastr: ToastrService, private _errorService: ErrorService,
    private aRouter: ActivatedRoute, private _cat_direccionesServices: cat_direccionesService,
    private _cat_areasServices: cat_areasService, private _cat_empleadosServices: cat_empleadosService,
    private _sanitizer: DomSanitizer, private _estatusregistro_destinatarioServices: estatusregistro_destinatarioService,
    private _cat_direcciones_areas_Service: cat_direcciones_areas_Service
  ) {
    this.id_registro_destinatario = aRouter.snapshot.paramMap.get('id_registro_destinatario');
    this.estatus = aRouter.snapshot.paramMap.get('estatus');
    this.token = localStorage.getItem('token');
    this.id_usuario = localStorage.getItem('id_usuario');
    this.id_rol = localStorage.getItem('id_rol');
    this.imp = localStorage.getItem('imp');
    this.edit = localStorage.getItem('edit');
    this.elim = localStorage.getItem('elim');
    this.nuev = localStorage.getItem('nuev');
    this.img = localStorage.getItem('img');
    this.PaginaActual = '/index/nuevocat_destinatario';
    this.finalizado = 1;
    this.getCatEstatusregistro_destinatario();
    this.getInfoCat_cat_direcciones();
    this.getInfoCat_cat_areas();

  }

  // getInfoCat_cat_direcciones(){
  //    this._cat_direccionesServices.getAllcat_direcciones(this.id_usuario).subscribe(data => {
  //      this.listcat_direcciones = data;
  //    })
  // }
  getInfoCat_cat_areas() {
    this._cat_areasServices.getAllcat_areas(this.id_usuario).subscribe(data => {
      this.listcat_areas = data;
    })
  }

  openHelper() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  getCatEstatusregistro_destinatario() {
    this._estatusregistro_destinatarioServices.getAllestatusregistro_destinatario(this.id_usuario).subscribe((data) => {
      this.listestatusregistro_destinatario = data;
    })
  }


  goInicio() {
    this.router.navigate(['/index/registro_destinatario']);
  }


  save() {
    this.errorid_direccion = false;
    this.errortext_direccion = false;
    this.error_id_area = false;
    this.errorarea_texto = false;
    this.errornumero_empledo = false;
    this.errortext_nombre_empleado = false;
    this.errorfoto = false;
    this.errorid_oficio = false;
    this.errorestatus = false;
    if (this.id_direccion == '') {
      this.errorid_direccion = true;
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro id_direccion')
    }
    else if (this.text_direccion == '') {
      this.errortext_direccion = true;
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro text_direccion')
    }
    else if (this.id_area == '') {
      this.error_id_area = true;
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro  id_area')
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
    else if (this.id_gestion_oficios == '') {
      this.errorid_oficio = true;
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro id_gestion_oficios')
    }
    else if (this.estatus == 0) {
      this.errorestatus = true;
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro estatus')
    }
    else {
      this.saveParams();
    }
  }

  saveParams() {
    this.loading = true;
    const cat_destinatario: Nuevocat_destinatario = {
      id_registro_destinatario: this.id_registro_destinatario,
      id_usuario: this.id_usuario,
      id_estatusregistro_destinatario: this.estatus,
      id_gestion_oficios: this.id_gestion_oficios,
      PaginaActual: this.PaginaActual,
      finalizado: this.finalizado,
      id_direccion: this.id_direccion,
      text_direccion: this.text_direccion,
      id_area: this.id_area,
      area_texto: this.area_texto,
      numero_empledo: this.numero_empledo,
      text_nombre_empleado: this.text_nombre_empleado,
      foto: this.foto,
      id_oficio: '',
      estatus: this.estatus,
      con_copia : "0",
      activo: 1,
      fecha_terminacion:'n/a',
    }
    this.cat_destinatario_Service.newcat_destinatario(cat_destinatario).subscribe({
      next: (v) => {
        this.loading = false;
        this.toastr.success('Registro almacenado Correctamente', 'Correcto', { "positionClass": "toast-bottom-center" });
        this.foto = "";
        this.text_nombre_empleado = "";
        this.seleccionarDestinatario(v);

        // this.router.navigate(['/index/registro_destinatario']);
        // if (!this.areasSeleccionadas.includes(this.id_area)) {
        //   this.areasSeleccionadas.push(this.id_area);
        // }
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
      this.cat_destinatario_Service.sendFilecat_destinatario(body, tipo, this.id_registro_destinatario).subscribe({
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

  //Todo lo que se necesita para direcciones /------------------------------------------------->
  getInfoCat_cat_direcciones() {
    this._cat_direccionesServices.getAllcat_direcciones(this.id_usuario).subscribe(data => {
      this.listcat_direcciones = data;
      if (this.listcat_direcciones.length != 0) {
        this.filteredOptionsDirecciones = this.myControlDirecciones.valueChanges.pipe(
          startWith(''), // Start with an empty string to show all options initially
          map(value => this._filter(value || '')), // Filter as the value changes
        );
      }
    })
  }

  trackById(index: number, item: cat_direccionesTable): number {
    return item.id_cat_direcciones;
  }

  private _filter(value: string): cat_direccionesTable[] {
    const filterValue = value.toLowerCase();
    return this.listcat_direcciones.filter(option =>
      option.descripcion.toLowerCase().includes(filterValue)
    );
  }

  onDireccionChange(event: MatOptionSelectionChange, option: cat_direccionesTable): void {

    if (event.isUserInput) {
      this.id_direccion = option.id_cat_direcciones;
      this.text_direccion = option.descripcion;
      if (this.id_direccion != "") {
        this._cat_direcciones_areas_Service.getAreaByIdDireccion(this.id_direccion).subscribe(data => {
          this.listcat_areas = data;

          if (this.listcat_areas.length != 0) {
            this.filteredOptionsAreas = this.myControlAreas.valueChanges.pipe(
              startWith(''), // Start with an empty string to show all options initially
              map(value => this._filterAreas(value || '')), // Filter as the value changes
            );
          }
        })
      }
      this.getInformacionRepresentanteArea();
    }
  }


  clearDirecciones(): void {
    this.myControlDirecciones.setValue('');
    this.id_direccion = null;
    this.text_direccion = '';
    this.listcat_areas = [];

    // Activa animación
    this.shouldAnimateAreas = true;

    // Espera para limpiar sugerencias con fade
    setTimeout(() => {
      this.filteredOptionsAreas = of([]);
      this.shouldAnimateAreas = false;
    }, 300); // Igual duración que la animación

    this.clearArea();
  }


  showMoreHint(options$: Observable<cat_areasTable[]>): boolean {
    let show = false;
    options$.subscribe(options => {
      if (options.length > 4) {
        show = true;
      }
    });
    return show;
  }

  public catalogoAreasPorOcultar(areaFirmante: number) {
    this.areaFirmanteOcular = areaFirmante;
    // Verificamos que no esté repetido antes de agregarlo
    if (!this.areasSeleccionadas.includes(areaFirmante)) {
      this.areasSeleccionadas.push(areaFirmante);
    }
  }

  limpiarArreglo() {
    if(this.areasSeleccionadas.length > 0){
      this.areasSeleccionadas = [];
    }
    
  }

  getObtenerAreasPdf(array_areas_pdf: any[]) {
    for (const area of array_areas_pdf) {
      if (area != "") {
        this._cat_direcciones_areas_Service.getDireccionByNameArea(area).subscribe((data : cat_empleadosTable) => {
          // this.listcat_areas = data;
          this.id_direccion = data.direccion;
          this.text_direccion= data.direccion_texto;
          this.id_area= data.area;
          this.area_texto= data.area_texto;
          this.numero_empledo= data.numero_empleado;
          this.text_nombre_empleado= data.nombre_completo;
          this.foto= data.foto;
         
          this.saveParamsPdf(array_areas_pdf.length);

        });
      }
    }
  }

    saveParamsPdf(total:number) {
    this.loading = true;
    const cat_destinatario: Nuevocat_destinatario = {
      id_registro_destinatario: this.id_registro_destinatario,
      id_usuario: this.id_usuario,
      id_estatusregistro_destinatario: this.estatus,
      id_gestion_oficios: this.id_gestion_oficios,
      PaginaActual: this.PaginaActual,
      finalizado: this.finalizado,
      id_direccion: this.id_direccion,
      text_direccion: this.text_direccion,
      id_area: this.id_area,
      area_texto: this.area_texto,
      numero_empledo: this.numero_empledo,
      text_nombre_empleado: this.text_nombre_empleado,
      foto: this.foto,
      id_oficio:0,
      estatus: this.estatus,
      activo: 1,
      con_copia : 0,
      fecha_terminacion:'n/a',
    }
    this.cat_destinatario_Service.newcat_destinatario(cat_destinatario).subscribe({
      next: (v) => {
        this.contador_registro = this.contador_registro+1;

        if(this.contador_registro >= total){
        this.loading = false;
        this.toastr.success('Registro almacenado Correctamente', 'Correcto', { "positionClass": "toast-bottom-center" });
        this.foto = "";
        this.text_nombre_empleado = "";
        this.seleccionarDestinatario(v);
        }

        // this.router.navigate(['/index/registro_destinatario']);
        // if (!this.areasSeleccionadas.includes(this.id_area)) {
        //   this.areasSeleccionadas.push(this.id_area);
        // }
      },
      error: (event: HttpErrorResponse) => {
        if(this.contador_registro >= total){
          this._errorService.msjError(event);
        }
      
        this.loading = false;
      },
      complete: () => console.info('complete')
    })
  }




  //------------------------------------------------------------------------------------------>
  //Areas/------------------------------------------------------------------------------------>
  trackByIdAreas(index: number, item: cat_areasTable): number {
    return item.id_cat_areas;
  }

  private _filterAreas(value: string): cat_areasTable[] {
    const filterValue = value.toLowerCase();
    return this.listcat_areas.filter(optionArea =>
      optionArea.descripcion.toLowerCase().includes(filterValue)
    );
  }


  onAreaChange(event: MatOptionSelectionChange, option: cat_areasTable): void {
    if (event.isUserInput) {
      this.id_area = option.id_cat_areas;
      this.area_texto = option.descripcion;
      this.getInformacionRepresentanteArea();
    }
  }

  clearArea(): void {
    this.myControlAreas.setValue('');
    this.id_area = null;
    this.area_texto = '';
  }



  //------------------------------------------------------------------------------------------>


  getInformacionRepresentanteArea() {
    if (this.id_direccion != "" && this.id_area != "" && this.id_area != null && this.id_direccion != null) {
      this._cat_empleadosServices.getAllcat_empleadosByDireccionAreas(this.id_direccion, this.id_area).subscribe(data => {
        this.numero_empledo = data[0].numero_empleado;
        this.text_nombre_empleado = data[0].nombre_completo;
        this.foto = data[0].foto;
      })
    }
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
