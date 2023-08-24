import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Preferences } from '@capacitor/preferences';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials!: FormGroup;

  constructor(
	public http: HttpClient,
    public navCtrl : NavController,
    private fb: FormBuilder,
		private authService: ApiService,
		private alertController: AlertController,
		private router: Router,
		private loadingController: LoadingController
  ) { 
  } 

  ngOnInit() {
    this.credentials = this.fb.group({
			email: ['admin@example.com', [Validators.required, Validators.email]],
			password: ['1234', [Validators.required, Validators.minLength(4)]],
      key: "unioni32sweL96Og5t1cvziazmUJtFLrTo3NCW5LXRGd2UcckLlX1QRr5yEkiUNIXVCKYVbzjJJNvqsCrSEH4zpasQd1syS4qljaOUEjVLHDay2xSWBEumU5vpsynEOr"
		});
  }

  public user :any  = {
	status : null,
	data : [],
	message : null
};
  
	async login() {

		const headers = new HttpHeaders({
			// "Accept": "application/json, application/xml",
			// "Cache-Control": "no-cache",
			"Accept":"*/*",
			// "Accept-Encoding":"gzip, deflate, br",
			// "Content-Type":"application/ld+json",
			// "Access-Control-Allow-Methods":"*",
			// "Access-Control-Allow-Credentials":"true",
			// 'User-Agent': 'PostmanRuntime/7.32.3',
			// "Accept-Charset":"*",
			"Access-Control-Allow-Origin":"*",
			"Access-Control-Allow-Headers":"*",
			"Access-Control-Allow-Methods":"PUT, GET, POST, DELETE, OPTIONS, PATCH",
			"Content-Type": "application/json; charset=utf-8",
			});

		const url = "https://saintsecurity.com/live/index.php/Login_api?key="+this.credentials.value.key+"&email="+this.credentials.value.email+"&password="+this.credentials.value.password;


		this.http.post(url,null)
		  .subscribe(data => {
			this.user = data;
			if(this.user.status == 1)
          {
            console.log(this.user.data);
            Preferences.set({key:'userId', value:this.user.data.UserId});
            Preferences.set({key:'companyId', value:this.user.data.CompanyId});
			Preferences.set({key:'companyName', value:this.user.data.CompanyName});
			Preferences.set({key:'userName', value:this.user.data.FirstName});
			Preferences.set({key:'profilePic', value:this.user.data.ProfilePic});
			Preferences.set({key:'key', value:this.credentials.value.key});
			Preferences.set({key:'checkin', value :'true'});


			this.navCtrl.navigateRoot('/menu');
          }
          else
          {
		   console.log(this.user.status, "error")
          }
		  },(err) => {
			alert(err.message);
			// alert(err.statusText);
			// alert(err.error.status);
			alert("Invalid User and Password")
			console.log(err);
		});	  
	}


	// Easy access for form fields
	get email() {
		return this.credentials.get('email');
	}

	get password() {
		return this.credentials.get('password');
	}

}
