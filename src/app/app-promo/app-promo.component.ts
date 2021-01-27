import { Component, OnInit } from '@angular/core';
import {GetDataServiceService} from '../service/get-data-service.service';
import { base_url, apt_url } from "../service/config";
import { ActivatedRoute, Router, ActivationEnd } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DownloadsAppComponent } from '../dialog/downloads-app/downloads-app.component';
import {flyInOut, expand} from '../animation-details/animation-details.component';
import { Observable, Subscription, timer } from 'rxjs';
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

@Component({
  selector: 'app-app-promo',
  templateUrl: './app-promo.component.html',
  styleUrls: ['./app-promo.component.scss'],
  animations: [
    flyInOut(),
    expand(),
    trigger('slideInDown', [transition('* => *', useAnimation(slideInDown))]),
    trigger('slideInUp', [transition('* => *', useAnimation(slideInUp))]),
    trigger('slideInLeft', [transition('* => *', useAnimation(slideInLeft))]),
    trigger('slideInRight', [transition('* => *', useAnimation(slideInRight))])
  ]
})
export class AppPromoComponent implements OnInit {

  public slideInDown: any;
  public slideInUp: any;
  public slideInLeft: any;
  public slideInRight: any;

  public loading: boolean = true;

  public showloader: boolean = false;      
  private subscription: Subscription;
  private timer: Observable<any>;

  public utm_source: string = '';
  public utm_medium: string = '';
  public campaignType: string = '';
  public publisherId: string = '';
  public val: any;

  constructor(public route: ActivatedRoute,public getClassService: GetDataServiceService,public router: Router,
    public snakBar: MatSnackBar,public dialog: MatDialog) {
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
    var URL = "http://192.241.203.148:3010/api/Settings?filter={%22where%22:{%20%22type%22:%20%22appDownload%22}}";
    this.makeAjaxCall(URL, "GET");
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

    this.timer        = timer(1500); // 5000 millisecond means 5 seconds
    this.subscription = this.timer.subscribe(() => {
        // set showloader to false to hide loading div from view after 5 seconds
        this.showloader = false;
    });
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
            countrycode: result.countrycode,
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
            countrycode: result.countrycode,
            password: 'apt#123',
            createdAt: new Date()
          }
        }
        this.getClassService.PostData(postData,url).subscribe(responce =>{
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

 makeAjaxCall(url, methodType): void{
  var baseUrl = "http://192.241.203.148:3010";
  var xhr = new XMLHttpRequest();
  xhr.open(methodType, url, true);
  xhr.send();
  this.loading = false;
  xhr.onreadystatechange = function(){
    if (xhr.readyState === 4){
        if (xhr.status === 200){
          console.log("xhr done successfully");
          var resp = xhr.responseText;
          var respJson = JSON.parse(resp);
          console.log( respJson.data[0]);
          var data = respJson.data[0];
          var image = ["imageDescription", "imageTitle"];
          var video = [ "videoDescription", "videoTitle"];
          for(let i=0;i<image.length;i++){
            document.getElementById(image[i]).innerHTML = data[image[i]];
          }
          for(let i=0;i<video.length;i++){
            document.getElementById(video[i]).innerHTML = data[video[i]];
          }
          document.getElementById("image").setAttribute("src", baseUrl + "/api/uploads/appdownload/download/"+ data["image"] );
          document.getElementById("video").setAttribute("src", baseUrl + "/api/uploads/appdownload/download/"+ data["video"] );
        }
      }
    }
  }

  

}
