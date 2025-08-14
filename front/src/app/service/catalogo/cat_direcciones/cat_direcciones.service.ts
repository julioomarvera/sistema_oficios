import { Injectable } from '@angular/core';
import { Nuevocat_direcciones } from '../../../interfaces/catalogo/cat_direcciones/cat_direcciones-response.interface'; 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { cat_direccionesTable } from '../../../interfaces/catalogo/cat_direcciones/cat_direcciones-table.interface';
import { GlobalConstants } from '../../../common/global-constants';
@Injectable({
  providedIn: 'root'
})

export class cat_direccionesService {

  private myAppUrl:string;
  private myApiUrl:string;

  constructor(private http:HttpClient) {
    this.myAppUrl = GlobalConstants.appURL;
    this.myApiUrl = 'api/cat_direcciones';
  }
  newcat_direcciones(cat_direcciones:Nuevocat_direcciones):Observable<string>{
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}/`,cat_direcciones);
  }

  getAllcat_direcciones(id_usuario:number):Observable<cat_direccionesTable[]>{
    return this.http.get<cat_direccionesTable[]>(`${this.myAppUrl}${this.myApiUrl}/getAllcat_direcciones/${id_usuario}`);
  }

  getcat_direcciones(id:number,id_usuario:number):Observable<cat_direccionesTable>{
    return this.http.get<cat_direccionesTable>(`${this.myAppUrl}${this.myApiUrl}/${id}/${id_usuario}`);
  }

  updatecat_direcciones(cat_direcciones:cat_direccionesTable):Observable<string>{
    return this.http.put<string>(`${this.myAppUrl}${this.myApiUrl}/upd`,cat_direcciones);
  }

  deletecat_direcciones(id:number,id_usuario:number):Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/del/${id}/${id_usuario}`);
  }

  sendFilecat_direcciones(body:FormData,ruta:any,id_catalogo:any):Observable<any>{
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}/file/${ruta}/${id_catalogo}`,body);
  }
}
