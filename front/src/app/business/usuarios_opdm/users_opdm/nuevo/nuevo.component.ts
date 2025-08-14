import { Component, ViewChild, ChangeDetectionStrategy, inject, signal, Pipe } from '@angular/core';
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
import { Nuevousers_opdm } from '../../../../interfaces/usuarios_opdm/users_opdm/users_opdm-response.interface';
import { users_opdmService } from '../../../../service/usuarios_opdm/users_opdm/users_opdm.service';
import { estatususuarios_opdmTable } from '../../../../interfaces/usuarios_opdm/estatus/estatususuarios_opdm-table.interface';
import { estatususuarios_opdmService } from '../../../../service/usuarios_opdm/estatus/estatususuarios_opdm.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from '../../../../service/error.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { users_opdmTable } from '../../../../interfaces/usuarios_opdm/users_opdm/users_opdm-table.interface';
import { cat_direccionesTable } from '../../../../interfaces/catalogo/cat_direcciones/cat_direcciones-table.interface';
import { cat_direccionesService } from '../../../../service/catalogo/cat_direcciones/cat_direcciones.service';
import { cat_areasTable } from '../../../../interfaces/catalogo_areas/cat_areas/cat_areas-table.interface';
import { cat_areasService } from '../../../../service/catalogo_areas/cat_areas/cat_areas.service';
import { rollesService } from '../../../../service/rolles/rolles.service';
import { rollesTable } from '../../../../interfaces/rolles/rolles-table.interface';
import { cat_direcciones_areas_Service } from '../../../../service/catalogo/cat_direcciones_areas/cat_direcciones_areas.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { map, startWith } from 'rxjs/operators'; // And these operators
import { MatOptionSelectionChange } from '@angular/material/core';


@Component({
  selector: 'app-nuevo',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatChipsModule,
    MatIconModule, CommonModule, MatFormFieldModule,
    MatTableModule, MatPaginatorModule, MatInputModule,
    MatSortModule, MatButtonModule, MatDialogModule,
    FormsModule, ReactiveFormsModule, MatDatepickerModule,
    MatSlideToggleModule, FormsModule, _MatSlideToggleRequiredValidatorModule,
    MatButtonModule, ReactiveFormsModule, MatAutocompleteModule
  ],
  templateUrl: './nuevo.component.html',
  styleUrl: './nuevo.component.scss'
})

export default class NuevoComponent {
  id_usuarios_opdm: number | any;
  loading: boolean = false;
  listusers_opdm: users_opdmTable[] = [];
  listestatususuarios_opdm: estatususuarios_opdmTable[] = [];
  listRooles: rollesTable[] = [];
  id_estatususuarios_opdm: number | any;
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
  id_roll: string | any = ''
  resultadoid_roll: boolean = false;
  errorid_roll: boolean = false;

  usuario: string | any = ''
  resultadousuario: boolean = false;
  errorusuario: boolean = false;

  clave: string | any = ''
  resultadoclave: boolean = false;
  errorclave: boolean = false;

  nombre: string | any = ''
  resultadonombre: boolean = false;
  errornombre: boolean = false;

  apepa: string | any = ''
  resultadoapepa: boolean = false;
  errorapepa: boolean = false;

  apema: string | any = ''
  resultadoapema: boolean = false;
  errorapema: boolean = false;

  genero: number = 1;
  resultadogenero: boolean = false;
  errorgenero: boolean = false;

  correo: string | any = '@opdm.gob.mx'
  resultadocorreo: boolean = false;
  errorcorreo: boolean = false;

  telefono: string | any = '55-'
  resultadotelefono: boolean = false;
  errortelefono: boolean = false;

  fechaHoraMexicoString: string | any = '';

  fec_ingreso: string | any = "";
  resultadofec_ingreso: boolean = false;
  errorfec_ingreso: boolean = false;


  resultadoimp: boolean = false;
  errorimp: boolean = false;


  resultadoedit: boolean = false;
  erroredit: boolean = false;


  resultadoelim: boolean = false;
  errorelim: boolean = false;


  resultadonuev: boolean = false;
  errornuev: boolean = false;


  resultadoimg: boolean = false;
  errorimg: boolean = false;

  id_direccion: string | any = '';
  resultadoid_direccion: boolean = false;
  errorid_direccion: boolean = false;

  texto_direccion: string | any = ''
  resultadotexto_direccion: boolean = false;
  errortexto_direccion: boolean = false;

  id_area: string | any = '';
  resultadoid_area: boolean = false;
  errorid_area: boolean = false;

  texto_area: string | any = ''
  resultadotexto_area: boolean = false;
  errortexto_area: boolean = false;

  numero_empleado: string | any = ''
  resultadonumero_empleado: boolean = false;
  errornumero_empleado: boolean = false;

  foto: string | any = '';
  fotoImagen: string | any = '';
  resultado_foto: boolean = false;
  error_foto: boolean = false;

  listcat_direcciones: cat_direccionesTable[] = [];
  listcat_areas: cat_areasTable[] = [];

  private fileTmp: any;

  //esto es para el auto complete//----------------------------------
  myControlDirecciones = new FormControl('');
  filteredOptionsDirecciones!: Observable<cat_direccionesTable[]>; // This will hold your filtered options

  myControlAreas = new FormControl('');
  filteredOptionsAreas!: Observable<cat_areasTable[]>; // This will hold your filtered options

  shouldAnimateAreas = false;
  hasExtraAreaOptions = false;




  constructor(private router: Router, private _formBuilder: FormBuilder, private users_opdm_Service: users_opdmService,
    private toastr: ToastrService, private _errorService: ErrorService, private aRouter: ActivatedRoute,
    private _cat_direccionesServices: cat_direccionesService, private _cat_areasServices: cat_areasService,
    private _sanitizer: DomSanitizer, private _estatususuarios_opdmServices: estatususuarios_opdmService,
    private _rollesServices: rollesService, private _cat_direcciones_areas_Service: cat_direcciones_areas_Service) {
    this.id_usuarios_opdm = aRouter.snapshot.paramMap.get('id_usuarios_opdm');
    this.estatus = aRouter.snapshot.paramMap.get('estatus');
    this.token = localStorage.getItem('token');
    this.id_usuario = localStorage.getItem('id_usuario');
    this.id_rol = localStorage.getItem('id_rol');
    this.imp = localStorage.getItem('imp');
    this.edit = localStorage.getItem('edit');
    this.elim = localStorage.getItem('elim');
    this.nuev = localStorage.getItem('nuev');
    this.img = localStorage.getItem('img');
    this.PaginaActual = '/index/nuevousers_opdm';
    this.finalizado = 1;
    this.getCatEstatususuarios_opdm();
    this.getInfoCat_cat_direcciones();
    this.getInformacionRooles();
    this.actualizarFechaHoraMexico();
  }

  actualizarFechaHoraMexico(): void {
    const now = new Date();
    this.fechaHoraMexicoString = new Intl.DateTimeFormat('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true, // Para formato AM/PM
      timeZone: 'America/Mexico_City'
    }).format(now);
    this.fec_ingreso = this.fechaHoraMexicoString;
  }

  getInformacionRooles() {
    this._rollesServices.getAllrolles(this.id_usuario).subscribe(data => {
      this.listRooles = data;
    })
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
      this.texto_direccion = option.descripcion;
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
    }
  }


  clearDirecciones(): void {
    this.myControlDirecciones.setValue('');
    this.id_direccion = null;
    this.texto_direccion = '';
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
      this.texto_area = option.descripcion;
    }
  }

  clearArea(): void {
    this.myControlAreas.setValue('');
    this.id_area = null;
    this.texto_area = '';
  }



  //------------------------------------------------------------------------------------------>





  openHelper() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  getCatEstatususuarios_opdm() {
    this._estatususuarios_opdmServices.getAllestatususuarios_opdm(this.id_usuario).subscribe((data) => {
      this.listestatususuarios_opdm = data;
    })
  }


  goInicio() {
    this.router.navigate(['/index/usuarios_opdm']);
  }


  save() {
    this.errorid_roll = false;
    this.errorusuario = false;
    this.errorclave = false;
    this.errornombre = false;
    this.errorapepa = false;
    this.errorapema = false;
    this.errorgenero = false;
    this.errorcorreo = false;
    this.errortelefono = false;
    this.errorfec_ingreso = false;
    this.errorimp = false;
    this.erroredit = false;
    this.errorelim = false;
    this.errornuev = false;
    this.errorimg = false;
    this.errorid_direccion = false;
    this.errortexto_direccion = false;
    this.errorid_area = false;
    this.errortexto_area = false;
    this.errornumero_empleado = false;
    this.error_foto = false;
    if (this.id_roll == '') {
      this.errorid_roll = true;
      this.errorimp = true;
      this.erroredit = true;
      this.errorelim = true;
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro id_roll')
    }
    else if (this.usuario == '') {
      this.errorusuario = true;
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro usuario')
    }
    else if (this.clave == '') {
      this.errorclave = true;
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro clave')
    }
    else if (this.nombre == '') {
      this.errornombre = true;
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro nombre')
    }
    else if (this.apepa == '') {
      this.errorapepa = true;
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro apepa')
    }
    else if (this.apema == '') {
      this.errorapema = true;
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro apema')
    }
    else if (this.genero == 0) {
      this.errorgenero = true;
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro genero')
    }
    else if (this.correo == '') {
      this.errorcorreo = true;
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro correo')
    }
    else if (this.telefono == '') {
      this.errortelefono = true;
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro telefono')
    }
    else if (this.fec_ingreso == '') {
      this.errorfec_ingreso = true;
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro fec_ingreso')
    }

    else if (this.id_direccion == '') {
      this.errorid_direccion = true;
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro id_direccion')
    }
    else if (this.texto_direccion == '') {
      this.errortexto_direccion = true;
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro texto_direccion')
    }
    else if (this.id_area == '') {
      this.errorid_area = true;
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro id_area')
    }
    else if (this.texto_area == '') {
      this.errortexto_area = true;
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro texto_area')
    }
    else if (this.numero_empleado == '') {
      this.errornumero_empleado = true;
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro numero_empleado')
    }
    else if (this.foto == '') {
      this.error_foto = true;
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro  foto')
    }
    else {
      this.saveParams();
    }
  }

  saveParams() {
    this.loading = true;
    const users_opdm: Nuevousers_opdm = {
      id_usuarios_opdm: this.id_usuarios_opdm,
      id_usuario: this.id_usuario,
      id_estatususuarios_opdm: this.estatus,
      PaginaActual: this.PaginaActual,
      finalizado: this.finalizado,
      id_roll: this.id_roll,
      usuario: this.usuario,
      clave: this.clave,
      nombre: this.nombre,
      apepa: this.apepa,
      apema: this.apema,
      genero: this.genero,
      correo: this.correo,
      telefono: this.telefono,
      fec_ingreso: this.fec_ingreso,
      imp: this.imp,
      edit: this.edit,
      elim: this.elim,
      nuev: this.nuev,
      img: this.img,
      id_direccion: this.id_direccion,
      texto_direccion: this.texto_direccion,
      id_area: this.id_area,
      texto_area: this.texto_area,
      numero_empleado: this.numero_empleado,
      foto: this.foto,
      activo: 1
    }
    this.users_opdm_Service.newusers_opdm(users_opdm).subscribe({
      next: (v) => {
        this.toastr.success('Registro almacenado Correctamente', 'Correcto', { "positionClass": "toast-bottom-center" });
        this.router.navigate(['/index/usuarios_opdm']);
      },
      error: (event: HttpErrorResponse) => {
        this._errorService.msjError(event);
        this.loading = false;
      },
      complete: () => console.info('complete')
    })
  }

  getPrivileges(): void {
    if (this.id_roll) {
      this._rollesServices.getrolles(this.id_roll, this.id_usuario).subscribe((data: rollesTable) => {
        this.imp = 1;
        this.edit = data.editar;
        this.elim = data.eliminar;
        this.nuev = data.crear;
        this.img = 1;
      })

    }
  }




  // onDireccionChange(event: any): void {
  //   const idSeleccionado = +event.target.value; // convierte a número si es necesario
  //   const direccion = this.listcat_direcciones.find(d => d.id_cat_direcciones === idSeleccionado);
  //   this.texto_direccion = direccion ? direccion.descripcion : '';
  //   if (this.id_direccion != "") {
  //     this._cat_direcciones_areas_Service.getAreaByIdDireccion(this.id_direccion).subscribe(data => {
  //       this.listcat_areas = data;
  //     })
  //   }
  // }


  // onAreaChange(event: any): void {
  //   const idSeleccionado = +event.target.value; // convierte a número si es necesario
  //   const area = this.listcat_areas.find(d => d.id_cat_areas === idSeleccionado);
  //   this.texto_area = area ? area.descripcion : '';
  // }

  getFoto() {
    if (this.numero_empleado != "") {
      this.foto = "http://www.qr.opdmtlalnepantla.gob.mx:3001/catalogo_empleados_opdm/cat_empleador_opdm/foto/" + this.numero_empleado + ".png"
    }
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
      this.users_opdm_Service.sendFileusers_opdm(body, tipo, this.id_usuarios_opdm).subscribe({
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
      case ' foto':
        this.fotoImagen = this._sanitizer.bypassSecurityTrustResourceUrl(ruta);
        this.foto = ruta;
        break;
    }
    return (ruta);
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
