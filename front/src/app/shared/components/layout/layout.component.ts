import { ChangeDetectionStrategy, Component, HostBinding, ViewChild, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Inject, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Observable } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map, shareReplay } from 'rxjs/operators';
import { Router, RouterModule } from '@angular/router';
import { menuService } from '../../../service/menu/menu.service';
import { menuTable } from '../../../interfaces/menu/menu-table.interface';
import { GlobalConstants } from '../../../common/global-constants';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { LoginService } from '../../../service/login/login.service';
import { user } from '../../../service/user/validarUsuario';
import { LoginResponse } from '../../../interfaces/login/login-response.interface';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { ValidateUser } from '../../../interfaces/validateUser/validate_user.interface';


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, RouterOutlet,
    MatSlideToggleModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule,
    MatDialogModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export default class LayoutComponent {
  showFiller = false;
  isDarkThemeActive = false;
  openMenu: boolean = false;
  estatusPage: string | any;
  token: string | any;
  id_usuario: string | any;
  usuario: string | any;
  id_rol: string | any;
  imp: string | any;
  edit: string | any;
  elim: string | any;
  nuev: string | any;
  img: string | any;
  id_direcion: string | any;
  text_direccion: string | any;
  id_area: string | any;
  text_area: string | any;
  numero_empleado: string | any;
  foto: string | any;
  cambioContrasenia: string | any;
  listmenu: menuTable[] = [];
  dataSource: any = [];
  funcion: string | any;
  estatus = GlobalConstants.appStatus;

  @ViewChild('drawer') drawer: MatSidenavModule | any;
  private breakpointObserver = inject(BreakpointObserver);
  readonly dialog = inject(MatDialog);


  constructor(@Inject(DOCUMENT) private document: Document, private router: Router, private _menuServices: menuService) {
    this.token = localStorage.getItem('token');
    this.id_usuario = localStorage.getItem('id_usuario');
    this.id_rol = localStorage.getItem('id_rol');
    this.imp = localStorage.getItem('imp');
    this.edit = localStorage.getItem('edit');
    this.elim = localStorage.getItem('elim');
    this.nuev = localStorage.getItem('nuev');
    this.img = localStorage.getItem('img');
    this.id_direcion = localStorage.getItem('id_direcion');
    this.text_direccion = localStorage.getItem('text_direccion');
    this.id_area = localStorage.getItem('id_area');
    this.text_area = localStorage.getItem('text_area');
    this.numero_empleado = localStorage.getItem('numero_empleado');
    this.foto = localStorage.getItem('foto');
    this.cambioContrasenia = localStorage.getItem('cambioContrasenia');
    this.usuario = localStorage.getItem('usuario');
    this.funcion = "";

    const storedData = localStorage.getItem('token');
    if (!storedData) {
      try {
        if (this.estatus === "LogOut") {
          this.Logout();
        }
      }
      catch (err) {
      }
    }
    if (this.cambioContrasenia == 0) {
      this.openDialogContrasenia();
    }

  }
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  ngOnInit(): void {
    this.GetMenu();
  }

  GetMenu() {
    this._menuServices.getAllmenu(this.id_usuario, this.id_rol).subscribe(data => {
      this.listmenu = data;
    })
  }

  openSideNav() {
    console.log(this.drawer)
    if (this.openMenu == false) {
      this.drawer.open();
      this.openMenu = true;
    }
    else {
      this.drawer.close();
      this.openMenu = false;
    }
  }

  onChange(newValue: boolean): void {
    if (newValue) {
      this.document.body.classList.add('dark-mode');
    }
    else {
      this.document.body.classList.remove('dark-mode');
    }
  }

  //MENU BOTON

  goMenu(url: string) {
    this.openSideNav();
    this.router.navigate([url]);

  }

  Logout() {
    this.router.navigate(['']);
  }

  openDialogContrasenia() {
    // Pass the 'usuario' data in the 'data' property of the configuration object
    const dialogRef = this.dialog.open(DialogContentExampleDialog, {
      data: {
        usuario: this.usuario,
        numero_empleado: this.numero_empleado,
      } // <-- **THIS IS THE CRUCIAL CHANGE!**
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog was closed');
      // The line 'usuario : this.usuario;' here doesn't do anything useful.
      // If the dialog returns a result, it would be in the 'result' variable.
    });
  }

}
//---------------------------------------------------------------------------->
//Modal
@Component({
  selector: 'nuevo-dialog',
  templateUrl: 'nuevo-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogContentExampleDialog {
  usuario: string = '';
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  passActual: string = "";
  passNueva1: string = "";
  passNueva2: string = "";
  numero_empleado: string = "";
  banderaCambioContrasenia: boolean = false;
  desbloqueActualizar: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<DialogContentExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { usuario: any, numero_empleado: any } // <-- Aquí inyectas los datos
    , private _useService: user, private router: Router) {
    // Aquí puedes acceder a los datos pasados desde el componente que abre el diálogo
    this.usuario = this.data.usuario;
    this.numero_empleado = this.data.numero_empleado;
  }

  // Puedes añadir métodos para cerrar el diálogo si es necesario
  onNoClick(): void {
    this.dialogRef.close();
  }

  validarPass() {
    if (this.passActual != "") {
      const login: ValidateUser = {
        numero_empleado: this.numero_empleado,
        clave: this.passActual,
      }
      this._useService.validatPass(login).subscribe({
        next: (data: any) => {
          if (data != "") {
            if (data === 1) {
              this.banderaCambioContrasenia = true;
            }
            else {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: data,
                footer: '<a href="#">Si necesitas ayuda, contacta al administrador.</a>'
              });
            }
          }
        },
        error: (event: HttpErrorResponse) => {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "No existe el usuario favor de verificar la información.",
            footer: '<a href="#">Si necesitas ayuda, contacta al administrador.</a>'
          });
        }
      })
    }
  }

  validacionPassword() {
    if (this.passNueva1 === this.passNueva2) {
      const login: ValidateUser = {
        numero_empleado: this.numero_empleado,
        clave: this.passNueva1,
      }
      this._useService.actualizarPass(login).subscribe({
        next: (data: any) => {
          if (data != "") {
            if (data === 1) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Contraseña actualizada correctamente",
                showConfirmButton: false,
                timer: 1500
              });
              //GlobalConstants.appStatus = "LogIn";
              this.router.navigate(['']);
              this.dialogRef.close();
            }
            else {
              Swal.fire({
                icon: "error",
                title: "Error",
                text: data,
                footer: '<a href="#">Si necesitas ayuda, contacta al administrador.</a>'
              });
            }
          }
        },
      })
    }
    else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No coinciden las contraseñas, favor de validar",
      });
    }
  }

  ActualizarPass() {
    if (this.passNueva1 == "") {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Para generar la nueva contraseña es necesario proporcionar la nueva contraseña e inmediatamente después confirmé su nueva contraseña",
      });
    }
    else if (this.passNueva2 == "") {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor, confirme la contraseña",
      });
    }
    else {
      this.validacionPassword();
    }
  }

  Logout() {
    this.router.navigate(['']);
  }
}

