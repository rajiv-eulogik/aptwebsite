import { Component, OnInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { GetDataServiceService } from '../../service/get-data-service.service';
import { base_url, apt_url } from "../../service/config";
import { DOCUMENT } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable, Subscription, timer } from 'rxjs';
import { flyInOut, expand } from '../../animation-details/animation-details.component';
const NUM_REGEX = /^[1-9][0-9]{5,19}$/;
const NAME_REGEX = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const text_regex = /^[a-zA-Z,'-'' '\.0-9\n]+$/
@Component({
	selector: 'app-blogs-detail',
	templateUrl: './blogs-detail.component.html',
	styleUrls: ['./blogs-detail.component.scss'],
	animations: [
		flyInOut(),
		expand(),
	]
})
export class BlogsDetailComponent implements OnInit {

	public showloader: boolean = false;
	private subscription: Subscription;
	private timer: Observable<any>;

	public loading1: boolean = true;
	public loading2: boolean = true;
	public loading3: boolean = true;
	public loading4: boolean = true;
	public loading5: boolean = true;

	public searchValue: string = '';
	public details: string = '';
	public Allcategory: any = [];
	public AllBlogs: any = [];
	public blogDetail: any = {};
	public dataSource: any;
	public blogsId: string = '';
	public commentsForm: FormGroup;
	public adminname: string = '';
	public imageUrl: string = base_url + 'uploads/blogs/download/';
	// urm source related variables
	public utm_source: string = '';
	public utm_medium: string = '';
	public campaignType: string = '';
	public publisherId: string = '';
	public commentsCount: number = 0;
	public len: number=0;
	public bool1: boolean;
	public value: any;
	public mobileMax: any;
	public flag: boolean;
	public AllCoutryName: any;
	public count: number = 0;
	public keycount: number =0;
	public categcount: number = 0;

	constructor(public fb: FormBuilder, public route: ActivatedRoute,
		public router: Router, public blogService: GetDataServiceService,
		@Inject(DOCUMENT) document, public snakBar: MatSnackBar) {
		this.blogsId = route.snapshot.queryParamMap.get('id');
		this.utm_source = this.route.snapshot.queryParamMap.get('utm_source');
		if (this.utm_source !== null) {
			this.utm_medium = this.route.snapshot.queryParamMap.get('utm_medium');
			this.campaignType = this.route.snapshot.queryParamMap.get('campaigntype');
			this.publisherId = this.route.snapshot.queryParamMap.get('publisherid');
		} else { }
	}

	ngOnInit(): void {
		this.GetBlogCategory();
		this.GetBlogs();
		this.getBlogDetail();
		this.inilizeForm();
		this.getBlogsCommentsCount();
		window.scrollTo(10, 0)
		this.setTimer();
		this.getWidth();
		this.getAllBlogs();
		this.GetAllCountry();
		let userValues = sessionStorage.getItem('user_comment') ? JSON.parse(sessionStorage.getItem('user_comment')) : null
		if(userValues) {
			this.setFormValue(userValues)
		} 
	}


	mobileDevice: boolean = false
	getWidth(event?) {
		this.mobileDevice = event ? event.target.innerWidth <= 600 ? true : false : window.innerWidth <= 600 ? true : false
	}


	blogData: any = [];
	allPosts: any = []
	getAllBlogs() {
		let url = base_url + 'Blogs?filter={"where": {"status": "published"},"include": ["categories","staff"],"order" : "createdAt ASC"}'
		this.blogService.getData(url).subscribe((data: any) => {
			this.allPosts = data.data;
			 console.log("asds" ,this.allPosts)
			this.blogData = [...this.AllBlogs]
			this.dataSource = new MatTableDataSource(this.dataSource);
		}, error => {
			console.log("blogs geting error ", error);
		});
	}

	code(val){
		this.value = val;
		console.log(this.value)
		if(this.value == '91' || this.value == '+91')
		this.bool1 = false;
		else
		this.bool1 = true;
	}

	showdata(data, index) {
		let iddata = document.getElementById('blogdata' + index).innerHTML = data;
		document.getElementById('blogdata' + index).innerHTML = document.getElementById('blogdata' + index).innerText.substring(0, 500);
		return true
	}

	returnValName(array: any, type: string) {
		var returnArray: any = [];
		if (type === 'cat') {
			if (array.length > 0) {
				for (let index = 1; index < array.length; index++) {
					returnArray.push(array[index].title)
				}
				return returnArray.toString().replace(/,/g, ", ")
			}
			else
				return ''
		}
		else {
			if (array.length > 0) {
				for (let index = 1; index < array.length; index++) {
					returnArray.push(array[index])
				}
				return returnArray.toString().replace(/,/g, ", ")
			}
			else
				return ''
		}
	}

	filterByCat(category) {
		this.allPosts = this.blogData.filter(blog => blog.categoryIds.includes(category.id))
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
	// inilize form group here 
	inilizeForm() {
		this.commentsForm = this.fb.group({
			name: new FormControl('', [Validators.required]),
			email: new FormControl('', [Validators.required, Validators.pattern(EMAIL_REGEX)]),
			mobile: new FormControl('', [Validators.required, Validators.pattern(NUM_REGEX)]),
			query: new FormControl('', [Validators.required, Validators.pattern(text_regex)]),
			country: new FormControl('', [Validators.required]),
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
		this.blogService.getData(url).subscribe(responce => {
		  // console.log("get class details data is ", responce);
		  this.AllCoutryName = responce;
		  // this.classDetail = dummy.data;   
		})
	  }

	setFormValue(values) {
		// SETS VALUE FOR THE FORM
		this.commentsForm.patchValue({
			name: values.name,
			email: values.email,
			mobile: values.mobile,
			countrycode: values.countrycode
		})
	}

	showSearch: boolean = false
	applyFilter(filterValue: string) {
		this.showSearch = true;
		console.log("do nothings", filterValue);
		this.dataSource.filter = filterValue.trim().toLowerCase();
		console.log("filter screen  ", this.dataSource)
		this.AllBlogs = this.dataSource.filteredData;
		console.log(this.AllBlogs);
		if(this.dataSource.filter.length==0){
			this.count = 0
		}
		let url = base_url + 'Blogs?filter={"where": {"status": "published"},"include": ["categories","staff"],"order" : "createdAt ASC"}'
		this.blogService.getData(url).subscribe((data: any) => {
			this.allPosts = data.data;
			 console.log("asds" ,this.allPosts)
			 for(let i = 0;i<this.allPosts.length;i++){
				 if(this.allPosts[i].title.trim().toLowerCase() == this.dataSource.filter){
					this.count = this.count + 1
				 }
				 for(let j=0;j<this.allPosts[i].keywords.length;j++){
					if(this.allPosts[i].keywords[j].trim().toLowerCase() == this.dataSource.filter){
						this.count = this.count + 1
					 }
				 }
				 for(let k=0;k<this.allPosts[i].categories.length;k++){
					if(this.allPosts[i].categories[k].title.trim().toLowerCase() == this.dataSource.filter){
						this.count = this.count + 1
					 }
				 }
			 }
			this.blogData = [...this.AllBlogs]
			this.dataSource = new MatTableDataSource(this.dataSource);
		}, error => {
			console.log("blogs geting error ", error);
		});
	}

	OnSearch() {
		this.searchValue = '';
		this.showSearch = false
		this.GetBlogs();

	}
	getBlogsCommentsCount() {
		let url = base_url + 'Comments/count?"where": { "blogId": "' + this.blogsId + '", "status": "active"}'
		this.blogService.getData(url).subscribe(responce => {
			console.log("Comments counts ", responce);
			let temp: any = responce;
			this.commentsCount = temp.data.count;
			console.log(this.commentsCount);
			this.loading1 = false;
		}, error => {
			console.log("blogs category geting error ", error);
		});
	}
	BlogDetail(data) {
		this.router.navigate(['/blogs/blog-details'], { queryParams: { id: data.id } })
	}
	// get blogs category here 
	GetBlogCategory() {
		let url = base_url + 'Categories?filter={"where": {"status": "published"}}'
		this.blogService.getData(url).subscribe(responce => {
			console.log("all blogs category is here ", responce);
			let temp: any = responce;
			this.Allcategory = temp.data;
			this.loading2 = false;
		}, error => {
			console.log("blogs category geting error ", error);
		});
	}
	// get all published blogs in gere 
	GetBlogs() {
		let url = base_url + 'Blogs?filter={"where": {"status": "published"},"include": ["categories","staff"],"order" : "createdAt ASC"}'
		this.blogService.getData(url).subscribe(responce => {
			console.log("all blogs is here ", responce);
			let temp: any = responce;
			this.AllBlogs = temp.data;
			this.loading3 = false;
			// let dummy = document.getElementById('blog');
			// console.log("sfgaskfgakfgaskafs",dummy);/Comments?filter={"where": { "blogId": "5ea15934d95c0863d67b016a", "status": "active"}}
			// document.getElementById('blog').innerHTML =  dummy.innerText.substring(0, 250);
		}, error => {
			console.log("blogs geting error ", error);
		});
	}
	public staffData: any = {};
	public BlogcategoryName: string = '';
	public CategoryLength: number = 0;
	// get Blog Detail data blogDetail
	getBlogDetail() {
		// this.loading1 =false;
		// this.loading2 = false;
		// this.loading3 = false;
		let url = base_url + 'Blogs/' + this.blogsId + '?filter={"where": {"status": "published"},"include": [{"relation":"comments","scope":{"include":{"relation":"Reply"}}},"categories","staff"]}'
		this.blogService.getData(url).subscribe(responce => {
			console.log("all blogs is here ", responce);
			let temp: any = responce;
			this.blogDetail = temp.data;
			console.log(this.blogDetail.comments)
			var val = this.blogDetail.comments;
			for(let i=0;i<val.length;i++){
				if(val[i].admin)
				this.adminname = val[i].admin.name
				if(val[i].status=='active')
					this.len = this.len + 1;
			}
			console.log(this.adminname)
			this.staffData = this.blogDetail.staff;
			let cate = this.blogDetail.categories;
			this.CategoryLength = cate.length;
			this.BlogcategoryName = cate[0].title;
			this.loading4 = false;

			//  document.getElementById('blogdata').innerHTML = this.blogDetail.content;
			//this.details = this.blogDetail.content;
			// iddata.innerText.substring(0, 250); 
		}, error => {
			console.log("blogs geting error ", error);
		});
	}
	submitForm() {
		console.log("do nothigs", this.commentsForm.value);
		console.log(this.commentsForm.touched);
		if (this.commentsForm.valid) {
			sessionStorage.setItem('user_comment', JSON.stringify(this.commentsForm.value))
			let postData: any = {};
			if (this.utm_source !== null) {
				postData = {
					"blogId": this.blogsId,
					"createdAt": new Date(),
					"comment": this.commentsForm.value.query,
					"status": "active",
					"user": {
						"name": this.commentsForm.value.name,
						"country": this.commentsForm.value.country.name,
					"countryCode": this.commentsForm.value.country.dial_code,
						"mobile": this.commentsForm.value.mobile,
						"email": this.commentsForm.value.email
					},
					"utm_medium": this.utm_medium,
					"compaigntype": this.campaignType,
					"publisherid": this.publisherId,
					"utm_source": this.utm_source,
				}

			} else {
				postData = {
					"blogId": this.blogsId,
					"createdAt": new Date(),
					"comment": this.commentsForm.value.query,
					"status": "active",
					"user": {
						"name": this.commentsForm.value.name,
						"country": this.commentsForm.value.country.name,
						"countrycode": this.commentsForm.value.country.dial_code,
						"mobile": this.commentsForm.value.mobile,
						"email": this.commentsForm.value.email
					}
				}
			}

			let url = base_url + 'Comments'
			this.blogService.PostData(postData, url).subscribe(res => {
				console.log("Comments updated ", res);
				this.snakBar.open('Comments Sent successfully !', 'OK', {
					duration: 3000
				})
				//this.commentsForm.reset();
				Object.keys(this.commentsForm.controls).forEach(key => {
					this.commentsForm.get(key).setErrors(null);
				})
				this.getBlogDetail();
				// this.TopicData = res;
			}, error => {
				console.log("commets add error", error);
				this.snakBar.open('Failed to send comments', 'OK', {
					duration: 3000
				})
			});
		}
		else {
			this.snakBar.open('Please enter required fields', 'OK', {
				duration: 3000
			})
		}
	}
	// comments time show 
	returnTime(timestamp: any) {
		var hour = (Math.abs(Date.now() - Date.parse(timestamp)) / 36e5);
		var mins = Math.round(hour * 60);
		var days = Math.round(hour / 24);
		var month = Math.round(days / 24);
		if (mins <= 60) {
			if (mins <= 1) {
				return timestamp = 'Just now'
			}
			else if (mins > 1 && mins < 2) {
				return timestamp = 'About a min ago'
			}
			else if (mins === 60 || hour === 1) {
				return timestamp = 'About an hour ago'
			}
			else {
				return timestamp = Math.round(mins) + ' mins ago'
			}
		}
		else if (mins > 60 && hour <= 24) {
			if (hour < 24) {
				return timestamp = Math.round(hour) + ' hours ago'
			}
			else if (hour === 24) {
				return timestamp = 'About a day ago'
			}
		}
		else if (hour > 24 && hour < 720) {
			return timestamp = Math.round(days) + ' days ago'
		}
		else if (hour >= 720) {
			return timestamp = Math.round(month) + ' months ago'
		}
	}

	public showReplyForm: number;
	public replyData: any = {};
	// reply function start here
	replyMessage(data, index) {
		this.showReplyForm = index;
		this.replyData = data;
		this.blogDetail.comments[index].showReplyForm = true;
	}

	// reply methof call api here
	ReplyForm() {
		console.log("reply thread method is here", this.commentsForm.value);
		console.log()
		if (this.commentsForm.valid) {
			let postData: any = {};
			if (this.utm_source !== null) {
				postData = {
					"blogId": this.blogsId,
					"createdAt": new Date(),
					"replyId": this.replyData.id,
					"comment": this.commentsForm.value.query,
					"status": "active",
					"user": {
						"name": this.commentsForm.value.name,
						"country": this.commentsForm.value.country.name,
						"countrycode": this.commentsForm.value.country.dial_code,
						"mobile": this.commentsForm.value.mobile,
						"email": this.commentsForm.value.email
					},
					"utm_medium": this.utm_medium,
					"compaigntype": this.campaignType,
					"publisherid": this.publisherId,
					"utm_source": this.utm_source,
				}

			} else {
				postData = {
					"blogId": this.blogsId,
					"createdAt": new Date(),
					"replyId": this.replyData.id,
					"comment": this.commentsForm.value.query,
					"status": "active",
					"user": {
						"name": this.commentsForm.value.name,
						"country": this.commentsForm.value.country.name,
						"countrycode": this.commentsForm.value.country.dial_code,
						"mobile": this.commentsForm.value.mobile,
						"email": this.commentsForm.value.email
					},
				}
			}

			let url = base_url + 'Comments'
			this.blogService.PostData(postData, url).subscribe(res => {
				console.log("Comments updated ", res);
				this.snakBar.open('Comment Sent successfully !', 'OK', {
					duration: 3000
				})
				//this.commentsForm.reset();
				Object.keys(this.commentsForm.controls).forEach(key => {
					this.commentsForm.get(key).setErrors(null);
				})
				this.getBlogDetail();
				this.blogDetail.comments[this.showReplyForm].showReplyForm = false;
				// this.TopicData = res;
			}, error => {
				console.log("comments add error", error);
				this.snakBar.open('Failed to send comment', 'OK', {
					duration: 3000
				})
			});
		} else {
			this.snakBar.open('Please Enter required fields', 'OK', {
				duration: 3000
			})
		}
	}
}
