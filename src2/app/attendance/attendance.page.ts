import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { formatDate,  } from '@angular/common';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.page.html',
  styleUrls: ['./attendance.page.scss'],
})
export class AttendancePage implements OnInit {

  isSupported = false;
  key: any;
  userId: any;
  companyId: any;
  public dateTime: string;

  constructor(
    public http: HttpClient,
    public navCtrl : NavController,
    private alertController: AlertController,
    private authService: ApiService,
    public HttpHeaders : HttpClient

    ) { 
      this.key = localStorage.getItem('key');
      // this.key = "unioni32sweL96Og5t1cvziazmUJtFLrTo3NCW5LXRGd2UcckLlX1QRr5yEkiUNIXVCKYVbzjJJNvqsCrSEH4zpasQd1syS4qljaOUEjVLHDay2xSWBEumU5vpsynEOr"
      this.userId = localStorage.getItem('userId');
      this.companyId = localStorage.getItem('companyId');
      this.dateTime = new Date().toDateString();
       this.getWeek();
    }

    details : any;
    start_time: any;
    end_time : any;
  public dateTimeUpdated(ev: any): void {
    try {
     const neVal =  ev.detail.value;
     if (this.week.data){
     const date = formatDate(neVal, 'yyyy-MM-dd',"en-US");
     this.details = this.week.data.find((data : any) =>data.rotas_date == date)
     }
     else{
      alert("No Details Found")
     }

    } catch (error) {
      console.error(error);
    }
  }


    public week : any = {
      "status":null,
      "message":null,
      "data":[]
    };

    clock : any = {
      "status": null,
      "message":null
    }

    async getWeek(){

     
       await this.http.get("http://27.54.59.11/live/index.php/Attendance_api?key="+this.key+"&userid="+this.userId+"&companyid="+this.companyId)
        .subscribe(data => {
          this.week = data;
          this.hightlightedData();
          }, (err) => {
          console.log(err);

        });
    }
  async hightlightedData(){
    if (this.week.status == 1 && this.week.message != "No Record Found!"){
      let count = 0;
     await this.week.data.forEach((element:any) => {
      this.week.data[count]["date"] = element.rotas_date;
      this.week.data[count]["textColor"] = this.textColor;
      this.week.data[count]["backgroundColor"] = this.backgroundColor;
      count ++;
     });
    }
    else{
      alert("No data Recieve");
    }

  }

    SelDate : any;

  public checkin : boolean = true;
  textColor= '#800080';
  backgroundColor= '#c8e5d0';

  isWeekday = (dateString: string) => {
    const date = new Date(dateString);
    const utcDay = date.getUTCDay();

    /**
     * Date will be enabled if it is not
     * Sunday or Saturday
     */
    return utcDay !== 0 && utcDay !== 6;
  };

  optionZbar:any;
  scannedOutput:any;

  

  ngOnInit() {
    // BarcodeScanner.isSupported().then((result) => {
    //   this.isSupported = result.supported;
    // });
  }

  Scan(){
    // this.picture();
    // this.checkPermission1();
    // alert("camera")
    this.checkIn();
  }

  async checkIn(){
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Accept": "application/json, application/xml",
      "Cache-Control": "no-cache",
      // "Accept":"*/*",
      // "Accept-Encoding":"gzip, deflate, br",
      // "Content-Type":"application/ld+json",
      // "Access-Control-Allow-Methods":"*",
      // "Access-Control-Allow-Credentials":"true",
      // 'User-Agent': 'PostmanRuntime/7.32.3',
      // "Accept-Charset":"*"
      });
    await this.http.put("http://27.54.59.11/live/index.php/Attendance_api?key=unioni32sweL96Og5t1cvziazmUJtFLrTo3NCW5LXRGd2UcckLlX1QRr5yEkiUNIXVCKYVbzjJJNvqsCrSEH4zpasQd1syS4qljaOUEjVLHDay2xSWBEumU5vpsynEOr&user_id=7&company_id=2",{})
    .subscribe(data => {
      console.log(data,"data"); 
      this.clock = data;
      if (this.clock.status){
        alert(this.clock.message)
        this.checkin = !this.checkin;
        // console.log(this.checkIn)
      }
    
      }, (err) => {
        alert(err.error.message)
      console.log(err);

    });
  }

  // scanner(){
    // this.barcodeScanner.scan().then(barcodeData => {
    //   console.log('Barcode data', barcodeData);
    //  }).catch(err => {
    //      console.log('Error', err);
    //  });


    
  // }

  public async picture() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });
  }
    
      // image.webPath will contain a path that can be set as an image src.
      // You can access the original file using image.path, which can be
      // passed to the Filesystem API to read the raw data of the image,
      // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
      // var imageUrl = image.webPath;
    
      // Can be set to the src of an image now
      // imageElement.src = imageUrl;
      
  async UD(){

  
    let text;
if (confirm("Are you Sure, You want to Check-Out") == true) {


    const headers = new HttpHeaders({
      // "Access-Control-Allow-Origin":"*",
      "Content-Type": "application/json",
      "Accept": "application/json, application/xml",
      "Cache-Control": "no-cache",


      // "Access-Control-Allow-Headers":"*",
      // "Access-Control-Allow-Methods":"GET, POST, OPTIONS, PUT, DELETE, PATCH",
      // "Content-Type":"charset=UTF-8",

      });
    // fetch("http://27.54.59.11/live/index.php/Attendance_api?key=unioni32sweL96Og5t1cvziazmUJtFLrTo3NCW5LXRGd2UcckLlX1QRr5yEkiUNIXVCKYVbzjJJNvqsCrSEH4zpasQd1syS4qljaOUEjVLHDay2xSWBEumU5vpsynEOr&userid=7&companyid=2",undefined)
    // .then(responce => {
    //   console.log(responce,"fetch");
    // })
  
    await this.http.patch("http://27.54.59.11/live/index.php/Attendance_api?key=unioni32sweL96Og5t1cvziazmUJtFLrTo3NCW5LXRGd2UcckLlX1QRr5yEkiUNIXVCKYVbzjJJNvqsCrSEH4zpasQd1syS4qljaOUEjVLHDay2xSWBEumU5vpsynEOr&user_id=7&company_id=2",null)
    .subscribe(data => {
      console.log(data); 
      this.clock = data;
      if (this.clock.status){
        this.checkin = !this.checkin;
        alert(this.clock.message)
      }
      console.log(this.clock)
      }, (err) => {
      console.log(err);
      alert(err.error.message)
;
    });



} 
  }
  
  logout(){
    console.log("logout")
    localStorage.clear();
    this.navCtrl.navigateRoot('/login');

  }
}
