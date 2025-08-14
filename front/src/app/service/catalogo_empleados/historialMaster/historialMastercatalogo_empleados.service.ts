import { Injectable } from '@angular/core';
import { NuevohistorialMastercatalogo_empleados } from '../../../interfaces/catalogo_empleados/historialMaster/historialMastercatalogo_empleados-response.interface'; 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { historialMastercatalogo_empleadosTable } from '../../../interfaces/catalogo_empleados/historialMaster/historialMastercatalogo_empleados-table.interface';
import { GlobalConstants } from '../../../common/global-constants';
@Injectable({
  providedIn: 'root'
})

export class historialMastercatalogo_empleadosService {

  private myAppUrl:string;
  private myApiUrl:string;

  constructor(private http:HttpClient) {
    this.myAppUrl = GlobalConstants.appURL;
    this.myApiUrl = 'api/historialMastercatalogo_empleados';
  }
  
//Parametros historialMaster ------------------------------------------------------------------------------------------------>

  newhistorialMastercatalogo_empleados(historialMaster:NuevohistorialMastercatalogo_empleados):Observable<string>{
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}/`,historialMaster);
  }
  historialMasterByIdcatalogo_empleados(id:number , id_usuario:number):Observable<historialMastercatalogo_empleadosTable[]>{
    return this.http.get<historialMastercatalogo_empleadosTable[]>(`${this.myAppUrl}${this.myApiUrl}/getRegByIdhistorialMastercatalogo_empleados/${id}/${id_usuario}`);
  }
  getAllhistorialMastercatalogo_empleados(id_usuario:number):Observable<historialMastercatalogo_empleadosTable[]>{
    return this.http.get<historialMastercatalogo_empleadosTable[]>(`${this.myAppUrl}${this.myApiUrl}/getAllhistorialMastercatalogo_empleados/${id_usuario}`);
  }
   updatehistorialMastercatalogo_empleados(catalogo_empleados: historialMastercatalogo_empleadosTable):Observable<string>{
    return this.http.put<string>(`${this.myAppUrl}${this.myApiUrl}/upd`,catalogo_empleados);
  }
   deletecatalogo_empleados(id:number,id_usuario:number):Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/del/${id}/${id_usuario}`);
  }

}
