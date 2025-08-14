import { Injectable } from '@angular/core';
import { Nuevocat_numero_oficios } from '../../../interfaces/catalogo/cat_numero_oficios/cat_numero_oficios-response.interface'; 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { cat_numero_oficiosTable } from '../../../interfaces/catalogo/cat_numero_oficios/cat_numero_oficios-table.interface';
import { GlobalConstants } from '../../../common/global-constants';
@Injectable({
  providedIn: 'root'
})

export class cat_numero_oficiosService {

  private myAppUrl:string;
  private myApiUrl:string;

  constructor(private http:HttpClient) {
    this.myAppUrl = GlobalConstants.appURL;
    this.myApiUrl = 'api/cat_numero_oficios';
  }
  newcat_numero_oficios(cat_numero_oficios:Nuevocat_numero_oficios):Observable<string>{
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}/`,cat_numero_oficios);
  }

  getAllcat_numero_oficios(id_usuario:number):Observable<cat_numero_oficiosTable[]>{
    return this.http.get<cat_numero_oficiosTable[]>(`${this.myAppUrl}${this.myApiUrl}/getAllcat_numero_oficios/${id_usuario}`);
  }

  getcat_numero_oficios(id:number,id_usuario:number):Observable<cat_numero_oficiosTable>{
    return this.http.get<cat_numero_oficiosTable>(`${this.myAppUrl}${this.myApiUrl}/${id}/${id_usuario}`);
  }

  updatecat_numero_oficios(cat_numero_oficios:cat_numero_oficiosTable):Observable<string>{
    return this.http.put<string>(`${this.myAppUrl}${this.myApiUrl}/upd`,cat_numero_oficios);
  }

  deletecat_numero_oficios(id:number,id_usuario:number):Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/del/${id}/${id_usuario}`);
  }

  sendFilecat_numero_oficios(body:FormData,ruta:any,id_catalogo:any):Observable<any>{
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}/file/${ruta}/${id_catalogo}`,body);
  }

  get_seguimiento_numero_oficios(id_usuario:number):Observable<void>{
    return this.http.get<void>(`${this.myAppUrl}${this.myApiUrl}/get_seguimiento_numero_oficios/${id_usuario}`);
  }
}
