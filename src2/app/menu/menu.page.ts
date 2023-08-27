import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

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
    localStorage.clear();
    this.navCtrl.navigateRoot('/login');

  }

}
