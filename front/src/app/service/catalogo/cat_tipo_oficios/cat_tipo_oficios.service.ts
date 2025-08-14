import { Injectable } from '@angular/core';
import { Nuevocat_tipo_oficios } from '../../../interfaces/catalogo/cat_tipo_oficios/cat_tipo_oficios-response.interface'; 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { cat_tipo_oficiosTable } from '../../../interfaces/catalogo/cat_tipo_oficios/cat_tipo_oficios-table.interface';
import { GlobalConstants } from '../../../common/global-constants';
@Injectable({
  providedIn: 'root'
})

export class cat_tipo_oficiosService {

  private myAppUrl:string;
  private myApiUrl:string;

  constructor(private http:HttpClient) {
    this.myAppUrl = GlobalConstants.appURL;
    this.myApiUrl = 'api/cat_tipo_oficios';
  }
  newcat_tipo_oficios(cat_tipo_oficios:Nuevocat_tipo_oficios):Observable<string>{
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}/`,cat_tipo_oficios);
  }

  getAllcat_tipo_oficios(id_usuario:number):Observable<cat_tipo_oficiosTable[]>{
    return this.http.get<cat_tipo_oficiosTable[]>(`${this.myAppUrl}${this.myApiUrl}/getAllcat_tipo_oficios/${id_usuario}`);
  }

  getcat_tipo_oficios(id:number,id_usuario:number):Observable<cat_tipo_oficiosTable>{
    return this.http.get<cat_tipo_oficiosTable>(`${this.myAppUrl}${this.myApiUrl}/${id}/${id_usuario}`);
  }

  updatecat_tipo_oficios(cat_tipo_oficios:cat_tipo_oficiosTable):Observable<string>{
    return this.http.put<string>(`${this.myAppUrl}${this.myApiUrl}/upd`,cat_tipo_oficios);
  }

  deletecat_tipo_oficios(id:number,id_usuario:number):Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/del/${id}/${id_usuario}`);
  }

  sendFilecat_tipo_oficios(body:FormData,ruta:any,id_catalogo:any):Observable<any>{
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}/file/${ruta}/${id_catalogo}`,body);
  }
}
