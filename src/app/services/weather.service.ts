import { ICityWeather } from './../models/IWeatherData.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IWeatherRawData } from '../models/IWeatherRawData.interface';
import { ISearchResult, IWeatherData } from '../models/IWeatherData.interface';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(
    private http: HttpClient,
  ) { }

  baseUrl = 'https://cors-anywhere.herokuapp.com/https://www.metaweather.com';


  searchLocation(term): Observable<ISearchResult[]> {
    /*
      CHALLANGE
       - get list of cities based on the searched string
       sample url: baseUrl/api/location/search/?query=paris
    */
   return this.http.get<ISearchResult[]>(`${this.baseUrl}/api/location/search/?query=${term}`);
  //  return;

  }

  getCityDetails(woeid): Observable<IWeatherData> {
    /*
      woeid is the city id(number).
      you can use below sample url to fetch the city weather details
      sample url : baseUrl/api/location/111111
    */

   return this.http.get<IWeatherRawData>(`${this.baseUrl}/api/location/${woeid}`).pipe(map(data => this.transformRawData(data)));

    /*
      CHALLENGE
       - fetch the city weather data
       - transform the received data to required "IWeatherData" format using transformRawData() func
    */
  //  return;

  }

  transformRawData(rawData: IWeatherRawData) {
    const transformedWeather: Array<ICityWeather> = [];

    rawData.consolidated_weather.forEach(function(obj) {
      const date = obj.applicable_date;
      const temperature = obj.the_temp;
      const weather_name = obj.weather_state_name;
      const weather_image = `https://www.metaweather.com/static/img/weather/.svg`;

      transformedWeather.push({ date,temperature,weather_name,weather_image} as ICityWeather);
    });
    console.log(rawData)

    return {
      city: rawData.title,
      country: rawData.parent.title,
      weather: transformedWeather,
    };
  }
}
