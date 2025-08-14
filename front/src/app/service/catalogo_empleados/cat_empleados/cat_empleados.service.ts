import { Injectable } from '@angular/core';
import { Nuevocat_empleados } from '../../../interfaces/catalogo_empleados/cat_empleados/cat_empleados-response.interface'; 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { cat_empleadosTable } from '../../../interfaces/catalogo_empleados/cat_empleados/cat_empleados-table.interface';
import { GlobalConstants } from '../../../common/global-constants';
@Injectable({
  providedIn: 'root'
})

export class cat_empleadosService {

  private myAppUrl:string;
  private myApiUrl:string;

  constructor(private http:HttpClient) {
    this.myAppUrl = GlobalConstants.appURL;
    this.myApiUrl = 'api/cat_empleados';
  }
  newcat_empleados(cat_empleados:Nuevocat_empleados):Observable<string>{
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}/`,cat_empleados);
  }

  getAllcat_empleados(id_usuario:number):Observable<cat_empleadosTable[]>{
    return this.http.get<cat_empleadosTable[]>(`${this.myAppUrl}${this.myApiUrl}/getAllcat_empleados/${id_usuario}`);
  }

  getcat_empleados(id:number,id_usuario:number):Observable<cat_empleadosTable>{
    return this.http.get<cat_empleadosTable>(`${this.myAppUrl}${this.myApiUrl}/${id}/${id_usuario}`);
  }

  updatecat_empleados(cat_empleados:cat_empleadosTable):Observable<string>{
    return this.http.put<string>(`${this.myAppUrl}${this.myApiUrl}/upd`,cat_empleados);
  }

  deletecat_empleados(id:number,id_usuario:number):Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/del/${id}/${id_usuario}`);
  }

  sendFilecat_empleados(body:FormData,ruta:any,id_catalogo_empleados:any):Observable<any>{
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}/file/${ruta}/${id_catalogo_empleados}`,body);
  }

  get_coordinador_empleados(numero_empleado:number):Observable<cat_empleadosTable>{
    return this.http.get<cat_empleadosTable>(`${this.myAppUrl}${this.myApiUrl}/get_coordinador_empleados/${numero_empleado}`);
  }
  
  getAllcat_empleadosByDireccionAreas(id_direccion:number,id_area:number):Observable<cat_empleadosTable[]>{
    return this.http.get<cat_empleadosTable[]>(`${this.myAppUrl}${this.myApiUrl}/getAllcat_empleadosByDireccionAreas/${id_direccion}/${id_area}`);
  }

}
