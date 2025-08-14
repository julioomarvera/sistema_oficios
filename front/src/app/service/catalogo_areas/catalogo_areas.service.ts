import { Injectable } from '@angular/core';
import { Nuevocatalogo_areas } from '../../interfaces/catalogo_areas/catalogo_areas-response.interface'; 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catalogo_areasTable } from '../../interfaces/catalogo_areas/catalogo_areas-table.interface';
import { GlobalConstants } from '../../common/global-constants';
@Injectable({
  providedIn: 'root'
})

export class catalogo_areasService {

  private myAppUrl:string;
  private myApiUrl:string;

  constructor(private http:HttpClient) {
    this.myAppUrl = GlobalConstants.appURL;
    this.myApiUrl = 'api/catalogo_areas';
  }
  newcatalogo_areas(id_usuario : number):Observable<string>{
    return this.http.get<string>(`${this.myAppUrl}${this.myApiUrl}/${id_usuario}`);
  }

  getAllcatalogo_areas(id_usuario:number,id_rol:number,estatus:number,activo:number):Observable<catalogo_areasTable[]>{
    return this.http.get<catalogo_areasTable[]>(`${this.myAppUrl}${this.myApiUrl}/getAllcatalogo_areas/${id_usuario}/${id_rol}/${estatus}/${activo}`);
  }

  getcatalogo_areas(id:number,id_usuario:number,id_rol:number):Observable<catalogo_areasTable>{
    return this.http.get<catalogo_areasTable>(`${this.myAppUrl}${this.myApiUrl}/${id}/${id_usuario}/${id_rol}`);
  }

   updcatalogo_areas_id_cat_areas(catalogo_areas:catalogo_areasTable):Observable<string>{
    return this.http.put<string>(`${this.myAppUrl}${this.myApiUrl}/updcatalogo_areas_id_cat_areas`,catalogo_areas);
  }

   delcatalogo_areas(id:number,id_usuario:number):Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/delcatalogo_areas/${id}/${id_usuario}`);
   }
   actualizarEstatuscatalogo_areas(id_catalogo_areas:any,id_usuario:any,estatus:any,descripcion:any):Observable<catalogo_areasTable[]>{
    return this.http.get<catalogo_areasTable[]>(`${this.myAppUrl}${this.myApiUrl}/actualizarEstatuscatalogo_areas/${id_catalogo_areas}/${id_usuario}/${estatus}/${descripcion}`);
  }
}
