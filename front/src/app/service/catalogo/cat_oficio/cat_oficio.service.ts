import { Injectable } from '@angular/core';
import { Nuevocat_oficio } from '../../../interfaces/catalogo/cat_oficio/cat_oficio-response.interface'; 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { cat_oficioTable } from '../../../interfaces/catalogo/cat_oficio/cat_oficio-table.interface';
import { GlobalConstants } from '../../../common/global-constants';
@Injectable({
  providedIn: 'root'
})

export class cat_oficioService {

  private myAppUrl:string;
  private myApiUrl:string;

  constructor(private http:HttpClient) {
    this.myAppUrl = GlobalConstants.appURL;
    this.myApiUrl = 'api/cat_oficio';
  }
  newcat_oficio(cat_oficio:Nuevocat_oficio):Observable<string>{
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}/`,cat_oficio);
  }

  getAllcat_oficio(id_usuario:number):Observable<cat_oficioTable[]>{
    return this.http.get<cat_oficioTable[]>(`${this.myAppUrl}${this.myApiUrl}/getAllcat_oficio/${id_usuario}`);
  }

  getcat_oficio(id:number,id_usuario:number):Observable<cat_oficioTable>{
    return this.http.get<cat_oficioTable>(`${this.myAppUrl}${this.myApiUrl}/${id}/${id_usuario}`);
  }

  updatecat_oficio(cat_oficio:cat_oficioTable):Observable<string>{
    return this.http.put<string>(`${this.myAppUrl}${this.myApiUrl}/upd`,cat_oficio);
  }

  deletecat_oficio(id:number,id_usuario:number):Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/del/${id}/${id_usuario}`);
  }

  sendFilecat_oficio(body:FormData,ruta:any,id_catalogo:any):Observable<any>{
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}/file/${ruta}/${id_catalogo}`,body);
  }
}
