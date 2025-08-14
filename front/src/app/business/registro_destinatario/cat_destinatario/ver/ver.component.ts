import { Component, ViewChild, ChangeDetectionStrategy, inject } from '@angular/core'; 
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'; 
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { cat_destinatarioTable } from '../../../../interfaces/registro_destinatario/cat_destinatario/cat_destinatario-table.interface';
import { cat_destinatarioService } from '../../../../service/registro_destinatario/cat_destinatario/cat_destinatario.service';
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
import { estatusregistro_destinatarioTable }   from '../../../../interfaces/registro_destinatario/estatus/estatusregistro_destinatario-table.interface';
import { estatusregistro_destinatarioService } from '../../../../service/registro_destinatario/estatus/estatusregistro_destinatario.service';
import { historialMasterregistro_destinatarioTable }   from '../../../../interfaces/registro_destinatario/historialMaster/historialMasterregistro_destinatario-table.interface';
import { historialMasterregistro_destinatarioService } from '../../../../service/registro_destinatario/historialMaster/historialMasterregistro_destinatario.service';
import { cat_direccionesTable } from   '../../../../interfaces/catalogo/cat_direcciones/cat_direcciones-table.interface';
import { cat_direccionesService } from '../../../../service/catalogo/cat_direcciones/cat_direcciones.service';
import { cat_areasTable } from '../../../../interfaces/catalogo_areas/cat_areas/cat_areas-table.interface';
import { cat_areasService } from '../../../../service/catalogo_areas/cat_areas/cat_areas.service';
import { cat_empleadosTable } from '../../../../interfaces/catalogo_empleados/cat_empleados/cat_empleados-table.interface';
import { cat_empleadosService } from '../../../../service/catalogo_empleados/cat_empleados/cat_empleados.service';
@Component({
  selector: 'app-ver-cat_destinatario',
  standalone: true,
  imports: [MatCardModule,MatIconModule,MatFormFieldModule,MatPaginator, MatSortModule,MatTableModule,
             MatInputModule,FormsModule, ReactiveFormsModule, MatSortModule,
             MatSlideToggleModule, MatDialogModule, MatButtonModule,CommonModule  ],
  templateUrl: './ver.component.html',
  styleUrl: './ver.component.scss'
})

export default class VerComponentcat_destinatario {
  displayedColumns: string[] = ['id_historialMaster', 'id_usuario', 'id_cat_destinatario','id_direccion','text_direccion',' id_area','area_texto','numero_empledo','text_nombre_empleado','foto','id_oficio','estatus','accion' , 'createAt'];
  @ViewChild(MatPaginator) paginator !: MatPaginator; 
  @ViewChild(MatSort) sort !: MatSort; 
  id_registro_destinatario : number | any; 
  listcat_destinatario: cat_destinatarioTable[] = [];
  listestatusregistro_destinatario : estatusregistro_destinatarioTable[] = []; 
  listhistorialMasterregistro_destinatario : historialMasterregistro_destinatarioTable[] = []; 
  id_estatusregistro_destinatario :number | any;  
  descripcion   : string|any;  

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
  id_cat_destinatario : number|any = '';
  resultadoid_cat_destinatario: boolean = false; 
  errorid_cat_destinatario: boolean = false; 

  id_direccion : string | any ='';
  resultadoid_direccion: boolean = false; 
  errorid_direccion: boolean = false; 

  text_direccion : string|any = '';
  resultadotext_direccion: boolean = false; 
  errortext_direccion: boolean = false; 

   id_area : string | any ='';
  resultado_id_area: boolean = false; 
  error_id_area: boolean = false; 

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

  estatus : number|any = '';
  resultadoestatus: boolean = false; 
  errorestatus: boolean = false; 

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
  constructor(private _cat_destinatarioServices: cat_destinatarioService, private router: Router, private aRouter:ActivatedRoute,private _cat_direccionesServices: cat_direccionesService,private _cat_areasServices: cat_areasService,private _cat_empleadosServices: cat_empleadosService, private _sanitizer: DomSanitizer, private _estatusregistro_destinatarioServices:  estatusregistro_destinatarioService, private _historialMasterregistro_destinatarioService : historialMasterregistro_destinatarioService  ) {
this.page = 3;
this.previousPage = 1;
    this.id_registro_destinatario = aRouter.snapshot.paramMap.get('id_registro_destinatario');
    this.id_cat_destinatario = aRouter.snapshot.paramMap.get('id_cat_destinatario');
    this.getInformacionById();
    this.token        = localStorage.getItem('token');
    this.id_usuario   = localStorage.getItem('id_usuario');
    this.id_rol       = localStorage.getItem('id_rol');
    this.imp          = localStorage.getItem('imp');
    this.edit         = localStorage.getItem('edit');
    this.elim         = localStorage.getItem('elim');
    this.nuev         = localStorage.getItem('nuev');
    this.img          = localStorage.getItem('img');
    this.PaginaActual = '/index/nuevocat_destinatario';
    this.finalizado   = 1;
    this.getCatEstatusregistro_destinatario();
    this.tableHistorialMaster();
    this.getInfoCat_cat_direcciones();
    this.getInfoCat_cat_areas();
    this.getInfoCat_cat_empleados();
  }

 tableHistorialMaster(){
     this._historialMasterregistro_destinatarioService.historialMasterByIdregistro_destinatario(this.id_cat_destinatario,this.id_usuario).subscribe(data => { 
     this.listhistorialMasterregistro_destinatario = data;
     this.dataSource = new MatTableDataSource<historialMasterregistro_destinatarioTable>(this.listhistorialMasterregistro_destinatario);
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
  getCatEstatusregistro_destinatario(){
    this._estatusregistro_destinatarioServices.getAllestatusregistro_destinatario(this.id_usuario).subscribe((data) => { 
      this.listestatusregistro_destinatario = data;  
    })
  }


  goInicio() {
    this.router.navigate(['/index/registro_destinatario']);
  }

  getInformacionById(){
    if(this.id_cat_destinatario !== '' ){
      this._cat_destinatarioServices.getcat_destinatario(this.id_cat_destinatario,this.id_usuario).subscribe((data : cat_destinatarioTable) =>{
      this.estatus = data.id_estatusregistro_destinatario;  
        this.id_direccion = data.id_direccion;  
        this.text_direccion = data.text_direccion;  
        this. id_area = data. id_area;  
        this.area_texto = data.area_texto;  
        this.numero_empledo = data.numero_empledo;  
        this.text_nombre_empleado = data.text_nombre_empleado;  
        this.foto = data.foto;  
        this.id_oficio = data.id_oficio;  
        this.estatus = data.estatus;  

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
