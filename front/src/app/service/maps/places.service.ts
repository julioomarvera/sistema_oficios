import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  latitud :number | any = 0;
  longitud:number | any = 0;
  public useLocation?:[number,number]; 

  get isUserLocationRedy():boolean{
    return !!this.useLocation;
  }
  constructor() { 
    this.getUserLocation();
  }


  getUserLocation(): Promise<[number, number]>{
    return new Promise (( resolve , reject) =>{
      navigator.geolocation.getCurrentPosition(
        ({coords}) =>{
          this.useLocation=[coords.longitude, coords.latitude]
          this.latitud = coords.latitude;
          this.longitud = coords.longitude;
          localStorage.setItem('latitud',this.latitud);
          localStorage.setItem('longitud',this.longitud); 
           resolve(this.useLocation)
          },
          (err) =>{
            alert('No se pudo obtener la geolocalización del dispositivo')
            console.log(err);
            reject();
          }
      );

      
    });

  }
}
