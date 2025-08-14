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
import { menuTable } from '../../../interfaces/menu/menu-table.interface';
import { menuService } from '../../../service/menu/menu.service';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatTooltipModule } from '@angular/material/tooltip';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../../service/error.service';
import { ExporterService } from '../../../service/exporter/exporter.service';



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
  displayedColumns: string[] = ['id_menu','id_roll','titulo','direccion_url','createdAt', 'Funciones']; 
  dataSource : any = []; 
  token            : string |any; 
  id_usuario       : string |any; 
  id_rol           : string |any; 
  imp              : string |any; 
  edit             : string |any; 
  elim             : string |any; 
  nuev             : string |any; 
  img              : string |any; 
  id_direcion      : string |any; 
  text_direccion   : string |any; 
  id_area          : string |any; 
  text_area        : string |any; 
  numero_empleado  : string |any; 
  foto             : string |any; 

  @ViewChild(MatPaginator) paginator !: MatPaginator; 
  @ViewChild(MatSort) sort !: MatSort; 

  listmenu : menuTable[] = []; 
  listmenuFilter : menuTable[] = []; 
  //cuerpo ------------------------------------------------------------
  id_menu : number | any; 
  id_roll : string | any; 
  titulo : string | any; 
  direccion_url : string | any; 
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


  constructor(@Inject(DOCUMENT) private document: Document, private router: Router, private _menuServices:  menuService, private toastr: ToastrService,private _errorService:ErrorService, private excelService: ExporterService ) {
    this.page = 3;
    this.previousPage     = 1;
    this.token            = localStorage.getItem('token');
    this.id_usuario       = localStorage.getItem('id_usuario');
    this.id_rol           = localStorage.getItem('id_rol');
    this.imp              = localStorage.getItem('imp');
    this.edit             = localStorage.getItem('edit');
    this.elim             = localStorage.getItem('elim');
    this.nuev             = localStorage.getItem('nuev');
    this.img              = localStorage.getItem('img');
    this.id_direcion      = localStorage.getItem('id_direcion');
    this.text_direccion   = localStorage.getItem('text_direccion');
    this.id_area          = localStorage.getItem('id_area');
    this.text_area        = localStorage.getItem('text_area');
    this.numero_empleado  = localStorage.getItem('numero_empleado');
    this.foto             = localStorage.getItem('foto');

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
    this.menu();
  }

  menu(){
    this._menuServices.getAllmenu(this.id_usuario, this.id_rol).subscribe(data => { 
    this.listmenu = data;
    this.dataSource = new MatTableDataSource<menuTable>(this.listmenu);
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
  
  agregarmenu(evt: MouseEvent) {
    console.log(evt);
    this.router.navigate(['/index/nuevomenu']);
  }
  vermenu(id: number) {
    if (id != 0) {
      this.router.navigate(['/index/vermenu/'+id]);
    }
  }
  
  updatemenu(id: number) {
    if (id != 0) {
      this.router.navigate(['/index/updatemenu/'+id]);
    }
  }
  
  // Deletemenu(id: number) {
  //   if (id != 0) {
  //     Swal.fire({
  //       title: '¿Desea eliminar el registro con número ' + id +' ?',
  //       text: '',
  //       icon: 'warning',
  //       showCancelButton: true,
  //       confirmButtonText: 'SI',
  //       cancelButtonText: 'NO',
  //       reverseButtons: true
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         this.deleteParam(id);
  //       } 
  //     });
  //   }
  // }

  // deleteParam(id: number){
  //   if(id != 0){
  //     this._menuServices.deletemenu(id,this.id_usuario).subscribe({
  //      next: (v) => {
  //         this.toastr.warning('Registro eliminado correctamente', 'Correcto',  { 'positionClass' : 'toast-bottom-center'});
  //         this._menuServices.getAllmenu(this.id_usuario).subscribe(data => {
  //           this.listmenu = data;
  //           this.dataSource = new MatTableDataSource<menuTable>(this.listmenu);
  //           this.dataSource.paginator = this.paginator;
  //           this.dataSource.sort = this.sort;
  //         })
  //       },
  //       error: (event: HttpErrorResponse) => {
  //         this._errorService.msjError(event);
  //       },
  //       complete: () => console.info('complete') 
  //     })
  //   }
  //   this.menu;
  // }

  exportAsXLSX():void{
    this.excelService.exportToExcel( this.listmenu, 'my_export')
  }

}
