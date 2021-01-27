import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import {GetDataServiceService} from '../../service/get-data-service.service';

const NUM_REGEX = /^[1-9][0-9]{5,19}$/;
const NAME_REGEX = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
const SCHOOL_REGEX = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

@Component({
  selector: 'app-downloads-app',
  templateUrl: './downloads-app.component.html',
  styleUrls: ['./downloads-app.component.scss']
})
export class DownloadsAppComponent implements OnInit {

  public DownlodsForm: FormGroup;
  public flag: boolean;
  public flag1: boolean;
  public mobileMax: number;
  public AllCoutryName: any;
  constructor(public fb: FormBuilder,@Inject(MAT_DIALOG_DATA) public data: any, 
    public matDialogRef: MatDialogRef<DownloadsAppComponent>, public snakBar: MatSnackBar,public DialogService: GetDataServiceService) { 
    console.log("Downloads apps dialog data is here ",this.data);
  }

  ngOnInit(): void {
    if (this.data.action === 'download') {
      this.GetAllCountry();
      this.inilizeValue1();
      this.flag = true;
      let userValues = sessionStorage.getItem('user_comment') ? JSON.parse(sessionStorage.getItem('user_comment')) : null
		  if(userValues) {
			this.setFormValue(userValues)
		  } 
    } else if(this.data.action === 'download App') {
      this.GetAllCountry();
      this.inilizeValue2();
      this.flag = true;
    }else{
      this.GetAllCountry();
      this.inilizeValue();
      this.flag= false;
    }
    
  }
 

  inilizeValue(){
    this.DownlodsForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.pattern(NAME_REGEX)]),
      email: new FormControl('', [Validators.required,Validators.pattern(EMAIL_REGEX)]),
      mobile: new FormControl('',[Validators.required,Validators.pattern(NUM_REGEX)]),
      city: new FormControl('',[Validators.required,Validators.pattern(NAME_REGEX)]),
      schoolname: new FormControl('',[Validators.required,Validators.pattern(SCHOOL_REGEX)]),
      country: new FormControl('', [Validators.required]),
    });
  }

  inilizeValue1() {
    this.DownlodsForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.pattern(NAME_REGEX)]),
      mobile: new FormControl('', [Validators.required, Validators.pattern(NUM_REGEX)]),
      email: new FormControl('', [Validators.required,Validators.pattern(EMAIL_REGEX)]),
      country: new FormControl('', [Validators.required]),
    });
  }

  inilizeValue2() {
    this.DownlodsForm = this.fb.group({
      name: new FormControl('', [Validators.required, Validators.pattern(NAME_REGEX)]),
      mobile: new FormControl('', [Validators.required, Validators.pattern(NUM_REGEX)]),
      country: new FormControl('', [Validators.required]),
    });
  }

  setFormValue(values) {
		// SETS VALUE FOR THE FORM
		this.DownlodsForm.patchValue({
			name: values.name,
			email: values.email,
			mobile: values.mobile,
			countrycode: values.countrycode
		})
	}

  onChange(event) {
    console.log(event.dial_code)
    if (event.dial_code == 91) {
      this.mobileMax = 10;
      this.flag = true;
    } else {
      this.mobileMax = 15;
      this.flag = false;
    }
  }
  
  GetAllCountry() {
    let url = 'assets/jsonFile/allCountryCodes.json'
    console.log(url);
    this.DialogService.getData(url).subscribe(responce => {
      // console.log("get class details data is ", responce);
      this.AllCoutryName = responce;
      // this.classDetail = dummy.data;   
    })
  }

  submitForm(){
    // this.matDialogRef.close();
    console.log("submit form here",this.DownlodsForm.value);
    if(this.DownlodsForm.valid){
      console.log("close dialog");
      if (this.data.action === 'download') {
        sessionStorage.setItem('user_comment', JSON.stringify(this.DownlodsForm.value))
        this.data.name = this.DownlodsForm.value.name;
        this.data.mobile = this.DownlodsForm.value.mobile;
        this.data.country = this.DownlodsForm.value.country.name;
        this.data.countrycode = this.DownlodsForm.value.country.dial_code;
        this.data.email = this.DownlodsForm.value.email;
        this.matDialogRef.close(this.data);
      } else if (this.data.action == 'download App') {
        this.data.name = this.DownlodsForm.value.name;
        this.data.mobile = this.DownlodsForm.value.mobile;
        this.data.country = this.DownlodsForm.value.country.name;
        this.data.countrycode = this.DownlodsForm.value.country.dial_code;
        this.matDialogRef.close(this.data);
      } else{
        this.data.name = this.DownlodsForm.value.name;
        this.data.email = this.DownlodsForm.value.email;
        this.data.mobile = this.DownlodsForm.value.mobile;
        this.data.country = this.DownlodsForm.value.country.name;
        this.data.countrycode = this.DownlodsForm.value.country.dial_code;
        this.data.schoolname = this.DownlodsForm.value.schoolname;
        this.data.city = this.DownlodsForm.value.city;
        this.matDialogRef.close(this.data);
      }
    }else{
      // console.log("dont clode dialog");
      // if(this.data.action == 'download App' && this.data.screen == 'home'){
      //   if (this.DownlodsForm.value.name.valid && this.DownlodsForm.value.mobile.valid){
      //     console.log("close dailog ");
      //   }else{
          // console.log("do nothigs give toast message");
      this.snakBar.open('Please enter required fields', 'OK', {
        duration: 3000
      });
      //   } 
        
    }
  }
  cancel(){
    this.matDialogRef.close();
  }
}
