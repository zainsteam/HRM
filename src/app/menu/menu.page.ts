import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(
    public navCtrl : NavController
  ) { } 

  ngOnInit() {
  }

  logout(){
    console.log("logout")
    Preferences.clear();
    this.navCtrl.navigateRoot('/login');

  }

}
