import { Component } from '@angular/core';
import { PlacesService } from '../../service/maps';

@Component({
  selector: 'app-map-view',
  standalone: true,
  imports: [],
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.scss'
})
export class MapViewComponent {

  constructor(private placesService:PlacesService){

  }

  ngOnInit():void{
    console.log(this.placesService.useLocation);
  }
}
