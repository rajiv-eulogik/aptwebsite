import { Component, OnInit, HostBinding } from '@angular/core';
import { trigger, transition, style, animate, stagger, query, useAnimation } from '@angular/animations';
import { PAGE_IN_ANIMATION, PAGE_OUT_ANIMATION } from '../../shared_route_animations';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import {GetDataServiceService} from '../../service/get-data-service.service';
import { base_url, apt_url } from "../../service/config";
import { Router, ActivatedRoute } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable, Subscription, timer } from 'rxjs';
import {flyInOut, expand} from '../../animation-details/animation-details.component';

const NUM_REGEX = /^[1-9][0-9]{5,19}$/;
const NAME_REGEX = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const QUERY_REGEX = /^[a-zA-Z,'-'' '\.0-9\n]+$/;
const CODE_REGEX = /^(\+?\d{1,3}|\d{1,5})$/;

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
  animations: [
    trigger('pageAnimations', [
      transition(':enter', useAnimation(PAGE_IN_ANIMATION)),
      transition(':leave', useAnimation(PAGE_OUT_ANIMATION)),
    ]),
    flyInOut(),
    expand()
  ]
})
export class ContactUsComponent implements OnInit {
  @HostBinding('@pageAnimations')
  public animatePage = true;
  public ContectUs: FormGroup; 

  public showloader: boolean = false;      
  private subscription: Subscription;
  private timer: Observable<any>;

  public loading1: boolean = true;
  public loading2: boolean = true;
  public loading3: boolean = true;
  public bool: boolean;
  public selectedCountry: any = {name: "India", dial_code: 91, code: "IN"}
  
  // urm source related variables
  public utm_source: string = '';
  public utm_medium: string = '';
  public campaignType: string = '';
  public publisherId: string = '';
  public serverName: any;
  public val: boolean = true;
  public mobileMax: any;
  public flag: boolean;
  public AllCoutryName: any;
  public change: boolean;
  public defaultSelect = "default";

  constructor(public route: ActivatedRoute,public fb: FormBuilder,public ContactusService: GetDataServiceService,
    public router: Router,public snakBar: MatSnackBar) {
      this.utm_source = this.route.snapshot.queryParamMap.get('utm_source');
      if (this.utm_source !== null) {
        this.utm_medium = this.route.snapshot.queryParamMap.get('utm_medium');
        this.campaignType = this.route.snapshot.queryParamMap.get('campaigntype');
        this.publisherId = this.route.snapshot.queryParamMap.get('publisherid');
      } else { } 
     }

  ngOnInit(): void {
    this.getWidth();
    this.initilizeForm();
    this.setTimer();
    this.code(this.serverName);
    this.GetAllCountry();
    // this.countryval();
    let defaultval = '+91';
  }

  public ngOnDestroy() {
    if ( this.subscription && this.subscription instanceof Subscription) {
      this.subscription.unsubscribe();
    }
  }

  public setTimer(){

    // set showloader to true to show loading div on view
    this.showloader   = true;

    this.timer        = timer(1500); // 5000 millisecond means 5 seconds
    this.subscription = this.timer.subscribe(() => {
        // set showloader to false to hide loading div from view after 5 seconds
        this.showloader = false;
    });
  }

 initilizeForm(){
  this.ContectUs = this.fb.group({
    name: new FormControl('', [Validators.required,Validators.pattern(NAME_REGEX)]),
    email: new FormControl('', [Validators.pattern(EMAIL_REGEX)]),
    mobile: new FormControl('',[Validators.required,Validators.pattern(NUM_REGEX)]),
    query: new FormControl('', [Validators.required,Validators.pattern(QUERY_REGEX)]),
    country: new FormControl('', [Validators.required]),
    //countrycode: new FormControl('', [Validators.required,Validators.pattern(CODE_REGEX)])
  });
  this.ContectUs.value.country = {name: "India", dial_code: 91, code: "IN"}
  console.log(this.ContectUs.value)
  this.change = true;
  // this.ContectUs.value.country.dial_code = 91
  // this.ContectUs.value.country.code = "IN"
 }

//  countryval(){
//    if(this.ContectUs.value.countrycode == '+91' || this.ContectUs.value.countrycode == '91')
//     this.bool = true;
//  }

 code(value){
  this.serverName = value;
  console.log(this.serverName);
  if(this.serverName == '+91' || this.serverName == '91')
    this.bool = true;
 else
  this.bool = false;
}

onChange(event) {
  this.change = false;
  console.log(event.dial_code)
  if (event.dial_code == 91) {
    this.mobileMax = 10;
    this.flag = true;
  } else {
    this.mobileMax = 15;
    this.flag = false;
  }
}

GetAllCountry() {
  let url = 'assets/jsonFile/allCountryCodes.json'
  console.log(url);
  this.ContactusService.getData(url).subscribe(responce => {
    // console.log("get class details data is ", responce);
    this.AllCoutryName = responce;
    // this.classDetail = dummy.data;   
  })
}
 //submit form data 
 submit(){
   console.log("do nothings ");
   console.log("input value for form is ",this.ContectUs.value);
   if(this.ContectUs.valid)
   {

     let postData: any = {};
     if (this.utm_source !== null) {
       postData = {
         "name": this.ContectUs.value.name,
         "mobile": this.ContectUs.value.mobile,
         "query": this.ContectUs.value.query,
        // "countrycode": this.ContectUs.value.countrycode,
        "email":this.ContectUs.value.email,
        "country": this.ContectUs.value.country.name,
					"countryCode": this.ContectUs.value.country.dial_code,
         "status": false,
         "createdAt": new Date(),
         "utm_medium": this.utm_medium,
         "compaigntype": this.campaignType,
         "publisherid": this.publisherId,
         "utm_source": this.utm_source,
       }

     } else {
       postData = {
         "name": this.ContectUs.value.name,
         "mobile": this.ContectUs.value.mobile,
         "query": this.ContectUs.value.query,
         //"countrycode": this.ContectUs.value.countrycode,
         "email":this.ContectUs.value.email,
         "country": this.ContectUs.value.country.name,
					"countryCode": this.ContectUs.value.country.dial_code,
         "status": false,
         "createdAt": new Date(),
       }
     }
    let url = base_url + 'ContactUs'
    this.ContactusService.PostData(postData,url).subscribe(res => {
      console.log("Query updated ",res);
      this.snakBar.open('Contact details sent successfully !', 'OK', {
        duration: 3000
      })
      this.ContectUs.reset();
      this.ContectUs.value.country = {name: "India", dial_code: 91, code: "IN"}
      this.val = false
      Object.keys(this.ContectUs.controls).forEach(key => {
        this.ContectUs.get(key).setErrors(null) ;
      })
      // this.TopicData = res;
     }, error => {
       console.log("Contact details updated error",error);
       this.snakBar.open('Failed to send Query', 'OK', {
        duration: 3000
      })
    });
   }else{
    this.snakBar.open('Please enter required fields', 'OK', {
      duration: 3000
    })
   }
 }


 mobileDevice: boolean = false
	getWidth(event?) {
		// FUNCTION GETS THE WIDTH OF THE SCREEN
			this.mobileDevice = event ? event.target.innerWidth <= 600 ? true : false : window.innerWidth <= 600 ? true : false 
	
	}
}
