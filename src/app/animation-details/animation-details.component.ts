import { Component } from '@angular/core';
import { AnimationItem, AnimationCountService } from '../animation-count.service'
import { ModalService } from '../modal.service';
import {trigger, state, style, animate, transition} from '@angular/animations';

@Component({
  selector: 'app-animation-details',
  templateUrl: './animation-details.component.html',
  styleUrls: ['./animation-details.component.scss']
})
export class AnimationDetailsComponent {
  constructor(private _service: AnimationCountService, private _modal: ModalService) { }

  get animationItems(): AnimationItem[] {
    return this._service.items;
  }

  loadAnimationDetails(item: AnimationItem) {
    this._modal.show(item.fileName);
  }
}

export function flyInOut() {
  return trigger('flyInOut', [
    state('*', style({
      opacity: 1,
      transform: 'translateX(0)'
    })),
    transition(':enter', [
      style({ transform: 'translateX(-100%)',
              opacity: 0}),
      animate('500ms ease-in')
    ]),
    transition(':leave', [
      animate('500ms ease-out', style({transform: 'translateX(100%)', opacity: 0}))
    ])
  ])
}

export function expand() {
  return trigger('expand', [
    state('*', style({
      opacity:1,
      transform: 'translateX(0)'
    })),
    transition(':enter',[
      style({ transform: 'translateY(-50%)',
              opacity: 0}),
      animate('200ms ease-in',  style({
        opacity:1,
        transform: 'translateX(0)'
      }))
    ])
  ]);
}
