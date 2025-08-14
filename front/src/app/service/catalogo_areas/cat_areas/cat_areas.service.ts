import { Injectable } from '@angular/core';
import { Nuevocat_areas } from '../../../interfaces/catalogo_areas/cat_areas/cat_areas-response.interface'; 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { cat_areasTable } from '../../../interfaces/catalogo_areas/cat_areas/cat_areas-table.interface';
import { GlobalConstants } from '../../../common/global-constants';
@Injectable({
  providedIn: 'root'
})

export class cat_areasService {

  private myAppUrl:string;
  private myApiUrl:string;

  constructor(private http:HttpClient) {
    this.myAppUrl = GlobalConstants.appURL;
    this.myApiUrl = 'api/cat_areas';
  }
  newcat_areas(cat_areas:Nuevocat_areas):Observable<string>{
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}/`,cat_areas);
  }

  getAllcat_areas(id_usuario:number):Observable<cat_areasTable[]>{
    return this.http.get<cat_areasTable[]>(`${this.myAppUrl}${this.myApiUrl}/getAllcat_areas/${id_usuario}`);
  }

  getcat_areas(id:number,id_usuario:number):Observable<cat_areasTable>{
    return this.http.get<cat_areasTable>(`${this.myAppUrl}${this.myApiUrl}/${id}/${id_usuario}`);
  }

  updatecat_areas(cat_areas:cat_areasTable):Observable<string>{
    return this.http.put<string>(`${this.myAppUrl}${this.myApiUrl}/upd`,cat_areas);
  }

  deletecat_areas(id:number,id_usuario:number):Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/del/${id}/${id_usuario}`);
  }

  sendFilecat_areas(body:FormData,ruta:any,id_catalogo_areas:any):Observable<any>{
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}/file/${ruta}/${id_catalogo_areas}`,body);
  }


}
