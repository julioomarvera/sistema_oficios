import { Component, inject } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginResponse } from '../../interfaces/login/login-response.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule, FormsModule, } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../service/login/login.service';
import Swal from 'sweetalert2'
import { HttpErrorResponse } from '@angular/common/http';
import { GlobalConstants } from '../../common/global-constants';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatGridListModule, MatCardModule, MatChipsModule, MatSelectModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, FormsModule, MatInputModule, RouterModule],

  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export default class LoginComponent {
  private login?: LoginResponse;
  public formLogin: FormGroup;
  private _fb = inject(FormBuilder);
  public loading: boolean = false;

  usuario?: string | any;
  clave?: string | any;

  constructor(private _useService: LoginService, private router: Router) {
    this.formLogin = this._fb.group({
      usuario: ['', [Validators.required]],
      clave: ['', [Validators.required]],
    })
    GlobalConstants.appStatus = "LogOut";
    localStorage.setItem('token', '');
    localStorage.setItem('id_usuario', '');
    localStorage.setItem('id_rol', '');
    localStorage.setItem('usuario', '');
    localStorage.setItem('imp', '');
    localStorage.setItem('edit', '');
    localStorage.setItem('elim', '');
    localStorage.setItem('nuev', '');
    localStorage.setItem('img', '');
    localStorage.setItem('activo', '');
    localStorage.setItem('telefono', '');

  }
  ngOnInit() {
    this.formLogin.patchValue
  }

  onSubmit() {
    if (typeof (this.usuario) !== 'undefined' || typeof (this.clave) !== 'undefined') {
      this.loading = true;
      const login: LoginResponse = {
        usuario: this.usuario,
        clave: this.clave,
      }

      this._useService.loginUser(login).subscribe({
        next: (data: any) => {
          if (data != "") {
            const token = data.token;
            const id_usuario = data.id_usuario;
            const id_rol = data.id_roll;
            const usuario = data.usuario;
            const imp = data.imp;
            const edit = data.edit;
            const elim = data.elim;
            const nuev = data.nuev;
            const img = data.img;
            const activo = data.activo;
            const telefono = data.telefono;
            const id_direcion = data.id_direcion;
            const text_direccion = data.text_direccion;
            const id_area = data.id_area;
            const text_area = data.text_area;
            const numero_empleado = data.numero_empleado;
            const foto = data.foto;
            const cambioContrasenia = data.cambioContrasenia;

            localStorage.setItem('token', token);
            localStorage.setItem('id_usuario', id_usuario);
            localStorage.setItem('id_rol', id_rol);
            localStorage.setItem('usuario', usuario);
            localStorage.setItem('imp', imp);
            localStorage.setItem('edit', edit);
            localStorage.setItem('elim', elim);
            localStorage.setItem('nuev', nuev);
            localStorage.setItem('img', img);
            localStorage.setItem('activo', activo);
            localStorage.setItem('telefono', telefono);
            localStorage.setItem('id_direcion', id_direcion);
            localStorage.setItem('text_direccion', text_direccion);
            localStorage.setItem('id_area', id_area);
            localStorage.setItem('text_area', text_area);
            localStorage.setItem('numero_empleado', numero_empleado);
            localStorage.setItem('foto', foto);
            localStorage.setItem('cambioContrasenia',cambioContrasenia);





            Swal.fire({
              position: "center",
              icon: "success",
              title: "Correcto",
              showConfirmButton: false,
              timer: 1500
            });
            GlobalConstants.appStatus = "LogIn";
            this.router.navigate(['/index']);
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
    else {
      Swal.fire({
        icon: "error",
        title: "Existen campos vacíos.",
        text: "Favor de llenar todos los campos.",
        footer: '<a href="#">Si necesitas ayuda, contacta al administrador.</a>'
      });
    }
    this.loading = false;
  }
}



