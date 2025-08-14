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
import { estatususuarios_opdmTable }   from '../../../../../interfaces/usuarios_opdm/estatus/estatususuarios_opdm-table.interface';
import { estatususuarios_opdmService } from '../../../../../service/usuarios_opdm/estatus/estatususuarios_opdm.service';
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
  displayedColumns: string[] = ['activo','id_estatususuarios_opdm','id_usuario','descripcion','createdAt', 'Funciones']; 
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
  listestatususuarios_opdm : estatususuarios_opdmTable[] = []; 
  //cuerpo ------------------------------------------------------------
  id_users_opdm : number | any; 
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


  constructor(@Inject(DOCUMENT) private document: Document, private router: Router, private _usuarios_opdmServices:  estatususuarios_opdmService, private toastr: ToastrService,private _errorService:ErrorService, private excelService: ExporterService ) {
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
    this.tableusuarios_opdm();
  }

  tableusuarios_opdm(){
    this._usuarios_opdmServices.getAllestatususuarios_opdm(this.id_usuario).subscribe(data => { 
    this.listestatususuarios_opdm = data;
    this.dataSource = new MatTableDataSource<estatususuarios_opdmTable>(this.listestatususuarios_opdm);
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
  
  agregarestatususuarios_opdm(evt: MouseEvent) {
    console.log(evt);
    this.router.navigate(['/index/estatusnuevousuarios_opdm']);
  }
  verEstatus(id_estatususuarios_opdm: number) {
    if (id_estatususuarios_opdm != 0) {
      this.router.navigate(['/index/estatusverusuarios_opdm/'+id_estatususuarios_opdm]);
    }
  }
  
  updateEstatus(id_estatususuarios_opdm: number) {
    if (id_estatususuarios_opdm != 0) {
      this.router.navigate(['/index/estatusactualizarusuarios_opdm/'+ id_estatususuarios_opdm]);
    }
  }
  
  DeleteEstatus(id_estatususuarios_opdm: number) {
    if (id_estatususuarios_opdm != 0) {
      Swal.fire({
        title: '¿Desea eliminar el registro con número ' + id_estatususuarios_opdm +' ?',
        text: '',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'SI',
        cancelButtonText: 'NO',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteParam(id_estatususuarios_opdm);
        } 
      });
    }
  }

  deleteParam(id_estatususuarios_opdm: number){
    if(id_estatususuarios_opdm != 0){
      this._usuarios_opdmServices.deleteusuarios_opdm(id_estatususuarios_opdm,this.id_usuario,).subscribe({
       next: (v) => {
          this.toastr.warning('Registro eliminado correctamente', 'Correcto',  { 'positionClass' : 'toast-bottom-center'});
          this._usuarios_opdmServices.getAllestatususuarios_opdm(this.id_usuario).subscribe(data => {
            this.listestatususuarios_opdm = data;
            this.dataSource = new MatTableDataSource<estatususuarios_opdmTable>(this.listestatususuarios_opdm);
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
    this.tableusuarios_opdm;
  }


  exportAsXLSX():void{
    this.excelService.exportToExcel( this.listestatususuarios_opdm, 'my_export')
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
  verestatus(id_usuarios_opdm: string,id_users_opdm: string){
    if (id_usuarios_opdm != '' && id_users_opdm != '' ) {
      this.router.navigate(['/index/estatusverusuarios_opdm/'+ id_usuarios_opdm + '/' +id_users_opdm]);
    }
  }
  
  estatususuarios_opdm(id_usuarios_opdm: string,id_users_opdm: string){
    if (id_usuarios_opdm != '' && id_users_opdm != '' ) {
      this.router.navigate(['/index/estatusactualizarusuarios_opdm/'+ id_usuarios_opdm + '/' +id_users_opdm]);
    }
  }
}
