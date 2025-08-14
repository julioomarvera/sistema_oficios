import { Component, ViewChild, Inject, inject,  afterNextRender,ChangeDetectionStrategy} from '@angular/core'; 
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
import { usuarios_opdmTable } from '../../../../interfaces/usuarios_opdm/usuarios_opdm-table.interface';
import { usuarios_opdmService } from '../../../../service/usuarios_opdm/usuarios_opdm.service';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatTooltipModule } from '@angular/material/tooltip';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../../../service/error.service';
import { ExporterService } from '../../../../service/exporter/exporter.service';
import { estatususuarios_opdmTable } from '../../../../interfaces/usuarios_opdm/estatus/estatususuarios_opdm-table.interface';
import { estatususuarios_opdmService } from '../../../../service/usuarios_opdm/estatus/estatususuarios_opdm.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { FormsModule, NgControl } from '@angular/forms'



export interface PeriodicElement{
  name: string; 
  position: number; 
  weight: number; 
  symbol: string; 
}

@Component({ 
  selector: 'app-index',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatChipsModule, MatDialogModule,
            MatIconModule, CommonModule, MatFormFieldModule,
            MatTableModule, MatPaginatorModule, MatInputModule,
            MatSortModule, MatTooltipModule,FormsModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
}) 

export default class IndexComponent { 
  readonly dialog = inject(MatDialog);
  displayedColumns: string[] = ['activo','id_usuario','id_users_opdm','createdAt','estatus','Funciones']; 
  dataSource : any = []; 
  listEstatus : estatususuarios_opdmTable[]=[];
  token      : string |any; 
  id_usuario : string |any; 
  id_rol     : string |any; 
  imp        : string |any; 
  edit       : string |any; 
  elim       : string |any; 
  nuev       : string |any; 
  img        : string |any; 
  estatus    : number |any = 0; 
  activo     : number |any = 1; 

  @ViewChild(MatPaginator) paginator !: MatPaginator; 
  @ViewChild(MatSort) sort !: MatSort; 

  listusuarios_opdm : usuarios_opdmTable[] = []; 
  listusuarios_opdmFilter : usuarios_opdmTable[] = []; 
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


  constructor(@Inject(DOCUMENT) private document: Document, private router: Router, private _usuarios_opdmServices:  usuarios_opdmService, private toastr: ToastrService,private _errorService:ErrorService, private excelService: ExporterService, private _estatususuarios_opdmService: estatususuarios_opdmService ) {
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

openHelper(id_estatususuarios_opdm:any) { 
    if(id_estatususuarios_opdm != ''){ 
      localStorage.setItem('id_estatususuarios_opdm','id_estatususuarios_opdm'); 
      const dialogRef = this.dialog.open(DialogContentExampleDialog); 
      dialogRef.afterClosed().subscribe(result => { 
         console.log(`Dialog result: ${result}`); 
      }); 
    } 
  } 
  ngOnInit(): void {
    this.page = 3;
    this.previousPage = 1;
    this.getBotoneraEstatus();
    this.tableusuarios_opdm();
  }

  tableusuarios_opdm(){
    this._usuarios_opdmServices.getAllusuarios_opdm(this.id_usuario,this.id_rol,this.estatus,this.activo).subscribe(data => { 
    this.listusuarios_opdm = data;
    this.dataSource = new MatTableDataSource<usuarios_opdmTable>(this.listusuarios_opdm);
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
  
  agregarusuarios_opdm(evt: MouseEvent) {
     this.estatus = 1;
     this._usuarios_opdmServices.newusuarios_opdm( this.id_usuario).subscribe({
        next: (v : any) => {
            var id_usuarios_opdm = v.msg; 
            this.toastr.success('Registro almacenado Correctamente', 'Correcto',  { 'positionClass' : 'toast-bottom-center'});
            this.router.navigate(['/index/nuevousers_opdm',id_usuarios_opdm, this.estatus]);
        },
        error: (event: HttpErrorResponse) => {
            this._errorService.msjError(event);
        },
        complete: () => console.info('complete')
     })
  }

  continuarTramite(paginaActual:any,id_tramite:any){
     if(paginaActual != '' &&  id_tramite != ''){
        this.router.navigate([''+paginaActual+'/' + id_tramite]);
     }
  }
  verusuarios_opdm(id_usuarios_opdm: string,id_users_opdm: string) {
    if (id_usuarios_opdm != '' && id_users_opdm != '' ) {
      this.router.navigate(['/index/verusuarios_opdm/'+ id_usuarios_opdm + '/' +id_users_opdm]);
    }
  }
  
  updateusuarios_opdm(id_usuarios_opdm: string,id_users_opdm: string,estatus:any) {
    if (id_usuarios_opdm != '' && id_users_opdm != '' ) {
      this.router.navigate(['/index/actualizarusuarios_opdm/'+ id_usuarios_opdm + '/' +id_users_opdm+ '/' + estatus]);
    }
  }
  
  Deleteusuarios_opdm(id: number) {
    if (id != 0) {
      Swal.fire({
        title: '¿Desea eliminar el registro con número ' + id +' ?',
        text: '',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'SI',
        cancelButtonText: 'NO',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteParam(id);
        } 
      });
    }
  }

  deleteParam (id: number){
    if(id != 0){
      this._usuarios_opdmServices.delusuarios_opdm(id,this.id_usuario).subscribe({
       next: (v) => {
          this.toastr.warning('Registro eliminado correctamente', 'Correcto',  { 'positionClass' : 'toast-bottom-center'});
          this._usuarios_opdmServices.getAllusuarios_opdm(this.id_usuario,this.id_rol,this.estatus,this.activo).subscribe(data => {
            this.listusuarios_opdm = data;
            this.dataSource = new MatTableDataSource<usuarios_opdmTable>(this.listusuarios_opdm);
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
    this.tableusuarios_opdm();
  }

  editarVerificacionusuarios_opdm(id_usuarios_opdm: string,id_users_opdm: string) {
    if (id_usuarios_opdm != '' && id_users_opdm != '' ) {
      this.router.navigate(['/index/actualizarusuarios_opdm/'+ id_usuarios_opdm + '/' +id_users_opdm +"/1" ]);
    }
  }
  exportAsXLSX():void{
    this.excelService.exportToExcel( this.listusuarios_opdm, 'my_export')
  }

  cambiarColor(numero:any):any{
    switch(numero){
      case 0:
        return 'rgba(241, 255, 236, 0)';
      break;
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
  cambiarColorActivo(numero:any):any{
    switch(numero){
      case 0:
        return 'rgba(241, 255, 236, 0)';
      break;
      case 1://sin evaluacion
        return 'rgba(255, 255, 255, 0.5)';
      break;
    }
  }

  getBotoneraEstatus(){
    this._estatususuarios_opdmService.getAllestatususuarios_opdm(this.id_usuario).subscribe(data => {
      this.listEstatus = data;
    })
  }
 
  goMenu(estatus:number){
    if(estatus > 0){
      this.estatus = estatus
      this.tableusuarios_opdm();
    }
  }

  activadoDesactivado(activo : any){
    if(activo == 0){
      this.activo = 1;
    }
    else{
      this.activo = 0;
    }
    this.tableusuarios_opdm();
  }

  vertodo(){
    this.activo = 2;
     this.tableusuarios_opdm();
  }

}
//Modal------------------------------------------------------>
@Component({
  selector: 'index-dialog',
  templateUrl: 'index-dialog.html',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatChipsModule,MatDialogModule,MatButtonModule,
    MatIconModule, CommonModule, MatFormFieldModule,
    MatTableModule, MatPaginatorModule, MatInputModule,
    MatSortModule, MatTooltipModule,MatCardModule,FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogContentExampleDialog {

  readonly dialog = inject(MatDialog);
  listEstatus : estatususuarios_opdmTable[] = []; 
  id_usuario     : any = '';
  estatus        : any = '';
  id_usuarios_opdm : any = '';
  descripcion    : any = '';
  id_estatususuarios_opdm: any ='';
 constructor(private _estatususuarios_opdmService: estatususuarios_opdmService,private _usuarios_opdmServices:  usuarios_opdmService){
  this.id_usuario = localStorage.getItem('id_usuario');
  this.id_usuario = localStorage.getItem('id_usuario');
    this.id_estatususuarios_opdm = localStorage.getItem('id_estatususuarios_opdm');


 }
 ngOnInit(){
  this.getBotoneraEstatus();
 }
  getBotoneraEstatus(){
    this._estatususuarios_opdmService.getAllestatususuarios_opdm(this.id_usuario).subscribe(data => {
      this.listEstatus = data;
    })
  }
  almacenarEstatus(){
    if(this.estatus == '' && this.descripcion == ''){
      this.mensajeAlertaError('Error: falta el Informacíon en el parámetro descripcion')
    }
    else{
      this.saveEstatus();
    }

  }
  saveEstatus(){
    this._usuarios_opdmServices.actualizarEstatususuarios_opdm(this.id_usuario,this.id_estatususuarios_opdm,this.estatus,this.descripcion).subscribe({
      next: (v : any) => {
        const dialogRef = this.dialog.closeAll(); 
        this.mensajeAlertaSuccess('Estatus almacenado correctamente');
         window.location.reload();
      },
      error: (event: HttpErrorResponse) => {
          this.mensajeAlertaError('Error al intentar almacenar el estatus, intenté nuevamente');
      },
      complete: () => console.info('complete')
    })
  }



 
  //Mensaje de Swal/--------------------------------------------------------->
  mensajeAlertaError(titulo:string){  
    Swal.fire({ 
      position: 'center',
      icon: 'error',
      title: titulo,
      showConfirmButton: false,
      timer: 2000
    });
  }

  mensajeAlertaSuccess(titulo:string){ 
    Swal.fire({
      position: 'center', 
      icon: 'success', 
      title: titulo, 
      showConfirmButton: false, 
      timer: 1500 
    }); 
  } 
}
