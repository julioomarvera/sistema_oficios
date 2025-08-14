import { Injectable } from '@angular/core';
import { Nuevoestatuscatalogo_areas } from '../../../interfaces/catalogo_areas/estatus/estatuscatalogo_areas-response.interface'; 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { estatuscatalogo_areasTable } from '../../../interfaces/catalogo_areas/estatus/estatuscatalogo_areas-table.interface';
import { GlobalConstants } from '../../../common/global-constants';
@Injectable({
  providedIn: 'root'
})

export class estatuscatalogo_areasService {

  private myAppUrl:string;
  private myApiUrl:string;

  constructor(private http:HttpClient) {
    this.myAppUrl = GlobalConstants.appURL;
    this.myApiUrl = 'api/estatuscatalogo_areas';
  }
  
//Parametros estatus ------------------------------------------------------------------------------------------------>

  newestatuscatalogo_areas(estatus:Nuevoestatuscatalogo_areas):Observable<string>{
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}/`,estatus);
  }
  estatusByIdcatalogo_areas(id:number , id_usuario:number):Observable<estatuscatalogo_areasTable>{
    return this.http.get<estatuscatalogo_areasTable>(`${this.myAppUrl}${this.myApiUrl}/getRegByIdestatuscatalogo_areas/${id}/${id_usuario}`);
  }
  getAllestatuscatalogo_areas(id_usuario:number):Observable<estatuscatalogo_areasTable[]>{
    return this.http.get<estatuscatalogo_areasTable[]>(`${this.myAppUrl}${this.myApiUrl}/getAllestatuscatalogo_areas/${id_usuario}`);
  }
   updateestatuscatalogo_areas(catalogo_areas: estatuscatalogo_areasTable):Observable<string>{
    return this.http.put<string>(`${this.myAppUrl}${this.myApiUrl}/upd`,catalogo_areas);
  }
   deletecatalogo_areas(id:number,id_usuario:number):Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/del/${id}/${id_usuario}`);
  }
  getAllCatalogoEstatuscatalogo_areas(id_usuario:number):Observable<estatuscatalogo_areasTable>{
    return this.http.get<estatuscatalogo_areasTable>(`${this.myAppUrl}${this.myApiUrl}/getAllestatuscatalogo_areas/${id_usuario}`);
  }

}
