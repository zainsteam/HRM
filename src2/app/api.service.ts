import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParamsOptions } from '@angular/common/http';
import { BehaviorSubject} from 'rxjs';
import { Storage } from '@capacitor/storage';
import { map } from 'rxjs';
const TOKEN_KEY = 'userId';


@Injectable({
  providedIn: 'root'
})

export class ApiService {

	public user :any  = {
		status : null,
		data : [],
		message : null
	};

	public key = "unioni32sweL96Og5t1cvziazmUJtFLrTo3NCW5LXRGd2UcckLlX1QRr5yEkiUNIXVCKYVbzjJJNvqsCrSEH4zpasQd1syS4qljaOUEjVLHDay2xSWBEumU5vpsynEOr";

  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	token = '';

  constructor(private http: HttpClient) {	
    this.loadToken();
	}

  

	async loadToken() {
		const token = await Storage.get({ key: TOKEN_KEY });
		if (token && token.value) {
			console.log('set token: ', token.value);
			this.token = token.value;
			this.isAuthenticated.next(true);
		} else {
			this.isAuthenticated.next(false);
		}
	}

  
	async login( credentials : any ) {
    const url = "https://unionsecurity.com.sg/live/index.php/Login_api?key="+credentials.value.key+"&email="+credentials.value.email+"&password="+credentials.value.password;

		this.http.post(url, null)
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
			localStorage.setItem('userType', this.user.data.UserType);
			return this.user;
          }
          else
          {
		   console.log(this.user.status, "error")
          }
		  },(err) => {
			console.log(err.status)

		});
	  }


	logout(): Promise<void> {
		this.isAuthenticated.next(false);
		return Storage.remove({ key: TOKEN_KEY });
	}

	async getWeek( U_id:number,C_id:number){
		var week ; 
		await this.http.get( "https://unionsecurity.com.sg/live/index.php/Attendance_api?key="+this.key+"&userid="+U_id+"&companyid="+C_id )
		.subscribe(data => {
			console.log(data)
			week = JSON.stringify(data);
		},(err) => {
			console.log(err)

		});

		return week;
		
	}
}
