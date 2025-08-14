import { Injectable } from '@angular/core';
import { Nuevocat_firmante } from '../../../interfaces/registro_quien_firma/cat_firmante/cat_firmante-response.interface'; 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { cat_firmanteTable } from '../../../interfaces/registro_quien_firma/cat_firmante/cat_firmante-table.interface';
import { GlobalConstants } from '../../../common/global-constants';
import { Firmante } from '../../../interfaces/firmantes/firmante.interfaces';
@Injectable({
  providedIn: 'root'
})

export class cat_firmanteService {

  private myAppUrl:string;
  private myApiUrl:string;

  constructor(private http:HttpClient) {
    this.myAppUrl = GlobalConstants.appURL;
    this.myApiUrl = 'api/cat_firmante';
  }
  newcat_firmante(cat_firmante:Nuevocat_firmante):Observable<Firmante>{
    return this.http.post<Firmante>(`${this.myAppUrl}${this.myApiUrl}/`,cat_firmante);
  }

  getAllcat_firmante(id_usuario:number):Observable<cat_firmanteTable[]>{
    return this.http.get<cat_firmanteTable[]>(`${this.myAppUrl}${this.myApiUrl}/getAllcat_firmante/${id_usuario}`);
  }

  getcat_firmante(id:number,id_usuario:number):Observable<cat_firmanteTable>{
    return this.http.get<cat_firmanteTable>(`${this.myAppUrl}${this.myApiUrl}/${id}/${id_usuario}`);
  }

  updatecat_firmante(cat_firmante:cat_firmanteTable):Observable<string>{
    return this.http.put<string>(`${this.myAppUrl}${this.myApiUrl}/upd`,cat_firmante);
  }

  deletecat_firmante(id:number,id_usuario:number):Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/del/${id}/${id_usuario}`);
  }

  sendFilecat_firmante(body:FormData,ruta:any,id_registro_quien_firma:any):Observable<any>{
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}/file/${ruta}/${id_registro_quien_firma}`,body);
  }

  getcat_firmanteByid_gestion_oficios(id_gestion_oficios:number):Observable<cat_firmanteTable>{
    return this.http.get<cat_firmanteTable>(`${this.myAppUrl}${this.myApiUrl}/getcat_firmanteByid_gestion_oficios/${id_gestion_oficios}`);
  }

  cancelFirmante(id_gestion_oficios:number):Observable<void>{
    return this.http.get<void>(`${this.myAppUrl}${this.myApiUrl}/cancelFirmante/${id_gestion_oficios}`);
  }

 }
