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
	zoomIn,
	zoomInDown,
	zoomInUp,
	zoomInLeft,
	zoomInRight,
	zoomOut,
	zoomOutDown,
	zoomOutUp,
	zoomOutLeft,
	zoomOutRight
} from 'ng-animate';
const NUM_REGEX = /^[0-9]*$/;
const NAME_REGEX = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

@Component({
	selector: 'app-earn-with-us',
	templateUrl: './earn-with-us.component.html',
	styleUrls: ['./earn-with-us.component.scss'],
	animations: [
		flyInOut(),
		expand(),
		trigger('slideInDown', [transition('* => *', useAnimation(slideInDown))]),
		trigger('slideInUp', [transition('* => *', useAnimation(slideInUp))]),
		trigger('slideInLeft', [transition('* => *', useAnimation(slideInLeft))]),
		trigger('slideInRight', [transition('* => *', useAnimation(slideInRight))])
	],
})
export class EarnWithUsComponent implements OnInit {

	public showloader: boolean = false;
	private subscription: Subscription;
	private timer: Observable<any>;

	public slideInDown: any;
	public slideInUp: any;
	public slideInLeft: any;
	public slideInRight: any;
	public AllCoutryName: any = [];
	public JointAptForm: FormGroup;
	// urm source related variables
	public utm_source: string = '';
	public utm_medium: string = '';
	public campaignType: string = '';
	public publisherId: string = '';
	public allState: any = [];
	public mobileMax: number = 10;
	public flag: boolean;
	constructor(public fb: FormBuilder, public joinAptService: GetDataServiceService, public route: ActivatedRoute,
		public router: Router, public snakBar: MatSnackBar) {
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
		this.joinAptService.getData(url).subscribe(responce => {
			// console.log("get class details data is ", responce);
			this.AllCoutryName = responce;
			// this.classDetail = dummy.data;   
		})
	}
	// get all state json file here 
	GetAllState() {
		let url = 'assets/jsonFile/IndiaStatesDistrict.json'
		console.log(url);
		this.joinAptService.getData(url).subscribe(responce => {
			console.log("get state data is ", responce);
			let temp: any = responce;
			this.allState = temp.states;
			// this.classDetail = dummy.data;   
		})
	}
	ngOnInit(): void {
		this.getWidth();
		this.getWidth();
		this.GetAllCountry();
		this.GetAllState();
		this.initilizeForm();
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
		this.JointAptForm = this.fb.group({
			jobTitile: new FormControl('', [Validators.required,Validators.pattern(NAME_REGEX)]),
			name: new FormControl('', [Validators.required, Validators.pattern(NAME_REGEX)]),
			email: new FormControl('', [Validators.required, Validators.pattern(EMAIL_REGEX)]),
			mobile: new FormControl('', [Validators.required, Validators.minLength(10), Validators.pattern(NUM_REGEX)]),
			country: new FormControl('', [Validators.required]),
			state: new FormControl(''),
			city: new FormControl('', [Validators.required,Validators.pattern(NAME_REGEX)]),
			exprience: new FormControl('', [Validators.required]),
			TimeContact: new FormControl('', [Validators.required]),
		});
	}



	// save data functioon start here 
	SAVEDATA() {
		console.log("join apt form here", this.JointAptForm.value);
		let code = this.JointAptForm.value.country.dial_code;
		let state = this.JointAptForm.value.state;
		console.log(this.JointAptForm.valid)
		if (this.JointAptForm.valid) {
			console.log(this.JointAptForm.valid)
			let postData: any = {};
			if (this.utm_source !== null) {
				postData = {
					"status": "active",
					"name": this.JointAptForm.value.name,
					"mobile": this.JointAptForm.value.mobile,
					"country": this.JointAptForm.value.country.name,
					"countryCode": this.JointAptForm.value.country.dial_code,
					"state": this.JointAptForm.value.state,
					"city": this.JointAptForm.value.city,
					"createdAt": new Date(),
					"username": this.JointAptForm.value.name,
					"email": this.JointAptForm.value.email,
					"updatedAt": new Date(),
					"jobTitile": this.JointAptForm.value.jobTitile,
					"workExperience": this.JointAptForm.value.exprience,
					"password": "apt#123",
					"utm_medium": this.utm_medium,
					"compaigntype": this.campaignType,
					"publisherid": this.publisherId,
					"utm_source": this.utm_source,
				}

			} else {
				postData = {
					"status": "active",
					"name": this.JointAptForm.value.name,
					"mobile": this.JointAptForm.value.mobile,
					"country": this.JointAptForm.value.country.name,
					"countryCode": this.JointAptForm.value.country.dial_code,
					"state": this.JointAptForm.value.state,
					"city": this.JointAptForm.value.city,
					"createdAt": new Date(),
					"username": this.JointAptForm.value.name,
					"email": this.JointAptForm.value.email,
					"updatedAt": new Date(),
					"jobTitile": this.JointAptForm.value.jobTitile,
					"workExperience": this.JointAptForm.value.exprience,
					"password": "apt#123"
				}
			}


			let url = base_url + 'AptUsers'
			console.log("post data is", postData)
			this.joinAptService.PostData(postData, url).subscribe(res => {
				console.log("Join apt  ", res);
				this.snakBar.open('Thanks for sharing your details', 'OK', {
					duration: 3000
				});
				this.JointAptForm.reset();
				Object.keys(this.JointAptForm.controls).forEach(key => {
					this.JointAptForm.get(key).setErrors(null) ;
				  })
				// this.TopicData = res;
			}, error => {
				console.log("Join apt error", error);
				this.snakBar.open('Failed to submit Form', 'OK', {
					duration: 3000
				})
			});
		}
		else {
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
