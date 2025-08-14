import { Injectable } from '@angular/core';
import { Nuevouser } from '../../interfaces/user/user-response.interface'; 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { userTable } from '../../interfaces/user/user-table.interface';
import { GlobalConstants } from '../../common/global-constants';
@Injectable({
  providedIn: 'root'
})

export class userService {

  private myAppUrl:string;
  private myApiUrl:string;

  constructor(private http:HttpClient) {
    this.myAppUrl = GlobalConstants.appURL;
    this.myApiUrl = 'api/user';
  }
  newuser(id_usuario : number):Observable<string>{
    return this.http.get<string>(`${this.myAppUrl}${this.myApiUrl}/${id_usuario}`);
  }

  getAlluser(id_usuario:number,id_rol:number,estatus:number,activo:number):Observable<userTable[]>{
    return this.http.get<userTable[]>(`${this.myAppUrl}${this.myApiUrl}/getAlluser/${id_usuario}/${id_rol}/${estatus}/${activo}`);
  }

  getuser(id:number,id_usuario:number,id_rol:number):Observable<userTable>{
    return this.http.get<userTable>(`${this.myAppUrl}${this.myApiUrl}/${id}/${id_usuario}/${id_rol}`);
  }

   upduser_id_users(user:userTable):Observable<string>{
    return this.http.put<string>(`${this.myAppUrl}${this.myApiUrl}/upduser_id_users`,user);
  }

   deluser(id:number,id_usuario:number):Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/deluser/${id}/${id_usuario}`);
   }
   actualizarEstatususer(id_user:any,id_usuario:any,estatus:any,descripcion:any):Observable<userTable[]>{
    return this.http.get<userTable[]>(`${this.myAppUrl}${this.myApiUrl}/actualizarEstatususer/${id_user}/${id_usuario}/${estatus}/${descripcion}`);
  }
}
