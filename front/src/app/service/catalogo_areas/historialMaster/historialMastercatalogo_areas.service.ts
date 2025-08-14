import { Injectable } from '@angular/core';
import { NuevohistorialMastercatalogo_areas } from '../../../interfaces/catalogo_areas/historialMaster/historialMastercatalogo_areas-response.interface'; 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { historialMastercatalogo_areasTable } from '../../../interfaces/catalogo_areas/historialMaster/historialMastercatalogo_areas-table.interface';
import { GlobalConstants } from '../../../common/global-constants';
@Injectable({
  providedIn: 'root'
})

export class historialMastercatalogo_areasService {

  private myAppUrl:string;
  private myApiUrl:string;

  constructor(private http:HttpClient) {
    this.myAppUrl = GlobalConstants.appURL;
    this.myApiUrl = 'api/historialMastercatalogo_areas';
  }
  
//Parametros historialMaster ------------------------------------------------------------------------------------------------>

  newhistorialMastercatalogo_areas(historialMaster:NuevohistorialMastercatalogo_areas):Observable<string>{
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}/`,historialMaster);
  }
  historialMasterByIdcatalogo_areas(id:number , id_usuario:number):Observable<historialMastercatalogo_areasTable[]>{
    return this.http.get<historialMastercatalogo_areasTable[]>(`${this.myAppUrl}${this.myApiUrl}/getRegByIdhistorialMastercatalogo_areas/${id}/${id_usuario}`);
  }
  getAllhistorialMastercatalogo_areas(id_usuario:number):Observable<historialMastercatalogo_areasTable[]>{
    return this.http.get<historialMastercatalogo_areasTable[]>(`${this.myAppUrl}${this.myApiUrl}/getAllhistorialMastercatalogo_areas/${id_usuario}`);
  }
   updatehistorialMastercatalogo_areas(catalogo_areas: historialMastercatalogo_areasTable):Observable<string>{
    return this.http.put<string>(`${this.myAppUrl}${this.myApiUrl}/upd`,catalogo_areas);
  }
   deletecatalogo_areas(id:number,id_usuario:number):Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/del/${id}/${id_usuario}`);
  }

}
