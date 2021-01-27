import { Component, OnInit, HostBinding } from '@angular/core';
import { transition, trigger, query, style, animate, stagger, useAnimation } from '@angular/animations';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons/faFacebookSquare';
import { faTwitterSquare } from '@fortawesome/free-brands-svg-icons/faTwitterSquare';
import { GetDataServiceService } from '../../service/get-data-service.service';
import { base_url, apt_url } from "../../service/config";
import { ActivatedRoute, Router, ActivationEnd } from "@angular/router";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DownloadsAppComponent } from '../../dialog/downloads-app/downloads-app.component';
import { MatSnackBar } from "@angular/material/snack-bar";
import { flyInOut, expand } from '../../animation-details/animation-details.component';
import { Observable, Subscription, timer, interval } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
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

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	// animations: [
	//   trigger('slideInDown', [transition('* => *', useAnimation(slideInDown))]),
	//   trigger('slideInUp', [transition('* => *', useAnimation(slideInUp))]),
	//   trigger('slideInLeft', [transition('* => *', useAnimation(slideInLeft))]),
	//   trigger('slideInRight', [transition('* => *', useAnimation(slideInRight))]),
	//   flyInOut(),
	//   expand()
	// ],
})
export class HomeComponent implements OnInit {

	public showloader: boolean = false;
	private subscription: Subscription;
	private timer: Observable<any>;

	public loading1: boolean = true;
	public loading2: boolean = true;
	public loading3: boolean = true;
	public loading4: boolean = true;

	public blogData: any;
	public dataSource: any;

	public slideInDown: any;
	public slideInUp: any;
	public slideInLeft: any;
	public slideInRight: any;
	public classData: any;
	fbIcon = faFacebookSquare;
	tweetIcon = faTwitterSquare;
	facebook = '#3b5998';
	google = '#DB4437'
	twitter = '#3EACEE'
	public AllBlogs: any = [];
	public AllClass: any = [];
	public imageUrl: string = base_url + 'uploads/blogs/download/';
	public topperImage = base_url + 'uploads/dashboard/download/';
	public SeniorBullet: any = ["Lorem ipsum, or lipsum as it is sometimes known.", " graphic or web designs.", "The purpose of lorem ipsum is to create.", "focus is meant to be on design, not content.", "The passage experienced"];
	// urm source related variables
	public utm_source: string = '';
	public utm_medium: string = '';
	public campaignType: string = '';
	public publisherId: string = '';

	images_girl: any = ['home_1', 'home_3', 'home_2', 'home_4', 'home_5', 'home_7', 'home_6', 'home_9', 'home_8', 'home_10']

	images_boy: any = ['boy_1', 'boy_3', 'boy_2', 'boy_4', 'boy_6', 'boy_5']

	constructor(public snakBar: MatSnackBar, public getDataService: GetDataServiceService, public router: Router, public dialog: MatDialog, public route: ActivatedRoute,) {
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
		this.GetToppersSpeak();
	}

	ngOnInit(): void {
		//this.SettimeInterval();
		this.GetALLClass();
		this.getBlogsData();
		this.getClassCategoriesData()
		//this.setTimer();
		this.getWidth();
		this.GetBlogs();
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

	public timerData: any = [];
	public TopperTitle: string = '';
	toppersData: any;

	GetBlogs() {
		let url = base_url + 'Blogs?filter={"where": {"status": "published"},"include": ["categories","staff"],"order" : "createdAt ASC"}'
		this.getDataService.getData(url).subscribe(responce => {
			console.log("all blogs is here ", responce);
			let temp: any = responce;
			this.AllBlogs = temp.data;
			this.blogData = [...this.AllBlogs]
			this.dataSource = new MatTableDataSource(this.AllBlogs);
			this.loading2 = false;
			// let dummy = document.getElementById('blog');
			// console.log("sfgaskfgakfgaskafs",dummy);
			// document.getElementById('blog').innerHTML =  dummy.innerText.substring(0, 250);
		}, error => {
			console.log("blogs geting error ", error);
		});
	}

	GetToppersSpeak() {
		let url = base_url + 'Settings?filter={"where": {"type": "topperSpeaks"}}'
		// console.log(url);
		this.getDataService.getData(url).subscribe((response: any) => {
			console.log("get Toppers speak data ", response);
			this.toppersData = response.data[0]; 
			this.timerData = response.data[0].topperSpeak;
			this.TopperTitle = response.data[0].speakTitle;
			this.loading1 = false;
			document.getElementById("title1").innerHTML = this.TopperTitle;
			// this.SettimeInterval();
			// this.classDetail = dummy.data;   
		})
	}
	// toppers spaek suffle array value 
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
		this.timerData = array;
		console.log("before data ", this.timerData);
	}
	// timer data start here 
	//  public source: any = interval(6000);
	//  subscription: Subscription;
	//   SettimeInterval() {
	//      this.subscription = this.source.subscribe(val =>  this.shuffle(this.timerData));
	//  }
	public myInterval;
	SettimeInterval() {
		this.myInterval = setInterval(() => {
			this.shuffle(this.timerData)
		}, 6000);

	}

	// stopInterval() {
	//   //console.log("interval fun load many time");
	//     clearInterval(this.myInterval);
	// }


	NextIndex(index) {
		let temp = this.timerData[0];
		// this.timerData.splice(index, 1);
		// console.log("before data ", this.timerData);
		let temp2 = this.timerData[1];
		let temp3 = this.timerData[2];
		this.timerData = [];
		this.timerData.push(temp3)
		this.timerData.push(temp)
		this.timerData.push(temp2)
		clearInterval(this.myInterval);

	}

	backIndex(index) {
		let temp = this.timerData[0];
		// this.timerData.splice(index, 1);
		// console.log("before data ", this.timerData);
		let temp2 = this.timerData[1];
		let temp3 = this.timerData[2];
		this.timerData = [];
		this.timerData.push(temp2)
		this.timerData.push(temp3)
		this.timerData.push(temp)
		// this.timerData.splice(0, 0, temp3);
		// this.timerData.splice(1, 0, temp2);
		// let datalength = this.timerData.length;
		//this.timerData.push(temp);
		// this.timerData.splice(2, 0, temp);
		console.log("after data ", this.timerData);

		clearInterval(this.myInterval);
		// this.timerData.shift();
		// this.SettimeInterval();
		// // And swap it with the current element.
		// var currentIndex = this.timerData.length, temporaryValue, randomIndex;
		// temporaryValue = this.timerData[index];
		// this.timerData[index] = this.timerData[randomIndex];
		// this.timerData[randomIndex] = temporaryValue;
	}

	// get blog data her e

	getBlogsData() {
		let url = base_url + 'Blogs?filter={"where": {"status": "published"},"include": ["categories","staff"],"order" : "createdAt ASC"}'
		this.getDataService.getData(url).subscribe(responce => {
			console.log("all blogs is here ", responce);
			let temp: any = responce;
			this.AllBlogs = temp.data;
			this.loading2 = false;
		}, error => {
			console.log("blogs geting error ", error);
		});
	}

	showdata(data, index) {
		let iddata = document.getElementById('blogdata' + index).innerHTML = data;
		document.getElementById('blogdata' + index).innerHTML = document.getElementById('blogdata' + index).innerText.substring(0, 500);
		return true
	}
	// get all classes here 
	GetALLClass() {
		let postData: any = {};
		//let url = apt_url + 'RemoteMethods/getCourses'
		let url = apt_url + 'Classes?filter={"where":{"or":[{"deleted":false},{"purchased":{"gte":1}}]},"include": ["onlinedata","products"]}'
		this.getDataService.getData(url).subscribe((data: any) => {
			console.log("all class data is here ", data);
			this.AllClass = data;
			console.log(this.AllClass);
			new Promise((resolve, reject) => {
				this.classData = this.mergeClassData(this.classData, this.AllClass)
				resolve(this.classData)
			}).then(res => {
				console.log(res)
				this.classData = this.removeNon(res)
			})
			console.log(this.classData)
			this.loading3 = false;
		}, error => {
			console.log("blogs geting error ", error);
		});
	}


	removeNon(arry) {
		for (let i = 0; i < arry.length; i++) {
			const element = arry[i];
			if (element.classes.length === 0) {
				arry.splice(i, 1)
				i--
			}
			if(i === arry.length - 1) {
				return arry
			}
		}

	}

	public getClassCategoriesData() {
		let url = apt_url + 'ClassCategories/?filter={%22order%22:%20%22index%20ASC%22}';
		this.getDataService.getData(url).subscribe(responce => {
			// console.log("get class categories data is ", responce);
			this.classData = responce;
			console.log("classs data" ,this.classData);
			this.GetALLClass()
		})
	}

	mergeClassData(cat, classData) {
		for (let i = 0; i < cat.length; i++) {
			const category = cat[i];
			category.classes = []
			for (let j = 0; j < classData.length; j++) {
				const cls = classData[j];
				if (cls.status === 'published') {
					if (category.id === cls.classcatId) {
						category.classes.push(cls)
						if (i === cat.length - 1 && j === classData.length - 1) {
							return cat
						}
					}
				}
				if (i === cat.length - 1 && j === classData.length - 1) {
					return cat
				}
			}
		}
	}


	// i am here start working this
	DownloadsApp() {
		console.log("do nothings");
		const dialogRef = this.dialog.open(DownloadsAppComponent, {
			width: '500px',
			disableClose: true,
			data: { screen: "home", action: "download App", heading: "Your Information" },
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

				this.getDataService.PostData(postData, url).subscribe(responce => {
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
	// navigate couse screen 
	CousesSceen() {
		if (this.utm_source !== null) {
			this.router.navigate(['/course'], { queryParams: { utm_source: this.utm_source, utm_medium: this.utm_medium, campaigntype: this.campaignType, publisherid: this.publisherId } })
		} else {
			this.router.navigate(['/course']);
		}
	}
	// course detail screen 
	CousesDetailScreen(data) {

		if (this.utm_source !== null) {
			this.router.navigate(['/course/course-details'], { queryParams: { id: data.id, name: data.name, utm_source: this.utm_source, utm_medium: this.utm_medium, campaigntype: this.campaignType, publisherid: this.publisherId } })
		} else {
			this.router.navigate(['/course/course-details'], { queryParams: { id: data.id, name: data.name } });
		}
	}

	BlogsScreen() {
		console.log("do nothings");

		if (this.utm_source !== null) {
			this.router.navigate(['/blogs'], { queryParams: { utm_source: this.utm_source, utm_medium: this.utm_medium, campaigntype: this.campaignType, publisherid: this.publisherId } })
		} else {
			this.router.navigate(['/blogs']);
		}

	}

	BlogDetail(data) {
		if (this.utm_source !== null) {
			this.router.navigate(['/blogs/blog-details'], { queryParams: { id: data.id, utm_source: this.utm_source, utm_medium: this.utm_medium, campaigntype: this.campaignType, publisherid: this.publisherId } })
		} else {
			this.router.navigate(['/blogs/blog-details'], { queryParams: { id: data.id } })
		}

	}

}
