import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { ComponentPortal } from '@angular/cdk/portal';
import { MatSnackBar } from "@angular/material/snack-bar";
import { base_url } from '../../../service/config';
import { HttpClient } from "@angular/common/http";
//import { PromotionalFormTemplateComponent } from 'src/app/screens/promotional-form-template/promotional-form-template.component';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'app-face-camp',
	templateUrl: './face-camp.component.html',
	styleUrls: ['./face-camp.component.scss']
})
export class FaceCampComponent implements OnInit {
	id: any = ''
	normalCampaignData: any;
	dir = base_url + 'uploads/classes/download/'
	mobileDevice: boolean = false
	campForm = new FormGroup({});
	formData: any = [
		{
			key: "name",
			label: "Name",
			required: true,
			subtype: "text",
			type: "Textinput"
		},
		{
			key: "country",
			label: "Country",
			multiple: false,
			options: ["India", "UAE", "Bangladesh", "Singapore", "Nepal"],
			required: true,
			subtype: "single",
			type: "Dropdown"
		},
		{
			key: "city",
			label: "City",
			required: true,
			subtype: "text",
			type: "Textinput"
		},
		{
			key: "mobile",
			label: "Contact Number",
			required: true,
			subtype: "text",
			type: "Textinput"
		},
		{
			key: "email",
			label: "Email",
			required: true,
			subtype: "text",
			type: "Textinput"
		}
	]


	constructor(public http: HttpClient, public route: ActivatedRoute, public matSnackBar: MatSnackBar) {
		this.id = this.route.snapshot.queryParamMap.get('id')
		this.getData(this.id)
	}
	
	formLoaded: boolean = false;
	formPortal: ComponentPortal<any>;
	initPortal() {
		// THIS METHOD WILL SET THE TEMPLATE VALUE
		// setTimeout(() => {

		// }, 6000)
		//this.formPortal = new ComponentPortal(PromotionalFormTemplateComponent);
		console.log(this.formPortal)
		// this.formLoaded = true
	}

	ngOnInit() {
		this.getWidth()
		// this.initPortal()
	}

	getWidth(event?) {
		this.mobileDevice = event ? event.target.innerWidth <= 959 ? true : false : window.innerWidth <= 959 ? true : false
	}



	getData(id) {
		this.getFaceToFace(id).subscribe((data: any) => {
			console.log(data)
			if (data.statusCode === 200) {
				this.normalCampaignData = data.data
				this.getForm(id).subscribe((form: any) => {
					console.log(form)
					if (form.data.length > 0) {
						this.formData = [...this.formData, ...form.data[0].requestData.fields]
						console.log(this.formData)
						this.createForm(this.formData)
					}
					if (form.statusCode === 200) {
						this.normalCampaignData.form = form.data[0]
						// setForm(form.data[0])
						console.log(this.normalCampaignData)
					}
				})
			}
		}, err => {
			this.matSnackBar.open('Failed to get data from server', 'OK', {
				duration: 2000
			})
		})
	}

	getFaceToFace(id) {
		let url = base_url + 'Classes/' + id;
		return this.http.get(url)
	}

	getForm(id) {
		let url = base_url + 'Forms/'
		let filter = '?filter={"where": {"campaignId": "' + id + '"}}'
		return this.http.get(url + filter)
	}

	createForm(data) {
		data.forEach((element, index) => {
			this.campForm.addControl(element.key, new FormControl('', element.required ? [Validators.required] : []))
			if(index === data.length - 1) {
				this.formLoaded = true
			}
		});
	}

	submit() {
		console.log(this.campForm.value)
	}

}
