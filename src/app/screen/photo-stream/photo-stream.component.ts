import { Component, OnInit } from '@angular/core';
import { GetDataServiceService } from '../../service/get-data-service.service';
import { base_url, apt_url } from "../../service/config";
import { trigger, transition, useAnimation } from '@angular/animations';
import {
  bounce,
  flash,
  pulse,
  rubberBand,
  shake,
  swing,
  tada,
  wobble,
  jello,
  bounceIn,
  bounceInDown,
  bounceInLeft,
  bounceInRight,
  bounceInUp,
  bounceOut,
  bounceOutDown,
  bounceOutLeft,
  bounceOutRight,
  bounceOutUp,
  fadeIn,
  fadeInDown,
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  fadeOut,
  fadeOutDown,
  fadeOutUp,
  fadeOutLeft,
  fadeOutRight,
  slideInDown,
  slideInUp,
  slideInLeft,
  slideInRight,
  slideOutDown,
  slideOutUp,
  slideOutLeft,
  slideOutRight,
  flip,
  flipInX,
  flipInY,
  flipOutX,
  flipOutY,
  lightSpeedIn,
  lightSpeedOut,
  rotateIn,
  rotateInDownLeft,
  rotateInDownRight,
  rotateInUpLeft,
  rotateInUpRight,
  rotateOut,
  rotateOutDownLeft,
  rotateOutDownRight,
  rotateOutUpLeft,
  rotateOutUpRight,
  hinge,
  jackInTheBox,
  rollIn,
  rollOut,
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

@Component({
  selector: 'app-photo-stream',
  templateUrl: './photo-stream.component.html',
  styleUrls: ['./photo-stream.component.scss'],
  animations: [
    trigger('bounceOut', [transition('* => *', useAnimation(zoomInLeft))])
  ],
})
export class PhotoStreamComponent implements OnInit {
  public bounceOut: any;
  public cols: number = 4;
  public PhotoStream: any = [];
  public ImageUrl: string = base_url + 'uploads/dashboard/download/';

  constructor(public PhotoService: GetDataServiceService) {
    window.scrollTo(0, 1)
   }

  ngOnInit(): void {
    this.getWidth();
    this.getPhotoStream();
  }
   getWidth() {
      if (window.innerWidth < 600)
        this.cols = 1;
      else if (window.innerWidth >= 600 && window.innerWidth < 900)
        this.cols = 2
      else if (window.innerWidth >= 900 && window.innerWidth < 1200)
        this.cols = 3;
      else
        this.cols = 3;
    }
  getPhotoStream() {
    let url = base_url + 'Settings?filter={"where": {"type": "photoStream"}}'
    this.PhotoService.getData(url).subscribe(responce => {
       console.log("get speak data ", responce);
      let dummy: any = [];
      dummy = responce;
      this.PhotoStream = dummy.data[0].photos;
    })
  }
}
