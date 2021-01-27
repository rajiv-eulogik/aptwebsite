import { Component, OnInit } from '@angular/core';
import { GetDataServiceService } from '../../service/get-data-service.service';
import { base_url, apt_url } from "../../service/config";
import { ActivatedRoute, Router, ActivationEnd } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DownloadsAppComponent } from '../../dialog/downloads-app/downloads-app.component';
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
import { flyInOut, expand } from '../../animation-details/animation-details.component';
import { type } from 'jquery';

@Component({
	selector: 'app-downloads',
	templateUrl: './downloads.component.html',
	styleUrls: ['./downloads.component.scss'],
	animations: [
		flyInOut(),
		expand(),
		trigger('slideInDown', [transition('* => *', useAnimation(slideInDown))]),
		trigger('slideInUp', [transition('* => *', useAnimation(slideInUp))]),
		trigger('slideInLeft', [transition('* => *', useAnimation(slideInLeft))]),
		trigger('slideInRight', [transition('* => *', useAnimation(slideInRight))])
	],
})
export class DownloadsComponent implements OnInit {

	public showloader: boolean = false;
	private subscription: Subscription;
	private timer: Observable<any>;

	public loading1: boolean = true;
	public loading2: boolean = true;
	public loading3: boolean = true;

	public AllClass: any;
	public slideInDown: any;
	public slideInUp: any;
	public slideInLeft: any;
	public slideInRight: any;
	public classData: any = [];
	public classObejct: any;
	public cols: number = 4;
	public ImageUrl: string = apt_url + 'uploads/Class/download/';
	// urm source related variables
	public utm_source: string = '';
	public utm_medium: string = '';
	public campaignType: string = '';
	public publisherId: string = '';
	public ar: any = [false, false, false];
	public arr: any= [];
	public flag: boolean;
	public title: any = [];

	constructor(public route: ActivatedRoute, public getClassService: GetDataServiceService, public router: Router,
		public snakBar: MatSnackBar, public dialog: MatDialog) {
		this.utm_source = this.route.snapshot.queryParamMap.get('utm_source');
		if (this.utm_source !== null) {
			this.utm_medium = this.route.snapshot.queryParamMap.get('utm_medium');
			this.campaignType = this.route.snapshot.queryParamMap.get('campaigntype');
			this.publisherId = this.route.snapshot.queryParamMap.get('publisherid');
		} else {
			// console.log("Do nothigs");
		}
	}

	ngOnInit(): void {
		this.mergeTitleClass();
		this.getAboutCourse();
		this.getWidth();
		window.scrollTo(10, 0)
		this.commonfunc();
		//this.setTimer();
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


	public getClassCategoriesData() {
		let url = apt_url + 'ClassCategories';
		this.getClassService.getData(url).subscribe(responce => {
			console.log("get class categories data is ", responce);
			this.classData = responce;
			console.log(this.classData);
			this.loading1 = false;
		})
	} 

	navigate(menu) {
		// if(this.classObejct && this.classObejct !== null){
		// console.log("navigate next screen ",this.classObejct);
		if (this.utm_source !== null) {
			// { queryParams: { id: menu.id, name: menu.name, utm_source: this.utm_source, utm_medium: this.utm_medium, campaigntype: this.campaignType, publisherid: this.publisherId } }
			this.router.navigate([]).then(result => { console.log(result);  window.open('/downloads/Subjects?id=' + menu.id + '&name=' + menu.name,  '_blank'); })
		} else {
			this.router.navigate([]).then(result => { console.log(result);  window.open('/downloads/Subjects?id=' + menu.id + '&name=' + menu.name,  '_blank'); })
		}
	}

	public commonfunc() {
		let url = apt_url + 'ClassCategories';    
		let url1 = apt_url + 'Classes?filter={"where":{"or":[{"deleted":false},{"purchased":{"gte":1}}]},"include": ["onlinedata","products"]}'
		this.getClassService.getData(url1).subscribe(responce => {
		  console.log("all class data is here ", responce);
		  var temp: any = responce;
		  this.AllClass = temp;
		  console.log(this.AllClass);
		  this.getClassService.getData(url).subscribe(responce => {
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
		  this.loading3 = false;
		}, error => {
		  console.log("blogs geting error ", error);
		});
	  //  while(this.loading3){
	  //    console.log("still loading")
	  //  } 
	
	  }

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
				this.getClassService.PostData(postData, url).subscribe(responce => {
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

	getAllClaases() {
		let url = apt_url + 'Classes?filter={"where":{"or":[{"deleted":false},{"purchased":{"gte":1}}]},"include": ["onlinedata","products"]}'
		this.getClassService.getData(url).subscribe(responce => {
			console.log("all class data is here ", responce);
			let temp: any = responce;
			this.AllClass = temp;
			console.log(this.AllClass);
			console.log('Hey 2')

			this.loading3 = false;
		}, error => {
			console.log("blogs geting error ", error);
		});
	}


	public aboutTittle: string = '';
	public aboutDescription: string = '';
	//get about course here 
	getAboutCourse() {
		let url = apt_url + 'DownloadContents?filter={"where":%20{"type":%20"course"}}'
		this.getClassService.getData(url).subscribe(response => {
			console.log("get about course  ", response);
			let temp = response[0];
			console.log(temp);
			this.aboutTittle = temp.title;
			this.aboutDescription = temp.description;
			console.log(this.aboutDescription);
			console.log(this.aboutTittle);
			this.loading2 = false;
		})
	}

	allClassData: any = []
	mergeTitleClass() {
		new Promise((resolve, reject) => {
			// GET CLASS CATEGORIES
			let url = apt_url + 'ClassCategories';
			this.getClassService.getData(url).subscribe((data: any) => {
				this.classData = data;
				console.log(this.classData);
				console.log(this.classData[0])
				this.loading1 = false;
			})
			resolve(this.classData)
			console.log('Hey 1')
		}).then(response => {
			new Promise((res, rej) => {
				// GET ALL CLASSES
				let url = apt_url + `Classes?filter={"where":{"or":[{"deleted":false},{"purchased":{"gte":1}}]},"include": ["onlinedata","products"]}`
				this.getClassService.getData(url).subscribe((data: any) => {
					this.AllClass = data;
					this.loading3 = false;
					res(data)
				}, error => {
					console.log("class data error ", error);
				});
			}).then(response => {
				console.log('Hey 3')
				// MERGE HERE
				for (let i = 0; i < this.classData.length; i++) {
					this.classData[i].classData = [];
					for (let j = 0; j < this.AllClass.length; j++) {
						if (this.classData[i].id === this.AllClass[j].classcatId) {
							this.classData[i].classData.push(this.AllClass[j])
							// let obj = { ...this.classData[i], ...{ classData: this.AllClass[j] } }
							// this.allClassData.push(obj)
						}
					}
				}
				console.log(this.classData)
			})
		})
	}
}