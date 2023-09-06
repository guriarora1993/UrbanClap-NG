import { variables } from '@app/constants/constants';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() childVariable: boolean;
  @Output() variableChanged = new EventEmitter<boolean>();
  public sidebarVisible = false;
  public sidebarHeading: string = '';
  public animationName: string = '';
  public sidebarContent: any;
  public loginContainer: string = 'login-container';
  public invalidNumber: boolean = false;
  public errorClass: string = 'invalidError';
  public loginPage: boolean = false;
  public navigateToService: Boolean = false;
  public isButtonDisabled: boolean = true;
  public inputActive: number | null = 0;
  public otpNumberExist: boolean = false;
  public otp: boolean = false;
  public otp4: any = null;
  public seconds: number = 30;
  public timeUp: boolean = false;
  public interval: any;
  public phoneNumberExist: boolean = false;
  public enteredNumber: number;
  public isOtpExist: boolean = true;
  public otp_Value = variables.LOGIN_OTP;
  public shouldDismiss: boolean = false;

  constructor(
    private sidebarService: SidebarService,
    private router: Router // private home: HomeComponent,
  ) // private about: AboutComponent
  {}

  ngOnInit() {
    this.sidebarService.getSidebarVisible().subscribe((visible) => {
      if (visible) {
        this.animationName = 'slide-in';
      } else {
        this.animationName = 'slide-out';
      }
      this.sidebarHeading = this.sidebarService.sidebarContent[0].heading;
      this.sidebarContent = this.sidebarService.sidebarContent;
      this.sidebarVisible = visible;
      this.loginPage = this.sidebarContent[0].login;
    });
  }

  public toggleSidebar(content: any) {
    this.sidebarService.toggleSidebar(content);
  }

  public closeToggleSidebar() {
    this.sidebarService.toggleSidebar('');
  }

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

  countryCodes: string[] = ['+91', '+44', '+61', '+91', '+86'];

  public navigateTo(value: string) {
    // this.home.navigateToService = true
    setTimeout(() => {
      this.navigateToService = false;
      this.router.navigate(['service-detail-list'], {
        queryParams: { key: value },
      });
    }, 2000);
  }

  public submitPhoneCred(number: any) {
    if (number.length >= 10) {
      this.phoneNumberExist = true;
      this.enteredNumber = number;
      this.startTimer();
    } else {
      this.phoneNumberExist = false;
    }
  }

  public onFocus(index: number, event: FocusEvent, input: HTMLInputElement) {
    this.inputActive = index;
    input.select();
  }

  public onInputNew(
    currentInput: HTMLInputElement,
    nextInput: HTMLInputElement | null,
    prevInput: HTMLInputElement | null
  ) {
    const value = currentInput.value;
    this.otp4 !== null || undefined
      ? ((this.otp = true), (this.isOtpExist = false))
      : ((this.otp = false), (this.isOtpExist = true));
    value.length < 4
      ? (this.otpNumberExist = false)
      : (this.otpNumberExist = true);
    if (value) {
      if (nextInput) {
        nextInput.focus();
      }
    } else if (prevInput) {
      prevInput.focus();
    }
  }

  public onInput(
    currentInput: HTMLInputElement,
    nextInput: HTMLInputElement | null,
    prevInput: HTMLInputElement | null
  ) {
    const value = currentInput.value;
    this.otp4 !== null || undefined ? (this.otp = true) : (this.otp = false);
    value.length < 4
      ? (this.otpNumberExist = false)
      : (this.otpNumberExist = true);
    if (value) {
      if (nextInput) {
        nextInput.focus();
      }
    } else if (prevInput) {
      prevInput.focus();
    }
  }

  public resendCode() {
    this.timeUp = false;
    this.seconds = 60;
    this.startTimer();
    this.otpNumberExist = false;
  }

  public startTimer() {
    this.interval = setInterval(() => {
      if (this.seconds > 0) {
        this.seconds--;
      } else {
        clearInterval(this.interval);
        this.timeUp = true;
      }
    }, 1000);
  }

  public submitOtp(optVal1: any, optVal2: any, optVal3: any, optVal4: any) {
    const userOtp = optVal1
      .toString()
      .concat(optVal2.toString(), optVal3.toString(), optVal4.toString());
    if (userOtp == this.otp_Value) {
      this.otpNumberExist = false;
      this.shouldDismiss = true;
      this.closeToggleSidebar();
      const user = 'true';
      localStorage.setItem('userExist', user);
      this.childVariable = true;
      this.variableChanged.emit(this.childVariable);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      this.otpNumberExist = true;
      this.shouldDismiss = false;
      this.timeUp = true;
    }
  }
}
