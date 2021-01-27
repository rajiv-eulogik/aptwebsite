import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { GetDataServiceService } from '../../service/get-data-service.service';
import { base_url, apt_url } from "../../service/config";
import { Router, ActivatedRoute } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable, Subscription, timer } from 'rxjs';
import { flyInOut, expand } from '../../animation-details/animation-details.component';
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
const NUM_REGEX = /^[0-9]*$/;
const NAME_REGEX = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

@Component({
	selector: 'app-work-as-collaborator',
	templateUrl: './work-as-collaborator.component.html',
	styleUrls: ['./work-as-collaborator.component.scss'],
	animations: [
		flyInOut(),
		expand(),
		trigger('slideInDown', [transition('* => *', useAnimation(slideInDown))]),
		trigger('slideInUp', [transition('* => *', useAnimation(slideInUp))]),
		trigger('slideInLeft', [transition('* => *', useAnimation(slideInLeft))]),
		trigger('slideInRight', [transition('* => *', useAnimation(slideInRight))])
	],
})
export class WorkAsCollaboratorComponent implements OnInit {

	public showloader: boolean = false;
	private subscription: Subscription;
	private timer: Observable<any>;

	public slideInDown: any;
	public slideInUp: any;
	public slideInLeft: any;
	public slideInRight: any;
	public AllCoutryName: any = [];
	public ColloboraterForm: FormGroup;
	// urm source related variables
	public utm_source: string = '';
	public utm_medium: string = '';
	public campaignType: string = '';
	public publisherId: string = '';
	public mobileMax: number = 10;
	public allState: any = [];
	public AllClass: any = [];
	public AllLanguage: any = [];
	public flag: boolean;
	public workIntrested: any = ['Making Notes', 'Making Subjective Questions', 'Making Objective Questions', 'Checking Subjective Test Papers'];
	constructor(public fb: FormBuilder, public CollaboraterService: GetDataServiceService,
		public router: Router, public snakBar: MatSnackBar, public route: ActivatedRoute,) {
		this.utm_source = this.route.snapshot.queryParamMap.get('utm_source');
		if (this.utm_source !== null) {
			this.utm_medium = this.route.snapshot.queryParamMap.get('utm_medium');
			this.campaignType = this.route.snapshot.queryParamMap.get('campaigntype');
			this.publisherId = this.route.snapshot.queryParamMap.get('publisherid');
		} else { }
	}

	//get all contry mock data 
	GetAllCountry() {
		let url = 'assets/jsonFile/allCountryCodes.json'
		console.log(url);
		this.CollaboraterService.getData(url).subscribe(responce => {
			//console.log("get class details data is ", responce);
			this.AllCoutryName = responce;
			// this.classDetail = dummy.data;   
		})
	}
	ngOnInit(): void {
		this.getWidth();
		this.GetAllCountry();
		this.GetAllState();
		this.initilizeForm();
		this.getAllClaases();
		this.GetLanguage();
		this.setTimer();
	}

	public ngOnDestroy() {
		if (this.subscription && this.subscription instanceof Subscription) {
			this.subscription.unsubscribe();
		}
	}

	public setTimer() {

		// set showloader to true to show loading div on view
		this.showloader = true;

		this.timer = timer(1000); // 5000 millisecond means 5 seconds
		this.subscription = this.timer.subscribe(() => {
			// set showloader to false to hide loading div from view after 5 seconds
			this.showloader = false;
		});
	}
	// get all state json file here 
	GetAllState() {
		let url = 'assets/jsonFile/IndiaStatesDistrict.json'
		console.log(url);
		this.CollaboraterService.getData(url).subscribe(responce => {
			// console.log("get state data is ", responce);
			let temp: any = responce;
			this.allState = temp.states;
			// this.classDetail = dummy.data;   
		})
	}
	GetLanguage() {
		let url = apt_url + '/Languages?filter={"order":"createdAt DESC"}&access_token=' + localStorage.getItem('accessToken');
		this.CollaboraterService.getData(url).subscribe(responce => {
			// console.log("all language data is here ", responce);
			let temp: any = responce;
			this.AllLanguage = temp;
		}, error => {
			console.log("blogs geting error ", error);
		});
	}
	// get all classes here 
	getAllClaases() {
		let postData: any = {};
		//let url = apt_url + 'RemoteMethods/getCourses'
		// let url = apt_url + 'Classes?filter={"where":{"or":[{"deleted":false},{"purchased":{"gte":1}}]}}'
		let url = apt_url + 'Classes?filter={"where":{"or":[{"deleted":false},{"purchased":{"gte":1}}]},"include": ["onlinedata","products"]}'
		this.CollaboraterService.getData(url).subscribe(responce => {
			//  console.log("all class data is here ", responce);
			let temp: any = responce;
			this.AllClass = temp;
		}, error => {
			console.log("blogs geting error ", error);
		});
	}
	// on change max length of data  
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
	// inilize form data here 
	initilizeForm() {
		this.ColloboraterForm = this.fb.group({
			name: new FormControl('', [Validators.required,Validators.pattern(NAME_REGEX)]),
			mobile: new FormControl('', [Validators.required, Validators.pattern(NUM_REGEX)]),
			// contactPersion: new FormControl('', [Validators.required]),
			email: new FormControl('', [Validators.required, Validators.pattern(EMAIL_REGEX)]),
			country: new FormControl('', [Validators.required]),
			state: new FormControl(''),
			city: new FormControl('', [Validators.required,Validators.pattern(NAME_REGEX)]),
			Workintrested: new FormControl('', [Validators.required]),
			Courseintrested: new FormControl('', [Validators.required]),
			medium: new FormControl('', [Validators.required]),
			occupation: new FormControl('', [Validators.required,Validators.pattern(NAME_REGEX)]),
			qualification: new FormControl('', [Validators.required,Validators.pattern(NAME_REGEX)]),
			exprience: new FormControl('', [Validators.required]),
			TimeContact: new FormControl('', [Validators.required]),
		});
	}
	// save data functioon start here 
	SAVEDATA() {
		console.log("join apt form here", this.ColloboraterForm.value);
		let code = this.ColloboraterForm.value.country.dial_code;
		console.log(code)
		let state = this.ColloboraterForm.value.state;
		if (this.ColloboraterForm.valid || (code != "91" && state == "")) {
			let postData: any = {};
			if (this.utm_source !== null) {
				postData = {
					"status": "active",
					"name": this.ColloboraterForm.value.name,
					"mobile": this.ColloboraterForm.value.mobile,
					"country": this.ColloboraterForm.value.country.name,
					"countryCode": this.ColloboraterForm.value.country.dial_code,
					"state": this.ColloboraterForm.value.state,
					"city": this.ColloboraterForm.value.city,
					"createdAt": new Date(),
					"username": this.ColloboraterForm.value.mobile,
					"email": this.ColloboraterForm.value.email,
					"updatedAt": new Date(),
					"jobTitile": this.ColloboraterForm.value.occupation,
					"workExperience": this.ColloboraterForm.value.exprience,
					"district": this.ColloboraterForm.value.city,
					"workIntested": this.ColloboraterForm.value.Workintrested,
					"highestQualification": this.ColloboraterForm.value.qualification,
					"CourseIntrested": this.ColloboraterForm.value.Courseintrested,
					"contactTime": this.ColloboraterForm.value.TimeContact,
					// "highestQualification": "BE",
					"teachingBoard": this.ColloboraterForm.value.medium,
					"teachingMedium": this.ColloboraterForm.value.medium,
					"password": "apt#123",
					"utm_medium": this.utm_medium,
					"compaigntype": this.campaignType,
					"publisherid": this.publisherId,
					"utm_source": this.utm_source,
				}

			} else {
				postData = {
					"status": "active",
					"name": this.ColloboraterForm.value.name,
					"mobile": this.ColloboraterForm.value.mobile,
					"country": this.ColloboraterForm.value.country.name,
					"countryCode": this.ColloboraterForm.value.country.dial_code,
					"state": this.ColloboraterForm.value.state,
					"city": this.ColloboraterForm.value.city,
					"createdAt": new Date(),
					"username": this.ColloboraterForm.value.mobile,
					"email": this.ColloboraterForm.value.email,
					"updatedAt": new Date(),
					"jobTitile": this.ColloboraterForm.value.occupation,
					"workExperience": this.ColloboraterForm.value.exprience,
					"district": this.ColloboraterForm.value.city,
					"workIntested": this.ColloboraterForm.value.Workintrested,
					"highestQualification": this.ColloboraterForm.value.qualification,
					"CourseIntrested": this.ColloboraterForm.value.Courseintrested,
					"contactTime": this.ColloboraterForm.value.TimeContact,
					// "highestQualification": "BE",
					"teachingBoard": this.ColloboraterForm.value.medium,
					"teachingMedium": this.ColloboraterForm.value.medium,
					"password": "apt#123"
				}
			}

			let url = base_url + 'Collaborators'
			this.CollaboraterService.PostData(postData, url).subscribe(res => {
				console.log("Collaborater responce  ", res);
				this.snakBar.open('Thanks for sharing your details', 'OK', {
					duration: 3000
				});
				this.ColloboraterForm.reset();
				Object.keys(this.ColloboraterForm.controls).forEach(key => {
					this.ColloboraterForm.get(key).setErrors(null) ;
				  })
				// this.TopicData = res;
			}, error => {
				console.log("Collaborater error", error);
				this.snakBar.open('Faild to submited Form', 'OK', {
					duration: 3000
				})
			});
		} else {
			this.snakBar.open('Please Enter required fields', 'OK', {
				duration: 3000
			})
		}
	}

	mobileDevice: boolean = false
	getWidth(event?) {
		// FUNCTION GETS THE WIDTH OF THE SCREEN
		this.mobileDevice = event ? event.target.innerWidth <= 600 ? true : false : window.innerWidth <= 600 ? true : false

	}

}
