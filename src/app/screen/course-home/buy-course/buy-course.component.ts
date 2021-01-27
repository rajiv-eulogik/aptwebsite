import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, ActivationEnd } from "@angular/router";
import {GetDataServiceService} from '../../../service/get-data-service.service';
import { base_url, apt_url } from "../../../service/config";
import { MatSnackBar } from "@angular/material/snack-bar";
import { interval } from 'rxjs';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DownloadsAppComponent } from '../../../dialog/downloads-app/downloads-app.component';
import { FormControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable, Subscription, timer } from 'rxjs';
import { MatSelect } from '@angular/material/select';
import {flyInOut, expand} from '../../../animation-details/animation-details.component';
import { MatOption } from '@angular/material/core';
const NUM_REGEX = /^[0-9]\d{9}$/g;
const NAME_REGEX = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

@Component({
  selector: 'app-buy-course',
  templateUrl: './buy-course.component.html',
  styleUrls: ['./buy-course.component.scss'],
  animations: [
    flyInOut(),
    expand(),
  ]
})
export class BuyCourseComponent implements OnInit {

  @ViewChild('allSelected') private allSelected: MatOption;
  @ViewChild('subSelected') private subSelected: MatOption;

  public showloader: boolean = false;      
  private subscrip: Subscription;
  private timer: Observable<any>;

  public loading1: boolean = true;
  public loading2: boolean = true;
  public loading3: boolean = true;
  public loading4: boolean = true;
  public loading5: boolean= true;

  public purchaseForm: FormGroup;
  public classId: string = '';
  public ClassName: string = '';
  public userId: string = '';
  public allSubject: any = [];
  public CoursePrice: number = 0;
  public discountPrice: number = 0;
  public Price:number = 0;
  public SeniorBullet: any = ["Lorem ipsum, or lipsum as it is sometimes known."," graphic or web designs.","The purpose of lorem ipsum is to create.","focus is meant to be on design, not content.","The passage experienced"];
  public imageUrl: string = apt_url + 'uploads/Class/download/'
  public timerData: any = [];
  public ratingCount: number = 0;
  // urm source related variables
  public utm_source: string = '';
  public utm_medium: string = '';
  public campaignType: string = '';
  public publisherId: string = '';

  public angular: any;
  public isAllSelected: boolean = true;
  public bool: boolean = false;
  // public tosslePerOne: any;
  // public toggleAllSelection: any;
  public glob: any;
  public tosslePerOne(any) {};
  public toggleAllSelection() {};
  public serverName: any;
  public discPrice: any;
  public img: any;
  public credits: any;
  public bool1: boolean;

  public options: any = [
    {value:'Option1', selected:true}, 
    {value:'Option2', selected:false}
  ];

  userTypeFilters = [
    {
      key: 1, value: 'Value 1',
    },
    {
      key: 2, value: 'Value 2',
    },
    {
      key: 3, value: 'Value 3',
    },
    {
      key: 4, value: 'Value 4',
    }
  ];


  constructor(public fb: FormBuilder,public getTopicService: GetDataServiceService,public router: Router,
    public snakBar: MatSnackBar,public route: ActivatedRoute,public dialog: MatDialog) {
      this.userId = this.route.snapshot.queryParamMap.get('userId');
      this.classId = this.route.snapshot.queryParamMap.get('classId');
       console.log("subject name & id is here ",this.ClassName,this.classId);
      this.utm_source = this.route.snapshot.queryParamMap.get('utm_source');
      if (this.utm_source !== null) {
        this.utm_medium = this.route.snapshot.queryParamMap.get('utm_medium');
        this.campaignType = this.route.snapshot.queryParamMap.get('campaigntype');
        this.publisherId = this.route.snapshot.queryParamMap.get('publisherid');
      } else {

      }
     }

  ngOnInit(): void {
    //this.SettimeInterval();
    // this.inilizeForm();
    this.initializeForm()
    this.printglob();
    // this.coupon();
    this.getClassData();
    this.GetProductData();
    this.getAllSubject();
    this.getClassPrice();
    this.getDiscountedPrice();
    this.showRating(this.ratingCount);
    this.setTimer();
    // this.coupon(this.serverName);
    // this.errormessage(this.coupcode);
    
  }

  initializeForm(){
    this.purchaseForm = this.fb.group({
      course: new FormControl('', [Validators.required]),
      coupons: new FormControl('')
    });
    console.log(this.purchaseForm)
  }

  toggleAll(toggleStatus) {
    this.isAllSelected = toggleStatus;
    console.log("hiii"+toggleStatus)
    for(let i=0;i<this.options.length;i++){
      this.options[i].selected = toggleStatus
    }
 }
 
 optionToggled(toggleStatus){
   
   console.log(toggleStatus)
 }

  public ngOnDestroy() {
    if ( this.subscrip && this.subscrip instanceof Subscription) {
      this.subscrip.unsubscribe();
    }
  }

  public setTimer(){

    // set showloader to true to show loading div on view
    this.showloader   = true;

    this.timer        = timer(3000); // 5000 millisecond means 5 seconds
    this.subscrip = this.timer.subscribe(() => {
        // set showloader to false to hide loading div from view after 5 seconds
        this.showloader = false;
    });
  }
  someMethod(event)
  {
    console.log("event value is",event);
    // event[0].
  }
// devigate payments screen 
PAYNOW(){
    console.log("do nothigs", this.purchaseForm.value);
    console.log("fdf")
    if(this.purchaseForm.value.coupons == ''){
      console.log("send without coupons");
      this.router.navigate(['/downloads/paytm'], { queryParams: { classId: this.classId,userId:  this.userId, price: this.CoursePrice, coupon: '0' ,transactionType: 'buyproduct',couponId: '123456789'  } });
      // http://142.93.212.14:3025/paymentProcessCourse?transactionType=buyproduct&&classId=5e846ea4f70b88227df22189&&userId=5e8db0f6fe721f73f3740380&&credit=100&&coupon=0
    }else{
      console.log("send with coupans");
      let url = apt_url + 'Coupons?filter={"where": {"code": "'+this.purchaseForm.value.coupons+'"}}';
      this.getTopicService.getData(url).subscribe(responce =>{
        console.log("all class data is here ",responce);
         let temp: any = responce;
         if(temp.length == 0){
            this.snakBar.open('Invalid Coupan Code!', 'OK', {
            duration: 3000
          })
          this.router.navigate(['/downloads/paytm'], { queryParams: { classId: this.classId,userId:  this.userId,price: this.CoursePrice,coupon: '0' ,transactionType: 'buyproduct',couponId: '123456789'  } });
         }else if(temp[0].status  == "expired"){
          this.snakBar.open('Coupon Code has been expired !', 'OK', {
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
 
 getClassData(){
   let url = apt_url + 'Classes?filter={"where": {"id": "'+this.classId+'"}}';
   this.getTopicService.getData(url).subscribe(responce => {
    console.log("class data is **** ",responce );
    let temp:any = responce[0];
    this.ClassName = temp.name;
    this.discPrice = temp.discountPrice;
    this.credits = temp.credits;
    this.img = temp.image;
    console.log(this.img)
    console.log(this.ClassName);
    this.ratingCount = 5//temp.ratingValue;
    console.log(this.ratingCount);
    this.loading1 = false;
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
 public coup: any;
 public coupcode: any;
 public count: number = 0;

 GetProductData(){
  let url = apt_url + 'OnlineClassdata?filter={"where": {"classId": "'+this.classId+'"}}&access_token='+localStorage.getItem('aptAccessToken');
  this.getTopicService.getData(url).subscribe(responce => {
    console.log("product data is **** ",responce );
     let temp: any = responce[0];
     if(temp.features !== undefined){
        this.features = temp.features;
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
     this.loading2 = false;

  }, err => {
    console.log("get about course content error ",err);
  });
 }

 printglob(){
  this.glob = this.getAllSubject();
  console.log("hi" + this.glob);
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


 getAllSubject(){
  //let url = apt_url + 'RemoteMethods/getCourses';
  let url = apt_url + 'Classes/getClassDetails'
  let postData: any = {
    classId: this.classId,
    "userId": this.userId
  }; 
  // let postData: any = {
  //   classId: this.classId,
  // };
  this.getTopicService.PostData(postData,url).subscribe(responce => {
   console.log("all subject id here data is **** ",responce );
     let temp:any = responce;
     this.allSubject = temp.data.subject;
     console.log(this.allSubject);
     this.loading3 = false;
     this.glob = this.allSubject;
  

     this.tosslePerOne = (all) => { 
       console.log(all)
      if (this.allSelected.selected) {  
       this.allSelected.deselect();
       return false;
   }
     if(this.purchaseForm.value.course.length==this.allSubject.length)
       this.allSelected.select();
   
   }
  
    this.toggleAllSelection = ()=> {
       if (this.allSelected.selected) {
         console.log("fhsdgjh")
         console.log(this.allSubject)
         this.purchaseForm.value.course
           .patchValue([this.allSubject.map(item => item.name),0]);
          // this.allSelected.select()
          this.subSelected.select()
       } else {
        console.log("123444")
         this.purchaseForm.value.course.patchValue([]);
       }
     } 
  
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
     this.loading4 = false;
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

     this.loading5 = false;
    //  this.allSubject = temp.data;CoursePrice
  }, err => {
    console.log("discount price error ",err);
  });
 }
}

