import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-exists',
  templateUrl: './exists.component.html',
  styleUrls: ['./exists.component.scss']
})
export class ExistsComponent implements OnInit {

  constructor(public matDialogRef: MatDialogRef<ExistsComponent>,) { }

  ngOnInit(): void {
  }

  okButton(){
    this.matDialogRef.close();
  }

}
