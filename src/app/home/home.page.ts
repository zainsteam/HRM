import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    public navCtrl : NavController
  ) {}

  UD(){
    alert("Under Development");
  }

  logout(){
    console.log("logout")
    Preferences.clear();
    this.navCtrl.navigateRoot('/login');

  }
}


