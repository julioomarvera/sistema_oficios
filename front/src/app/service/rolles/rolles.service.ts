import { Injectable } from '@angular/core';
import { Nuevorolles } from '../../interfaces/rolles/rolles-response.interface'; 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { rollesTable } from '../../interfaces/rolles/rolles-table.interface';
import { GlobalConstants } from '../../common/global-constants';
@Injectable({
  providedIn: 'root'
})

export class rollesService {

  private myAppUrl:string;
  private myApiUrl:string;

  constructor(private http:HttpClient) {
    this.myAppUrl = GlobalConstants.appURL;
    this.myApiUrl = 'api/rolles';
  }
  newrolles(rolles:Nuevorolles):Observable<string>{
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}/`,rolles);
  }

  getAllrolles(id_usuario:number):Observable<rollesTable[]>{
    return this.http.get<rollesTable[]>(`${this.myAppUrl}${this.myApiUrl}/getAllrolles/${id_usuario}`);
  }

  getrolles(id:number,id_usuario:number):Observable<rollesTable>{
    return this.http.get<rollesTable>(`${this.myAppUrl}${this.myApiUrl}/${id}/${id_usuario}`);
  }

  updaterolles(rolles:rollesTable):Observable<string>{
    return this.http.put<string>(`${this.myAppUrl}${this.myApiUrl}/upd`,rolles);
  }

  deleterolles(id:number,id_usuario:number):Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/del/${id}/${id_usuario}`);
  }

}
