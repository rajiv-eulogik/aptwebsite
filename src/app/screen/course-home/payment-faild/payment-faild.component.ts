import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, ActivationEnd } from "@angular/router";
import {GetDataServiceService} from '../../../service/get-data-service.service';
import { base_url, apt_url } from "../../../service/config";
import { MatSnackBar } from "@angular/material/snack-bar";
import { interval, Subscription } from 'rxjs';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DownloadsAppComponent } from '../../../dialog/downloads-app/downloads-app.component';
import { FormControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatOption } from '@angular/material/core';
const NUM_REGEX = /^[0-9]\d{9}$/g;
const NAME_REGEX = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

@Component({
  selector: 'app-payment-faild',
  templateUrl: './payment-faild.component.html',
  styleUrls: ['./payment-faild.component.scss']
})
export class PaymentFaildComponent implements OnInit {
  @ViewChild('allSelected') private allSelected: MatOption;
  @ViewChild('subSelected') private subSelected: MatOption;


  public CoursePurchasesedForm: FormGroup;
  public classId: string = '';
  public ClassName: string = '';
  public userId: string = '';
  public allSubject: any = [];
  public CoursePrice: number = 0;
  public discountPrice: number;
  public SeniorBullet: any = ["Lorem ipsum, or lipsum as it is sometimes known."," graphic or web designs.","The purpose of lorem ipsum is to create.","focus is meant to be on design, not content.","The passage experienced"];
  public timerData: any = [];
  public ratingCount: number = 0;
  public utm_source: string = '';
  public utm_medium: string = '';
  public campaignType: string = '';
  public publisherId: string = '';
  public imageUrl: string = apt_url + 'uploads/Class/download/';
  public img: any;
  public credits: any;
  public discPrice: any;
  public serverName: any;
  public bool: boolean;
  public coupcode: any;
  public coup: any;
  public count: number;

  constructor(public fb: FormBuilder,public getTopicService: GetDataServiceService,public router: Router,
    public snakBar: MatSnackBar,public route: ActivatedRoute,public dialog: MatDialog) {
      this.userId = this.route.snapshot.queryParamMap.get('userId');
      this.classId = this.route.snapshot.queryParamMap.get('classId');
      this.utm_source = this.route.snapshot.queryParamMap.get('utm_source');
       console.log("subject name & id is here ",this.userId,this.classId);

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
    //this.SettimeInterval();
    // this.inilizeForm();
    this.getClassData();
    this.getClassData1();
    this.GetProductData();
    this.getAllSubject();
    this.inilizeValue();
    this.getClassPrice();
    this.getDiscountedPrice();
  }

  inilizeValue(){
    this.CoursePurchasesedForm = this.fb.group({
      course: new FormControl(['Full Course'], [Validators.required]),
      coupans: new FormControl(''),
    });
  }
  someMethod(event)
  {
    console.log("event value is",event);
    // event[0].
  }
// devigate payments screen 
PAYNOW(){
    console.log("do nothigs",this.CoursePurchasesedForm.value);
    if(this.CoursePurchasesedForm.value.coupans == ''){
      console.log("send without coupans");
      this.router.navigate(['/downloads/paytm'], { queryParams: { classId: this.classId,userId:  this.userId,price: this.CoursePrice,coupon: '0' ,transactionType: 'buyproduct',couponId: '123456789'  } });
      // http://142.93.212.14:3025/paymentProcessCourse?transactionType=buyproduct&&classId=5e846ea4f70b88227df22189&&userId=5e8db0f6fe721f73f3740380&&credit=100&&coupon=0
    }else{
      console.log("send with coupans");
      let url = apt_url + 'Coupons?filter={"where": {"code": "'+this.CoursePurchasesedForm.value.coupans+'"}}';
      this.getTopicService.getData(url).subscribe(responce =>{
        console.log("all class data is here ",responce);
         let temp: any = responce;
         if(temp.length == 0){
            this.snakBar.open('Invalid Coupan Code!', 'OK', {
            duration: 3000
          })
          this.router.navigate(['/downloads/paytm'], { queryParams: { classId: this.classId,userId:  this.userId,price: this.CoursePrice,coupon: '0' ,transactionType: 'buyproduct',couponId: '123456789'  } });
         }else if(temp[0].status  == "expired"){
          this.snakBar.open('Coupan Code has been expired !', 'OK', {
            duration: 3000
          })
          this.router.navigate(['/downloads/paytm'], { queryParams: { classId: this.classId,userId:  this.userId,price: this.CoursePrice,coupon: '0' ,transactionType: 'buyproduct',couponId: '123456789'  } });
         }else{
          this.router.navigate(['/downloads/paytm'], { queryParams: { classId: this.classId,userId:  this.userId,price: this.CoursePrice,coupon: temp[0].amount ,transactionType: 'buyproduct',couponId: temp[0].id  } });
         }
        
       },error =>{
        console.log("app downlods  geting error ",error);
      });
    }
    // this.router.navigate(['/course/payments-faild'], { queryParams: { id: "5fsf4sd54gdsg4ssdd",name: "8th Class" } });
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

//  BuyNow(){
//    console.log("do nothigs");
//     const dialogRef = this.dialog.open(DownloadsAppComponent, {
//       width: '500px',
//       data:  {"screen": "Course Detail"}
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       console.log('The dialog was closed');
//       // this.animal = result;buy-course
//       this.router.navigate(['/course/buy-course'], { queryParams: { id: "5fsf4sd54gdsg4ssdd",name: "8th Class" } });
//     });
//   }

  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
   // console.log("before data ",this.timerData);
    this.timerData =  array;
   // console.log("before data ",this.timerData);
  }
 // timer data start here 
 public source = interval(6000);
 subscription: Subscription;
  SettimeInterval() {
     this.subscription = this.source.subscribe(val =>  this.shuffle(this.timerData));
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
        let postData: any = {
          name: result.name,
          mobile: result.mobile,
          password: 'apt#123',
          createdAt: new Date()
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
 
 getClassData(){
   let url = apt_url + 'Classes?filter={"where": {"id": "'+this.classId+'"}}';
   this.getTopicService.getData(url).subscribe(responce => {
    console.log("class data is **** ",responce );
    let temp:any = responce[0];
    this.ClassName = temp.name;
    this.discPrice = temp.discountPrice;
    this.credits = temp.credits;
    this.ratingCount = temp.ratingValue;
  }, err => {
    console.log("get about course content error ",err);
  });

 }
 public features: any = [];
 public contentTitle: string = '';
 public contentDescription: string = '';
 public rawImage: string = '';
 public courseVideoURL: string = '';
 public courseVideoTitle: string = '';
 public courseVideoDesc: string = '';
 public TooperimageUrl: string = apt_url + 'Uploads/products/download/'
 

 GetProductData(){
  let url = apt_url + 'OnlineClassdata?filter={"where": {"classId": "5f16873fccd9b429253a608b"}}&access_token='+localStorage.getItem('aptAccessToken');
  this.getTopicService.getData(url).subscribe(responce => {
    console.log("product data is **** ",responce );
     let temp: any = responce[0];
     if(temp.ProductDetailfeatures !== undefined){
        this.features = temp.ProductDetailfeatures;
     }

     if(temp.ProductDetailContent !== undefined){
      this.contentTitle = temp.ProductDetailContent.title ;
      this.contentDescription = temp.ProductDetailContent.description;
      this.rawImage = apt_url + 'Uploads/products/download/' + temp.ProductDetailContent.image
     }

     if(temp.ProductDetailVideoContent !== undefined)
     {
      this.courseVideoURL = temp.ProductDetailVideoContent.url ;
      this.courseVideoTitle = temp.ProductDetailVideoContent.title;
      this.courseVideoDesc = temp.ProductDetailVideoContent.description;
     }
 
     if(temp.toppers !== undefined){
      this.timerData = temp.toppers;
      this.SettimeInterval();
     }

  }, err => {
    console.log("get about course content error ",err);
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


 getAllSubject(){
  let url = apt_url + 'RemoteMethods/getCourses';
  let postData: any = {
    classId: this.classId
  };
  this.getTopicService.PostData(postData,url).subscribe(responce => {
   console.log("all subject id here data is **** ",responce );
     let temp:any = responce;
     this.allSubject = temp.data;
  }, err => {
    console.log("get about course content error ",err);
  });
 }
// get all calss Data here 
 getClassPrice(){
  let url = apt_url + 'RemoteMethods/getCourses';
  let postData: any = {

  };
  this.getTopicService.PostData(postData,url).subscribe(responce => {
   console.log("all getClassPrice here data is **** ",responce );
     let temp:any = responce;
     for(let i = 0; i<temp.data.length;i++){
       if(temp.data[i]._id == this.classId){
          this.CoursePrice = temp.data[i].productSum;
       }else{

       }
     }
    //  this.allSubject = temp.data;CoursePrice
  }, err => {
    console.log("get about course content error ",err);
  });
 }

 getDiscountedPrice(){
  let url = apt_url + 'Classes?filter={"where":{"id":"5f255bc721371a76fe1f6aa2"}}';
  let postData: any = {

  };
  this.getTopicService.getData(url).subscribe(responce => {
   console.log("all discountPrice here data is **** ",responce );
     let temp:any = responce;
          this.discountPrice = temp[0].discountPrice;

    //  this.allSubject = temp.data;CoursePrice
  }, err => {
    console.log("discount price error ",err);
  });
 }

 coupon(value){
  this.serverName = value;
  console.log(this.serverName);
  if(this.serverName.length >=3)
   this.bool = true;
 else
 this.bool = false;
}

errormessage(value){
 this.coupcode = value
 let url = apt_url + 'Coupons';
 this.getTopicService.getData(url).subscribe(responce => {
   console.log("hello" + responce)
   this.coup = responce;
   for(let i=0;i<this.coup.length;i++){
     if(this.coup[i].code === this.coupcode && this.coup[i].status =='active'){
       document.getElementById("error").innerHTML = ""
       this.count++;
       break;
     }
     else {
       this.count++;
     }
   }
   if(this.count>this.coup.length)
     document.getElementById("error").innerHTML = "Please Enter Valid Coupon Code"
 }, err => {
   console.log(" error ",err);
 });
}

couponmessage(){
 document.getElementById("coupon1").innerHTML = "";
 document.getElementById("coupon2").innerHTML = "Coupon Applied";
 document.getElementById("coupon3").innerHTML = "X";
}

togglecoupon(){
(<HTMLInputElement>document.getElementById("value")).value = "";
 document.getElementById("coupon1").innerHTML = "";
 document.getElementById("coupon2").innerHTML = "";
 document.getElementById("coupon3").innerHTML = "";
 document.getElementById("error").innerHTML = "";
}

toggleAllSelection = ()=> {
  if (this.allSelected.selected) {
    console.log("fhsdgjh")
    console.log(this.allSubject)
    this.CoursePurchasesedForm.value.course
      .patchValue([this.allSubject.map(item => item.name),0]);
     // this.allSelected.select()
     this.subSelected.select()
  } else {
   console.log("123444")
    this.CoursePurchasesedForm.value.course.patchValue([]);
  }
} 
}

