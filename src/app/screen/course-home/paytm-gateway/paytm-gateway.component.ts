import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ActivationEnd } from "@angular/router";
import {GetDataServiceService} from '../../../service/get-data-service.service';
import { base_url, apt_url,Paytm_url } from "../../../service/config";
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-paytm-gateway',
  templateUrl: './paytm-gateway.component.html',
  styleUrls: ['./paytm-gateway.component.scss']
})
export class PaytmGatewayComponent implements OnInit {
  public paymentURL: any ; 
  public amount: string = '';
  public classId: string = '';
  public fileId: string = '';
  public userId: string = '';
  public transectionType: string = '';
  public coupans: string = '';
  public url: string = '';
  public coupanId: string = '';

  constructor(public router: Router,public route: ActivatedRoute,private sanitizer: DomSanitizer) {
    this.transectionType = this.route.snapshot.queryParamMap.get('transactionType');
    if(this.transectionType == 'buyDownload'){
      this.fileId = this.route.snapshot.queryParamMap.get('fileId');
      this.classId = this.route.snapshot.queryParamMap.get('classId');
      this.amount = this.route.snapshot.queryParamMap.get('price');
      this.userId = this.route.snapshot.queryParamMap.get('userId');
    } else{
      this.classId = this.route.snapshot.queryParamMap.get('classId');
      this.amount = this.route.snapshot.queryParamMap.get('price');
      this.userId = this.route.snapshot.queryParamMap.get('userId');
      this.coupans = this.route.snapshot.queryParamMap.get('coupon');
      this.coupanId = this.route.snapshot.queryParamMap.get('couponId');
    }
   }

  ngOnInit(): void {
    // http://142.93.212.14:3025/paymentProcessCourse?transactionType=buyproduct&&classId=5e846ea4f70b88227df22189&&userId=5e8db0f6fe721f73f3740380&&credit=100&&coupon=0

      // let url = apt_url + 'paymentProcessCourse?transactionType=buyproduct&&classId=' + this.classId + '&&userId=' + this.userId + '&&credit=' + this.amount + '&&coupon=0';
      if(this.transectionType == 'buyDownload'){
        this.url = Paytm_url + 'downloadPaymentProcess?transactionType=buyDownload&&classId=' + this.classId + '&&fileId=' + this.fileId + '&&userId=' + this.userId + '&&credit=' + this.amount ;
      }else{
         if(this.coupans == '0'){
           //config.paymentUrl+'/paymentProcess?transactionType=buyProduct&userId="'+this.state.userId+'"&productId="'+this.state.productId+'"&credit="'+this.state.credit+'"&walletAmount="'+this.state.walletAmount+'"&productType='class''
          this.url = Paytm_url +'paymentProcessCourse?transactionType=buyProduct&&classId=' + this.classId + '&&userId=' + this.userId + '&&credit=' + this.amount +'&&coupon=0'
          //this.url = Paytm_url + 'downloadPaymentProcess?transactionType=buyDownload&&classId=' + this.classId + '&&fileId=' + this.fileId + '&&userId=' + this.userId + '&&credit=' + this.amount ;
      
          // ORIGINAL ONE -  this.url = Paytm_url +'paymentProcess?transactionType=buyProduct&&userId='+this.userId +'&&productId='+this.classId + '&&credit=' + this.amount +'&&coupon=0&&productType=class';
         // this.url = Paytm_url + 'paymentProcessCourse?transactionType=buyproduct&&classId=' + this.classId + '&&userId=' + this.userId + '&&credit=' + this.amount +'&&coupon=0';
          //http://142.93.212.14:3025/paymentProcessCourse?transactionType=buyproduct&&classId=5e846ea4f70b88227df22189&&userId=5e8db0f6fe721f73f3740380&&credit=100&&coupon=0
         }else{
          //this.url = Paytm_url +'paymentProcessCourse?transactionType=buyProduct&&classId=' + this.classId + '&&userId=' + this.userId + '&&credit=' + this.amount +'&&coupon='+this.coupans+'&&couponId='+this.coupanId+''
         this.url = Paytm_url +'paymentProcess?transactionType=buyProduct&&userId='+this.userId +'&&productId='+this.classId + '&&credit=' + this.amount +'&&coupon=0&&productType=class&&coupon='+this.coupans+'&&couponId='+this.coupanId+'';
         }
      }
     
      console.log("paytm url ",this.url);
      this.paymentURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
      console.log(this.paymentURL)
      // window.open(this.paymentURL, '_self');
      // document.getElementById('paytmGate').click();
      // console.log(this.paytmLink) 
      setTimeout(() => {
        document.getElementById("paytmGate").click();
      }, 1000);  
    }

}
