import { Component, Input, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { IWeatherData } from './models/IWeatherData.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'My Weather App';
  cityDetails: IWeatherData;
  ngOnInit() {
  }

  constructor(
    private weatherService: WeatherService,
  ) {}
  
  getCityDetails(woeid) {
    this.weatherService.getCityDetails(woeid).subscribe(data =>{
      this.cityDetails = data
    })
    /*
      CHALLENGE
       - pass the city id to service.getCityDetails(woeid)
    */
  }
}
