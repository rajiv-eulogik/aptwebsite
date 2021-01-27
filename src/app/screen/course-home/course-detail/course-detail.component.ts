import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ActivationEnd } from "@angular/router";
import { GetDataServiceService } from '../../../service/get-data-service.service';
import { base_url, apt_url } from "../../../service/config";
import { MatSnackBar } from "@angular/material/snack-bar";
import { interval } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DownloadsAppComponent } from '../../../dialog/downloads-app/downloads-app.component';
import { ExistsComponent } from '../../../exists/exists.component'
import { FormControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable, Subscription, timer } from 'rxjs';
import { flyInOut, expand } from '../../../animation-details/animation-details.component';

const NUM_REGEX = /^[1-9][0-9]{5,19}$/;
const NAME_REGEX = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
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

@Component({
	selector: 'app-course-detail',
	templateUrl: './course-detail.component.html',
	styleUrls: ['./course-detail.component.scss'],
	animations: [
		flyInOut(),
		expand(),
		trigger('slideInDown', [transition('* => *', useAnimation(slideInDown))]),
		trigger('slideInUp', [transition('* => *', useAnimation(slideInUp))]),
		trigger('slideInLeft', [transition('* => *', useAnimation(slideInLeft))]),
		trigger('slideInRight', [transition('* => *', useAnimation(slideInRight))])
	],
})
export class CourseDetailComponent implements OnInit {

	public showloader: boolean = false;
	private subscrip: Subscription;
	private timer: Observable<any>;

	public loading1: boolean = true;
	public loading2: boolean = true;
	public loading3: boolean = true;

	public namelength: any;
	public bool1: boolean;
	public slideInDown: any;
	public slideInUp: any;
	public slideInLeft: any;
	public slideInRight: any;
	public FixAppintmentsForm: FormGroup;
	public classId: string = '';
	public ClassName: string = '';
	public ratingCount: number = 0;
	public SeniorBullet: any = ["Lorem ipsum, or lipsum as it is sometimes known.", " graphic or web designs.", "The purpose of lorem ipsum is to create.", "focus is meant to be on design, not content.", "The passage experienced"];
	public imageUrl: string = apt_url + 'uploads/Class/download/'
	public TooperimageUrl: string = apt_url + 'Uploads/products/download/'
	public timerData: any = [];
	// urm source related variables
	public utm_source: string = '';
	public utm_medium: string = '';
	public campaignType: string = '';
	public publisherId: string = '';
	public val: any;
	public bool: boolean;
	public mobileMax: any;
	public flag: boolean;
	public AllCoutryName: any;
	public img: any;
	public link: any;

	constructor(public fb: FormBuilder, public getTopicService: GetDataServiceService, public router: Router,
		public snakBar: MatSnackBar, public route: ActivatedRoute, public dialog: MatDialog, public sanitizer: DomSanitizer) {
		this.ClassName = this.route.snapshot.queryParamMap.get('name');
		this.classId = this.route.snapshot.queryParamMap.get('id');
		// console.log("subject name & id is here ********",this.ClassName,this.classId);
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
		this.GetAllCountry();
		this.inilizeForm();
		this.GetProductData();
		this.showRating(this.ratingCount);
		this.getClassData();
		// this.setTimer();
		this.getWidth();
		this.formValue(this.namelength);
	}

	mobileDevice: boolean = false
	getWidth(event?) {
		this.mobileDevice = event ? event.target.innerWidth <= 600 ? true : false : window.innerWidth <= 600 ? true : false
	}

	public ngOnDestroy() {
		if (this.subscrip && this.subscrip instanceof Subscription) {
			this.subscrip.unsubscribe();
		}
	}

	public setTimer() {

		// set showloader to true to show loading div on view
		this.showloader = true;

		this.timer = timer(3000); // 5000 millisecond means 5 seconds
		this.subscrip = this.timer.subscribe(() => {
			// set showloader to false to hide loading div from view after 5 seconds
			this.showloader = false;
		});
	}

	onChange(event) {
		console.log(event.dial_code)
		if (event.dial_code == 91) {
		  this.mobileMax = 10;
		  this.flag = true;
		} else {
		  this.mobileMax = 15;
		  this.flag = false;
		}
	  }
	  
	  GetAllCountry() {
		let url = 'assets/jsonFile/allCountryCodes.json'
		console.log(url);
		this.getTopicService.getData(url).subscribe(responce => {
		  // console.log("get class details data is ", responce);
		  this.AllCoutryName = responce;
		  console.log("tisis ", this.AllCoutryName)
		  // this.classDetail = dummy.data;   
		})
	  }

	safeUrl(value: any): SafeResourceUrl {
		return this.sanitizer.bypassSecurityTrustResourceUrl(value)
	}
	// inilize form value 
	inilizeForm() {
		this.FixAppintmentsForm = this.fb.group({
			name: new FormControl('', [Validators.required, Validators.pattern(NAME_REGEX)]),
			email: new FormControl('', [Validators.required, Validators.pattern(EMAIL_REGEX)]),
			mobile: new FormControl('', [Validators.required, Validators.pattern(NUM_REGEX), Validators.minLength(10), Validators.maxLength(10)]),
			country: new FormControl('', [Validators.required]),
		});
	}
	// 

	getClassData() {
		let url = apt_url + 'Classes?filter={"where": {"id": "' + this.classId + '"}}';
		this.getTopicService.getData(url).subscribe(response => {
			let temp: any = response[0];
			this.ClassName = temp.name;
			this.img = temp.image;
			this.ratingCount = 5 //temp.ratingValue;
			this.loading1 = false;
		}, err => {
			console.log("get about course content error ", err);
		});

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


	BuyNow() {
		console.log("do nothigs");
		const dialogRef = this.dialog.open(DownloadsAppComponent, {
			width: '500px',
			disableClose: true,
			data: { screen: "Class DEtail", action: "Course", heading: "Your Information" }
		});

		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed', result);
			if (result !== undefined) {
				let url = apt_url + 'AppUsers/createUser';
				let postData: any = {};
				if (this.utm_source !== null) {
					postData = {
						name: result.name,
						mobile: result.mobile,
						email: result.email,
						createdAt: new Date(),
						"utm_medium": this.utm_medium,
						"compaigntype": this.campaignType,
						"publisherid": this.publisherId,
						"utm_source": this.utm_source,
						"source": this.campaignType,
					}

				} else {
					postData = {
						name: result.name,
						mobile: result.mobile,
						email: result.email,
						createdAt: new Date()
					}
				}

				this.getTopicService.PostData(postData, url).subscribe(responce => {
					console.log("all class data is here ", responce);
					let temp: any = responce;
					this.val = responce["message"]
					if (this.val.includes('already exists')) {
						const dialogRef1 = this.dialog.open(ExistsComponent, {
							width: '500px',
							disableClose: true,
							data: { screen: "Buy details", action: "Course", heading: "Already Purchased!!" }
						});
					}
					else {
						if (this.val != "USER_ALREADY_EXIST") {
							this.snakBar.open('Thanks for sharing your information with us', 'OK', {
								duration: 3000
							})
						}


						if (this.val === "USER_ALREADY_EXIST") {
							const dialogRef1 = this.dialog.open(ExistsComponent, {
								width: '500px',
								disableClose: true,
								data: { screen: "Buy details", action: "Course", heading: "Already Purchased!!" }
							});
						}
						if (this.utm_source !== null) {
							this.router.navigate(['/course/buy-course'], { queryParams: { classId: this.classId, userId: temp.data.userId, utm_source: this.utm_source, utm_medium: this.utm_medium, campaigntype: this.campaignType, publisherid: this.publisherId } });
						} else {
							this.router.navigate(['/course/buy-course'], { queryParams: { classId: this.classId, userId: temp.data.userId } });
						}
					}

				}, error => {
					console.log("app downlods  geting error ", error);
				});
			}
			// this.animal = result;buy-course
			// this.router.navigate(['/course/buy-course'], { queryParams: { id: "5fsf4sd54gdsg4ssdd",name: "8th Class" } });
		});

	}

	existsData() {
	}

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
		// console.log("before data ",this.timerData);
	}
	// timer data start here 
	public source = interval(6000);
	subscription: Subscription;
	SettimeInterval() {
		this.subscription = this.source.subscribe(val => this.shuffle(this.timerData));
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
	// fix appointment function start here  
	formValue(value){
		this.namelength = value;
		if(this.namelength.length > 0)
		this.bool1 = true;
		else
		this.bool1 = false;
		console.log( this.namelength)
	}

	submitForm() {
		console.log("form input value is", this.FixAppintmentsForm.value);
		if (this.FixAppintmentsForm.valid) {
			let postData: any = {};
			if (this.utm_source !== null) {
				postData = {
					name: this.FixAppintmentsForm.value.name,
					mobile: this.FixAppintmentsForm.value.mobile,
					email: this.FixAppintmentsForm.value.email,
					country: this.FixAppintmentsForm.value.country.name,
					countryCode: this.FixAppintmentsForm.value.country.dial_code,
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
					name: this.FixAppintmentsForm.value.name,
					mobile: this.FixAppintmentsForm.value.mobile,
					email: this.FixAppintmentsForm.value.email,
					country: this.FixAppintmentsForm.value.country.name,
					countryCode: this.FixAppintmentsForm.value.country.dial_code,
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
			let url: any = base_url + 'AppoinmentUsers'
			this.getTopicService.PostData(postData, url).subscribe(responce => {
				console.log("all class data is here ", responce);
				// let temp: any = responce;
				this.snakBar.open('Thanks for sharing your information with us', 'OK', {
					duration: 3000
				})
				this.FixAppintmentsForm.reset();
			}, error => {
				console.log("app downlods  geting error ", error);
			});
		} else {
			this.snakBar.open('Please enter Required Fields', 'OK', {
				duration: 3000
			})
		}
	}
	public features: any = [];
	public contentTitle: string = '';
	public contentDescription: string = '';
	public rawImage: string = '';
	public courseVideoURL: string = '';
	public courseVideoTitle: string = '';
	public courseVideoDesc: string = '';
	classData: any
	GetProductData() {
		let url = apt_url + 'OnlineClassdata?filter={"where": {"classId": "' + this.classId + '"}}&access_token=' + localStorage.getItem('aptAccessToken');
		this.getTopicService.getData(url).subscribe(responce => {
			console.log("product data is **** ", responce);
			let temp: any = responce[0];
			this.classData = temp;
			if (temp) {
				if (temp.features !== '' || temp.features !== undefined) {
					this.features = temp.features;
				}

				if (temp.productContent !== '' || temp.productContent !== undefined) {
					this.contentTitle = temp.productContent.title;
					this.contentDescription = temp.productContent.description;
					this.rawImage = apt_url + 'Uploads/products/download/' + temp.productContent.image
				}

				if (temp.courseVideoContent !== '' || temp.courseVideoContent !== undefined) {
					console.log("video", temp.courseVideoContent)
					this.link = temp.courseVideoContent.videoData.link
					this.courseVideoURL = temp.courseVideoContent ? temp.courseVideoContent.url : '';
					this.courseVideoTitle = temp.courseVideoContent ? temp.courseVideoContent.title : '';
					this.courseVideoDesc = temp.courseVideoContent ? temp.courseVideoContent.description : '';
				}
			}

			// if (temp.toppers !== '' && temp.toppers !== undefined) {
			// 	this.bool = true;
			// 	this.timerData = temp.toppers;
			// 	console.log(this.timerData);
			// 	this.SettimeInterval();
			// }
			this.loading3 = false;

		}, err => {
			console.log("get about course content error ", err);
		});
	}
}
