import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


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

		
		const url = "http://27.54.59.11/live/index.php/Login_api?key="+this.credentials.value.key+"&email="+this.credentials.value.email+"&password="+this.credentials.value.password;


		this.http.post(url,null)
		  .subscribe(data => {
			this.user = data;
			if(this.user.status == 1)
          {
            console.log(this.user.data);
            localStorage.setItem('userId', this.user.data.UserId);
            localStorage.setItem('companyId', this.user.data.CompanyId);
			localStorage.setItem('companyName', this.user.data.CompanyName);
			localStorage.setItem('userName', this.user.data.FirstName);
			localStorage.setItem('profilePic', this.user.data.ProfilePic);
			localStorage.setItem('key', this.credentials.value.key);

			this.navCtrl.navigateRoot('/menu');
          }
          else
          {
		   console.log(this.user.status, "error")
          }
		  },(err) => {
			console.log(err);
			alert("Invalid User and Password")
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
