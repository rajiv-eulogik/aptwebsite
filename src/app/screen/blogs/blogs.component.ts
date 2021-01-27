import { Component, OnInit, ElementRef, ViewChild, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute, Router, ActivationEnd } from "@angular/router";
import { GetDataServiceService } from '../../service/get-data-service.service';
import { base_url, apt_url } from "../../service/config";
// import { DOCUMENT } from '@angular/common';Inject
import { MatTableDataSource } from '@angular/material/table';
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
	selector: 'app-blogs',
	templateUrl: './blogs.component.html',
	styleUrls: ['./blogs.component.scss'],
	animations: [
		trigger('slideInDown', [transition('* => *', useAnimation(slideInDown))]),
		trigger('slideInUp', [transition('* => *', useAnimation(slideInUp))]),
		trigger('slideInLeft', [transition('* => *', useAnimation(slideInLeft))]),
		trigger('slideInRight', [transition('* => *', useAnimation(slideInRight))])
	],
})
export class BlogsComponent implements OnInit {



	public loading1: boolean = true;
	public loading2: boolean = true;

	public slideInDown: any;
	public slideInUp: any;
	public slideInLeft: any;
	public slideInRight: any;
	@ViewChild('blogdata') myDiv: ElementRef;
	public searchValue: string = '';
	public Allcategory: any = [];
	public AllBlogs: any = [];
	public dataSource: any;
	public imageUrl: string = base_url + 'uploads/blogs/download/';
	// urm source related variables
	public utm_source: string = '';
	public utm_medium: string = '';
	public campaignType: string = '';
	public publisherId: string = '';

	constructor(public route: ActivatedRoute, public router: Router, public blogService: GetDataServiceService) {
		window.scrollTo(0, 1)
		this.utm_source = this.route.snapshot.queryParamMap.get('utm_source');
		if (this.utm_source !== null) {
			this.utm_medium = this.route.snapshot.queryParamMap.get('utm_medium');
			this.campaignType = this.route.snapshot.queryParamMap.get('campaigntype');
			this.publisherId = this.route.snapshot.queryParamMap.get('publisherid');
		} else { }
	}
	//  ,@Inject(DOCUMENT) document
	ngOnInit(): void {
		this.GetBlogCategory();
		this.GetBlogs();
		this.getWidth();
	}

	isSearchingPost: boolean = false
	applyFilter(filterValue: string) {
		this.isSearchingPost = true
		this.isSearching()
		console.log("do nothings", filterValue);
		this.dataSource.filter = filterValue.trim().toLowerCase();
		console.log("filter screen  ", this.dataSource)
		this.AllBlogs = this.dataSource.filteredData;
		console.log(this.AllBlogs);
	}

	isSearching() {
		setTimeout(() => {
			this.isSearchingPost = false
		}, 750)
	}

	OnSearch() {
		this.searchValue = '';
		this.GetBlogs();
	}

	BlogDetail(data) {
		if (this.utm_source !== null) {
			this.router.navigate(['/blogs/blog-details'], { queryParams: { id: data.id, utm_source: this.utm_source, utm_medium: this.utm_medium, campaigntype: this.campaignType, publisherid: this.publisherId } })
		} else {
			this.router.navigate(['/blogs/blog-details'], { queryParams: { id: data.id } })
		}

	}
	// get blogs category here 
	GetBlogCategory() {
		let url = base_url + 'Categories?filter={"where": {"status": "published"}}'
		this.blogService.getData(url).subscribe(responce => {
			console.log("all blogs category is here ", responce);
			let temp: any = responce;
			this.Allcategory = temp.data;
			this.loading1 = false;
		}, error => {
			console.log("blogs category geting error ", error);
		});
	}

	blogData: any = [];
	// get all published blogs in gere 
	GetBlogs() {
		let url = base_url + 'Blogs?filter={"where": {"status": "published"},"include": ["categories","staff"],"order" : "createdAt ASC"}'
		this.blogService.getData(url).subscribe(responce => {
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
		this.AllBlogs = this.blogData.filter(blog => blog.categoryIds.includes(category.id))
	}


	mobileDevice: boolean = false
	getWidth(event?) {
		this.mobileDevice = event ? event.target.innerWidth <= 600 ? true : false : window.innerWidth <= 600 ? true : false
	}
} 
