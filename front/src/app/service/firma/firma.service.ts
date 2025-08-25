import { Injectable } from '@angular/core';
import { Nuevofirma } from '../../interfaces/firma/firma-response.interface'; 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { firmaTable } from '../../interfaces/firma/firma-table.interface';
import { GlobalConstants } from '../../common/global-constants';
@Injectable({
  providedIn: 'root'
})

export class firmaService {

  private myAppUrl:string;
  private myApiUrl:string;

  constructor(private http:HttpClient) {
    this.myAppUrl = GlobalConstants.appURL;
    this.myApiUrl = 'api/firma';
  }
  newfirma(id_usuario : number):Observable<string>{
    return this.http.get<string>(`${this.myAppUrl}${this.myApiUrl}/${id_usuario}`);
  }

  getAllfirma(id_usuario:number,id_rol:number,estatus:number,activo:number):Observable<firmaTable[]>{
    return this.http.get<firmaTable[]>(`${this.myAppUrl}${this.myApiUrl}/getAllfirma/${id_usuario}/${id_rol}/${estatus}/${activo}`);
  }

  getfirma(id:number,id_usuario:number,id_rol:number):Observable<firmaTable>{
    return this.http.get<firmaTable>(`${this.myAppUrl}${this.myApiUrl}/${id}/${id_usuario}/${id_rol}`);
  }

   updfirma_id_firma_coordinador(firma:firmaTable):Observable<string>{
    return this.http.put<string>(`${this.myAppUrl}${this.myApiUrl}/updfirma_id_firma_coordinador`,firma);
  }

   delfirma(id:number,id_usuario:number):Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/delfirma/${id}/${id_usuario}`);
   }
   actualizarEstatusfirma(id_firma:any,id_usuario:any,estatus:any,descripcion:any):Observable<firmaTable[]>{
    return this.http.get<firmaTable[]>(`${this.myAppUrl}${this.myApiUrl}/actualizarEstatusfirma/${id_firma}/${id_usuario}/${estatus}/${descripcion}`);
  }
}
