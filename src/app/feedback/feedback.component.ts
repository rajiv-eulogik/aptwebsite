import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router, ActivationEnd } from "@angular/router";
import {GetDataServiceService} from '../service/get-data-service.service';
import { base_url, apt_url } from "../service/config";
import { MatSnackBar } from "@angular/material/snack-bar";
import { interval } from 'rxjs';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
const NUM_REGEX = /^[1-9][0-9]{5,19}$/;
const NAME_REGEX = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

declare var $: any;
interface Rate {
  id: number;
  rating: number;
  message: string;
}

import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
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
import {flyInOut, expand} from '../animation-details/animation-details.component';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
  animations: [
    flyInOut(),
    expand(),
    trigger('slideInDown', [transition('* => *', useAnimation(slideInDown))]),
    trigger('slideInUp', [transition('* => *', useAnimation(slideInUp))]),
    trigger('slideInLeft', [transition('* => *', useAnimation(slideInLeft))]),
    trigger('slideInRight', [transition('* => *', useAnimation(slideInRight))])
  ],
})
export class FeedbackComponent implements OnInit {

  public RateUsForm: FormGroup;
  // urm source related variables
  public utm_source: string = '';
  public utm_medium: string = '';
  public campaignType: string = '';
  public publisherId: string = '';

  public selStars: number= 0;
  public maxStars: any;

  public ratingClicked: number = 0;
  public message: string;
  public items:  Rate[] = [
    { 'id': 0, 'rating': 0, 'message': 'Rate Us' },
    { 'id': 1, 'rating': 1, 'message': 'Very Disappointing'  },
    { 'id': 2, 'rating': 2, 'message': 'Disappointing'  },
    { 'id': 3, 'rating': 3,'message': 'Quite Good'  },
    { 'id': 4, 'rating': 4, 'message': 'Impressive'  },
    { 'id': 5, 'rating': 5, 'message': 'Excellent' }
  ];

  ratingComponentClick(clickObj: any): void {
    const item = this.items.find(((i: any) => i.id === clickObj.itemId));
    console.log(item)
    if (!!item) {
      item.rating = clickObj.rating;
      this.ratingClicked = clickObj.rating;
      this.message = item.message;
    }

  }

  public rating: number;
  public ratings: number;


  constructor(public fb: FormBuilder,public getTopicService: GetDataServiceService,public router: Router,
    public snakBar: MatSnackBar, public route: ActivatedRoute, public dialog: MatDialog, public sanitizer: DomSanitizer) { 
      this.utm_source = this.route.snapshot.queryParamMap.get('utm_source');
        if (this.utm_source !== null) {
          this.utm_medium = this.route.snapshot.queryParamMap.get('utm_medium');
          this.campaignType = this.route.snapshot.queryParamMap.get('campaigntype');
          this.publisherId = this.route.snapshot.queryParamMap.get('publisherid');
        } else {
          
        }
    }

  ngOnInit(): void {
    this.inilizeForm();
    // this.star();
    var maxChars = 250;
    $('textarea').keyup(function () {
      var tlength = $(this).val().length;
      $(this).val($(this).val().substring(0, maxChars));
      var tlength = $(this).val().length;
      var remain = maxChars - parseInt(tlength);
      var val = maxChars - remain;
      $('#remain').text(val);
    });
  }

  inilizeForm(){
    this.RateUsForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.pattern(NAME_REGEX)]),
      mobile: new FormControl('', [Validators.required, Validators.pattern(NUM_REGEX), Validators.minLength(10), Validators.maxLength(10)]),
      description: new FormControl('') 
    });
   }

   safeUrl(value: any): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(value)
  }

  submitForm(){
    console.log("form input value is",this.RateUsForm.value);
     if(this.RateUsForm.valid){
       let postData: any = {};
       if (this.utm_source !== null) {
         postData = {
           name: this.RateUsForm.value.name,
           mobile: this.RateUsForm.value.mobile,
           description: this.RateUsForm.value.description,
           password: 'apt#123',
           createdAt: new Date(),
           "utm_medium": this.utm_medium,
           "compaigntype": this.campaignType,
           "publisherid": this.publisherId,
           "utm_source": this.utm_source,
           "source": this.campaignType,
         }
 
       } else {
         postData = {
           name: this.RateUsForm.value.name,
           mobile: this.RateUsForm.value.mobile,
           description: this.RateUsForm.value.description,
           password: 'apt#123',
           createdAt: new Date(),
         }
       }
 
       // let postData: any = {
         
       //   "country": "India",
       //   "countryCode": "91",
       //   "utm_source": "amipiya",
       //   "utm_medium": "Opicle",
       //   "compaigntype": "Email",
       //   "publisherid": "(PublisherId)",
       //   "source": "email"
       // }
       let url: any = base_url + 'RateUs'
       this.getTopicService.PostData(postData,url).subscribe(responce =>{
         console.log("review is here ",responce);
         // let temp: any = responce;
         this.snakBar.open('Thanks for sharing your review with us', 'OK', {
           duration: 3000
         })
         this.RateUsForm.reset();
        },error =>{
         console.log("reviews geting error ",error);
       });
     }else{
       this.snakBar.open('Please enter Required Fields', 'OK', {
         duration: 3000
       })
     }
  }

    star() {  
        var result = [];
        for (var i = 1; i <= this.maxStars; i++)
          result.push(i);
        return result;
      };
  
    getClass(value) {
        return 'glyphicon glyphicon-star' + (this.selStars >= value ? '' : '-empty');
      };
  
    setClass(sender, value) {
      this.selStars = value;
      sender.currentTarget.setAttribute('class', this.getClass(value));
    };
   
}

