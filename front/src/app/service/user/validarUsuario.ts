import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../../common/global-constants';
import { ValidateUser } from '../../interfaces/validateUser/validate_user.interface';
@Injectable({
  providedIn: 'root'
})
export class user {
  private myAppUrl:string;
  private myAppiUrl:string;

  constructor( private http:HttpClient) { 
    this.myAppUrl = GlobalConstants.appURL;
    this.myAppiUrl = "api/verificarUser"
  }


  validatPass(LoginResponse :ValidateUser ):Observable<string>{
    return this.http.post<string>(`${this.myAppUrl}${this.myAppiUrl}/validatPass`,LoginResponse);
  }

  actualizarPass(LoginResponse :ValidateUser ):Observable<string>{
    return this.http.post<string>(`${this.myAppUrl}${this.myAppiUrl}/actualizarPass`,LoginResponse);
  }
  
 
}
