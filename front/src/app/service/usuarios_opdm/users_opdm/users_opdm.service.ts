import { Injectable } from '@angular/core';
import { Nuevousers_opdm } from '../../../interfaces/usuarios_opdm/users_opdm/users_opdm-response.interface'; 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { users_opdmTable } from '../../../interfaces/usuarios_opdm/users_opdm/users_opdm-table.interface';
import { GlobalConstants } from '../../../common/global-constants';
@Injectable({
  providedIn: 'root'
})

export class users_opdmService {

  private myAppUrl:string;
  private myApiUrl:string;

  constructor(private http:HttpClient) {
    this.myAppUrl = GlobalConstants.appURL;
    this.myApiUrl = 'api/users_opdm';
  }
  newusers_opdm(users_opdm:Nuevousers_opdm):Observable<string>{
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}/`,users_opdm);
  }

  getAllusers_opdm(id_usuario:number):Observable<users_opdmTable[]>{
    return this.http.get<users_opdmTable[]>(`${this.myAppUrl}${this.myApiUrl}/getAllusers_opdm/${id_usuario}`);
  }

  getusers_opdm(id:number,id_usuario:number):Observable<users_opdmTable>{
    return this.http.get<users_opdmTable>(`${this.myAppUrl}${this.myApiUrl}/${id}/${id_usuario}`);
  }

  updateusers_opdm(users_opdm:users_opdmTable):Observable<string>{
    return this.http.put<string>(`${this.myAppUrl}${this.myApiUrl}/upd`,users_opdm);
  }

  deleteusers_opdm(id:number,id_usuario:number):Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/del/${id}/${id_usuario}`);
  }

  sendFileusers_opdm(body:FormData,ruta:any,id_usuarios_opdm:any):Observable<any>{
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}/file/${ruta}/${id_usuarios_opdm}`,body);
  }
}
