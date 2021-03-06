import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WeatherProvider } from '../../providers/weather/weather';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  weather: any;
  location: {
    city: string,
    state: string
  }

  constructor(public navCtrl: NavController, private weatherProvider: WeatherProvider, private storage: Storage) {
    
  }

  ionViewWillEnter() {
    this.storage.get('location')
      .then( (val) => {
        console.log(val)
        if ( val != null && val != undefined ) {
          // this.location = JSON.parse( val );
          this.location = val;
          console.log(this.location)
        } else {
          this.location = {
            city: 'San_Francisco',
            state: 'CA'
          }
        }
        this.weatherProvider.getWeather( this.location.city, this.location.state )
          .subscribe( (resp: any) => this.weather = resp.current_observation )
      })
      .catch();



  }

}
