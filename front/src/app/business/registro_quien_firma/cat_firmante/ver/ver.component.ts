import { Component, ViewChild, ChangeDetectionStrategy, inject } from '@angular/core'; 
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'; 
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { cat_firmanteTable } from '../../../../interfaces/registro_quien_firma/cat_firmante/cat_firmante-table.interface';
import { cat_firmanteService } from '../../../../service/registro_quien_firma/cat_firmante/cat_firmante.service';
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
import { estatusregistro_quien_firmaTable }   from '../../../../interfaces/registro_quien_firma/estatus/estatusregistro_quien_firma-table.interface';
import { estatusregistro_quien_firmaService } from '../../../../service/registro_quien_firma/estatus/estatusregistro_quien_firma.service';
import { historialMasterregistro_quien_firmaTable }   from '../../../../interfaces/registro_quien_firma/historialMaster/historialMasterregistro_quien_firma-table.interface';
import { historialMasterregistro_quien_firmaService } from '../../../../service/registro_quien_firma/historialMaster/historialMasterregistro_quien_firma.service';
import { cat_direccionesTable } from   '../../../../interfaces/catalogo/cat_direcciones/cat_direcciones-table.interface';
import { cat_direccionesService } from '../../../../service/catalogo/cat_direcciones/cat_direcciones.service';
import { cat_areasTable } from '../../../../interfaces/catalogo_areas/cat_areas/cat_areas-table.interface';
import { cat_areasService } from '../../../../service/catalogo_areas/cat_areas/cat_areas.service'; 
import { cat_empleadosTable } from '../../../../interfaces/catalogo_empleados/cat_empleados/cat_empleados-table.interface';
import { cat_empleadosService } from '../../../../service/catalogo_empleados/cat_empleados/cat_empleados.service';
@Component({
  selector: 'app-ver-cat_firmante',
  standalone: true,
  imports: [MatCardModule,MatIconModule,MatFormFieldModule,MatPaginator, MatSortModule,MatTableModule,
             MatInputModule,FormsModule, ReactiveFormsModule, MatSortModule,
             MatSlideToggleModule, MatDialogModule, MatButtonModule,CommonModule  ],
  templateUrl: './ver.component.html',
  styleUrl: './ver.component.scss'
})

export default class VerComponentcat_firmante {
  displayedColumns: string[] = ['id_historialMaster', 'id_usuario', 'id_cat_firmante','id_direccion','text_direccion','id_area','area_texto','numero_empledo','text_nombre_empleado','foto','id_oficio','otro','accion' , 'createAt'];
  @ViewChild(MatPaginator) paginator !: MatPaginator; 
  @ViewChild(MatSort) sort !: MatSort; 
  id_registro_quien_firma : number | any; 
  listcat_firmante: cat_firmanteTable[] = [];
  listestatusregistro_quien_firma : estatusregistro_quien_firmaTable[] = []; 
  listhistorialMasterregistro_quien_firma : historialMasterregistro_quien_firmaTable[] = []; 
  id_estatusregistro_quien_firma :number | any;  
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
  id_cat_firmante : number|any = '';
  resultadoid_cat_firmante: boolean = false; 
  errorid_cat_firmante: boolean = false; 

  id_direccion : string | any ='';
  resultadoid_direccion: boolean = false; 
  errorid_direccion: boolean = false; 

  text_direccion : string|any = '';
  resultadotext_direccion: boolean = false; 
  errortext_direccion: boolean = false; 

  id_area : string | any ='';
  resultadoid_area: boolean = false; 
  errorid_area: boolean = false; 

  area_texto : string|any = '';
  resultadoarea_texto: boolean = false; 
  errorarea_texto: boolean = false; 

  numero_empledo : string | any ='';
  resultadonumero_empledo: boolean = false; 
  errornumero_empledo: boolean = false; 

  text_nombre_empleado : string|any = '';
  resultadotext_nombre_empleado: boolean = false; 
  errortext_nombre_empleado: boolean = false; 

  foto : string|any = '';
  resultadofoto: boolean = false; 
  errorfoto: boolean = false; 

  id_oficio : string|any = '';
  resultadoid_oficio: boolean = false; 
  errorid_oficio: boolean = false; 

  otro : string|any = '';
  resultadootro: boolean = false; 
  errorotro: boolean = false; 

  listcat_direcciones:cat_direccionesTable[] = [];
listcat_areas:cat_areasTable[] = [];
listcat_empleados:cat_empleadosTable[] = [];

  listcat_direccionesFilter :cat_direccionesTable[] = [];
listcat_areasFilter :cat_areasTable[] = [];
listcat_empleadosFilter :cat_empleadosTable[] = [];

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
  constructor(private _cat_firmanteServices: cat_firmanteService, private router: Router, private aRouter:ActivatedRoute,private _cat_direccionesServices: cat_direccionesService,private _cat_areasServices: cat_areasService,private _cat_empleadosServices: cat_empleadosService, private _sanitizer: DomSanitizer, private _estatusregistro_quien_firmaServices:  estatusregistro_quien_firmaService, private _historialMasterregistro_quien_firmaService : historialMasterregistro_quien_firmaService  ) {
this.page = 3;
this.previousPage = 1;
    this.id_registro_quien_firma = aRouter.snapshot.paramMap.get('id_registro_quien_firma');
    this.id_cat_firmante = aRouter.snapshot.paramMap.get('id_cat_firmante');
    this.getInformacionById();
    this.token        = localStorage.getItem('token');
    this.id_usuario   = localStorage.getItem('id_usuario');
    this.id_rol       = localStorage.getItem('id_rol');
    this.imp          = localStorage.getItem('imp');
    this.edit         = localStorage.getItem('edit');
    this.elim         = localStorage.getItem('elim');
    this.nuev         = localStorage.getItem('nuev');
    this.img          = localStorage.getItem('img');
    this.PaginaActual = '/index/nuevocat_firmante';
    this.finalizado   = 1;
    this.getCatEstatusregistro_quien_firma();
    this.tableHistorialMaster();
    this.getInfoCat_cat_direcciones();
    this.getInfoCat_cat_areas();
    this.getInfoCat_cat_empleados();
  }

 tableHistorialMaster(){
     this._historialMasterregistro_quien_firmaService.historialMasterByIdregistro_quien_firma(this.id_cat_firmante,this.id_usuario).subscribe(data => { 
     this.listhistorialMasterregistro_quien_firma = data;
     this.dataSource = new MatTableDataSource<historialMasterregistro_quien_firmaTable>(this.listhistorialMasterregistro_quien_firma);
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
  getInfoCat_cat_empleados(){
     this._cat_empleadosServices.getAllcat_empleados(this.id_usuario).subscribe(data => {
       this.listcat_empleados = data;
     })
  }
  openHelper() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);
      dialogRef.afterClosed().subscribe(result => {
         console.log(`Dialog result: ${result}`);
      });
  }
  getCatEstatusregistro_quien_firma(){
    this._estatusregistro_quien_firmaServices.getAllestatusregistro_quien_firma(this.id_usuario).subscribe((data) => { 
      this.listestatusregistro_quien_firma = data;  
    })
  }


  goInicio() {
    this.router.navigate(['/index/registro_quien_firma']);
  }

  getInformacionById(){
    if(this.id_cat_firmante !== '' ){
      this._cat_firmanteServices.getcat_firmante(this.id_cat_firmante,this.id_usuario).subscribe((data : cat_firmanteTable) =>{
      this.estatus = data.id_estatusregistro_quien_firma;  
        this.id_direccion = data.id_direccion;  
        this.text_direccion = data.text_direccion;  
        this.id_area = data.id_area;  
        this.area_texto = data.area_texto;  
        this.numero_empledo = data.numero_empledo;  
        this.text_nombre_empleado = data.text_nombre_empleado;  
        this.foto = data.foto;  
        this.id_oficio = data.id_oficio;  
        this.otro = data.otro;  

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
