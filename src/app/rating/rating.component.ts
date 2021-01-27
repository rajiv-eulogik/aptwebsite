import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
  @Input() rating: number;
  @Input() itemId: number;
  @Input() message: String;
  @Output() ratingClick: EventEmitter<any> = new EventEmitter<any>();

  inputName: string;
  ngOnInit() {
    this.inputName = this.itemId + '_rating';
  }
  onClick(rating: number, message: String): void {
    this.rating = rating;
    this.message = message;
    this.ratingClick.emit({
      itemId: this.itemId,
      rating: rating,
      message: message
    });
  }
}
