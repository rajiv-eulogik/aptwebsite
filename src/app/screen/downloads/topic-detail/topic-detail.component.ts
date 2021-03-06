import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router, ActivationEnd } from "@angular/router";
import { GetDataServiceService } from '../../../service/get-data-service.service';
import { base_url, apt_url } from "../../../service/config";
import { MatSnackBar } from "@angular/material/snack-bar";
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
import { flyInOut, expand } from '../../../animation-details/animation-details.component';

@Component({
	selector: 'app-topic-detail',
	templateUrl: './topic-detail.component.html',
	styleUrls: ['./topic-detail.component.scss'],
	animations: [
		expand(),
		flyInOut(),
		trigger('slideInDown', [transition('* => *', useAnimation(slideInDown))]),
		trigger('slideInUp', [transition('* => *', useAnimation(slideInUp))]),
		trigger('slideInLeft', [transition('* => *', useAnimation(slideInLeft))]),
		trigger('slideInRight', [transition('* => *', useAnimation(slideInRight))])
	],
})
export class TopicDetailComponent implements OnInit {

	public showloader: boolean = false;
	private subscription: Subscription;
	private timer: Observable<any>;

	public loading1: boolean = true;
	public loading2: boolean = true;

	public slideInDown: any;
	public slideInUp: any;
	public slideInLeft: any;
	public slideInRight: any;
	public classId: string = '';
	public TopicData: any;
	public topicsId: string = '';
	public SubjectName: string = '';
	public topics: any;
	public pdfUrl: string = apt_url + 'Uploads/DownloadContent/Download/'
	// urm source related variables
	public utm_source: string = '';
	public utm_medium: string = '';
	public campaignType: string = '';
	public publisherId: string = '';

	constructor(public getTopicService: GetDataServiceService, public router: Router,
		public snakBar: MatSnackBar, public route: ActivatedRoute, public dialog: MatDialog) {
		this.SubjectName = this.route.snapshot.queryParamMap.get('name');
		this.topicsId = this.route.snapshot.queryParamMap.get('id');
		console.log("subject name & id is here ", this.topicsId, this.SubjectName);
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
		this.getFileData();
		this.getClassID();
		window.scrollTo(10, 0)
		this.setTimer();
		this.getWidth();
	}

	mobileDevice: boolean = false
	getWidth(event?) {
		this.mobileDevice = event ? event.target.innerWidth <= 600 ? true : false : window.innerWidth <= 600 ? true : false
	}

	public ngOnDestroy() {
		if (this.subscription && this.subscription instanceof Subscription) {
			this.subscription.unsubscribe();
		}
	}

	public setTimer() {

		// set showloader to true to show loading div on view
		this.showloader = true;

		this.timer = timer(3000); // 5000 millisecond means 5 seconds
		this.subscription = this.timer.subscribe(() => {
			// set showloader to false to hide loading div from view after 5 seconds
			this.showloader = false;
		});
	}
	// get Topic data 
	// getTopic(){
	//   let url = apt_url + 'Subjects/'+this.subjectId+'/subjectTopics?filter={"where":{"or":[{"deleted":false},{"purchased":{"gte":1}}]}}&access_token=z2SOHSzXqKNmD597iPJokOG2Pud8CyCqFUEl8iW2L3LrWD1kbA5ljZRjwhn8Ii8Z'; 
	//   this.getTopicService.getData(url).subscribe(responce => {
	//     console.log("get topic data is ", responce);
	//     // let dummy: any = [];
	//     // dummy = responce;
	//     this.topics = responce[0];
	//     this.getFileData();
	//   }, err => {
	//     console.log("get topic error ",err);
	//   });
	// }
	getClassID() {
		let url = apt_url + 'Topics/' + this.topicsId + '/subject'
		this.getTopicService.getData(url).subscribe(res => {
			console.log("uplods here ", res);
			let temp: any = res;
			this.classId = temp.classId;
			this.loading1 = false;
		}, error => {
			console.log("get file data error", error);
		});
	}

	getFileData() {
		console.log("will do latter");
		let url = apt_url + 'Downloads?filter={"where": { "topicId": "' + this.topicsId + '"}}&access_token=' + localStorage.getItem('aptAccessToken');
		this.getTopicService.getData(url).subscribe(res => {
			console.log("uplods here ", res);
			this.TopicData = this.includePrice(res);
			this.loading2 = false;
		}, error => {
			console.log("get file data error", error);
		});
	}

	includePrice(array) {
		 array.forEach(el => {
			el.price = el.price ? el.price : el.credits
		});
		return array
	}

	isEven(param: any) {
		let temp: any;
		if (param % 2 === 0) {
			temp = true;
			console.log("evne if condition");
		} else {
			temp = true;
			console.log("odd if condition");
		}
		return temp;
	}
	//open Downloader information 
	OpenDailog(data) {
		const dialogRef = this.dialog.open(DownloadsAppComponent, {
			width: '500px',
			data: { screen: "topic Detail", action: "download", heading: "Your Information" }
		});

		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed', result);
			if (result !== undefined) {
				console.log("psot data here ");
				let postData: any = {};
				if (this.utm_source !== null) {
					postData = {
						name: result.name,
						mobile: result.mobile,
						email: result.email,
						userName: result.mobile,
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
						email: result.email,
						userName: result.mobile,
						createdAt: new Date()
					}
				}

				let url = apt_url + 'Downloaders/createUser'
				this.getTopicService.PostData(postData, url).subscribe(responce => {
					console.log("all class data is here ", responce);
					let temp: any = responce;
					// a.nativeElement.click()
					// document.getElementById(data.fileName).click();
					if (data.price > 0) {
						this.router.navigate(['/downloads/paytm'], { skipLocationChange: true, queryParams: { classId: this.classId, userId: temp.user.id, price: data.price, fileId: data.id, transactionType: 'buyDownload' } })
						localStorage.setItem('DownlodsUserId', temp.user.id);
						// let Postdata: any = { 
						//   "userId": temp.user.id,
						//   "credit": data.price,
						//   "classId": this.classId,
						//   "coupon": "0",
						//   "transactionType": ""
						//  }
						// let url12 = apt_url + 'paymentProcessCourse?transactionType=buyproduct&&classId=' + this.classId + '&&userId=' + temp.user.id + '&&credit=' + data.price + '&&coupon=0';
						// this.getTopicService.PostData(Postdata,url12).subscribe(res =>{
						//   console.log("Paytm data is  here ",res);
						// },error =>{
						//   console.log("Paytm error ",error);
						// });
					} else {
						window.open(this.pdfUrl + data.filename, '_blank');
					}

					// paytm
					// let temp: any = responce;
					// this.snakBar.open('Thanks for sharing your information with us', 'OK', {
					//   duration: 3000
					// })

				}, error => {
					console.log("app downlods  geting error ", error);
				});
			}
			// this.animal = result;
		});
	}
	// i am here start working this 
	DownloadsApp() {
		console.log("do nothings");
		const dialogRef = this.dialog.open(DownloadsAppComponent, {
			width: '500px',
			disableClose: true,
			data: { screen: "home", action: "download App", heading: "User Information" },
		});

		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed', result);
			if (result !== undefined) {
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
				this.getTopicService.PostData(postData, url).subscribe(responce => {
					console.log("all class data is here ", responce);
					// let temp: any = responce;
					this.snakBar.open('Thanks for sharing your information with us', 'OK', {
						duration: 3000
					})
				}, error => {
					console.log("app downlods  geting error ", error);
				});
			}
		});
	}
}
