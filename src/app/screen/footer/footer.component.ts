import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ActivationEnd } from "@angular/router";
import { GetDataServiceService } from '../../service/get-data-service.service';
import { base_url, apt_url } from "../../service/config";
import { trigger, transition, useAnimation } from '@angular/animations';
import {
	slideInDown,
	slideInUp,
	slideInLeft,
	slideInRight,
	slideOutDown,
	slideOutUp,
	slideOutLeft,
	slideOutRight
} from 'ng-animate';

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss']

})
export class FooterComponent implements OnInit {
	// urm source related variables
	public val: any;
	public route1: any;
	public cols: number = 4;
	public utm_source: string = '';
	public utm_medium: string = '';
	public campaignType: string = '';
	public publisherId: string = '';
	public PhotoStream: any = [];
	public domain_url: string = 'http://142.93.212.14:4000/';
	public ImageUrl: string = base_url + 'uploads/dashboard/download/';
	constructor(public router: Router, public route: ActivatedRoute, public FooterService: GetDataServiceService) {
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
		this.getPhotoStream();
		this.getWidth();
		var url = this.router.url;
		this.val = url.split("?");
		this.route1 = this.val[0];
		console.log(this.route1);
	}


	

	showFooter() {
		if(this.router.url.includes('payments-success')) {
			return false
		}
		else if(this.router.url.includes('payments-failed')) {
			return false
		}
		else if(this.router.url.includes('feedback')) {
			return false
		}
		else {
			return true
		}
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

	facebookShare() {
		console.log("i am call here ")
		// setTimeout(() => {
		document.getElementById("faceBook").click();
		// }, 1000);  
	}
	// navigate couse screen 
	CousesSceen() {
		if (this.utm_source !== null) {
			this.router.navigate(['/course'], { queryParams: { utm_source: this.utm_source, utm_medium: this.utm_medium, campaigntype: this.campaignType, publisherid: this.publisherId } })
		} else {
			this.router.navigate(['/course']);
		}
	}

	AboutScreen() {
		if (this.utm_source !== null) {
			this.router.navigate(['/about-us'], { queryParams: { utm_source: this.utm_source, utm_medium: this.utm_medium, campaigntype: this.campaignType, publisherid: this.publisherId } })
		} else {
			this.router.navigate(['/about-us']);
		}
	}

	appDownloadScreen() {
		if (this.utm_source !== null) {
			this.router.navigate(['/downloadapp'], { queryParams: { utm_source: this.utm_source, utm_medium: this.utm_medium, campaigntype: this.campaignType, publisherid: this.publisherId } })
		} else {
			this.router.navigate(['/downloadapp']);
		}
	}

	privacyPolicyScreen() {
		if (this.utm_source !== null) {
			this.router.navigate(['/privacy-policy'], { queryParams: { utm_source: this.utm_source, utm_medium: this.utm_medium, campaigntype: this.campaignType, publisherid: this.publisherId } })
		} else {
			this.router.navigate(['/privacy-policy']);
		}
	}

	feedbackScreen() {
		if (this.utm_source !== null) {
			this.router.navigate(['/feedback'], { queryParams: { utm_source: this.utm_source, utm_medium: this.utm_medium, campaigntype: this.campaignType, publisherid: this.publisherId } })
		} else {
			this.router.navigate(['/feedback']);
		}
	}



	getPhotoStream() {
		let url = base_url + 'Settings?filter={"where": {"type": "photoStream"}}'
		this.FooterService.getData(url).subscribe(responce => {
			// console.log("get speak data ", responce);
			let dummy: any = [];
			dummy = responce;
			this.PhotoStream = dummy.data[0].photos;
		})
	}
	// all blogs screen 
	BlogsScreen() {
		console.log("do nothings");

		if (this.utm_source !== null) {
			this.router.navigate(['/blogs'], { queryParams: { utm_source: this.utm_source, utm_medium: this.utm_medium, campaigntype: this.campaignType, publisherid: this.publisherId } })
		} else {
			this.router.navigate(['/blogs']);
		}
	}

	PhotoStreamDetail() {
		this.router.navigate(['/photo-stream']);
	}

}
