import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import {GetDataServiceService} from '../../service/get-data-service.service';
import { base_url, apt_url } from "../../service/config";
import { Router, ActivatedRoute } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable, Subscription, timer } from 'rxjs';
import {flyInOut, expand} from '../../animation-details/animation-details.component';
import { trigger, transition, style, animate, stagger, query, useAnimation } from '@angular/animations';
import {
  slideInDown,
  slideInUp,
  slideInLeft,
  slideInRight,
  slideOutDown,
  slideOutUp,
  slideOutLeft,
  slideOutRight,
} from 'ng-animate';
const NUM_REGEX = /^[0-9]*$/;
const NAME_REGEX = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

@Component({
  selector: 'app-language-translator',
  templateUrl: './language-translator.component.html',
  styleUrls: ['./language-translator.component.scss'],
  animations: [
    trigger('slideInDown', [transition('* => *', useAnimation(slideInDown))]),
    trigger('slideInUp', [transition('* => *', useAnimation(slideInUp))]),
    trigger('slideInLeft', [transition('* => *', useAnimation(slideInLeft))]),
    trigger('slideInRight', [transition('* => *', useAnimation(slideInRight))]),
    flyInOut(),
    expand()
  ],
})
export class LanguageTranslatorComponent implements OnInit {

  public showloader: boolean = false;      
  private subscription: Subscription;
  private timer: Observable<any>;

  public slideInDown: any;
  public slideInUp: any;
  public slideInLeft: any;
  public slideInRight: any;
  public AllCoutryName: any = [];
  public LanguageForm: FormGroup;
  // urm source related variables
  public utm_source: string = '';
  public utm_medium: string = '';
  public campaignType: string = '';
  public publisherId: string = '';
  public mobileMax: number = 10;
  public allState: any = [];
  public AllLanguage: any = [];
  public flag: boolean;
  public val:any;
  public load:boolean;
  constructor(public route: ActivatedRoute,public fb: FormBuilder,public LanguageService: GetDataServiceService,
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
    this.LanguageService.getData(url).subscribe(responce => {
      //console.log("get class details data is ", responce);
      this.AllCoutryName = responce;
      // this.classDetail = dummy.data;   
     })
   }
  ngOnInit(): void {
    this.GetAllCountry();
    this.initilizeForm();
    this.GetAllState();
    this.GetLanguage();
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

  loading(){
  this.val= document.getElementById("two")
  if(this.val != null) {
      this.load = true;
      setTimeout(function(){
        document.getElementById("two").remove();
      }, 5000);
      this.load = false;
    }
}

  GetLanguage() {
    let url = apt_url + '/Languages?filter={"order":"createdAt DESC"}&access_token=' + localStorage.getItem('accessToken');
    this.LanguageService.getData(url).subscribe(responce => {
      // console.log("all language data is here ", responce);
      let temp: any = responce;
      this.AllLanguage = temp;
    }, error => {
      console.log("blogs geting error ", error);
    });
  }
  // get all state json file here 
  GetAllState() {
    this.val=false;
    let url = 'assets/jsonFile/IndiaStatesDistrict.json'
    console.log(url);
    this.LanguageService.getData(url).subscribe(responce => {
      // console.log("get state data is ", responce);
      let temp: any = responce;
      this.allState = temp.states;
      // this.classDetail = dummy.data;   
    })
    this.val=true;
  }
  // on change max length of data  
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
 // inilize form data here 
 initilizeForm(){
  this.LanguageForm = this.fb.group({
    name: new FormControl('', [Validators.required,Validators.pattern(NAME_REGEX)]),
    mobile: new FormControl('',[Validators.required,Validators.pattern(NUM_REGEX)]),
    email: new FormControl('', [Validators.required,Validators.pattern(EMAIL_REGEX)]),
    country: new FormControl('', [Validators.required]),
    state: new FormControl(''),
    city: new FormControl('', [Validators.required,Validators.pattern(NAME_REGEX)]),
    comfortLanguage: new FormControl('', [Validators.required]),
    qualification: new FormControl('',[Validators.required,Validators.pattern(NAME_REGEX)]),
    exprience: new FormControl('', [Validators.required]),
    TimeContact: new FormControl('', [Validators.required]),
  });
 }
// save data functioon start here 
SAVEDATA(){
    console.log("VideoFacultyComponent here",this.LanguageForm.value);
    let code = this.LanguageForm.value.country.dial_code;
    let state = this.LanguageForm.value.state;
    if(this.LanguageForm.valid || (code!== 91 && state== ""))
    {
    let postData: any = {};
    if (this.utm_source !== null) {
      postData = {
        "status": "active",
        "name": this.LanguageForm.value.name,
        "mobile": this.LanguageForm.value.mobile,
        "country": this.LanguageForm.value.country.name,
        "countryCode": this.LanguageForm.value.country.dial_code,
        "state": this.LanguageForm.value.state,
        "city": this.LanguageForm.value.city,
        "createdAt": new Date(),
        "username": this.LanguageForm.value.mobile,
        "email": this.LanguageForm.value.email,
        "updatedAt": new Date(),
        "workExperience": this.LanguageForm.value.exprience,
        "district": this.LanguageForm.value.city,
        "contactTime": this.LanguageForm.value.TimeContact,
        "highestQualification": this.LanguageForm.value.qualification,
        "password": "apt#123",
        "language": this.LanguageForm.value.comfortLanguage,
        "utm_medium": this.utm_medium,
        "compaigntype": this.campaignType,
        "publisherid": this.publisherId,
        "utm_source": this.utm_source,
      }

    } else {
      postData = {
        "status": "active",
        "name": this.LanguageForm.value.name,
        "mobile": this.LanguageForm.value.mobile,
        "country": this.LanguageForm.value.country.name,
        "countryCode": this.LanguageForm.value.country.dial_code,
        "state": this.LanguageForm.value.state,
        "city": this.LanguageForm.value.city,
        "createdAt": new Date(),
        "username": this.LanguageForm.value.mobile,
        "email": this.LanguageForm.value.email,
        "updatedAt": new Date(),
        "workExperience": this.LanguageForm.value.exprience,
        "district": this.LanguageForm.value.city,
        "contactTime": this.LanguageForm.value.TimeContact,
        "highestQualification": this.LanguageForm.value.qualification,
        "password": "apt#123",
        "language": this.LanguageForm.value.comfortLanguage,
      }
     }
     let url = base_url + 'Translators'
     this.LanguageService.PostData(postData,url).subscribe(res => {
       console.log("LanguageForm responce  ",res);
       this.snakBar.open('Thanks for sharing your details', 'OK', {
         duration: 3000
       });
       this.LanguageForm.reset();
       Object.keys(this.LanguageForm.controls).forEach(key => {
        this.LanguageForm.get(key).setErrors(null) ;
      })
       // this.TopicData = res;
      }, error => {
        console.log("LanguageForm error",error);
        this.snakBar.open('Failed to submited Form', 'OK', {
         duration: 3000
       }) 
     });
    }else{
     this.snakBar.open('Please Enter required fields', 'OK', {
       duration: 3000
     })  
  }
 }

}
