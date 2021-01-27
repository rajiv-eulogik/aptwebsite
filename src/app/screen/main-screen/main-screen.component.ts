import { Component, OnInit,HostListener,ViewChild ,Inject} from '@angular/core';
import { trigger, state, transition, style, animate } from '@angular/animations';  
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router, ActivationEnd, RouterOutlet } from "@angular/router";
import { slideInAnimation, fader, slider } from '../../route-animation';
import * as $ from 'jquery';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.scss'],
  animations: [slider ]
  // animations: [
  //   trigger('fade',
  //     [
  //       state('void', style({ opacity: 0 })),
  //       transition(':enter', [animate(300)]),
  //       transition(':leave', [animate(500)]),
  //     ]
  //   ), slideInAnimation]
})
export class MainScreenComponent implements OnInit {
  
  // timedOutCloser;
  public val: any;
  public route1: any;
  public showSearch: boolean = true; 
  public smallScreen: boolean;
	public sidenavMenu: boolean = true;
  public sidenavMode: string = '';
  public didScroll: boolean;
  public lastScrollTop: number = 0;
  public delta: number = 5;
  public navbarHeight: any;
  
	@HostListener('window:resize', ['$event'])
	onResize(event) {
		this.configureSideNav();
	}
  @ViewChild('sidenav', { static: true }) sidenav;
  // urm source related variables
  public utm_source: string = '';
  public utm_medium: string = '';
  public campaignType: string = '';
  public publisherId: string = '';

  constructor(public route: ActivatedRoute, public router: Router, @Inject(DOCUMENT) document) {
    this.utm_source = this.route.snapshot.queryParamMap.get('utm_source');
    console.log("this is utm confrence heger",this.utm_source);
    if (this.utm_source !== null){
      console.log("get more paramettre here ***********************");
      this.utm_medium = this.route.snapshot.queryParamMap.get('utm_medium');
      this.campaignType = this.route.snapshot.queryParamMap.get('campaigntype');
      this.publisherId = this.route.snapshot.queryParamMap.get('publisherid');
      console.log("get more paramettre here ***********************", this.utm_medium,this.campaignType,this.publisherId);
    }else{
      console.log("Do nothigs");
    }
   }

  ng

 
   ngOnInit(): void {
    this.smallScreen = window.innerWidth < 900 ? true : false
		if (!this.smallScreen) {
			//console.log(window.innerWidth);

			this.sidenavMode = 'side';
      this.sidenavMenu = true;
      
		} else {
			//console.log(this.smallScreen);
      // console.log(window.innerWidth);
			this.sidenavMode = 'over';
      this.sidenavMenu = false;
      
		}
   
      var url =this.router.url;
      this.val = url.split("?");
      this.route1 = this.val[0];
      console.log(this.route1);
      this.toggleHeader();
  }
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e) {
    this.findheight();   
    this.hasScrolled();
    const body= document.body;
    const scrollUp = "scroll-up";
  const scrollDown = "scroll-down";
    if (window.pageYOffset > 550) {
      let element = document.getElementById('navbar');
      element.classList.add('sticky');
    } else {
      // if(this.sidenav.opened){
      //    //this.stopScrolling()
      //    window.addEventListener('scroll', this.noScroll);
      // }
      let element = document.getElementById('navbar');
      element.classList.remove('sticky');
    }
  }

  stopScrolling(){
    window.onscroll = function () { window.scrollTo(window.pageYOffset || document.documentElement.scrollTop,window.pageXOffset || document.documentElement.scrollLeft); };
    
  }

  noScroll() {
    window.scrollTo(0, 0);
  }

  toggleHeader() {
  const body = document.body;
  const nav = document.querySelector(".toolbar");
  const scrollUp = "scroll-up";
  const scrollDown = "scroll-down";
  let lastScroll = 0;
  
  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;
    if (this.sidenav.opened ) {
      // body.classList.remove(scrollUp);
      // body.classList.remove(scrollDown);
      
      return;
    }

    else{

    if (currentScroll <= 0) {
      body.classList.remove(scrollUp);
      return;
    }
    
    if (currentScroll > lastScroll && !body.classList.contains(scrollDown)) {
      // down
      body.classList.remove(scrollUp);
      body.classList.add(scrollDown);
    } else if (currentScroll < lastScroll && body.classList.contains(scrollDown)) {
      // up
      body.classList.remove(scrollDown);
      body.classList.add(scrollUp);
    }
  }
    lastScroll = currentScroll;
  });
}

  findheight(){
    this.navbarHeight = $( "mat-toolbar" ).outerHeight();
    console.log("hi" + this.navbarHeight);

      if(window.scroll){
      this.didScroll = true;
      }
  }

  hasScrolled() {
    var st = $(window).scrollTop();
    
    // Make sure they scroll more than delta
    // if(Math.abs(this.lastScrollTop - st) <= this.delta)
        // return;
    
    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > this.lastScrollTop){
        // Scroll Down
       document.getElementById("navbar").style.top="-100px";
    } else {
        // Scroll Up
        console.log("else")
        if(st + $(window).height() < $(document).height()) {
          document.getElementById("navbar").style.top="100px";
        }
    }
    
    this.lastScrollTop = st;
}
  


  configureSideNav() {
    this.smallScreen = window.innerWidth < 900 ? true : false
    if (!this.smallScreen) {
      //console.log(window.innerWidth);
      // console.log('hello i am smallScreen');
      this.sidenavMode = 'side';
      this.sidenavMenu = true;
    } else {
      // console.log(window.innerWidth);
      this.sidenavMode = 'over';
      this.sidenavMenu = false;
    }
  }
  
	sideNavOpenClose(mode) {
		if (mode == 'over') {
			this.sidenav.opened = false;
    }
  }

  navigatePage(page)
  {
    if (this.utm_source !== null) {
      if (page == 'downloads') {
        this.router.navigate(['/downloads'], { queryParams: { utm_source: this.utm_source, utm_medium: this.utm_medium, campaigntype: this.campaignType, publisherid: this.publisherId } });
      } else if (page == 'school-tie-ups') {
        this.router.navigate(['/school-tie-ups'], { queryParams: { utm_source: this.utm_source, utm_medium: this.utm_medium, campaigntype: this.campaignType, publisherid: this.publisherId } });
      } else if (page == 'contact-us') {
        this.router.navigate(['/contact-us'], { queryParams: { utm_source: this.utm_source, utm_medium: this.utm_medium, campaigntype: this.campaignType, publisherid: this.publisherId } });
      } else if (page == 'about-us') {
        this.router.navigate(['/about-us'], { queryParams: { utm_source: this.utm_source, utm_medium: this.utm_medium, campaigntype: this.campaignType, publisherid: this.publisherId } });
      } else if (page == 'downloadapp') {
        this.router.navigate(['/downloadapp'], { queryParams: { utm_source: this.utm_source, utm_medium: this.utm_medium, campaigntype: this.campaignType, publisherid: this.publisherId } });
      } else if (page == 'Earn-with-us') {
        this.router.navigate(['/Earn-with-us'], { queryParams: { utm_source: this.utm_source, utm_medium: this.utm_medium, campaigntype: this.campaignType, publisherid: this.publisherId } });
      } else if (page == 'Join-team-apt') {
        this.router.navigate(['/Earn-with-us/Join-team-apt'], { queryParams: { utm_source: this.utm_source, utm_medium: this.utm_medium, campaigntype: this.campaignType, publisherid: this.publisherId } });
      } else if (page == 'Dubbing-Artist') {
        this.router.navigate(['/Earn-with-us/Dubbing-Artist'], { queryParams: { utm_source: this.utm_source, utm_medium: this.utm_medium, campaigntype: this.campaignType, publisherid: this.publisherId } });
      } else if (page == 'Language-translator') {
        this.router.navigate(['/Earn-with-us/Language-translator'], { queryParams: { utm_source: this.utm_source, utm_medium: this.utm_medium, campaigntype: this.campaignType, publisherid: this.publisherId } });
      } else if (page == 'video-faculty') {
        this.router.navigate(['/Earn-with-us/video-faculty'], { queryParams: { utm_source: this.utm_source, utm_medium: this.utm_medium, campaigntype: this.campaignType, publisherid: this.publisherId } });
      } else if (page == 'work-as-Collabotor') {
        this.router.navigate(['/Earn-with-us/work-as-Collabotor'], { queryParams: { utm_source: this.utm_source, utm_medium: this.utm_medium, campaigntype: this.campaignType, publisherid: this.publisherId } });
      } else if (page == 'privacy-policy') {
        this.router.navigate(['/privacy-policy'], { queryParams: { utm_source: this.utm_source, utm_medium: this.utm_medium, campaigntype: this.campaignType, publisherid: this.publisherId } });
      } else if (page == 'feedback') {
        this.router.navigate(['/feedback'], { queryParams: { utm_source: this.utm_source, utm_medium: this.utm_medium, campaigntype: this.campaignType, publisherid: this.publisherId } });
      } else if (page == 'notes-payments-success1') {
        this.router.navigate(['/notes-payments-success1'], { queryParams: { utm_source: this.utm_source, utm_medium: this.utm_medium, campaigntype: this.campaignType, publisherid: this.publisherId } });
      } else if (page == 'payments-failed') {
        this.router.navigate(['/payments-failed'], { queryParams: { utm_source: this.utm_source, utm_medium: this.utm_medium, campaigntype: this.campaignType, publisherid: this.publisherId } });
      } else {
        this.router.navigate(['/home'], { queryParams: { utm_source: this.utm_source, utm_medium: this.utm_medium, campaigntype: this.campaignType, publisherid: this.publisherId } });
      } 
    } else {
      if (page == 'downloads') {
        this.router.navigate(['/downloads']);
      } else if(page == 'privacy-policy') {
        this.router.navigate(['/privacy-policy']); 
      } else if(page == 'notes-payments-success1') {
        this.router.navigate(['/notes-payments-success1']); 
      }else if(page == 'feedback') {
        this.router.navigate(['/feedback']); 
      } else if (page == 'school-tie-ups') {
        this.router.navigate(['/school-tie-ups']);
      } else if (page == 'contact-us') {
        this.router.navigate(['/contact-us']);
      } else if (page == 'about-us') {
        this.router.navigate(['/about-us']);
      } else if (page == 'downloadapp') {
        this.router.navigate(['/downloadapp']);
      } else if (page == 'Earn-with-us') {
        this.router.navigate(['/Earn-with-us']);
      } else if (page == 'Join-team-apt') {
        this.router.navigate(['/Earn-with-us/Join-team-apt']);
      } else if (page == 'Dubbing-Artist') {
        this.router.navigate(['/Earn-with-us/Dubbing-Artist']);
      } else if (page == 'Language-translator') {
        this.router.navigate(['/Earn-with-us/Language-translator']);
      } else if (page == 'video-faculty') {
        this.router.navigate(['/Earn-with-us/video-faculty']);
      } else if (page == 'work-as-Collabotor') {
        this.router.navigate(['/Earn-with-us/work-as-Collabotor']);
      } else {
        this.router.navigate(['/home']);
      } 
    }
  }

  openSearch(){
    // if(this.showSearch == true && this.smallScreen == true){
    //   this.showSearch = false;
     // this.router.navigate(['/search-detail'], { queryParams: { searchData: '' } })
    // }else{
      this.showSearch = false;
    // }
    console.log("navigate search here ");
  }

  CloseHome(){
    console.log("navigate search here ");
    this.showSearch = true;
  }

  SearchData(data){
    console.log("navigate search here ",data);
    this.showSearch = true;
    this.router.navigate(['/search-detail'], { queryParams: { searchData: data} })
  }


  prepareRoute(outlet: RouterOutlet) {
    // ADD ANIMATION TO ROUTE
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation']
  }
  
}
  