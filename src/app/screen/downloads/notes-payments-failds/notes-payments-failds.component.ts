import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ActivationEnd } from "@angular/router";
import { GetDataServiceService } from '../../../service/get-data-service.service';
import { base_url, apt_url, Paytm_url } from "../../../service/config";
import { MatSnackBar } from "@angular/material/snack-bar";
import { interval, Subscription } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DownloadsAppComponent } from '../../../dialog/downloads-app/downloads-app.component';
import { FormControl, FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
	selector: 'app-notes-payments-failds',
	templateUrl: './notes-payments-failds.component.html',
	styleUrls: ['./notes-payments-failds.component.scss']
})
export class NotesPaymentsFaildsComponent implements OnInit {
	public fileId: string = '';
	public fid: string = '';
	public fileData: any = {};
	public discountPrice: number;
	public CoursePrice: number;
	public CoursePurchasesedForm: FormGroup;
	public classId: string = '';
	public ClassName: string = '';
	public userId: string = '';
	public allSubject: any = [];

	constructor(public fb: FormBuilder, public FileService: GetDataServiceService, public router: Router,
		public snakBar: MatSnackBar, public route: ActivatedRoute, public dialog: MatDialog) {
		this.fileId = this.route.snapshot.queryParamMap.get('fileId');
		this.fid = this.route.snapshot.queryParamMap.get('id');
		console.log("id", this.fid);
		console.log("file id", this.fileId);
		this.userId = this.route.snapshot.queryParamMap.get('userId');
		this.classId = this.route.snapshot.queryParamMap.get('classId');
		console.log("subject name & id is here ", this.ClassName, this.classId);
	}

	ngOnInit(): void {
		this.inilizeValue()
		this.getFileData();
		this.getClassPrice();
		this.getClassPrice();
		this.getDiscountedPrice();
	}

	inilizeValue() {
		this.CoursePurchasesedForm = this.fb.group({
			course: new FormControl(['Full Course'], [Validators.required]),
			coupans: new FormControl(''),
		});
	}
	someMethod(event) {
		console.log("event value is", event);
		// event[0].
	}
	getFileData() {
		let url = apt_url + 'Downloads/' + this.fileId
		this.FileService.getData(url).subscribe(responce => {
			console.log("file  data id here", responce);
			let temp: any = responce;
			this.fileData = temp;
			// this.discription = temp.description;
			// window.open(this.pdfUrl + temp.fileName, '_blank');
		}, error => {
			console.log("downlods sucess error", error);
		});
	}

	getAllSubject() {
		let url = apt_url + 'RemoteMethods/getCourses';
		let postData: any = {
			classId: this.classId
		};
		this.FileService.PostData(postData, url).subscribe(responce => {
			console.log("all subject id here data is **** ", responce);
			let temp: any = responce;
			this.allSubject = temp.data;
		}, err => {
			console.log("get about course content error ", err);
		});
	}

	PAYNOW() {
		console.log("do nothigs", this.CoursePurchasesedForm.value);
		if (this.CoursePurchasesedForm.value.coupans == '') {
			console.log("send without coupans");
			this.router.navigate(['/downloads/paytm'], { queryParams: { classId: this.classId, userId: this.userId, price: this.CoursePrice, coupon: '0', transactionType: 'buyproduct', couponId: '123456789' } });
			// http://142.93.212.14:3025/paymentProcessCourse?transactionType=buyproduct&&classId=5e846ea4f70b88227df22189&&userId=5e8db0f6fe721f73f3740380&&credit=100&&coupon=0
		} else {
			console.log("send with coupans");
			let url = apt_url + 'Coupons?filter={"where": {"code": "' + this.CoursePurchasesedForm.value.coupans + '"}}';
			this.FileService.getData(url).subscribe(responce => {
				console.log("all class data is here ", responce);
				let temp: any = responce;
				if (temp.length == 0) {
					this.snakBar.open('Invalid Coupan Code!', 'OK', {
						duration: 3000
					})
					this.router.navigate(['/downloads/paytm'], { queryParams: { classId: this.classId, userId: this.userId, price: this.CoursePrice, coupon: '0', transactionType: 'buyproduct', couponId: '123456789' } });
				} else if (temp[0].status == "expired") {
					this.snakBar.open('Coupan Code has been expired !', 'OK', {
						duration: 3000
					})
					this.router.navigate(['/downloads/paytm'], { queryParams: { classId: this.classId, userId: this.userId, price: this.CoursePrice, coupon: '0', transactionType: 'buyproduct', couponId: '123456789' } });
				} else {
					this.router.navigate(['/downloads/paytm'], { queryParams: { classId: this.classId, userId: this.userId, price: this.CoursePrice, coupon: temp[0].amount, transactionType: 'buyproduct', couponId: temp[0].id } });
				}

			}, error => {
				console.log("app downlods  geting error ", error);
			});
		}
		// this.router.navigate(['/course/payments-faild'], { queryParams: { id: "5fsf4sd54gdsg4ssdd",name: "8th Class" } });
	}



	// get all calss Data here 
	getClassPrice() {
		let url = apt_url + 'RemoteMethods/getCourses';
		let postData: any = {

		};
		this.FileService.PostData(postData, url).subscribe(responce => {
			console.log("all getClassPrice here data is **** ", responce);
			let temp: any = responce;
			for (let i = 0; i < temp.data.length; i++) {
				if (temp.data[i]._id == this.classId) {
					this.CoursePrice = temp.data[i].productSum;
				} else {

				}
			}
			//  this.allSubject = temp.data;CoursePrice
		}, err => {
			console.log("get about course content error ", err);
		});
	}

	getDiscountedPrice() {
		let url = apt_url + 'Classes?filter={"where":{"id":"5f255bc721371a76fe1f6aa2"}}';
		let postData: any = {

		};
		this.FileService.getData(url).subscribe(responce => {
			console.log("all discountPrice here data is **** ", responce);
			let temp: any = responce;
			this.discountPrice = temp[0].discountPrice;

			//  this.allSubject = temp.data;CoursePrice
		}, err => {
			console.log("discount price error ", err);
		});
	}

}
