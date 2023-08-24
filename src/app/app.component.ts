import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';
const TOKEN_KEY = 'userName';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    public navCtrl : NavController
  ) {
    this.checklogin();
  }

  
  public user :any  = {
    status : null,
    data : [],
    message : null
  };  
    

  async checklogin(){
    await Preferences.get({key:'key'}).then((data) => {
      this.user = data.value;
      console.log(data.value,"key")
    });
    if (this.user != null){
      this.navCtrl.navigateRoot('/menu');
    }
    else{
      this.navCtrl.navigateRoot('/');

    }
  }
  
}
