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
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss'],
  animations: [
    expand(),
    flyInOut(),
    trigger('slideInDown', [transition('* => *', useAnimation(slideInDown))]),
    trigger('slideInUp', [transition('* => *', useAnimation(slideInUp))]),
    trigger('slideInLeft', [transition('* => *', useAnimation(slideInLeft))]),
    trigger('slideInRight', [transition('* => *', useAnimation(slideInRight))])
  ],
})
export class TopicsComponent implements OnInit {

  public showloader: boolean = false;      
  private subscription: Subscription;
  private timer: Observable<any>;

  public loading1: boolean = true;
  public loading2: boolean = true;

  public TopicData: any = [];
  public slideInDown: any;
  public slideInUp: any;
  public slideInLeft: any;
  public slideInRight: any;
  public subjectId: string = '';
  public SubjectName: string = '';
  public topics: any = [];
  public topicsId: string = '';
  // urm source related variables
  public utm_source: string = '';
  public utm_medium: string = '';
  public campaignType: string = '';
  public publisherId: string = '';

  constructor(public getTopicService: GetDataServiceService,public router: Router,
    public snakBar: MatSnackBar,public route: ActivatedRoute,public dialog: MatDialog) { 
      this.SubjectName = this.route.snapshot.queryParamMap.get('name');
      this.subjectId = this.route.snapshot.queryParamMap.get('id');
      console.log("subject name & id is here ",this.subjectId,this.SubjectName);
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
    this.getTopic();
    window.scrollTo(10, 0)
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

    this.timer        = timer(3000); // 5000 millisecond means 5 seconds
    this.subscription = this.timer.subscribe(() => {
        // set showloader to false to hide loading div from view after 5 seconds
        this.showloader = false;
    });
  }

 // get Topic data 
  getTopic(){
    let url = apt_url + 'Subjects/'+this.subjectId+'/subjectTopics?filter={"where":{"or":[{"deleted":false},{"purchased":{"gte":1}}]}}&access_token=z2SOHSzXqKNmD597iPJokOG2Pud8CyCqFUEl8iW2L3LrWD1kbA5ljZRjwhn8Ii8Z'; 
    this.getTopicService.getData(url).subscribe(responce => {
      console.log("get topic data is ", responce);
      // let dummy: any = [];
      // dummy = responce;
      this.topics = responce;
      console.log( this.topics);

      for(let i =0;i<this.topics.length;i++){

        let url1 = apt_url + 'Downloads?filter={"where": { "topicId": "'+this.topics[i].id+'"}}&access_token=' +localStorage.getItem('aptAccessToken');
        this.getTopicService.getData(url1).subscribe(res => {
        console.log(" hi uplods here ",res);
         console.log("val is " , res)
         this.TopicData[i] = res;
         console.log("topic data is " , this.TopicData)
        }, error => {
        console.log("get file data error",error);
        });

      }
      this.loading1 = false;
    }, err => {
      console.log("get topic error ",err);
    });
  }
  // 
  showInfo(data){
    localStorage.setItem('!topic', JSON.stringify(data))
    // this.router.navigate(['/downloads/Topic-detail'], { queryParams: { id: data.id,name: data.name } }) let url = this.router.createUrlTree(['/page', id])
    //window.open(url.toString(), '_blank')
    // if (this.utm_source !== null) {
    //   this.router.navigate(['/downloads/Topic-detail'], { queryParams: { id: data.id, name: data.name, utm_source: this.utm_source, utm_medium: this.utm_medium, campaigntype: this.campaignType, publisherid: this.publisherId } })
    // } else {
    //   this.router.navigate(['/downloads/Topic-detail'], { queryParams: { id: data.id, name: data.name } })
    // }

    if (this.utm_source !== null) {
      // { queryParams: { id: menu.id, name: menu.name, utm_source: this.utm_source, utm_medium: this.utm_medium, campaigntype: this.campaignType, publisherid: this.publisherId } }
      this.router.navigate([]).then(result => { console.log(result);  window.open('/downloads/Topic-detail?id=' + data.id + '&name=' + data.name,  '_blank'); })
    } else {
      this.router.navigate([]).then(result => { console.log(result);  window.open('/downloads/Topic-detail?id=' + data.id + '&name=' + data.name,  '_blank'); })
    }
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
          this.getTopicService.PostData(postData,url).subscribe(responce =>{
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
