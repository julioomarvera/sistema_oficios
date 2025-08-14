import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalConstants } from '../../../common/global-constants';
import { cat_areasTable } from '../../../interfaces/catalogo_areas/cat_areas/cat_areas-table.interface';
import { cat_empleadosTable } from '../../../interfaces/catalogo_empleados/cat_empleados/cat_empleados-table.interface';

@Injectable({
  providedIn: 'root'
})

export class cat_direcciones_areas_Service {

  private myAppUrl:string;
  private myApiUrl:string;

  constructor(private http:HttpClient) {
    this.myAppUrl = GlobalConstants.appURL;
    this.myApiUrl = 'api/direcciones_areas';
  }
  
  getAreaByIdDireccion(id:number):Observable<cat_areasTable[]>{
    return this.http.get<cat_areasTable[]>(`${this.myAppUrl}${this.myApiUrl}/getAreaByDireccion/${id}`);
  }

  getAreaByIdArea(id:number):Observable<cat_areasTable[]>{
    return this.http.get<cat_areasTable[]>(`${this.myAppUrl}${this.myApiUrl}/getAreaByArea/${id}`);
  }

  getDireccionByNameArea(area:string):Observable<cat_empleadosTable>{
    return this.http.get<cat_empleadosTable>(`${this.myAppUrl}${this.myApiUrl}/getDireccionByNameArea/${area}`);
  }

}
