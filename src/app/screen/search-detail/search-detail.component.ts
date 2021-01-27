import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ActivationEnd } from "@angular/router";
import { GetDataServiceService } from '../../service/get-data-service.service';
import { base_url, apt_url } from "../../service/config";
import { Observable, Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-search-detail',
  templateUrl: './search-detail.component.html',
  styleUrls: ['./search-detail.component.scss']
})
export class SearchDetailComponent implements OnInit {
  public SearchData: string = '';
  public FilterContent: any = [];
  public imageUrl: string = base_url + 'uploads/blogs/download/';
  public DownlodsData: any = [];

  public showloader: boolean = false;      
  private subscription: Subscription;
  private timer: Observable<any>;

   // urm source related variables
   public loading1: boolean = true;
   public loading2: boolean = true;
   public utm_source: string = '';
   public utm_medium: string = '';
   public campaignType: string = '';
   public publisherId: string = '';
  constructor(public FilterService: GetDataServiceService, public router: Router, public route: ActivatedRoute) {
    this.SearchData = this.route.snapshot.queryParamMap.get('searchData');
    console.log("search string is here ", this.SearchData);
    this.utm_source = this.route.snapshot.queryParamMap.get('utm_source');
    if (this.utm_source !== null) {
      this.utm_medium = this.route.snapshot.queryParamMap.get('utm_medium');
      this.campaignType = this.route.snapshot.queryParamMap.get('campaigntype');
      this.publisherId = this.route.snapshot.queryParamMap.get('publisherid');
    } else {}
   }

  ngOnInit(): void {
    this.FilterData();
    this.GetFilterData();
    this.setTimer();
  }

  public ngOnDestroy() {
    if ( this.subscription && this.subscription instanceof Subscription) {
      this.subscription.unsubscribe();
    }
  }

  public setTimer(){

    // set showloader to true to show loading div on view
    if(this.SearchData == '' || this.SearchData.length ==0){
    this.showloader   = true;

    this.timer        = timer(1000); // 5000 millisecond means 5 seconds
    this.subscription = this.timer.subscribe(() => {
        // set showloader to false to hide loading div from view after 5 seconds
        this.showloader = false;
    });
    }
  }

  assignValue(){
     this.SearchData = this.route.snapshot.queryParamMap.get('searchData');
  }
  
  CloseHome(){
    console.log(" i am here ",this.SearchData);
    this.SearchData = '';
    this.FilterContent = [];
    this.DownlodsData = [];
    // this.FilterData();                                                                                                                                   
    // this.GetFilterData();
  }

  SearchData1(data){
    if(data == ''){
    this.loading1 = true;
    this.loading2 = true;
    }
    this.showloader   = true;

    this.timer        = timer(1500); // 5000 millisecond means 5 seconds
    this.subscription = this.timer.subscribe(() => {
        // set showloader to false to hide loading div from view after 5 seconds
        this.showloader = false;
    });
    console.log("log here",data);
    this.FilterData();
    this.GetFilterData();
    console.log("search", this.SearchData)
  }

  BlogDetail(data){
    if (this.utm_source !== null) {
      this.router.navigate(['/blogs/blog-details'], { queryParams: { id: data.id, utm_source: this.utm_source, utm_medium: this.utm_medium, campaigntype: this.campaignType, publisherid: this.publisherId } })
    } else {
      this.router.navigate(['/blogs/blog-details'], { queryParams: { id: data.id } })
    }
  }

  showdata(data, index) {
    let iddata = document.getElementById('blogdata' + index).innerHTML = data;
    document.getElementById('blogdata' + index).innerHTML = document.getElementById('blogdata' + index).innerText.substring(0, 500);
    return true
  }

 ConatDetail(){
  console.log("i am here");
 }

 GetFilterData(){
   let url = apt_url + 'RemoteMethods/searchDownload';
   let postData = {
     "text": this.SearchData
   }
   this.FilterService.PostData(postData,url).subscribe(result => {
     console.log("filter data of Downlods content is here ", result);
     let temp: any = result;
     this.DownlodsData = temp.results;
     console.log("filter data of Downlods content is here ", this.DownlodsData);
     this.loading1 = false;
     if(this.SearchData =='')
     this.loading1 = true;
   }, error => {
     console.log("somethings went wrong in filter", error);
   });
 }

FilterData() {
    let url = base_url + 'RemoteMethods/seacrhBlog';
    let postData = {
      "text": this.SearchData
    }

   this.FilterService.PostData(postData, url).subscribe(result => {
      console.log("filter data of Downlods content is here ", result);
      let temp: any = result;
      this.FilterContent = temp.data.results;
      console.log("filter data of Downlods content is here ", this.FilterContent);
      this.loading2 = false;
      if(this.SearchData =='')
     this.loading2 = true;
    }, error => {
      console.log("somethings went wrong in filter", error);
    });
  }
}
