import { Component, ViewChild, ChangeDetectionStrategy, inject } from '@angular/core'; 
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'; 
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { cat_areasTable } from '../../../../interfaces/catalogo_areas/cat_areas/cat_areas-table.interface';
import { cat_areasService } from '../../../../service/catalogo_areas/cat_areas/cat_areas.service';
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
import { estatuscatalogo_areasTable }   from '../../../../interfaces/catalogo_areas/estatus/estatuscatalogo_areas-table.interface';
import { estatuscatalogo_areasService } from '../../../../service/catalogo_areas/estatus/estatuscatalogo_areas.service';
import { historialMastercatalogo_areasTable }   from '../../../../interfaces/catalogo_areas/historialMaster/historialMastercatalogo_areas-table.interface';
import { historialMastercatalogo_areasService } from '../../../../service/catalogo_areas/historialMaster/historialMastercatalogo_areas.service';
import { cat_direccionesTable } from   '../../../../interfaces/catalogo/cat_direcciones/cat_direcciones-table.interface';
import { cat_direccionesService } from '../../../../service/catalogo/cat_direcciones/cat_direcciones.service';
@Component({
  selector: 'app-ver-cat_areas',
  standalone: true,
  imports: [MatCardModule,MatIconModule,MatFormFieldModule,MatPaginator, MatSortModule,MatTableModule,
             MatInputModule,FormsModule, ReactiveFormsModule, MatSortModule,
             MatSlideToggleModule, MatDialogModule, MatButtonModule,CommonModule  ],
  templateUrl: './ver.component.html',
  styleUrl: './ver.component.scss'
})

export default class VerComponentcat_areas {
  displayedColumns: string[] = ['id_historialMaster', 'id_usuario', 'id_cat_areas','id_direccion','text_direccion','descripcion','accion' , 'createAt'];
  @ViewChild(MatPaginator) paginator !: MatPaginator; 
  @ViewChild(MatSort) sort !: MatSort; 
  id_catalogo_areas : number | any; 
  listcat_areas: cat_areasTable[] = [];
  listestatuscatalogo_areas : estatuscatalogo_areasTable[] = []; 
  listhistorialMastercatalogo_areas : historialMastercatalogo_areasTable[] = []; 
  id_estatuscatalogo_areas :number | any;  
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
  id_cat_areas : number|any = '';
  resultadoid_cat_areas: boolean = false; 
  errorid_cat_areas: boolean = false; 

  id_direccion : string | any ='';
  resultadoid_direccion: boolean = false; 
  errorid_direccion: boolean = false; 

  text_direccion : string|any = '';
  resultadotext_direccion: boolean = false; 
  errortext_direccion: boolean = false; 

  resultadodescripcion: boolean = false; 
  errordescripcion: boolean = false; 

  listcat_direcciones:cat_direccionesTable[] = [];

  listcat_direccionesFilter :cat_direccionesTable[] = [];

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
  constructor(private _cat_areasServices: cat_areasService, private router: Router, private aRouter:ActivatedRoute,private _cat_direccionesServices: cat_direccionesService, private _sanitizer: DomSanitizer, private _estatuscatalogo_areasServices:  estatuscatalogo_areasService, private _historialMastercatalogo_areasService : historialMastercatalogo_areasService  ) {
this.page = 3;
this.previousPage = 1;
    this.id_catalogo_areas = aRouter.snapshot.paramMap.get('id_catalogo_areas');
    this.id_cat_areas = aRouter.snapshot.paramMap.get('id_cat_areas');
    this.getInformacionById();
    this.token        = localStorage.getItem('token');
    this.id_usuario   = localStorage.getItem('id_usuario');
    this.id_rol       = localStorage.getItem('id_rol');
    this.imp          = localStorage.getItem('imp');
    this.edit         = localStorage.getItem('edit');
    this.elim         = localStorage.getItem('elim');
    this.nuev         = localStorage.getItem('nuev');
    this.img          = localStorage.getItem('img');
    this.PaginaActual = '/index/nuevocat_areas';
    this.finalizado   = 1;
    this.getCatEstatuscatalogo_areas();
    this.tableHistorialMaster();
    this.getInfoCat_cat_direcciones();
  }

 tableHistorialMaster(){
     this._historialMastercatalogo_areasService.historialMasterByIdcatalogo_areas(this.id_cat_areas,this.id_usuario).subscribe(data => { 
     this.listhistorialMastercatalogo_areas = data;
     this.dataSource = new MatTableDataSource<historialMastercatalogo_areasTable>(this.listhistorialMastercatalogo_areas);
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
  openHelper() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);
      dialogRef.afterClosed().subscribe(result => {
         console.log(`Dialog result: ${result}`);
      });
  }
  getCatEstatuscatalogo_areas(){
    this._estatuscatalogo_areasServices.getAllestatuscatalogo_areas(this.id_usuario).subscribe((data) => { 
      this.listestatuscatalogo_areas = data;  
    })
  }


  goInicio() {
    this.router.navigate(['/index/catalogo_areas']);
  }

  getInformacionById(){
    if(this.id_cat_areas !== '' ){
      this._cat_areasServices.getcat_areas(this.id_cat_areas,this.id_usuario).subscribe((data : cat_areasTable) =>{
      this.estatus = data.id_estatuscatalogo_areas;  
        this.id_direccion = data.id_direccion;  
        this.text_direccion = data.text_direccion;  
        this.descripcion = data.descripcion;  

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
