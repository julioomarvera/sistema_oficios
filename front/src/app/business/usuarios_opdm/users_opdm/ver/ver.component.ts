import { Component, ViewChild, ChangeDetectionStrategy, inject } from '@angular/core'; 
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'; 
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { users_opdmTable } from '../../../../interfaces/usuarios_opdm/users_opdm/users_opdm-table.interface';
import { users_opdmService } from '../../../../service/usuarios_opdm/users_opdm/users_opdm.service';
import { MatCardModule } from '@angular/material/card';
import { map, shareReplay,startWith} from 'rxjs/operators';
import { MatIconModule } from '@angular/material/icon';
import { Observable, of } from 'rxjs';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { estatususuarios_opdmTable }   from '../../../../interfaces/usuarios_opdm/estatus/estatususuarios_opdm-table.interface';
import { estatususuarios_opdmService } from '../../../../service/usuarios_opdm/estatus/estatususuarios_opdm.service';
import { historialMasterusuarios_opdmTable }   from '../../../../interfaces/usuarios_opdm/historialMaster/historialMasterusuarios_opdm-table.interface';
import { historialMasterusuarios_opdmService } from '../../../../service/usuarios_opdm/historialMaster/historialMasterusuarios_opdm.service';
import { cat_direccionesTable } from   '../../../../interfaces/catalogo/cat_direcciones/cat_direcciones-table.interface';
import { cat_direccionesService } from '../../../../service/catalogo/cat_direcciones/cat_direcciones.service';
import { cat_areasTable } from '../../../../interfaces/catalogo_areas/cat_areas/cat_areas-table.interface';
import { cat_areasService } from '../../../../service/catalogo_areas/cat_areas/cat_areas.service';
import { rollesService } from '../../../../service/rolles/rolles.service';
import { rollesTable } from '../../../../interfaces/rolles/rolles-table.interface';
import { cat_direcciones_areas_Service } from '../../../../service/catalogo/cat_direcciones_areas/cat_direcciones_areas.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionSelectionChange } from '@angular/material/core';



@Component({
  selector: 'app-ver-users_opdm',
  standalone: true,
  imports: [MatCardModule,MatIconModule,MatFormFieldModule,MatPaginator, MatSortModule,MatTableModule,
             MatInputModule,FormsModule, ReactiveFormsModule, MatSortModule,
             MatSlideToggleModule, MatDialogModule, MatButtonModule,CommonModule,
             MatAutocompleteModule ],
  templateUrl: './ver.component.html',
  styleUrl: './ver.component.scss'
})

export default class VerComponentusers_opdm {
  displayedColumns: string[] = ['id_historialMaster', 'id_usuario', 'id_users_opdm','id_roll','usuario','clave','nombre','apepa','apema','genero','correo','telefono','fec_ingreso','imp','edit','elim','nuev','img','id_direccion','texto_direccion','id_area','texto_area','numero_empleado',' foto','accion' , 'createAt'];
  @ViewChild(MatPaginator) paginator !: MatPaginator; 
  @ViewChild(MatSort) sort !: MatSort; 
  id_usuarios_opdm : number | any; 
  listusers_opdm: users_opdmTable[] = [];
  loading: boolean = false;
  listestatususuarios_opdm : estatususuarios_opdmTable[] = []; 
  listhistorialMasterusuarios_opdm : historialMasterusuarios_opdmTable[] = []; 
  id_estatususuarios_opdm :number | any;  
  descripcion   : string|any;  
  estatus       : string|any;  
  readonly dialog = inject(MatDialog);
  token      : string |any; 
  id_usuario : string |any; 
  id_rol     : string |any; 
  imp        : string |any; 
  edit       : string |any; 
  elim       : string |any; 
  nuev       : string |any; 
  img        : string |any; 
  PaginaActual  : string |any; 
  finalizado    : string |any; 
 dataSource : any = []; 
  id_users_opdm : number|any = '';
  resultadoid_users_opdm: boolean = false; 
  errorid_users_opdm: boolean = false; 

  id_roll : string|any = '';
  resultadoid_roll: boolean = false; 
  errorid_roll: boolean = false; 

  usuario : string|any = '';
  resultadousuario: boolean = false; 
  errorusuario: boolean = false; 

  clave : string|any = '';
  resultadoclave: boolean = false; 
  errorclave: boolean = false; 

  nombre : string|any = '';
  resultadonombre: boolean = false; 
  errornombre: boolean = false; 

  apepa : string|any = '';
  resultadoapepa: boolean = false; 
  errorapepa: boolean = false; 

  apema : string|any = '';
  resultadoapema: boolean = false; 
  errorapema: boolean = false; 

  genero : number|any = '';
  resultadogenero: boolean = false; 
  errorgenero: boolean = false; 

  correo : string|any = '';
  resultadocorreo: boolean = false; 
  errorcorreo: boolean = false; 

  telefono : string|any = '';
  resultadotelefono: boolean = false; 
  errortelefono: boolean = false; 

  fec_ingreso : string|any = '';
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

  id_direccion : string | any ='';
  resultadoid_direccion: boolean = false; 
  errorid_direccion: boolean = false; 

  texto_direccion : string|any = '';
  resultadotexto_direccion: boolean = false; 
  errortexto_direccion: boolean = false; 

  id_area : string | any ='';
  resultadoid_area: boolean = false; 
  errorid_area: boolean = false; 

  texto_area : string|any = '';
  resultadotexto_area: boolean = false; 
  errortexto_area: boolean = false; 

  numero_empleado : string|any = '';
  resultadonumero_empleado: boolean = false; 
  errornumero_empleado: boolean = false; 

  foto : string | any ='';
  resultado_foto: boolean = false; 
  error_foto: boolean = false; 

  listcat_direcciones:cat_direccionesTable[] = [];
listcat_areas:cat_areasTable[] = [];

  listcat_direccionesFilter :cat_direccionesTable[] = [];
listcat_areasFilter :cat_areasTable[] = [];

page: number; 
previousPage: number; 
length = 100; 
pageSize = 10; 
pageIndex = 0; 
pageSizeOptions = [5, 10, 25]; 
hidePageSize = true; 
showPageSizeOptions = true; 
showFirstLastButtons = true; 
disabled = false; 
showFiller = true; 
private breakpointObserver = inject(BreakpointObserver); 
estatusPage: string | any; 
document: any; 

listRooles: rollesTable[] = [];

//esto es para el auto complete//----------------------------------
myControlDirecciones = new FormControl<cat_direccionesTable | string>('');
filteredOptionsDirecciones!: Observable<cat_direccionesTable[]>; // This will hold your filtered options

myControlAreas = new FormControl('');
filteredOptionsAreas!: Observable<cat_areasTable[]>; // This will hold your filtered options

shouldAnimateAreas = false;
hasExtraAreaOptions = false;




  constructor(private _users_opdmServices: users_opdmService, 
              private router: Router, private aRouter:ActivatedRoute,
              private _cat_direccionesServices: cat_direccionesService,
              private _cat_areasServices: cat_areasService, 
              private _sanitizer: DomSanitizer, 
              private _estatususuarios_opdmServices:  estatususuarios_opdmService, 
              private _historialMasterusuarios_opdmService : historialMasterusuarios_opdmService,
              private _rollesServices: rollesService,
              private _cat_direcciones_areas_Service:cat_direcciones_areas_Service  ) {
this.page = 3;
this.previousPage = 1;
    this.id_usuarios_opdm = aRouter.snapshot.paramMap.get('id_usuarios_opdm');
    this.id_users_opdm = aRouter.snapshot.paramMap.get('id_users_opdm');

    this.token        = localStorage.getItem('token');
    this.id_usuario   = localStorage.getItem('id_usuario');
    this.id_rol       = localStorage.getItem('id_rol');
    this.imp          = localStorage.getItem('imp');
    this.edit         = localStorage.getItem('edit');
    this.elim         = localStorage.getItem('elim');
    this.nuev         = localStorage.getItem('nuev');
    this.img          = localStorage.getItem('img');
    this.PaginaActual = '/index/nuevousers_opdm';
    this.finalizado   = 1;
    this.getInformacionById();
    this.getCatEstatususuarios_opdm();
    this.tableHistorialMaster();
    // this.getInfoCat_cat_direcciones();
    this.getInfoCat_cat_areas();
    this.getInformacionRooles();
  }

 tableHistorialMaster(){
     this._historialMasterusuarios_opdmService.historialMasterByIdusuarios_opdm(this.id_users_opdm,this.id_usuario).subscribe(data => { 
     this.listhistorialMasterusuarios_opdm = data;
     this.dataSource = new MatTableDataSource<historialMasterusuarios_opdmTable>(this.listhistorialMasterusuarios_opdm);
     this.dataSource.paginator = this.paginator;
     this.dataSource.sort = this.sort;
     })
}
isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe( 
    map(result => result.matches), 
    shareReplay() 
  ); 
  onChange(newValue: boolean): void {
    console.log(newValue); 
    if (newValue) {  
      this.document.body.classList.add('dark-mode');  
    }  
    else {  
      this.document.body.classList.remove('dark-mode');  
    }  
  }  
ngAfterViewInit() { 
    this.dataSource.paginator = this.paginator;  
  } 

applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  // getInfoCat_cat_direcciones(){
  //    this._cat_direccionesServices.getAllcat_direcciones(this.id_usuario).subscribe(data => {
  //      this.listcat_direcciones = data;
  //    })
  // }
  getInfoCat_cat_areas(){
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
  getCatEstatususuarios_opdm(){
    this._estatususuarios_opdmServices.getAllestatususuarios_opdm(this.id_usuario).subscribe((data) => { 
      this.listestatususuarios_opdm = data;  
    })
  }


  goInicio() {
    this.router.navigate(['/index/usuarios_opdm']);
  }

  getInformacionById(){
    if(this.id_users_opdm !== '' ){
      this._users_opdmServices.getusers_opdm(this.id_users_opdm,this.id_usuario).subscribe((data : users_opdmTable) =>{
      this.estatus = data.id_estatususuarios_opdm;  
        this.id_roll = data.id_roll;  
        this.usuario = data.usuario;  
        this.clave = data.clave;  
        this.nombre = data.nombre;  
        this.apepa = data.apepa;  
        this.apema = data.apema;  
        this.genero = data.genero;  
        this.correo = data.correo;  
        this.telefono = data.telefono;  
        this.fec_ingreso = data.fec_ingreso;  
        this.imp = data.imp;  
        this.edit = data.edit;  
        this.elim = data.elim;  
        this.nuev = data.nuev;  
        this.img = data.img;  
        this.id_direccion = data.id_direccion;  
        this.texto_direccion = data.texto_direccion;  
        this.id_area = data.id_area;  
        this.texto_area = data.texto_area;  
        this.numero_empleado = data.numero_empleado;  
        this. foto = data. foto;  
        this. foto = this._sanitizer.bypassSecurityTrustResourceUrl(this. foto);
        this.getInfoCat_cat_direcciones();

      })
    }
  }

//Todo lo que se necesita para direcciones /------------------------------------------------->
    getInfoCat_cat_direcciones() {
      this._cat_direccionesServices.getAllcat_direcciones(this.id_usuario).subscribe(data => {
        this.listcat_direcciones = data;
        if (this.listcat_direcciones.length != 0) {
          this.filteredOptionsDirecciones = this.myControlDirecciones.valueChanges.pipe(
            startWith(''), // Start with an empty string to show all options initially
            map(value => this._filter(typeof value === 'string' ? value : value?.descripcion || '')), // Filter as the value changes
          );

          const direccionSeleccionada = this.listcat_direcciones.find(
            dir => dir.id_cat_direcciones === this.id_direccion
          );

          if (direccionSeleccionada) {
            this.myControlDirecciones.setValue(direccionSeleccionada);
          }

          
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

    displayFn = (direccion: cat_direccionesTable): string => {
      return direccion?.descripcion || '';
    };


  
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

    getFoto() {
    if (this.numero_empleado != "") {
      this.foto = "http://www.qr.opdmtlalnepantla.gob.mx:3001/catalogo_empleados_opdm/cat_empleador_opdm/foto/" + this.numero_empleado + ".png"
    }
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

  getInformacionRooles() {
    this._rollesServices.getAllrolles(this.id_usuario).subscribe(data => {
      this.listRooles = data;
    })
  }

  

  //   onDireccionChange(event: MatOptionSelectionChange, option: cat_direccionesTable): void {   
  //   if (event.isUserInput) {
  //     this.id_direccion = option.id_cat_direcciones;
  //     this.texto_direccion = option.descripcion;
  //     if (this.id_direccion != "") {
  //       this._cat_direcciones_areas_Service.getAreaByIdDireccion(this.id_direccion).subscribe(data => {
  //         this.listcat_areas = data;
        
  //         if (this.listcat_areas.length != 0) {
  //           this.filteredOptionsAreas = this.myControlAreas.valueChanges.pipe(
  //             startWith(''), // Start with an empty string to show all options initially
  //             map(value => this._filterAreas(value || '')), // Filter as the value changes
  //           );
  //         }
  //       })
  //     }
  //   }
  // }


  
  
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
