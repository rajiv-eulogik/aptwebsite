import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-topper-speaks',
	templateUrl: './topper-speaks.component.html',
	styleUrls: ['./topper-speaks.component.scss', '../screen/home/home.component.scss']
})
export class TopperSpeaksComponent implements OnInit {
	@Input() toppersData: any;
	@Input() topperImage: any;
	@Input() mobileDevice: boolean;
	constructor() { }

	ngOnInit(): void {
	}

}
