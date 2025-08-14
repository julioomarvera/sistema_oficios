import { Injectable } from '@angular/core';
import { Nuevomenu } from '../../interfaces/menu/menu-response.interface'; 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { menuTable } from '../../interfaces/menu/menu-table.interface';
import { GlobalConstants } from '../../common/global-constants';
@Injectable({
  providedIn: 'root'
})

export class menuService {

  private myAppUrl:string;
  private myApiUrl:string;

  constructor(private http:HttpClient) {
    this.myAppUrl = GlobalConstants.appURL;
    this.myApiUrl = 'api/menu';
  }
  newmenu(menu:Nuevomenu):Observable<string>{
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}/`,menu);
  }

  getAllmenu(id_usuario:number,id_rol:number):Observable<menuTable[]>{
    return this.http.get<menuTable[]>(`${this.myAppUrl}${this.myApiUrl}/getAllmenu/${id_usuario}/${id_rol}`);
  }

  getmenu(id:number,id_usuario:number):Observable<menuTable>{
    return this.http.get<menuTable>(`${this.myAppUrl}${this.myApiUrl}/${id}/${id_usuario}`);
  }

  updatemenu(menu:menuTable):Observable<string>{
    return this.http.put<string>(`${this.myAppUrl}${this.myApiUrl}/upd`,menu);
  }

  deletemenu(id:number,id_usuario:number):Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/del/${id}/${id_usuario}`);
  }

}
