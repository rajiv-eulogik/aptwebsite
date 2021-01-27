import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DownloadsAppComponent } from '../dialog/downloads-app/downloads-app.component';
import { base_url } from '../service/config';
import { GetDataServiceService } from '../service/get-data-service.service';

@Component({
  selector: 'app-download-app',
  templateUrl: './download-app.component.html',
  styleUrls: ['./download-app.component.scss', '../screen/home/home.component.scss']
})
export class DownloadAppComponent implements OnInit {

  constructor(public snakBar: MatSnackBar, public getDataService: GetDataServiceService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getWidth();
  }

  @Input('source') utm_source: string = '';
	@Input('medium') utm_medium: string = '';
	@Input('campaign') campaignType: string = '';
	@Input('publisher') publisherId: string = '';

  mobileDevice: boolean = false
	getWidth(event?) {
		this.mobileDevice = event ? event.target.innerWidth <= 600 ? true : false : window.innerWidth <= 600 ? true : false
	}



  DownloadsApp() {
		console.log("do nothings");
		const dialogRef = this.dialog.open(DownloadsAppComponent, {
			width: '500px',
			disableClose: true,
			data: { screen: "home", action: "download App", heading: "Your Information" },
		});

		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed', result);
			if (result !== undefined) {
				console.log("post data");
				let url = base_url + 'CampaignUsers';
				let postData: any = {};
				if (this.utm_source !== null) {
					postData = {
						name: result.name,
						mobile: result.mobile,
						password: 'apt#123',
						createdAt: new Date(),
						"utm_medium": this.utm_medium,
						"compaigntype": this.campaignType,
						"publisherid": this.publisherId,
						"utm_source": this.utm_source,
					}

				} else {
					postData = {
						name: result.name,
						mobile: result.mobile,
						password: 'apt#123',
						createdAt: new Date()
					}
				}

				this.getDataService.PostData(postData, url).subscribe(responce => {
					console.log("all class data is here ", responce);
					// let temp: any = responce;
					this.snakBar.open('Thanks for sharing your information with us', 'OK', {
						duration: 3000
					})
				}, error => {
					console.log("app downlods  geting error ", error);
				});
			}
		});
	}

}
