import { Injectable } from '@angular/core';
import { Nuevocat_tipo_seguimiento } from '../../../interfaces/catalogo/cat_tipo_seguimiento/cat_tipo_seguimiento-response.interface'; 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { cat_tipo_seguimientoTable } from '../../../interfaces/catalogo/cat_tipo_seguimiento/cat_tipo_seguimiento-table.interface';
import { GlobalConstants } from '../../../common/global-constants';
@Injectable({
  providedIn: 'root'
})

export class cat_tipo_seguimientoService {

  private myAppUrl:string;
  private myApiUrl:string;

  constructor(private http:HttpClient) {
    this.myAppUrl = GlobalConstants.appURL;
    this.myApiUrl = 'api/cat_tipo_seguimiento';
  }
  newcat_tipo_seguimiento(cat_tipo_seguimiento:Nuevocat_tipo_seguimiento):Observable<string>{
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}/`,cat_tipo_seguimiento);
  }

  getAllcat_tipo_seguimiento(id_usuario:number):Observable<cat_tipo_seguimientoTable[]>{
    return this.http.get<cat_tipo_seguimientoTable[]>(`${this.myAppUrl}${this.myApiUrl}/getAllcat_tipo_seguimiento/${id_usuario}`);
  }

  getcat_tipo_seguimiento(id:number,id_usuario:number):Observable<cat_tipo_seguimientoTable>{
    return this.http.get<cat_tipo_seguimientoTable>(`${this.myAppUrl}${this.myApiUrl}/${id}/${id_usuario}`);
  }

  updatecat_tipo_seguimiento(cat_tipo_seguimiento:cat_tipo_seguimientoTable):Observable<string>{
    return this.http.put<string>(`${this.myAppUrl}${this.myApiUrl}/upd`,cat_tipo_seguimiento);
  }

  deletecat_tipo_seguimiento(id:number,id_usuario:number):Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/del/${id}/${id_usuario}`);
  }

  sendFilecat_tipo_seguimiento(body:FormData,ruta:any,id_catalogo:any):Observable<any>{
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}/file/${ruta}/${id_catalogo}`,body);
  }
}
