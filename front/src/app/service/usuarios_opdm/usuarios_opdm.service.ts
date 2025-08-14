import { Injectable } from '@angular/core';
import { Nuevousuarios_opdm } from '../../interfaces/usuarios_opdm/usuarios_opdm-response.interface'; 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { usuarios_opdmTable } from '../../interfaces/usuarios_opdm/usuarios_opdm-table.interface';
import { GlobalConstants } from '../../common/global-constants';
@Injectable({
  providedIn: 'root'
})

export class usuarios_opdmService {

  private myAppUrl:string;
  private myApiUrl:string;

  constructor(private http:HttpClient) {
    this.myAppUrl = GlobalConstants.appURL;
    this.myApiUrl = 'api/usuarios_opdm';
  }
  newusuarios_opdm(id_usuario : number):Observable<string>{
    return this.http.get<string>(`${this.myAppUrl}${this.myApiUrl}/${id_usuario}`);
  }

  getAllusuarios_opdm(id_usuario:number,id_rol:number,estatus:number,activo:number):Observable<usuarios_opdmTable[]>{
    return this.http.get<usuarios_opdmTable[]>(`${this.myAppUrl}${this.myApiUrl}/getAllusuarios_opdm/${id_usuario}/${id_rol}/${estatus}/${activo}`);
  }

  getusuarios_opdm(id:number,id_usuario:number,id_rol:number):Observable<usuarios_opdmTable>{
    return this.http.get<usuarios_opdmTable>(`${this.myAppUrl}${this.myApiUrl}/${id}/${id_usuario}/${id_rol}`);
  }

   updusuarios_opdm_id_users_opdm(usuarios_opdm:usuarios_opdmTable):Observable<string>{
    return this.http.put<string>(`${this.myAppUrl}${this.myApiUrl}/updusuarios_opdm_id_users_opdm`,usuarios_opdm);
  }

   delusuarios_opdm(id:number,id_usuario:number):Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/delusuarios_opdm/${id}/${id_usuario}`);
   }
   actualizarEstatususuarios_opdm(id_usuarios_opdm:any,id_usuario:any,estatus:any,descripcion:any):Observable<usuarios_opdmTable[]>{
    return this.http.get<usuarios_opdmTable[]>(`${this.myAppUrl}${this.myApiUrl}/actualizarEstatususuarios_opdm/${id_usuarios_opdm}/${id_usuario}/${estatus}/${descripcion}`);
  }
}
