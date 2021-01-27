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

const NUM_REGEX = /^[0-9]*$/;
const NAME_REGEX = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

@Component({
  selector: 'app-video-faculty',
  templateUrl: './video-faculty.component.html',
  styleUrls: ['./video-faculty.component.scss'],
  animations: [
    trigger('slideInDown', [transition('* => *', useAnimation(slideInDown))]),
    trigger('slideInUp', [transition('* => *', useAnimation(slideInUp))]),
    trigger('slideInLeft', [transition('* => *', useAnimation(slideInLeft))]),
    trigger('slideInRight', [transition('* => *', useAnimation(slideInRight))]),
    flyInOut(),
    expand()
  ],
})
export class VideoFacultyComponent implements OnInit {

  public showloader: boolean = false;      
  private subscription: Subscription;
  private timer: Observable<any>;

  public slideInDown: any;
  public slideInUp: any;
  public slideInLeft: any;
  public slideInRight: any;
  public AllCoutryName: any = [];
  public VidoFacultyForm: FormGroup;
  // urm source related variables
  public utm_source: string = '';
  public utm_medium: string = '';
  public campaignType: string = '';
  public publisherId: string = '';
  public allState: any = [];
  public mobileMax: number = 10;
  public AllClass: any = [];
  public AllLanguage: any = [];
  public flag: boolean;
  public SubjectData: any;
  public courses: any;
  public classId: any;
  public subjects: any = [];
  
  constructor(public route: ActivatedRoute,public fb: FormBuilder,public VideoFacultyService: GetDataServiceService,
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
    this.VideoFacultyService.getData(url).subscribe(responce => {
      //console.log("get class details data is ", responce);
      this.AllCoutryName = responce;
      // this.classDetail = dummy.data;   
     })
   }
  // get all state json file here 
  GetAllState() {
    let url = 'assets/jsonFile/IndiaStatesDistrict.json'
    console.log(url);
    this.VideoFacultyService.getData(url).subscribe(responce => {
      console.log("get state data is ", responce);
      let temp: any = responce;
      this.allState = temp.states;
      // this.classDetail = dummy.data;   
    })
  }

  // get all classes here 
  getAllClaases() {
    let postData: any = {};
    //let url = apt_url + 'RemoteMethods/getCourses'
    // let url = apt_url + 'Classes?filter={"where":{"or":[{"deleted":false},{"purchased":{"gte":1}}]}}'
    let url = apt_url + 'Classes?filter={"where":{"or":[{"deleted":false},{"purchased":{"gte":1}}]},"include": ["onlinedata","products"]}'
    this.VideoFacultyService.getData(url).subscribe(responce => {
      //  console.log("all class data is here ", responce);
      let temp: any = responce;
      this.AllClass = temp;
      console.log(this.AllClass);
    }, error => {
      console.log("blogs geting error ", error);
    });
  }

  getAllSubject(){
    this.courses = this.VidoFacultyForm.value.Courseintrested;
    console.log(this.courses);
    let url = apt_url + 'Classes?filter={"where":{"or":[{"deleted":false},{"purchased":{"gte":1}}]},"include": ["onlinedata","products"]}'
    this.VideoFacultyService.getData(url).subscribe(responce => {
      //  console.log("all class data is here ", responce);
      let temp: any = responce;
      this.AllClass = temp;
      console.log(this.AllClass);
      var sum=0;
      this.subjects = [];
      for(let i=0;i<this.AllClass.length;i++){
        for(let j=0;j<this.courses.length;j++){
          if(this.courses[j] === this.AllClass[i].name){
            this.classId= this.AllClass[i].id;
            let url = apt_url + 'Classes/'+this.classId+'/subjects?filter={"where":{"or":[{"deleted":false},{"purchased":{"gte":1}}]},"include": "downloadContents"}';
              this.VideoFacultyService.getData(url).subscribe(responce => {
                console.log("get subject data is ", responce);
                // let dummy: any = [];
                // dummy = responce;
                this.SubjectData = responce;
                sum = sum + this.SubjectData.length-1;
                for(let a=0;a<this.SubjectData.length;a++){
                  if(this.courses.length > 0 && j>0)
                  this.subjects[a+ sum] = this.SubjectData[a].name;
                  else
                  this.subjects[a]=this.SubjectData[a].name;
                }
                console.log(this.subjects);
              }, err => {
                console.log("get Downlods subjects error",err);
              });
          }
        }
      }

    }, error => {
      console.log("blogs geting error ", error);
    });     

    } 


  GetLanguage() {
    let url = apt_url + '/Languages?filter={"order":"createdAt DESC"}&access_token=' + localStorage.getItem('accessToken');
    this.VideoFacultyService.getData(url).subscribe(responce => {
      // console.log("all language data is here ", responce);
      let temp: any = responce;
      this.AllLanguage = temp;
    }, error => {
      console.log("blogs geting error ", error);
    });
  }
  ngOnInit(): void {
    this.GetAllCountry();
    this.GetAllState();
    this.initilizeForm();
    this.getAllClaases();
    this.GetLanguage();
    this.setTimer();
    this.getAllSubject();
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
  // on change max length of data  
  onChange(event) {
    console.log(event.dial_code)
    if (event.dial_code == 91) {
      this.mobileMax = 10;
      this.flag=true;
    } else {
      this.mobileMax = 15;
      this.flag = false;
    }
  }
 // inilize form data here 
 initilizeForm(){
  this.VidoFacultyForm = this.fb.group({
    name: new FormControl('', [Validators.required,Validators.pattern(NAME_REGEX)]),
    mobile: new FormControl('',[Validators.required,Validators.pattern(NUM_REGEX)]),
    email: new FormControl('', [Validators.required,Validators.pattern(EMAIL_REGEX)]),
    country: new FormControl('', [Validators.required]),
    state: new FormControl(''),
    city: new FormControl('', [Validators.required,Validators.pattern(NAME_REGEX)]),
    Courseintrested: new FormControl('', [Validators.required]),
    Subjectinterested: new FormControl('', [Validators.required]),
    medium: new FormControl('', [Validators.required]),
    occupation: new FormControl('', [Validators.required,Validators.pattern(NAME_REGEX)]),
    qualification: new FormControl('',[Validators.required,Validators.pattern(NAME_REGEX)]),
    exprience: new FormControl('', [Validators.required]),
    TimeContact: new FormControl('', [Validators.required]),
  });
 }
// save data functioon start here 
SAVEDATA(){
    console.log("VideoFacultyComponent here",this.VidoFacultyForm.value);
    let code = this.VidoFacultyForm.value.country.dial_code;
    let state = this.VidoFacultyForm.value.state;
    console.log(code);
    if(this.VidoFacultyForm.valid || (code!== "91" && state== ""))
      {
      let postData: any = {};
      if (this.utm_source !== null) {
        postData = {
          "status": "active",
          "name": this.VidoFacultyForm.value.name,
          "mobile": this.VidoFacultyForm.value.mobile,
          "country": this.VidoFacultyForm.value.country.name,
          "countryCode": this.VidoFacultyForm.value.country.dial_code,
          "email": this.VidoFacultyForm.value.email,
          "state": this.VidoFacultyForm.value.state,
          "city": this.VidoFacultyForm.value.city,
          "CourseIntrested": this.VidoFacultyForm.value.Courseintrested,
          "SubjectInterested": this.VidoFacultyForm.value.Subjectinterested,
          "teachingMedium": this.VidoFacultyForm.value.medium,
          "jobTitile": this.VidoFacultyForm.value.occupation,
          "workExperience": this.VidoFacultyForm.value.exprience,
          "contactTime": this.VidoFacultyForm.value.TimeContact,
          "highestQualification": this.VidoFacultyForm.value.qualification,
          "district": this.VidoFacultyForm.value.city,
          "createdAt": new Date(),
          "username": this.VidoFacultyForm.value.mobile,
          "updatedAt": new Date(),
          "password": "apt#123",
          "utm_medium": this.utm_medium,
          "compaigntype": this.campaignType,
          "publisherid": this.publisherId,
          "utm_source": this.utm_source,
        }

      } else {
        postData = {
          "status": "active",
          "name": this.VidoFacultyForm.value.name,
          "mobile": this.VidoFacultyForm.value.mobile,
          "country": this.VidoFacultyForm.value.country.name,
          "countryCode": this.VidoFacultyForm.value.country.dial_code,
          "email": this.VidoFacultyForm.value.email,
          "state": this.VidoFacultyForm.value.state,
          "city": this.VidoFacultyForm.value.city,
          "CourseIntrested": this.VidoFacultyForm.value.Courseintrested,
          "SubjectInterested": this.VidoFacultyForm.value.Subjectinterested,
          "teachingMedium": this.VidoFacultyForm.value.medium,
          "jobTitile": this.VidoFacultyForm.value.occupation,
          "workExperience": this.VidoFacultyForm.value.exprience,
          "contactTime": this.VidoFacultyForm.value.TimeContact,
          "highestQualification": this.VidoFacultyForm.value.qualification,
          "district": this.VidoFacultyForm.value.city,
          "createdAt": new Date(),
          "username": this.VidoFacultyForm.value.mobile,
          "updatedAt": new Date(),
          "password": "apt#123"
        }
      }

     let url = base_url + 'VideoFaculties'
     this.VideoFacultyService.PostData(postData,url).subscribe(res => {
       console.log("VideoFacultyService responce  ",res);
       this.snakBar.open('Thanks for sharing your details', 'OK', {
         duration: 3000
       });
       this.VidoFacultyForm.reset();
       Object.keys(this.VidoFacultyForm.controls).forEach(key => {
        this.VidoFacultyForm.get(key).setErrors(null) ;
      })
       // this.TopicData = res;
      }, error => {
        console.log("VideoFacultyService error",error);
        this.snakBar.open('Failed to submit Form', 'OK', {
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
