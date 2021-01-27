import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ActivationEnd } from "@angular/router";
import {GetDataServiceService} from '../../../service/get-data-service.service';
import { base_url, apt_url } from "../../../service/config";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DownloadsAppComponent } from '../../../dialog/downloads-app/downloads-app.component';
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable, Subscription, timer } from 'rxjs';
import {flyInOut, expand} from '../../../animation-details/animation-details.component';
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

@Component({
  selector: 'app-all-course',
  templateUrl: './all-course.component.html',
  styleUrls: ['./all-course.component.scss'],
  animations: [
    flyInOut(),
    expand(),
    trigger('slideInDown', [transition('* => *', useAnimation(slideInDown))]),
    trigger('slideInUp', [transition('* => *', useAnimation(slideInUp))]),
    trigger('slideInLeft', [transition('* => *', useAnimation(slideInLeft))]),
    trigger('slideInRight', [transition('* => *', useAnimation(slideInRight))])
  ],
})
export class AllCourseComponent implements OnInit {

  public showloader: boolean = false;      
  private subscription: Subscription;
  private timer: Observable<any>;

  public loading: boolean = true;
  public flag: boolean;
  public title: any = [];

  public slideInDown: any;
  public slideInUp: any;
  public slideInLeft: any;
  public slideInRight: any;
  public ImageUrl: string = apt_url + 'uploads/Class/download/';
  public cols: number = 4;
  public AllClass:any = [];
  // urm source related variables
  public utm_source: string = '';
  public utm_medium: string = '';
  public campaignType: string = '';
  public publisherId: string = '';
  public classData: any;
  public aboutData: any;

  constructor(public route: ActivatedRoute,public router: Router,public getDataService: GetDataServiceService, public dialog: MatDialog, public snakBar: MatSnackBar,) {
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
    this.getWidth();
    this.getAllClaases();
    window.scrollTo(10, 0)
    this.setTimer();
    this.getClassCategoriesData();
    this.commonfunc();
    this.getAbouDesc();
  }

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

  getWidth() {
    if (window.innerWidth < 600)
      this.cols = 2;
    else if (window.innerWidth >= 600 && window.innerWidth < 900)
      this.cols = 2
    else if (window.innerWidth >= 900 && window.innerWidth < 1200)
      this.cols = 4;
    else
      this.cols = 4;
  }

  navigate(data){
    if (this.utm_source !== null) {
      // { queryParams: { id: data.id, name: data.name, utm_source: this.utm_source, utm_medium: this.utm_medium, campaigntype: this.campaignType, publisherid: this.publisherId } }
      this.router.navigate([]).then(result => { console.log(result);  window.open('/course/course-details?id=' + data.id + '&name=' + data.name,  '_blank'); })
    } else {
      this.router.navigate([]).then(result => {console.log(result);  window.open('/course/course-details?id=' + data.id + '&name=' + data.name, '_blank'); });
    }
    
  }
  // get all classes here 
  getAllClaases(){
    let postData: any = {};
    //let url = apt_url + 'RemoteMethods/getCourses'
    // let url = apt_url + 'Classes?filter={"where":{"or":[{"deleted":false},{"purchased":{"gte":1}}]}}'
    let url = apt_url + 'Classes?filter={"where":{"or":[{"deleted":false},{"purchased":{"gte":1}}]},"include": ["onlinedata","products"]}'
    this.getDataService.getData(url).subscribe(responce => {
      console.log("all class data is here ",responce);
      let temp: any = responce;
      this.AllClass = temp;
      console.log(this.AllClass)
      this.loading = false;
     },error =>{
      console.log("blogs geting error ",error);
    });
  }

  public getClassCategoriesData() {
		let url = apt_url + 'ClassCategories';
		this.getDataService.getData(url).subscribe(responce => {
			console.log("get class categories data is ", responce);
			this.classData = responce;
			console.log(this.classData);
		})
  }

  public getAbouDesc() {
    let url = apt_url + 'Settings?filter={"where":%20{"type":"aboutCourse"}}';
		this.getDataService.getData(url).subscribe(responce => {
			console.log("get about data ", responce);
			this.aboutData = responce;
			console.log(this.aboutData);
		})
  }
  
  public commonfunc() {
    let url = apt_url + 'ClassCategories';    
    let url1 = apt_url + 'Classes?filter={"where":{"or":[{"deleted":false},{"purchased":{"gte":1}}]},"include": ["onlinedata","products"]}'
    this.getDataService.getData(url1).subscribe(responce => {
      console.log("all class data is here ", responce);
      var temp: any = responce;
      this.AllClass = temp;
      console.log(this.AllClass);
      this.getDataService.getData(url).subscribe(responce => {
        console.log("get class categories data is ", responce);
        this.classData = responce;
        var val = this.classData;
      for(let i =0;i<this.classData.length; i++){
        for(let j=0;j<this.AllClass.length;j++){
          if(this.AllClass[j].products.length > 0 && this.AllClass[j].status == 'published' && this.classData[i].id === this.AllClass[j].classcatId){
            this.flag = true;
            console.log(this.flag)
            this.title[i] = this.classData[i].title;
            console.log(this.title[i])
          }
        }
      }

      function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
      }
      
      // usage example:
      console.log(this.title)
      // var unique = a.filter(onlyUnique);
    })
    }, error => {
      console.log("blogs geting error ", error);
    });
  //  while(this.loading3){
  //    console.log("still loading")
  //  } 

  }


  DownloadsApp(){
    console.log("do nothings");
    const dialogRef = this.dialog.open(DownloadsAppComponent, {
      width: '500px',
     disableClose: true,
    data:  {screen: "home", action: "download App",heading: "Your Information"},
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

        this.getDataService.PostData(postData,url).subscribe(responce =>{
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
}
