import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ActivationEnd } from "@angular/router";
import { GetDataServiceService } from '../../../service/get-data-service.service';
import { base_url, apt_url } from "../../../service/config";

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.scss']
})
export class PaymentSuccessComponent implements OnInit {
  public classId: string = '';
  public utm_source: string = '';
  public utm_medium: string = '';
  public campaignType: string = '';
  public publisherId: string = '';
  public imageUrl: string = apt_url + 'uploads/Class/download/';
  public img: any;
  public SeniorBullet: any = ["Lorem ipsum, or lipsum as it is sometimes known."," graphic or web designs.","The purpose of lorem ipsum is to create.","focus is meant to be on design, not content.","The passage experienced"];
  constructor(public getTopicService: GetDataServiceService, public router: Router,
     public route: ActivatedRoute,) { 
       this.classId = this.route.snapshot.queryParamMap.get('classId');
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
    this.getClassData();
    this.getClassData1();
  }

  showRating(rating) {
    // THE METHOD DISPLAYS RATING OF THE PARTICULAR COURSE
    var arr: any = [];
    for (let i = 5; i > 0; i--) {
      if (Number.isInteger(rating)) {
        if (i <= rating) {
          arr.push('star')
        }
        else {
          arr.push('star_outline')
        }
      }
      else {
        var diff = i - rating;
        if (diff >= 1)
          arr.push('star_outline')
        else if (diff < 1 && diff > 0)
          arr.push('star_half')
        else
          arr.push('star')

      }
      if (i === 1) {
        return arr.reverse(); //returns array
      }
    }
  }

  getClassData(){
      let url = apt_url + 'OnlineClassdata?filter={"where": {"classId": "' + this.classId + '"}}&access_token=' + localStorage.getItem('aptAccessToken');
      this.getTopicService.getData(url).subscribe(responce => {
        console.log("product data is **** ", responce);
        let temp: any = responce[0];
        // if (temp.features !== undefined) {
        //   this.features = temp.features;
        // }

        // if (temp.productContent !== undefined) {
        //   this.contentTitle = temp.productContent.title;
        //   this.contentDescription = temp.productContent.description;
        //   this.rawImage = apt_url + 'Uploads/products/download/' + temp.productContent.image
        // }

        // if (temp.CourseVideoContent !== undefined) {
        //   this.courseVideoURL = temp.CourseVideoContent.url;
        //   this.courseVideoTitle = temp.CourseVideoContent.title;
        //   this.courseVideoDesc = temp.CourseVideoContent.description;
        // }

        // if (temp.toppers !== undefined) {
        //   this.timerData = temp.toppers;
        //   this.SettimeInterval();
        // }

      }, err => {
        console.log("get about course content error ", err);
      });
    }

    getClassData1() {
      let url = apt_url + 'Classes?filter={"where": {"id": "' + this.classId + '"}}';
      this.getTopicService.getData(url).subscribe(response => {
        let temp: any = response[0];
        this.img = temp.image;
        console.log(this.img)
      }, err => {
        console.log("get about course content error ", err);
      });
  
    }

    CourseScreen() {
      if (this.utm_source !== null) {
        this.router.navigate(['/course'], { queryParams: { utm_source: this.utm_source, utm_medium: this.utm_medium, campaigntype: this.campaignType, publisherid: this.publisherId } })
      } else {
        this.router.navigate(['/course']);
      }
    }
}
