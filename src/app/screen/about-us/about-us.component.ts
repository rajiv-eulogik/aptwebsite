import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, timer } from 'rxjs';
import {flyInOut, expand} from '../../animation-details/animation-details.component';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
  animations: [
    flyInOut(),
    expand()
  ]
})
export class AboutUsComponent implements OnInit {

  public showloader: boolean;      
  private subscription: Subscription;
  private timer: Observable<any>;

  public loading: boolean = true;
  public fac: number;
  public aboutAptKeys: any = ["description"]
  public descriptionKeys: any = ["title", "description"]
  public generalkeys: any = ["about","designation","name"];
  public socialmediakeys:any  = ["facebook","instagram","linkedin","twitter"];
  public image: any = ["image"];

  constructor() { }

  ngOnInit(): void {
    var URL = "http://192.241.203.148:3010/api/Settings?filter={%22where%22:{%20%22type%22:%20%22aboutUs%22}}";
    this.makeAjaxCall(URL, "GET");
    this.setTimer();
  }

  public ngOnDestroy() {
    if ( this.subscription && this.subscription instanceof Subscription) {
      this.subscription.unsubscribe();
    }
  }

  public setTimer(){

    // set showloader to true to show loading div on view
    this.showloader   = true;

    this.timer        = timer(1500); // 5000 millisecond means 5 seconds
    this.subscription = this.timer.subscribe(() => {
        // set showloader to false to hide loading div from view after 5 seconds
        this.showloader = false;
    });
  }

  makeAjaxCall(url, methodType): void{
        var baseUrl = "http://192.241.203.148:3010";
        var xhr = new XMLHttpRequest();
        xhr.open(methodType, url, true);
        xhr.send();
        var fac;
        xhr.onreadystatechange = function(){
          if (xhr.readyState === 4){
              if (xhr.status === 200){
                console.log("xhr done successfully");
                var resp = xhr.responseText;
                var respJson = JSON.parse(resp);
                console.log( respJson.data[0]);
                var data = respJson.data[0]
                var aboutApt = data.aboutApt
                var aboutFounders = data.aboutFounders
                var aboutFaculties = data.aboutFaculties
                fac = aboutFaculties.faculties.length
                var aboutAptKeys = ["description"]
                var descriptionKeys = ["title", "description"]
                var generalkeys = ["about","designation","name"];
                var socialmediakeys = ["facebook","instagram","linkedin","twitter"];
                var image = ["image"];
                for(let i=0;i<aboutAptKeys.length;i++){
                  document.getElementById("aboutapt-"+aboutAptKeys[i]).innerHTML = aboutApt[aboutAptKeys[i]];
                }
                document.getElementById("aboutapt-coverImage").setAttribute("src", baseUrl + "/api/uploads/aboutUs/download/" + aboutApt["coverImage"]);
                for(let i=0;i<descriptionKeys.length;i++){
                  document.getElementById("aboutfounders-"+descriptionKeys[i]).innerHTML = aboutFounders[descriptionKeys[i]];
                  document.getElementById("aboutfaculties-"+descriptionKeys[i]).innerHTML = aboutFaculties[descriptionKeys[i]];
                }
                for(let i=0;i<generalkeys.length;i++){
                  for(let j=0;j<aboutFounders.founders.length;j++){
                    document.getElementById("founders" +j + "-"+generalkeys[i]).innerHTML = aboutFounders.founders[j][generalkeys[i]];
                  }
                }
                for(let i=0;i<aboutFounders.founders.length;i++){
                  document.getElementById("founderimage" + i).setAttribute("src", baseUrl + "/api/uploads/aboutUs/download/" + aboutFounders.founders[i]["image"]);
                }
                for(let i=0;i<aboutFaculties.faculties.length;i++){
                  //since data is present only for 4, repetition is achieved so used modulus
                document.getElementById("facultyimage" + i).setAttribute("src", baseUrl + "/api/uploads/aboutUs/download/" + aboutFaculties.faculties[i]["image"]);
                }
                for(let i=0;i<generalkeys.length;i++){
                  for(let j=0;j<aboutFaculties.faculties.length;j++){
                    //since data is present only for 4, repetition is achieved so used modulus
                    document.getElementById("faculties" +j + "-"+generalkeys[i]).innerHTML = aboutFaculties.faculties[j][generalkeys[i]];
                  }
                }
                for(let i=0;i<socialmediakeys.length;i++){
                  for(let j=0;j<aboutFounders.founders.length;j++){
                    if(aboutFounders.founders[j][socialmediakeys[i]] != '')
                    document.getElementById("founders" +j + "-"+socialmediakeys[i]).setAttribute("href",  aboutFounders.founders[j][socialmediakeys[i]]);
                  } 
                  for(let j=0;j<aboutFaculties.faculties.length;j++){
                    if(aboutFaculties.faculties[j][socialmediakeys[i]] != '')
                    //since data is present only for 4, repetition is achieved so used modulus
                    document.getElementById("faculties" +j + "-"+socialmediakeys[i]).setAttribute("href",  aboutFaculties.faculties[j][socialmediakeys[i]]);
                  }                 
                }
              } else {
                console.log("xhr failed");
              }
          } else {
              console.log("xhr processing going on");
          }
        }
      this.loading = false;
        console.log("request sent succesfully");
      }

  }
