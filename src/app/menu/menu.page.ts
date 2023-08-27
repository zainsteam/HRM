import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';
import { Geolocation } from '@capacitor/geolocation';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'], 
})
export class MenuPage implements OnInit {

  constructor(
    public navCtrl : NavController
  ) { } 

  coordinates :any;
 
  ngOnInit() {
   this.printCurrentPosition();

  }
  public printCurrentPosition = async () => {
    this.coordinates = await Geolocation.getCurrentPosition();
  
    console.log('Current long:', this.coordinates.coords.latitude);
    console.log('Current lat:', this.coordinates.coords.longitude);
    console.log('Current long1:', "24.8962547");
    console.log('Current lat1:', "67.1755691");
    var dist = this.calculateDistance(24.8928527,this.coordinates.coords.latitude,67.1779374,this.coordinates.coords.longitude)
    console.log(dist, "distance")
  };
  

  logout(){
    console.log("logout")
    Preferences.clear();
    this.navCtrl.navigateRoot('/login'); 

  }

  calculateDistance(lat1:number,lat2:number,long1:number,long2:number){
    var R = 6371; // Radius of the earth in km
  var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
  var dLon = this.deg2rad(long2-long1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d *1000;
  }
  
  deg2rad(deg:number) {
    return deg * (Math.PI/180)
  }

}
