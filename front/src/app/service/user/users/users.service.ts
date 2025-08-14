import { Injectable } from '@angular/core';
import { Nuevousers } from '../../../interfaces/user/users/users-response.interface'; 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { usersTable } from '../../../interfaces/user/users/users-table.interface';
import { GlobalConstants } from '../../../common/global-constants';
@Injectable({
  providedIn: 'root'
})

export class usersService {

  private myAppUrl:string;
  private myApiUrl:string;

  constructor(private http:HttpClient) {
    this.myAppUrl = GlobalConstants.appURL;
    this.myApiUrl = 'api/users';
  }
  newusers(users:Nuevousers):Observable<string>{
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}/`,users);
  }

  getAllusers(id_usuario:number):Observable<usersTable[]>{
    return this.http.get<usersTable[]>(`${this.myAppUrl}${this.myApiUrl}/getAllusers/${id_usuario}`);
  }

  getusers(id:number,id_usuario:number):Observable<usersTable>{
    return this.http.get<usersTable>(`${this.myAppUrl}${this.myApiUrl}/${id}/${id_usuario}`);
  }

  updateusers(users:usersTable):Observable<string>{
    return this.http.put<string>(`${this.myAppUrl}${this.myApiUrl}/upd`,users);
  }

  deleteusers(id:number,id_usuario:number):Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/del/${id}/${id_usuario}`);
  }

  sendFileusers(body:FormData,ruta:any,id_user:any):Observable<any>{
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}/file/${ruta}/${id_user}`,body);
  }
}
