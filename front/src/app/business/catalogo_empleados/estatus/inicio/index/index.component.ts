import { Component, ViewChild, Inject, inject,  afterNextRender} from '@angular/core'; 
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { DOCUMENT,CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Router } from '@angular/router';
import { estatuscatalogo_empleadosTable }   from '../../../../../interfaces/catalogo_empleados/estatus/estatuscatalogo_empleados-table.interface';
import { estatuscatalogo_empleadosService } from '../../../../../service/catalogo_empleados/estatus/estatuscatalogo_empleados.service';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatTooltipModule } from '@angular/material/tooltip';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService }    from '../../../../../service/error.service';
import { ExporterService } from '../../../../../service/exporter/exporter.service';



export interface PeriodicElement{
  name: string; 
  position: number; 
  weight: number; 
  symbol: string; 
}

@Component({ 
  selector: 'app-index',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatChipsModule,
            MatIconModule, CommonModule, MatFormFieldModule,
            MatTableModule, MatPaginatorModule, MatInputModule,
            MatSortModule, MatTooltipModule,],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
}) 

export default class IndexComponent { 
  displayedColumns: string[] = ['activo','id_estatuscatalogo_empleados','id_usuario','descripcion','createdAt', 'Funciones']; 
  dataSource : any = []; 
  token      : string |any; 
  id_usuario : string |any; 
  id_rol     : string |any; 
  imp        : string |any; 
  edit       : string |any; 
  elim       : string |any; 
  nuev       : string |any; 
  img        : string |any; 

  @ViewChild(MatPaginator) paginator !: MatPaginator; 
  @ViewChild(MatSort) sort !: MatSort; 
  listestatuscatalogo_empleados : estatuscatalogo_empleadosTable[] = []; 
  //cuerpo ------------------------------------------------------------
  id_cat_empleados : number | any; 
  createdAt: string | any; 
  //esto es el ejemplo//------------------------------------------------ 
  page: number; 
  previousPage: number; 
  //-------------------------------------------------------------------- 
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
  id_eliminar: number | any; 


  constructor(@Inject(DOCUMENT) private document: Document, private router: Router, private _catalogo_empleadosServices:  estatuscatalogo_empleadosService, private toastr: ToastrService,private _errorService:ErrorService, private excelService: ExporterService ) {
    this.page = 3;
    this.previousPage = 1;
    this.token      = localStorage.getItem('token');
    this.id_usuario = localStorage.getItem('id_usuario');
    this.id_rol     = localStorage.getItem('id_rol');
    this.imp        = localStorage.getItem('imp');
    this.edit       = localStorage.getItem('edit');
    this.elim       = localStorage.getItem('elim');
    this.nuev       = localStorage.getItem('nuev');
    this.img        = localStorage.getItem('img');

    afterNextRender(() => {
      const storedData = localStorage.getItem('token');
      if (storedData) {
        try {
          this.token = JSON.parse(storedData);
        }
        catch (err) {
        }
      }
    });
  }

  ngOnInit(): void {
    this.page = 3;
    this.previousPage = 1;
    this.tablecatalogo_empleados();
  }

  tablecatalogo_empleados(){
    this._catalogo_empleadosServices.getAllestatuscatalogo_empleados(this.id_usuario).subscribe(data => { 
    this.listestatuscatalogo_empleados = data;
    this.dataSource = new MatTableDataSource<estatuscatalogo_empleadosTable>(this.listestatuscatalogo_empleados);
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
  
  agregarestatuscatalogo_empleados(evt: MouseEvent) {
    console.log(evt);
    this.router.navigate(['/index/estatusnuevocatalogo_empleados']);
  }
  verEstatus(id_estatuscatalogo_empleados: number) {
    if (id_estatuscatalogo_empleados != 0) {
      this.router.navigate(['/index/estatusvercatalogo_empleados/'+id_estatuscatalogo_empleados]);
    }
  }
  
  updateEstatus(id_estatuscatalogo_empleados: number) {
    if (id_estatuscatalogo_empleados != 0) {
      this.router.navigate(['/index/estatusactualizarcatalogo_empleados/'+ id_estatuscatalogo_empleados]);
    }
  }
  
  DeleteEstatus(id_estatuscatalogo_empleados: number) {
    if (id_estatuscatalogo_empleados != 0) {
      Swal.fire({
        title: '¿Desea eliminar el registro con número ' + id_estatuscatalogo_empleados +' ?',
        text: '',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'SI',
        cancelButtonText: 'NO',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteParam(id_estatuscatalogo_empleados);
        } 
      });
    }
  }

  deleteParam(id_estatuscatalogo_empleados: number){
    if(id_estatuscatalogo_empleados != 0){
      this._catalogo_empleadosServices.deletecatalogo_empleados(id_estatuscatalogo_empleados,this.id_usuario,).subscribe({
       next: (v) => {
          this.toastr.warning('Registro eliminado correctamente', 'Correcto',  { 'positionClass' : 'toast-bottom-center'});
          this._catalogo_empleadosServices.getAllestatuscatalogo_empleados(this.id_usuario).subscribe(data => {
            this.listestatuscatalogo_empleados = data;
            this.dataSource = new MatTableDataSource<estatuscatalogo_empleadosTable>(this.listestatuscatalogo_empleados);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          })
        },
        error: (event: HttpErrorResponse) => {
          this._errorService.msjError(event);
        },
        complete: () => console.info('complete') 
      })
    }
    this.tablecatalogo_empleados;
  }


  exportAsXLSX():void{
    this.excelService.exportToExcel( this.listestatuscatalogo_empleados, 'my_export')
  }

  cambiarColor(numero:any):any{
    switch(numero){
      case 1://sin evaluacion
        return 'rgba(255, 255, 255, 0.5)';
      break;
      case 2:// en proceso de evaluacion
        return 'rgba(242, 169, 51,1)';
      break;
      case 3://tramite Finalizado
        return 'rgba(144, 238, 144, 1 )';
      break;
      case 4://tramite con errores
        return 'rgba( 255, 182, 193, 1 )';
      break;
    }
  }
  verestatus(id_catalogo_empleados: string,id_cat_empleados: string){
    if (id_catalogo_empleados != '' && id_cat_empleados != '' ) {
      this.router.navigate(['/index/estatusvercatalogo_empleados/'+ id_catalogo_empleados + '/' +id_cat_empleados]);
    }
  }
  
  estatuscatalogo_empleados(id_catalogo_empleados: string,id_cat_empleados: string){
    if (id_catalogo_empleados != '' && id_cat_empleados != '' ) {
      this.router.navigate(['/index/estatusactualizarcatalogo_empleados/'+ id_catalogo_empleados + '/' +id_cat_empleados]);
    }
  }
}
