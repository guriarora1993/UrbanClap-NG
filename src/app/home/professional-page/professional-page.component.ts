import { Component } from '@angular/core';

@Component({
  selector: 'app-professional-page',
  templateUrl: './professional-page.component.html',
  styleUrls: ['./professional-page.component.scss'],
})
export class ProfessionalPageComponent {
  public list = ['Chandigarh', 'Mohali', 'Nalagarh', 'Azamgarh'];
  public model: any;
  public invalidNumber: boolean = false;
  public errorClass: string = 'invalidError';
  public loginContainer: string = 'login-container';
  public isButtonDisabled: boolean = true;
  public countryCodes: string[] = ['+91', '+44', '+61', '+91', '+86'];
  public phoneNumberExist: boolean = false;
  public enteredNumber: number;
  public userJoined: boolean = false;
  public dataLoading: boolean = false;
  public numberNotExist: boolean = false;
  public phoneNumber(value: any) {
    if (value.length == 10) {
      this.isButtonDisabled = false;
    } else {
      this.isButtonDisabled = true;
    }
    value.length > 10
      ? ((this.loginContainer = 'login-container-error'),
        (this.errorClass = 'invalidErrorOccur'),
        (this.invalidNumber = true))
      : ((this.loginContainer = 'login-container'),
        (this.errorClass = 'invalidError'),
        (this.invalidNumber = false));
  }

  public submitPhoneCred(number: any) {
    if (number.length >= 10) {
      this.userJoined = true;
      this.dataLoading = true;
      this.numberNotExist = false;
    } else if(number == ""){
      this.numberNotExist = true;
    } 
    else {
      this.userJoined = false;
    }
  }

  public close() {
    this.userJoined = false;
    this.dataLoading = false;
  }
  
}
