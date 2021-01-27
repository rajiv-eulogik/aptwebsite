import { Component, OnInit, HostBinding } from '@angular/core';
import { trigger, transition, style, animate, stagger, query, useAnimation } from '@angular/animations';
import { PAGE_IN_ANIMATION, PAGE_OUT_ANIMATION } from '../../shared_route_animations';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import {GetDataServiceService} from '../../service/get-data-service.service';
import { base_url, apt_url } from "../../service/config";
import { Router, ActivatedRoute } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import {flyInOut, expand} from '../../animation-details/animation-details.component';
import { Observable, Subscription, timer } from 'rxjs';

const NUM_REGEX = /^[1-9][0-9]{5,19}$/;
const NAME_REGEX = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
import {
  slideInDown,
  slideInUp,
  slideInLeft,
  slideInRight,
  slideOutDown,
  slideOutUp,
  slideOutLeft,
  slideOutRight,
  zoomIn,
  zoomInDown,
  zoomInUp,
  zoomInLeft,
  zoomInRight,
  zoomOut,
  zoomOutDown,
  zoomOutUp,
  zoomOutLeft,
  zoomOutRight
} from 'ng-animate';

@Component({
  selector: 'app-school-tie-ups',
  templateUrl: './school-tie-ups.component.html',
  styleUrls: ['./school-tie-ups.component.scss'],
  animations: [
    trigger('zoomOutDown', [transition('* => *', useAnimation(zoomOutDown))]),
    trigger('zoomOutLeft', [transition('* => *', useAnimation(zoomOutLeft))]),
    trigger('zoomOutRight', [transition('* => *', useAnimation(zoomOutRight))]),
    trigger('zoomOutUp', [transition('* => *', useAnimation(zoomOutUp))]),
    trigger('slideInDown', [transition('* => *', useAnimation(slideInDown))]),
    trigger('slideInUp', [transition('* => *', useAnimation(slideInUp))]),
    trigger('slideInLeft', [transition('* => *', useAnimation(slideInLeft))]),
    trigger('slideInRight', [transition('* => *', useAnimation(slideInRight))]),
    flyInOut(),
    expand()
  ],
})
export class SchoolTieUpsComponent implements OnInit {

  public showloader: boolean = false;      
  private subscription: Subscription;
  private timer: Observable<any>;

  public zoomOutDown: any ;
  public zoomOutLeft: any;
  public zoomOutRight: any;
  public zoomOutUp: any;
  public slideInDown: any;
  public slideInUp: any;
  public slideInLeft: any;
  public AllCoutryName: any = [];
  public imageObj: any;
  public schoollTieUp: FormGroup; 
  // urm source related variables
  public utm_source: string = '';
  public utm_medium: string = '';
  public campaignType: string = '';
  public publisherId: string = '';
  public value: any;
  public len: any;
  public mobileMax: number;
  public flag: boolean;

  constructor(public route: ActivatedRoute,public fb: FormBuilder,public getDataService: GetDataServiceService,
    public router: Router,public snakBar: MatSnackBar) { 
    this.utm_source = this.route.snapshot.queryParamMap.get('utm_source');
    if (this.utm_source !== null) {
      this.utm_medium = this.route.snapshot.queryParamMap.get('utm_medium');
      this.campaignType = this.route.snapshot.queryParamMap.get('campaigntype');
      this.publisherId = this.route.snapshot.queryParamMap.get('publisherid');
     } else { }
    }
  //get all contry mock data 
  GetAllCountry(){
    let url = 'assets/jsonFile/allCountryCodes.json'
    console.log(url);
    this.getDataService.getData(url).subscribe(responce => {
      //console.log("get class details data is ", responce);
      this.AllCoutryName = responce;
      // this.classDetail = dummy.data;   
     })
   }
  ngOnInit(): void {
    this.getWidth()
    this.GetAllCountry();
    this.initilizeForm();
    this.setTimer();
    
  }


  public ngOnDestroy() {
    if ( this.subscription && this.subscription instanceof Subscription) {
      this.subscription.unsubscribe();
    }
  }

  public setTimer(){

    // set showloader to true to show loading div on view
    this.showloader   = true;

    this.timer        = timer(1000); // 5000 millisecond means 5 seconds
    this.subscription = this.timer.subscribe(() => {
        // set showloader to false to hide loading div from view after 5 seconds
        this.showloader = false;
    });
  }

  mobileDevice: boolean = false
	getWidth(event?) {
		// FUNCTION GETS THE WIDTH OF THE SCREEN
			this.mobileDevice = event ? event.target.innerWidth <= 600 ? true : false : window.innerWidth <= 600 ? true : false 
	
	}
 // inilize form data here 
 initilizeForm(){
  this.schoollTieUp = this.fb.group({
    logo: new FormControl(''),
    school: new FormControl('', [Validators.required,Validators.pattern(NAME_REGEX)]),
    schoolType: new FormControl('', [Validators.required]),
    board: new FormControl('', [Validators.required,Validators.pattern(NAME_REGEX)]),
    description: new FormControl('', [Validators.required,Validators.pattern(NAME_REGEX)]),
    name: new FormControl('', [Validators.required,Validators.pattern(NAME_REGEX)]),
    email: new FormControl('', [Validators.required,Validators.pattern(EMAIL_REGEX)]),
    mobile: new FormControl('',[Validators.required,Validators.pattern(NUM_REGEX)]),
    country: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required,Validators.pattern(NAME_REGEX)]),
    city: new FormControl('', [Validators.required,Validators.pattern(NAME_REGEX)]),
    comment: new FormControl(''),
  });
 }
 // uplaod image url here dist: new FormControl('', [Validators.required]),
 uploadPicture: any;
 changeListener(event) {

   let reader = new FileReader(); // HTML5 FileReader API
   let file = event.target.files[0];
   if(file){
   this.imageObj = event.target.files[0];
   var image: FileList = event.target.files;
   this.uploadPicture = event.target.files;
   // this.imageObj = image; 
    console.log(" image url is ", file);
   this.schoollTieUp.patchValue({
    logo: file.name
   });
   // this.classForm.setValue({
     //   category: file.name
     // })
     if (event.target.files && event.target.files[0]) {
       reader.readAsDataURL(file);

       // When file uploads set it to file formcontrol
       reader.onload = () => {
        // console.log(" image url is ",reader.result);
         // this.profilePicUrl = reader.result;
       }
     } 
    }
   }


   onChange(event) {
    console.log(event.dial_code)
    if (event.dial_code == 91) {
      this.mobileMax = 10;
      this.flag = true;
    } else {
      this.mobileMax = 15;
      this.flag = false;
    }
  }
  // save data here 
  SAVEDATA(){
    console.log("form value is here",this.schoollTieUp.value);
    if(this.schoollTieUp.valid)
   {
     console.log("uploads file here",this.imageObj);
         let url = base_url + 'uploads'
         this.getDataService.createDirectory2({ name: "school" },url).subscribe(r => {
          console.log("create createDirectory responce",r);
          let temp: any = r;
           if (temp.name === 'school') {
            let file = this.imageObj;
            if(file){
            let formData = new FormData();
            formData.append('file', file, file.name);
            let url2 = base_url + 'Uploads/school'
             // console.log(uploadFile);
              this.getDataService.PostData(formData,url2).subscribe(res => {
               console.log("uploads file responce",res);
               let dummy: any = res;
                let postData: any = {};
                if (this.utm_source !== null) {
                  postData = {
                    "logo": dummy.data.result.files.file[0].name,
                    "logoName": this.schoollTieUp.value.logo,
                    "school": this.schoollTieUp.value.school,
                    "board": this.schoollTieUp.value.board,
                    "description": this.schoollTieUp.value.description,
                    "mobile": this.schoollTieUp.value.mobile,
                    "email": this.schoollTieUp.value.email,
                    "state": this.schoollTieUp.value.state,
                    "country": this.schoollTieUp.value.country.name,
                    "countryCode": this.schoollTieUp.value.country.dial_code,
                    // "Dist": this.schoollTieUp.value.dist,
                    "status": "active",
                    "comment": this.schoollTieUp.value.comment,
                    "createdAt": new Date(),
                    "updatedAt": new Date(),
                    "Contactperson": this.schoollTieUp.value.name,
                    "city": this.schoollTieUp.value.city,
                    "utm_medium": this.utm_medium,
                    "compaigntype": this.campaignType,
                    "publisherid": this.publisherId,
                    "utm_source": this.utm_source,
                  };

                } else {
                  postData = {
                    "logo": dummy.data.result.files.file[0].name,
                    "logoName": this.schoollTieUp.value.logo,
                    "school": this.schoollTieUp.value.school,
                    "board": this.schoollTieUp.value.board,
                    "description": this.schoollTieUp.value.description,
                    "mobile": this.schoollTieUp.value.mobile,
                    "email": this.schoollTieUp.value.email,
                    "state": this.schoollTieUp.value.state,
                    // "Dist": this.schoollTieUp.value.dist,
                    "status": "active",
                    "comment": this.schoollTieUp.value.comment,
                    "createdAt": new Date(),
                    "updatedAt": new Date(),
                    "Contactperson": this.schoollTieUp.value.name,
                    "city": this.schoollTieUp.value.city,
                    "country": this.schoollTieUp.value.country,
                  };
                }

                
              let url1 = base_url + 'SchoolTieUps'
               this.getDataService.PostData(postData,url1).subscribe(res => {
                // this.getFileData();
                 this.snakBar.open('Form submited added successfully', 'OK', {
                        duration: 3000
                  });
                  this.schoollTieUp.reset();
                }, error => {
                  this.snakBar.open('Failed to add File', 'Retry', {
                  duration: 3000
                });
               });
              }, err => {
                console.log("error to post",err);
                this.snakBar.open('Failed to add File', 'Retry', {
                  duration: 3000
                });
              });
           }
           else {

                let postData: any = {};
                if (this.utm_source !== null) {
                  postData = {
                    "logo": '',
                    "logoName": '',
                    "school": this.schoollTieUp.value.school,
                    "board": this.schoollTieUp.value.board,
                    "description": this.schoollTieUp.value.description,
                    "mobile": this.schoollTieUp.value.mobile,
                    "email": this.schoollTieUp.value.email,
                    "state": this.schoollTieUp.value.state,
                    // "Dist": this.schoollTieUp.value.dist,
                    "status": "active",
                    "comment": this.schoollTieUp.value.comment,
                    "createdAt": new Date(),
                    "updatedAt": new Date(),
                    "Contactperson": this.schoollTieUp.value.name,
                    "city": this.schoollTieUp.value.city,
                    "country": this.schoollTieUp.value.country,
                    "utm_medium": this.utm_medium,
                    "compaigntype": this.campaignType,
                    "publisherid": this.publisherId,
                    "utm_source": this.utm_source,
                  };

                } else {
                  postData = {
                    "logo": '',
                    "logoName": '',
                    "school": this.schoollTieUp.value.school,
                    "board": this.schoollTieUp.value.board,
                    "description": this.schoollTieUp.value.description,
                    "mobile": this.schoollTieUp.value.mobile,
                    "email": this.schoollTieUp.value.email,
                    "state": this.schoollTieUp.value.state,
                    // "Dist": this.schoollTieUp.value.dist,
                    "status": "active",
                    "comment": this.schoollTieUp.value.comment,
                    "createdAt": new Date(),
                    "updatedAt": new Date(),
                    "Contactperson": this.schoollTieUp.value.name,
                    "city": this.schoollTieUp.value.city,
                    "country": this.schoollTieUp.value.country,
                  };
                }

            let url1 = base_url + 'SchoolTieUps'
            this.getDataService.PostData(postData,url1).subscribe(res => {
             // this.getFileData();
              this.snakBar.open('Form submited added successfully', 'OK', {
                     duration: 3000
               });
               this.schoollTieUp.reset();
             }, error => {
               this.snakBar.open('Failed to add File', 'Retry', {
               duration: 3000
             });
            });
           }
          }
          }, error => {
            console.log("error create createDirectory",error);
             if (error.error.error.code === 'EEXIST') {
                let file = this.imageObj;
                if(file){
                let formData = new FormData();
                formData.append('file', file, file.name);
                let url2 = base_url + 'Uploads/school/upload'
                 // console.log(uploadFile);
                  this.getDataService.PostData(formData,url2).subscribe(res => {
                   console.log("uploads file responce",res);
                   let dummy: any = res;
                   // console.log("uploads file responce",dummy.data.result.files.file[0].name);
                    let postData: any = {};
                    if (this.utm_source !== null) {
                      postData = {
                        "logo": dummy.data.result.files.file[0].name,
                        "logoName": this.schoollTieUp.value.logo,
                        "school": this.schoollTieUp.value.school,
                        "board": this.schoollTieUp.value.board,
                        "description": this.schoollTieUp.value.description,
                        "mobile": this.schoollTieUp.value.mobile,
                        "email": this.schoollTieUp.value.email,
                        "state": this.schoollTieUp.value.state,
                        // "Dist": this.schoollTieUp.value.dist,
                        "status": "active",
                        "comment": this.schoollTieUp.value.comment,
                        "createdAt": new Date(),
                        "updatedAt": new Date(),
                        "Contactperson": this.schoollTieUp.value.name,
                        "city": this.schoollTieUp.value.city,
                        "country": this.schoollTieUp.value.country,
                        "utm_medium": this.utm_medium,
                        "compaigntype": this.campaignType,
                        "publisherid": this.publisherId,
                        "utm_source": this.utm_source,
                      };

                    } else {
                      postData = {
                        "logo": dummy.data.result.files.file[0].name,
                        "logoName": this.schoollTieUp.value.logo,
                        "school": this.schoollTieUp.value.school,
                        "board": this.schoollTieUp.value.board,
                        "description": this.schoollTieUp.value.description,
                        "mobile": this.schoollTieUp.value.mobile,
                        "email": this.schoollTieUp.value.email,
                        "state": this.schoollTieUp.value.state,
                        // "Dist": this.schoollTieUp.value.dist,
                        "status": "active",
                        "comment": this.schoollTieUp.value.comment,
                        "createdAt": new Date(),
                        "updatedAt": new Date(),
                        "Contactperson": this.schoollTieUp.value.name,
                        "city": this.schoollTieUp.value.city,
                        "country": this.schoollTieUp.value.country,
                      };
                    }
                  let url1 = base_url + 'SchoolTieUps'
                   this.getDataService.PostData(postData,url1).subscribe(res => {
                    // this.getFileData();
                     this.snakBar.open('Form submited added successfully', 'OK', {
                            duration: 3000
                      });
                      this.schoollTieUp.reset();
                      Object.keys(this.schoollTieUp.controls).forEach(key => {
                        this.schoollTieUp.get(key).setErrors(null);
                      })
                    }, error => {
                      this.snakBar.open('Failed to add File', 'Retry', {
                      duration: 3000
                    });
                   });
                  }, err => {
                    console.log("error to post",err);
                    this.snakBar.open('Failed to add File', 'Retry', {
                      duration: 3000
                    });
                  });
                }
                else {
                  let postData: any = {};
                    if (this.utm_source !== null) {
                      postData = {
                        "logo": '',
                        "logoName": '',
                        "school": this.schoollTieUp.value.school,
                        "board": this.schoollTieUp.value.board,
                        "description": this.schoollTieUp.value.description,
                        "mobile": this.schoollTieUp.value.mobile,
                        "email": this.schoollTieUp.value.email,
                        "state": this.schoollTieUp.value.state,
                        // "Dist": this.schoollTieUp.value.dist,
                        "status": "active",
                        "comment": this.schoollTieUp.value.comment,
                        "createdAt": new Date(),
                        "updatedAt": new Date(),
                        "Contactperson": this.schoollTieUp.value.name,
                        "city": this.schoollTieUp.value.city,
                        "country": this.schoollTieUp.value.country,
                        "utm_medium": this.utm_medium,
                        "compaigntype": this.campaignType,
                        "publisherid": this.publisherId,
                        "utm_source": this.utm_source,
                      };

                    } else {
                      postData = {
                        "logo": '',
                        "logoName":'',
                        "school": this.schoollTieUp.value.school,
                        "board": this.schoollTieUp.value.board,
                        "description": this.schoollTieUp.value.description,
                        "mobile": this.schoollTieUp.value.mobile,
                        "email": this.schoollTieUp.value.email,
                        "state": this.schoollTieUp.value.state,
                        // "Dist": this.schoollTieUp.value.dist,
                        "status": "active",
                        "comment": this.schoollTieUp.value.comment,
                        "createdAt": new Date(),
                        "updatedAt": new Date(),
                        "Contactperson": this.schoollTieUp.value.name,
                        "city": this.schoollTieUp.value.city,
                        "country": this.schoollTieUp.value.country,
                      };
                    }
                  let url1 = base_url + 'SchoolTieUps'
                   this.getDataService.PostData(postData,url1).subscribe(res => {
                    // this.getFileData();
                     this.snakBar.open('Form submited successfully', 'OK', {
                            duration: 3000
                      });
                      this.schoollTieUp.reset();
                      Object.keys(this.schoollTieUp.controls).forEach(key => {
                        this.schoollTieUp.get(key).setErrors(null);
                      })
                    }, error => {
                      this.snakBar.open('Failed to add File', 'Retry', {
                      duration: 3000
                    });
                   });
                  }
                }
        });
     } else{
      this.snakBar.open('Please Enter required fields', 'OK', {
        duration: 3000
      })
   }
  }
}
