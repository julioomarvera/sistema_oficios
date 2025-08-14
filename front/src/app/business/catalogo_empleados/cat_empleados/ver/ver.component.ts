import { Component, ViewChild, ChangeDetectionStrategy, inject } from '@angular/core'; 
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'; 
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { cat_empleadosTable } from '../../../../interfaces/catalogo_empleados/cat_empleados/cat_empleados-table.interface';
import { cat_empleadosService } from '../../../../service/catalogo_empleados/cat_empleados/cat_empleados.service';
import { MatCardModule } from '@angular/material/card';
import { map, shareReplay } from 'rxjs/operators';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { estatuscatalogo_empleadosTable }   from '../../../../interfaces/catalogo_empleados/estatus/estatuscatalogo_empleados-table.interface';
import { estatuscatalogo_empleadosService } from '../../../../service/catalogo_empleados/estatus/estatuscatalogo_empleados.service';
import { historialMastercatalogo_empleadosTable }   from '../../../../interfaces/catalogo_empleados/historialMaster/historialMastercatalogo_empleados-table.interface';
import { historialMastercatalogo_empleadosService } from '../../../../service/catalogo_empleados/historialMaster/historialMastercatalogo_empleados.service';
import { cat_direccionesTable } from   '../../../../interfaces/catalogo/cat_direcciones/cat_direcciones-table.interface';
import { cat_direccionesService } from '../../../../service/catalogo/cat_direcciones/cat_direcciones.service';
import { cat_areasTable } from '../../../../interfaces/catalogo_areas/cat_areas/cat_areas-table.interface'; 
import { cat_areasService } from '../../../../service/catalogo_areas/cat_areas/cat_areas.service';
@Component({
  selector: 'app-ver-cat_empleados',
  standalone: true,
  imports: [MatCardModule,MatIconModule,MatFormFieldModule,MatPaginator, MatSortModule,MatTableModule,
             MatInputModule,FormsModule, ReactiveFormsModule, MatSortModule,
             MatSlideToggleModule, MatDialogModule, MatButtonModule,CommonModule  ],
  templateUrl: './ver.component.html',
  styleUrl: './ver.component.scss'
})

export default class VerComponentcat_empleados {
  displayedColumns: string[] = ['id_historialMaster', 'id_usuario', 'id_cat_empleados','id_usuario','nombre_completo','numero_empleado','cargo','direccion','direccion_texto','subdireccion','area','area_texto','nombreJefe','cargoJefe','correo_institucional','telefono_opdm','url','codigo_qr','foto','accion' , 'createAt'];
  @ViewChild(MatPaginator) paginator !: MatPaginator; 
  @ViewChild(MatSort) sort !: MatSort; 
  id_catalogo_empleados : number | any; 
  listcat_empleados: cat_empleadosTable[] = [];
  listestatuscatalogo_empleados : estatuscatalogo_empleadosTable[] = []; 
  listhistorialMastercatalogo_empleados : historialMastercatalogo_empleadosTable[] = []; 
  id_estatuscatalogo_empleados :number | any;  
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
  id_cat_empleados : number|any = '';
  resultadoid_cat_empleados: boolean = false; 
  errorid_cat_empleados: boolean = false; 

  resultadoid_usuario: boolean = false; 
  errorid_usuario: boolean = false; 

  nombre_completo : string|any = '';
  resultadonombre_completo: boolean = false; 
  errornombre_completo: boolean = false; 

  numero_empleado : number|any = '';
  resultadonumero_empleado: boolean = false; 
  errornumero_empleado: boolean = false; 

  cargo : string|any = '';
  resultadocargo: boolean = false; 
  errorcargo: boolean = false; 

  direccion : string | any ='';
  resultadodireccion: boolean = false; 
  errordireccion: boolean = false; 

  direccion_texto : string|any = '';
  resultadodireccion_texto: boolean = false; 
  errordireccion_texto: boolean = false; 

  subdireccion : string|any = '';
  resultadosubdireccion: boolean = false; 
  errorsubdireccion: boolean = false; 

  area : string | any ='';
  resultadoarea: boolean = false; 
  errorarea: boolean = false; 

  area_texto : string|any = '';
  resultadoarea_texto: boolean = false; 
  errorarea_texto: boolean = false; 

  nombreJefe : string|any = '';
  resultadonombreJefe: boolean = false; 
  errornombreJefe: boolean = false; 

  cargoJefe : string|any = '';
  resultadocargoJefe: boolean = false; 
  errorcargoJefe: boolean = false; 

  correo_institucional : string|any = '';
  resultadocorreo_institucional: boolean = false; 
  errorcorreo_institucional: boolean = false; 

  telefono_opdm : string|any = '';
  resultadotelefono_opdm: boolean = false; 
  errortelefono_opdm: boolean = false; 

  url : string|any = '';
  resultadourl: boolean = false; 
  errorurl: boolean = false; 

  codigo_qr : string|any = '';
  resultadocodigo_qr: boolean = false; 
  errorcodigo_qr: boolean = false; 

  foto : string|any = '';
  resultadofoto: boolean = false; 
  errorfoto: boolean = false; 

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
  constructor(private _cat_empleadosServices: cat_empleadosService, private router: Router, private aRouter:ActivatedRoute,private _cat_direccionesServices: cat_direccionesService,private _cat_areasServices: cat_areasService, private _sanitizer: DomSanitizer, private _estatuscatalogo_empleadosServices:  estatuscatalogo_empleadosService, private _historialMastercatalogo_empleadosService : historialMastercatalogo_empleadosService  ) {
this.page = 3;
this.previousPage = 1;
    this.id_catalogo_empleados = aRouter.snapshot.paramMap.get('id_catalogo_empleados');
    this.id_cat_empleados = aRouter.snapshot.paramMap.get('id_cat_empleados');
    this.getInformacionById();
    this.token        = localStorage.getItem('token');
    this.id_usuario   = localStorage.getItem('id_usuario');
    this.id_rol       = localStorage.getItem('id_rol');
    this.imp          = localStorage.getItem('imp');
    this.edit         = localStorage.getItem('edit');
    this.elim         = localStorage.getItem('elim');
    this.nuev         = localStorage.getItem('nuev');
    this.img          = localStorage.getItem('img');
    this.PaginaActual = '/index/nuevocat_empleados';
    this.finalizado   = 1;
    this.getCatEstatuscatalogo_empleados();
    this.tableHistorialMaster();
    this.getInfoCat_cat_direcciones();
    this.getInfoCat_cat_areas();
  }

 tableHistorialMaster(){
     this._historialMastercatalogo_empleadosService.historialMasterByIdcatalogo_empleados(this.id_cat_empleados,this.id_usuario).subscribe(data => { 
     this.listhistorialMastercatalogo_empleados = data;
     this.dataSource = new MatTableDataSource<historialMastercatalogo_empleadosTable>(this.listhistorialMastercatalogo_empleados);
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
  getInfoCat_cat_direcciones(){
     this._cat_direccionesServices.getAllcat_direcciones(this.id_usuario).subscribe(data => {
       this.listcat_direcciones = data;
     })
  }
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
  getCatEstatuscatalogo_empleados(){
    this._estatuscatalogo_empleadosServices.getAllestatuscatalogo_empleados(this.id_usuario).subscribe((data) => { 
      this.listestatuscatalogo_empleados = data;  
    })
  }


  goInicio() {
    this.router.navigate(['/index/catalogo_empleados']);
  }

  getInformacionById(){
    if(this.id_cat_empleados !== '' ){
      this._cat_empleadosServices.getcat_empleados(this.id_cat_empleados,this.id_usuario).subscribe((data : cat_empleadosTable) =>{
      this.estatus = data.id_estatuscatalogo_empleados;  
        this.id_usuario = data.id_usuario;  
        this.nombre_completo = data.nombre_completo;  
        this.numero_empleado = data.numero_empleado;  
        this.cargo = data.cargo;  
        this.direccion = data.direccion;  
        this.direccion_texto = data.direccion_texto;  
        this.subdireccion = data.subdireccion;  
        this.area = data.area;  
        this.area_texto = data.area_texto;  
        this.nombreJefe = data.nombreJefe;  
        this.cargoJefe = data.cargoJefe;  
        this.correo_institucional = data.correo_institucional;  
        this.telefono_opdm = data.telefono_opdm;  
        this.url = data.url;  
        this.codigo_qr = data.codigo_qr;  
        this.foto = data.foto;  

      })
    }
  }
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
