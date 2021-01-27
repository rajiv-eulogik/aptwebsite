import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ActivationEnd } from "@angular/router";
import { GetDataServiceService } from '../../../service/get-data-service.service';
import { base_url, apt_url, Paytm_url } from "../../../service/config";

@Component({
  selector: 'app-notes-payments-success',
  templateUrl: './notes-payments-success.component.html',
  styleUrls: ['./notes-payments-success.component.scss']
})
export class NotesPaymentsSuccessComponent implements OnInit {
  public SeniorBullet: any = ["Lorem ipsum, or lipsum as it is sometimes known.", " graphic or web designs.", "The purpose of lorem ipsum is to create.", "focus is meant to be on design, not content.", "The passage experienced"];
  public fileId: string = '';
  public discription: string = '';
  public pdfUrl: string = apt_url + 'Uploads/DownloadContent/Download/';
  public elem: any;
  public timerId: any;
  public utm_source: string = '';
  public utm_medium: string = '';
  public campaignType: string = '';
  public publisherId: string = '';
  public topic: any;
  public page: any;
  public subjectId: any;
  public topics: any;
  public name: any;
  fileData: any;
  constructor(public router: Router, public route: ActivatedRoute, public FileService: GetDataServiceService) {
    this.fileId = this.route.snapshot.queryParamMap.get('fileId');
    this.utm_source = this.route.snapshot.queryParamMap.get('utm_source');
    console.log("shfskh", this.fileId);
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
    this.getFileData();
	this.countdown();
	setTimeout(() => {
		this.downloadFile()
  }, 3000)
  }



  getFileData() {
    let url = apt_url + 'Downloads/' + this.fileId
    this.FileService.getData(url).subscribe(responce => {
      console.log("file  data id here", responce);
	  let temp: any = responce;
	  this.fileData = responce
      this.discription = temp.description;
      this.topic = temp.topicId;
      this.subjectId = temp.subjectId
      window.open(this.pdfUrl + temp.filename, '_blank');
    }, error => {
      console.log("downlods sucess error", error);
    });
  }

  timer: any = 15
  countdown() {
	this.timer = 15;
	let count = setInterval(() => {
		if(this.timer > 0) {
			this.timer--
		}
		else {
			this.timer = 0;
			clearInterval(count)
		}
	}, 1000)
  }


  showTimer() {
	  if(this.timer >= 10) {
		  return '00:' + this.timer
	  }
	  else if(this.timer > 0 && this.timer < 10 ) {
		return '00:0' + this.timer
	  }
	  else {
		  return '00:00'
	  }
  }

  doSomething() {
    alert("Hi");
  }

  CourseScreen() {
    console.log("hhihi")
    if (this.utm_source !== null) {
      this.router.navigate(['/course'], { queryParams: { utm_source: this.utm_source, utm_medium: this.utm_medium, campaigntype: this.campaignType, publisherid: this.publisherId } })
    } else {
      this.router.navigate(['/course']);
    }
  }

  downloadFile() {
	  window.open(this.pdfUrl + this.fileData.filename)
  }

  exploreMore() {
    let url = apt_url + 'Subjects/'+this.subjectId+'/subjectTopics?filter={"where":{"or":[{"deleted":false},{"purchased":{"gte":1}}]}}&access_token=z2SOHSzXqKNmD597iPJokOG2Pud8CyCqFUEl8iW2L3LrWD1kbA5ljZRjwhn8Ii8Z'; 
    this.FileService.getData(url).subscribe(responce => {
      console.log("get topic data is ", responce);
      // let dummy: any = [];
      // dummy = responce;
      this.topics = responce;
      console.log(this.topics);
      let url1 = apt_url + 'Downloads/' + this.fileId
    this.FileService.getData(url1).subscribe(responce => {
      console.log("file  data id here", responce);
	  let temp: any = responce;
	  this.fileData = responce
      this.discription = temp.description;
      this.topic = temp.topicId;
      this.subjectId = temp.subjectId
      for(let i=0;i<this.topics.length;i++){
        if(this.topics[i].id === this.topic )
        this.name = this.topics[i].name;
        console.log("name is"+ this.name)
      }
    }, error => {
      console.log("downlods sucess error", error);
    });
    }, err => {
      console.log("error");
    })
    if (this.utm_source !== null) {
      this.router.navigate(['/downloads/Topic-detail'], { queryParams: { id: this.topic, name: this.name, utm_source: this.utm_source, utm_medium: this.utm_medium, campaigntype: this.campaignType, publisherid: this.publisherId } })
    } else {
      this.router.navigate(['/downloads/Topic-detail'], { queryParams: { id: this.topic, name: this.name } })
    }
  }
}
