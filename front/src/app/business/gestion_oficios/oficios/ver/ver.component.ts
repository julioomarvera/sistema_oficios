import { Component, ViewChild, ChangeDetectionStrategy, inject } from '@angular/core'; 
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'; 
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { oficiosTable } from '../../../../interfaces/gestion_oficios/oficios/oficios-table.interface';
import { oficiosService } from '../../../../service/gestion_oficios/oficios/oficios.service';
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
import { estatusgestion_oficiosTable }   from '../../../../interfaces/gestion_oficios/estatus/estatusgestion_oficios-table.interface';
import { estatusgestion_oficiosService } from '../../../../service/gestion_oficios/estatus/estatusgestion_oficios.service';
import { historialMastergestion_oficiosTable }   from '../../../../interfaces/gestion_oficios/historialMaster/historialMastergestion_oficios-table.interface';
import { historialMastergestion_oficiosService } from '../../../../service/gestion_oficios/historialMaster/historialMastergestion_oficios.service';
import { cat_oficioTable } from '../../../../interfaces/catalogo/cat_oficio/cat_oficio-table.interface';
import { cat_oficioService } from '../../../../service/catalogo/cat_oficio/cat_oficio.service'; 
import { cat_tipo_oficiosTable } from   '../../../../interfaces/catalogo/cat_tipo_oficios/cat_tipo_oficios-table.interface';
import { cat_tipo_oficiosService } from '../../../../service/catalogo/cat_tipo_oficios/cat_tipo_oficios.service';
import { cat_numero_oficiosTable } from   '../../../../interfaces/catalogo/cat_numero_oficios/cat_numero_oficios-table.interface';
import { cat_numero_oficiosService } from '../../../../service/catalogo/cat_numero_oficios/cat_numero_oficios.service';
@Component({
  selector: 'app-ver-oficios',
  standalone: true,
  imports: [MatCardModule,MatIconModule,MatFormFieldModule,MatPaginator, MatSortModule,MatTableModule,
             MatInputModule,FormsModule, ReactiveFormsModule, MatSortModule,
             MatSlideToggleModule, MatDialogModule, MatButtonModule,CommonModule  ],
  templateUrl: './ver.component.html',
  styleUrl: './ver.component.scss'
})

export default class VerComponentoficios {
  displayedColumns: string[] = ['id_historialMaster', 'id_usuario', 'id_oficios','oficio','text_oficio','tipo_oficio','text_tipo','numero_oficio','fecha_hora','caso_cop','asunto','contenido','archivo_oficio','otro','accion' , 'createAt'];
  @ViewChild(MatPaginator) paginator !: MatPaginator; 
  @ViewChild(MatSort) sort !: MatSort; 
  id_gestion_oficios : number | any; 
  listoficios: oficiosTable[] = [];
  listestatusgestion_oficios : estatusgestion_oficiosTable[] = []; 
  listhistorialMastergestion_oficios : historialMastergestion_oficiosTable[] = []; 
  id_estatusgestion_oficios :number | any;  
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
  id_oficios : number|any = '';
  resultadoid_oficios: boolean = false; 
  errorid_oficios: boolean = false; 

  oficio : string | any ='';
  resultadooficio: boolean = false; 
  erroroficio: boolean = false; 

  text_oficio : string|any = '';
  resultadotext_oficio: boolean = false; 
  errortext_oficio: boolean = false; 

  tipo_oficio : string | any ='';
  resultadotipo_oficio: boolean = false; 
  errortipo_oficio: boolean = false; 

  text_tipo : string|any = '';
  resultadotext_tipo: boolean = false; 
  errortext_tipo: boolean = false; 

  numero_oficio : string | any ='';
  resultadonumero_oficio: boolean = false; 
  errornumero_oficio: boolean = false; 

  fecha_hora : string|any = '';
  resultadofecha_hora: boolean = false; 
  errorfecha_hora: boolean = false; 

  caso_cop : string|any = '';
  resultadocaso_cop: boolean = false; 
  errorcaso_cop: boolean = false; 

  asunto : string|any = '';
  resultadoasunto: boolean = false; 
  errorasunto: boolean = false; 

  contenido : string|any = '';
  resultadocontenido: boolean = false; 
  errorcontenido: boolean = false; 

  archivo_oficio : string | any ='';
  resultadoarchivo_oficio: boolean = false; 
  errorarchivo_oficio: boolean = false; 

  otro : string|any = '';
  resultadootro: boolean = false; 
  errorotro: boolean = false; 

  listcat_oficios:cat_oficioTable[] = [];
listcat_tipo_oficios:cat_tipo_oficiosTable[] = [];
listcat_numero_oficios:cat_numero_oficiosTable[] = [];

  listcat_oficiosFilter :cat_oficioTable[] = [];
listcat_tipo_oficiosFilter :cat_tipo_oficiosTable[] = [];
listcat_numero_oficiosFilter :cat_numero_oficiosTable[] = [];

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
  constructor(private _oficiosServices: oficiosService, private router: Router, private aRouter:ActivatedRoute,private _cat_oficiosServices: cat_oficioService,private _cat_tipo_oficiosServices: cat_tipo_oficiosService,private _cat_numero_oficiosServices: cat_numero_oficiosService, private _sanitizer: DomSanitizer, private _estatusgestion_oficiosServices:  estatusgestion_oficiosService, private _historialMastergestion_oficiosService : historialMastergestion_oficiosService  ) {
this.page = 3;
this.previousPage = 1;
    this.id_gestion_oficios = aRouter.snapshot.paramMap.get('id_gestion_oficios');
    this.id_oficios = aRouter.snapshot.paramMap.get('id_oficios');
    this.getInformacionById();
    this.token        = localStorage.getItem('token');
    this.id_usuario   = localStorage.getItem('id_usuario');
    this.id_rol       = localStorage.getItem('id_rol');
    this.imp          = localStorage.getItem('imp');
    this.edit         = localStorage.getItem('edit');
    this.elim         = localStorage.getItem('elim');
    this.nuev         = localStorage.getItem('nuev');
    this.img          = localStorage.getItem('img');
    this.PaginaActual = '/index/nuevooficios';
    this.finalizado   = 1;
    this.getCatEstatusgestion_oficios();
    this.tableHistorialMaster();
    this.getInfoCat_cat_oficios();
    this.getInfoCat_cat_tipo_oficios();
    this.getInfoCat_cat_numero_oficios();
  }

 tableHistorialMaster(){
     this._historialMastergestion_oficiosService.historialMasterByIdgestion_oficios(this.id_oficios,this.id_usuario).subscribe(data => { 
     this.listhistorialMastergestion_oficios = data;
     this.dataSource = new MatTableDataSource<historialMastergestion_oficiosTable>(this.listhistorialMastergestion_oficios);
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
  getInfoCat_cat_oficios(){
     this._cat_oficiosServices.getAllcat_oficio(this.id_usuario).subscribe(data => {
       this.listcat_oficios = data;
     })
  }
  getInfoCat_cat_tipo_oficios(){
     this._cat_tipo_oficiosServices.getAllcat_tipo_oficios(this.id_usuario).subscribe(data => {
       this.listcat_tipo_oficios = data;
     })
  }
  getInfoCat_cat_numero_oficios(){
     this._cat_numero_oficiosServices.getAllcat_numero_oficios(this.id_usuario).subscribe(data => {
       this.listcat_numero_oficios = data;
     })
  }
  openHelper() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);
      dialogRef.afterClosed().subscribe(result => {
         console.log(`Dialog result: ${result}`);
      });
  }
  getCatEstatusgestion_oficios(){
    this._estatusgestion_oficiosServices.getAllestatusgestion_oficios(this.id_usuario).subscribe((data) => { 
      this.listestatusgestion_oficios = data;  
    })
  }


  goInicio() {
    this.router.navigate(['/index/gestion_oficios']);
  }

  getInformacionById(){
    if(this.id_oficios !== '' ){
      this._oficiosServices.getoficios(this.id_oficios,this.id_usuario).subscribe((data : oficiosTable) =>{
      this.estatus = data.id_estatusgestion_oficios;  
        this.oficio = data.oficio;  
        this.text_oficio = data.text_oficio;  
        this.tipo_oficio = data.tipo_oficio;  
        this.text_tipo = data.text_tipo;  
        this.numero_oficio = data.numero_oficio;  
        this.fecha_hora = data.fecha_hora;  
        this.caso_cop = data.caso_cop;  
        this.asunto = data.asunto;  
        this.contenido = data.contenido;  
        this.archivo_oficio = data.archivo_oficio;  
        this.otro = data.otro;  

        this.archivo_oficio = this._sanitizer.bypassSecurityTrustResourceUrl(this.archivo_oficio);
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
