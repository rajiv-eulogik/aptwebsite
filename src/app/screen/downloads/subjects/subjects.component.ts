import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ActivationEnd } from "@angular/router";
import {GetDataServiceService} from '../../../service/get-data-service.service';
import { base_url, apt_url } from "../../../service/config";
import { MatSnackBar } from "@angular/material/snack-bar";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DownloadsAppComponent } from '../../../dialog/downloads-app/downloads-app.component';
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
import { Observable, Subscription, timer } from 'rxjs';
import {flyInOut, expand} from '../../../animation-details/animation-details.component';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss'],
  animations: [
    expand(),
    flyInOut(),
    trigger('slideInDown', [transition('* => *', useAnimation(slideInDown))]),
    trigger('slideInUp', [transition('* => *', useAnimation(slideInUp))]),
    trigger('slideInLeft', [transition('* => *', useAnimation(slideInLeft))]),
    trigger('slideInRight', [transition('* => *', useAnimation(slideInRight))])
  ],
})
export class SubjectsComponent implements OnInit {

  public showloader: boolean = false;      
  private subscription: Subscription;
  private timer: Observable<any>;

  public loading1: boolean = true;
  public loading2: boolean = true;
  public loading3: boolean = true;

  public ImageUrl: string = apt_url + 'uploads/Class/download/';
  public slideInDown: any;
  public slideInUp: any;
  public slideInLeft: any;
  public slideInRight: any;
  public classId: string = '';
  public className: string = '';
  public SubjectData: any = [];
  public subjectObejact: any ;
  public classData: any = [];
  public classObejct: any ;
  public SeniorBullet: any = [{
    name: "Math",
    discreption: "Lorem ipsum, or lipsum as it is sometimes known."
    },
    {
     name: "Biology",
     discreption: "graphic or web The purpose of lorem ipsum is to create."
     },
    {
      name: "Commerce",
      discreption: "focus is meant to be on design, not content."
    },{
      name: "Arts",
      discreption: "The passage experienced"
    }];
  // urm source related variables
  public utm_source: string = '';
  public utm_medium: string = '';
  public campaignType: string = '';
  public publisherId: string = '';

  constructor(public getSubjectService: GetDataServiceService,public router: Router,
    public snakBar: MatSnackBar,public route: ActivatedRoute,public dialog: MatDialog) {
      this.className = this.route.snapshot.queryParamMap.get('name');
      this.classId = this.route.snapshot.queryParamMap.get('id');
      console.log("class name & id is here ",this.classId,this.className);
      this.utm_source = this.route.snapshot.queryParamMap.get('utm_source');
      //console.log("this is utm confrence heger", this.utm_source);
      if (this.utm_source !== null) {
        //console.log("get more paramettre here ***********************");
        this.utm_medium = this.route.snapshot.queryParamMap.get('utm_medium');
        this.campaignType = this.route.snapshot.queryParamMap.get('campaigntype');
        this.publisherId = this.route.snapshot.queryParamMap.get('publisherid');
        // console.log("get more paramettre here ***********************", this.utm_medium, this.campaignType, this.publisherId);
      } else {
        // console.log("Do nothigs");
      }
     }

  ngOnInit(): void { 
    this.getAllSubject();
    this.getClassData();
    this.getClassDetail();
    window.scrollTo(10, 0)
    this.setTimer();
    this.getWidth()
  }

  mobileDevice: boolean = false
	getWidth(event?) {
		this.mobileDevice = event ? event.target.innerWidth <= 600 ? true : false : window.innerWidth <= 600 ? true : false
  }
  
  images: any = ['Girl_1', 'Boy_1', 'Girl_3', 'Boy_2', 'Girl_5', 'Girl_2', 'Girl_7', 'Girl_4']


  public ngOnDestroy() {
    if ( this.subscription && this.subscription instanceof Subscription) {
      this.subscription.unsubscribe();
    }
  }

  public setTimer(){

    // set showloader to true to show loading div on view
    this.showloader   = true;

    this.timer        = timer(3000); // 5000 millisecond means 5 seconds
    this.subscription = this.timer.subscribe(() => {
        // set showloader to false to hide loading div from view after 5 seconds
        this.showloader = false;
    });
  }
// get all subject data 
 getAllSubject(){
   let url = apt_url + 'Classes/'+this.classId+'/subjects?filter={"where":{"or":[{"deleted":false},{"purchased":{"gte":1}}]},"include": "downloadContents"}';
   this.getSubjectService.getData(url).subscribe(responce => {
     console.log("get subject data is ", responce);
     // let dummy: any = [];
     // dummy = responce;
     this.SubjectData = responce;
     if(this.SubjectData.length > this.images.length) {
       for (let i = (this.images.length-1); i < this.SubjectData.length; i++) {
         this.images.push(this.images[this.images.length - i])
       }
     }
     console.log(this.SubjectData[0].downloadContents)
     this.loading1 = false;
   }, err => {
     console.log("get Downlods subjects error",err);
   });
 }
//get class data by class id
 getClassDetail(){
  let url = apt_url + 'Classes/'+this.classId+'?filter={"include": "downloadContents"}'
  this.getSubjectService.getData(url).subscribe(responce => {
    console.log("get class details data is ", responce);
    this.classObejct = responce;
    this.className = this.classObejct.name;
    console.log(this.className);
    this.loading2 = false;
    // this.classDetail = dummy.data;   
   }, err => {
     console.log("get Downlods subjects error ",err);
   });
 }
// get all class data 
 getClassData(){
  let url = apt_url + 'Classes?filter={"where":{"or":[{"deleted":false},{"purchased":{"gte":1}}]}}&access_token=z2SOHSzXqKNmD597iPJokOG2Pud8CyCqFUEl8iW2L3LrWD1kbA5ljZRjwhn8Ii8Z';
   this.getSubjectService.getData(url).subscribe(responce => {
     console.log("get class details data is ", responce);
     this.classData = responce;
     console.log(this.classData)
     this.loading3 = false;
     // this.classDetail = dummy.data;   
    }, err => {
      console.log("get Downlods subjects error ",err);
    });
 }
 // navigate next screen here 
 SubmitData()
 {
   console.log("do after design",this.subjectObejact);
   if(this.subjectObejact && this.subjectObejact !== null){
    //console.log("navigate next screen ",this.subjectObejct);
     this.router.navigate(['/downloads/Topics'], { queryParams: { id: this.subjectObejact.id,name: this.subjectObejact.name } })
    
  }else{
    console.log("show toast message for error");
    this.snakBar.open('Please Select Subject first', '', { duration: 3000, });
  }
 }

 changeClient(event)
 {
  console.log("event is here ",event);
  this.getClassDetail();
  this.getAllSubject();
 }

  // i am here start working this 
  DownloadsApp(){
    console.log("do nothings");
    const dialogRef = this.dialog.open(DownloadsAppComponent, {
     width: '500px',
     disableClose: true,
     data:  {screen: "home", action: "download App",heading: "User Information"},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);
      if(result !== undefined){
        console.log("post data");
        let url = base_url + 'CampaignUsers';
        let postData: any = {};
        if (this.utm_source !== null) {
          postData = {
            name: result.name,
            mobile: result.mobile,
            password: 'apt#123',
            createdAt: new Date(),
            "utm_medium": this.utm_medium,
            "compaigntype": this.campaignType,
            "publisherid": this.publisherId,
            "utm_source": this.utm_source,
          }

        } else {
          postData = {
            name: result.name,
            mobile: result.mobile,
            password: 'apt#123',
            createdAt: new Date()
          }
        }
        this.getSubjectService.PostData(postData,url).subscribe(responce =>{
          console.log("all class data is here ",responce);
          // let temp: any = responce;
          this.snakBar.open('Thanks for sharing your information with us', 'OK', {
            duration: 3000
          })
         },error =>{
          console.log("app downlods  geting error ",error);
        });
      }
    });
 }

 OpenDailog(data){
    //console.log("do nothigs ");

   if (this.utm_source !== null) {
    // { queryParams: { id: menu.id, name: menu.name, utm_source: this.utm_source, utm_medium: this.utm_medium, campaigntype: this.campaignType, publisherid: this.publisherId } }
    this.router.navigate([]).then(result => { console.log(result);  window.open('/downloads/Topics?id=' + data.id + '&name=' + data.name,  '_blank'); })
  } else {
    this.router.navigate([]).then(result => { console.log(result);  window.open('/downloads/Topics?id=' + data.id + '&name=' + data.name,  '_blank'); })
  }

    // this.router.navigate(['/downloads/Topics'], { queryParams: { id: data.id,name: data.name } })
 }
}
