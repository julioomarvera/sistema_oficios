import { Component, ViewChild, ChangeDetectionStrategy, inject } from '@angular/core'; 
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout'; 
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { firma_coordinadorTable } from '../../../../interfaces/firma/firma_coordinador/firma_coordinador-table.interface';
import { firma_coordinadorService } from '../../../../service/firma/firma_coordinador/firma_coordinador.service';
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
import { estatusfirmaTable }   from '../../../../interfaces/firma/estatus/estatusfirma-table.interface';
import { estatusfirmaService } from '../../../../service/firma/estatus/estatusfirma.service';
import { historialMasterfirmaTable }   from '../../../../interfaces/firma/historialMaster/historialMasterfirma-table.interface';
import { historialMasterfirmaService } from '../../../../service/firma/historialMaster/historialMasterfirma.service';
@Component({
  selector: 'app-ver-firma_coordinador',
  standalone: true,
  imports: [MatCardModule,MatIconModule,MatFormFieldModule,MatPaginator, MatSortModule,MatTableModule,
             MatInputModule,FormsModule, ReactiveFormsModule, MatSortModule,
             MatSlideToggleModule, MatDialogModule, MatButtonModule,CommonModule  ],
  templateUrl: './ver.component.html',
  styleUrl: './ver.component.scss'
})

export default class VerComponentfirma_coordinador {
  displayedColumns: string[] = ['id_historialMaster', 'id_usuario', 'id_firma_coordinador','id_gestion_oficio','id_oficios','id_direccion_coordinador','text_direccion_coordinador','id_area_coordinador','text_area_coordinador','id_direccion_peticion','text_direccion_peticion','id_area_peticion','area_text_peticion','numero_empleado_coordinador','nombre_empleado_coordinador','foto_empleado_coordinador','numero_empleado_peticion','nombre_empleado_peticion','foto_empleado_peticion','numero_empleado_secretaria','nombre_secretaria','foto_secretario','numero_empleado_tecnico','nombre_tecnico','foto_tecnico','numero_oficio','numero_contestacion','archivo_oficio','archivo_sello','archivo_evidencia','archivo_contestacion_pdf','archivo_contestacion_digital','asunto','descripcion_contestacion','visto','fecha_contestacion','fecha_terminacion','tiempo_efectivo_contestacion','otro','accion' , 'createAt'];
  @ViewChild(MatPaginator) paginator !: MatPaginator; 
  @ViewChild(MatSort) sort !: MatSort; 
  id_firma : number | any; 
  listfirma_coordinador: firma_coordinadorTable[] = [];
  listestatusfirma : estatusfirmaTable[] = []; 
  listhistorialMasterfirma : historialMasterfirmaTable[] = []; 
  id_estatusfirma :number | any;  
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
  id_firma_coordinador : number|any = '';
  resultadoid_firma_coordinador: boolean = false; 
  errorid_firma_coordinador: boolean = false; 

  id_gestion_oficio : string|any = '';
  resultadoid_gestion_oficio: boolean = false; 
  errorid_gestion_oficio: boolean = false; 

  id_oficios : string|any = '';
  resultadoid_oficios: boolean = false; 
  errorid_oficios: boolean = false; 

  id_direccion_coordinador : string|any = '';
  resultadoid_direccion_coordinador: boolean = false; 
  errorid_direccion_coordinador: boolean = false; 

  text_direccion_coordinador : string|any = '';
  resultadotext_direccion_coordinador: boolean = false; 
  errortext_direccion_coordinador: boolean = false; 

  id_area_coordinador : string|any = '';
  resultadoid_area_coordinador: boolean = false; 
  errorid_area_coordinador: boolean = false; 

  text_area_coordinador : string|any = '';
  resultadotext_area_coordinador: boolean = false; 
  errortext_area_coordinador: boolean = false; 

  id_direccion_peticion : string|any = '';
  resultadoid_direccion_peticion: boolean = false; 
  errorid_direccion_peticion: boolean = false; 

  text_direccion_peticion : string|any = '';
  resultadotext_direccion_peticion: boolean = false; 
  errortext_direccion_peticion: boolean = false; 

  id_area_peticion : string|any = '';
  resultadoid_area_peticion: boolean = false; 
  errorid_area_peticion: boolean = false; 

  area_text_peticion : string|any = '';
  resultadoarea_text_peticion: boolean = false; 
  errorarea_text_peticion: boolean = false; 

  numero_empleado_coordinador : string|any = '';
  resultadonumero_empleado_coordinador: boolean = false; 
  errornumero_empleado_coordinador: boolean = false; 

  nombre_empleado_coordinador : string|any = '';
  resultadonombre_empleado_coordinador: boolean = false; 
  errornombre_empleado_coordinador: boolean = false; 

  foto_empleado_coordinador : string|any = '';
  resultadofoto_empleado_coordinador: boolean = false; 
  errorfoto_empleado_coordinador: boolean = false; 

  numero_empleado_peticion : string|any = '';
  resultadonumero_empleado_peticion: boolean = false; 
  errornumero_empleado_peticion: boolean = false; 

  nombre_empleado_peticion : string|any = '';
  resultadonombre_empleado_peticion: boolean = false; 
  errornombre_empleado_peticion: boolean = false; 

  foto_empleado_peticion : string|any = '';
  resultadofoto_empleado_peticion: boolean = false; 
  errorfoto_empleado_peticion: boolean = false; 

  numero_empleado_secretaria : string|any = '';
  resultadonumero_empleado_secretaria: boolean = false; 
  errornumero_empleado_secretaria: boolean = false; 

  nombre_secretaria : string|any = '';
  resultadonombre_secretaria: boolean = false; 
  errornombre_secretaria: boolean = false; 

  foto_secretario : string|any = '';
  resultadofoto_secretario: boolean = false; 
  errorfoto_secretario: boolean = false; 

  numero_empleado_tecnico : string|any = '';
  resultadonumero_empleado_tecnico: boolean = false; 
  errornumero_empleado_tecnico: boolean = false; 

  nombre_tecnico : string|any = '';
  resultadonombre_tecnico: boolean = false; 
  errornombre_tecnico: boolean = false; 

  foto_tecnico : string|any = '';
  resultadofoto_tecnico: boolean = false; 
  errorfoto_tecnico: boolean = false; 

  numero_oficio : string|any = '';
  resultadonumero_oficio: boolean = false; 
  errornumero_oficio: boolean = false; 

  numero_contestacion : string|any = '';
  resultadonumero_contestacion: boolean = false; 
  errornumero_contestacion: boolean = false; 

  archivo_oficio : string|any = '';
  resultadoarchivo_oficio: boolean = false; 
  errorarchivo_oficio: boolean = false; 

  archivo_sello : string|any = '';
  resultadoarchivo_sello: boolean = false; 
  errorarchivo_sello: boolean = false; 

  archivo_evidencia : string|any = '';
  resultadoarchivo_evidencia: boolean = false; 
  errorarchivo_evidencia: boolean = false; 

  archivo_contestacion_pdf : string|any = '';
  resultadoarchivo_contestacion_pdf: boolean = false; 
  errorarchivo_contestacion_pdf: boolean = false; 

  archivo_contestacion_digital : string|any = '';
  resultadoarchivo_contestacion_digital: boolean = false; 
  errorarchivo_contestacion_digital: boolean = false; 

  asunto : string|any = '';
  resultadoasunto: boolean = false; 
  errorasunto: boolean = false; 

  descripcion_contestacion : string|any = '';
  resultadodescripcion_contestacion: boolean = false; 
  errordescripcion_contestacion: boolean = false; 

  visto : string|any = '';
  resultadovisto: boolean = false; 
  errorvisto: boolean = false; 

  fecha_contestacion : string|any = '';
  resultadofecha_contestacion: boolean = false; 
  errorfecha_contestacion: boolean = false; 

  fecha_terminacion : string|any = '';
  resultadofecha_terminacion: boolean = false; 
  errorfecha_terminacion: boolean = false; 

  tiempo_efectivo_contestacion : string|any = '';
  resultadotiempo_efectivo_contestacion: boolean = false; 
  errortiempo_efectivo_contestacion: boolean = false; 

  otro : string|any = '';
  resultadootro: boolean = false; 
  errorotro: boolean = false; 

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
  constructor(private _firma_coordinadorServices: firma_coordinadorService, private router: Router, private aRouter:ActivatedRoute, private _sanitizer: DomSanitizer, private _estatusfirmaServices:  estatusfirmaService, private _historialMasterfirmaService : historialMasterfirmaService  ) {
this.page = 3;
this.previousPage = 1;
    this.id_firma = aRouter.snapshot.paramMap.get('id_firma');
    this.id_firma_coordinador = aRouter.snapshot.paramMap.get('id_firma_coordinador');
    this.getInformacionById();
    this.token        = localStorage.getItem('token');
    this.id_usuario   = localStorage.getItem('id_usuario');
    this.id_rol       = localStorage.getItem('id_rol');
    this.imp          = localStorage.getItem('imp');
    this.edit         = localStorage.getItem('edit');
    this.elim         = localStorage.getItem('elim');
    this.nuev         = localStorage.getItem('nuev');
    this.img          = localStorage.getItem('img');
    this.PaginaActual = '/index/nuevofirma_coordinador';
    this.finalizado   = 1;
    this.getCatEstatusfirma();
    this.tableHistorialMaster();
  }

 tableHistorialMaster(){
     this._historialMasterfirmaService.historialMasterByIdfirma(this.id_firma_coordinador,this.id_usuario).subscribe(data => { 
     this.listhistorialMasterfirma = data;
     this.dataSource = new MatTableDataSource<historialMasterfirmaTable>(this.listhistorialMasterfirma);
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
  openHelper() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);
      dialogRef.afterClosed().subscribe(result => {
         console.log(`Dialog result: ${result}`);
      });
  }
  getCatEstatusfirma(){
    this._estatusfirmaServices.getAllestatusfirma(this.id_usuario).subscribe((data) => { 
      this.listestatusfirma = data;  
    })
  }


  goInicio() {
    this.router.navigate(['/index/firma']);
  }

  getInformacionById(){
    if(this.id_firma_coordinador !== '' ){
      this._firma_coordinadorServices.getfirma_coordinador(this.id_firma_coordinador,this.id_usuario).subscribe((data : firma_coordinadorTable) =>{
      this.estatus = data.id_estatusfirma;  
        this.id_gestion_oficio = data.id_gestion_oficio;  
        this.id_oficios = data.id_oficios;  
        this.id_direccion_coordinador = data.id_direccion_coordinador;  
        this.text_direccion_coordinador = data.text_direccion_coordinador;  
        this.id_area_coordinador = data.id_area_coordinador;  
        this.text_area_coordinador = data.text_area_coordinador;  
        this.id_direccion_peticion = data.id_direccion_peticion;  
        this.text_direccion_peticion = data.text_direccion_peticion;  
        this.id_area_peticion = data.id_area_peticion;  
        this.area_text_peticion = data.area_text_peticion;  
        this.numero_empleado_coordinador = data.numero_empleado_coordinador;  
        this.nombre_empleado_coordinador = data.nombre_empleado_coordinador;  
        this.foto_empleado_coordinador = data.foto_empleado_coordinador;  
        this.numero_empleado_peticion = data.numero_empleado_peticion;  
        this.nombre_empleado_peticion = data.nombre_empleado_peticion;  
        this.foto_empleado_peticion = data.foto_empleado_peticion;  
        this.numero_empleado_secretaria = data.numero_empleado_secretaria;  
        this.nombre_secretaria = data.nombre_secretaria;  
        this.foto_secretario = data.foto_secretario;  
        this.numero_empleado_tecnico = data.numero_empleado_tecnico;  
        this.nombre_tecnico = data.nombre_tecnico;  
        this.foto_tecnico = data.foto_tecnico;  
        this.numero_oficio = data.numero_oficio;  
        this.numero_contestacion = data.numero_contestacion;  
        this.archivo_oficio = data.archivo_oficio;  
        this.archivo_sello = data.archivo_sello;  
        this.archivo_evidencia = data.archivo_evidencia;  
        this.archivo_contestacion_pdf = data.archivo_contestacion_pdf;  
        this.archivo_contestacion_digital = data.archivo_contestacion_digital;  
        this.asunto = data.asunto;  
        this.descripcion_contestacion = data.descripcion_contestacion;  
        this.visto = data.visto;  
        this.fecha_contestacion = data.fecha_contestacion;  
        this.fecha_terminacion = data.fecha_terminacion;  
        this.tiempo_efectivo_contestacion = data.tiempo_efectivo_contestacion;  
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
