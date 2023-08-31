import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  ViewChild,
  EventEmitter,
  Output,
} from '@angular/core';
import { variables } from '../../constants/constants';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements AfterViewInit {
  @Input() modalOpen: boolean;
  @Output() booleanEvent = new EventEmitter<boolean>();
  @ViewChild('modalOpenerBtn') modalOpenerBtn: ElementRef | undefined;
  public isOpen: boolean = false;
  public inputExist: boolean = false;
  public homeDetail: string;
  public landMarkDetail: string;
  public homeVal: boolean = false;
  public landVal: boolean = false;
  public activeButton: string | null = null;
  public isInputFocused: boolean = false;
  public isInputFocused2: boolean = false;
  public valueExist: boolean = false;
  public isInputFocused3: boolean = false;
  public otherToggle: boolean = false;
  public savedAddress: any = [];
  public addressLocally: any = [];
  public isDropdownOpen: boolean[] = [];
  public radioSelected: boolean = false;
  public buttonBackgroundColor: string = 'white';
  public buttonColor: string = 'black';
  public currentAddress: any = [];
  public dropdownStates: boolean[] = [];
  public updatedAddress: any = [];
  public homeDetailValue: string = '';
  public landMarkValue: string = '';
  public isInputFocused4: boolean = false;
  public updateAddressIndex: any;
  public updateSavedAddress: any = [];
  public updateVal: any = [];
  public deletedAddressIndex: any;
  public idExist: boolean = false;
  public couponId: any;
  public dateSelected: boolean[] = [];
  public dates: Date[] = [];
  public timeSlots: string[] = [];
  public isTimeSelected: boolean[] = [];
  public slotSelected: boolean = true;
  public serviceGetLater: boolean = false;
  public selectedDateOfSlot: any;
  public selectedTimeOfSlot: any;
  public selectedSlotIndex: number;
  public getServiveLater: string = 'Service in 60-75 minutes';
  public cardFieldExist: boolean = false;
  public expiryExist: boolean = false;
  public cvvExist: boolean = false;
  public inputActive: number | null = 0;
  public otp: boolean = false;
  public otp4: any = null;
  public otp5: any = null;
  public otp6: any = null;
  public otpNumberExist: boolean = false;
  public otp_Value = variables.PAYTM_OTP;
  public shouldDismiss: boolean = false;
  public seconds: number = 60;
  public timeUp: boolean = false;
  public interval: any;
  public upiId = variables.UPI_ID;
  public wrongUpiIdError: boolean = false;
  public numberNotExist: boolean = false;
  public formattedDate: string = '';
  public expiryNotExist: boolean = false;
  public cardExpiryDate: string = variables.CARD_EXPIRY;
  public cvvIncorrect: boolean = false;
  public cvvCode = variables.CVV_CODE;
  public credentialExist: boolean = false;
  public currentLocation: any;
  public bankInfo = [
    {
      logo: '../../../assets/axis-bank.png',
      bankName: 'Axis Bank',
    },
    {
      logo: '../../../assets/indus-bank.png',
      bankName: 'IndusInd Bank',
    },
    {
      logo: '../../../assets/state-bank.png',
      bankName: 'State Bank of India',
    },
    {
      logo: '../../../assets/icicic-bank].png',
      bankName: 'ICICI Bank',
    },
    {
      logo: '../../../assets/hdfc-bank.png',
      bankName: 'HDFC Bank',
    },
    // {
    //   logo: "../../../assets/kotak.png",
    //   bankName: "Kotak Bank"
    // },
  ];
  public slotsData = [
    {
      img: '../../../assets/slot-express-img.png',
      titleHeading: 'When should the professional arrive?',
      titleContent: 'Your service will take approx. 1 hr',
    },
    {
      img: '../../../assets/slot-get-service-later.png',
      titleHeading: 'Get service later',
      titleContent: 'Service at the earliest available time slot',
    },
  ];
  constructor(private cdRef: ChangeDetectorRef) {}

  public toggleDropdown(i: number) {
    this.isDropdownOpen[i] = !this.isDropdownOpen[i];
  }

  public getAddressInputValue(value: string) {
    if (value != '' || null || undefined) {
      this.buttonBackgroundColor = 'rgb(121, 79, 231)';
      this.buttonColor = 'white';
      this.updateSavedAddress = value;
    } else {
      this.buttonBackgroundColor = 'white';
      this.buttonColor = 'black';
    }
  }

  ngOnInit() {
    if (localStorage.getItem('savedAddress') !== null || undefined) {
      this.currentLocation = JSON.parse(
        localStorage.getItem('savedAddress') || '[]'
      );
    } 
    this.generateTimeSlots();
    setTimeout(() => {
      this.selectedDateFxn(0, this.dates[0]);
    }, 2000);
    this.isOpen = this.modalOpen;
    this.activeButton = 'home';
    if (localStorage.getItem('listOfAddedAddress') !== null || undefined) {
      this.addressLocally = JSON.parse(
        localStorage.getItem('listOfAddedAddress') || '[]'
      );
      console.log('start ', this.currentAddress);
    } else {
      console.log('Address not exist');
    }

    if (localStorage.getItem('savedAddress') !== null || undefined) {
      this.currentAddress = JSON.parse(
        localStorage.getItem('savedAddress') || '[]'
      );
    } else {
      console.log('main address not exist');
    }

    const today = new Date();
    for (let i = 0; i < 3; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      this.dates.push(date);
    }
    this.startTimer();
  }

  ngAfterViewInit(): void {
    this.isOpen = this.modalOpen;
    this.cdRef.detectChanges();

    if (this.isOpen && this.modalOpenerBtn) {
      this.modalOpenerBtn.nativeElement.click();
    }
  }

  public getInputValue(value: string) {
    value != '' || null || undefined
      ? (this.inputExist = true)
      : (this.inputExist = false);
  }
  public getHomeDetail(value: string) {
    value != '' || null || undefined
      ? (this.homeVal = true)
      : (this.homeVal = false);
  }

  public submitAddress(home: string, landMark: String, index: any) {
    if (home !== '' || null || undefined) {
      if (index !== undefined || null) {
        this.addressLocally[index].home = home;
        this.addressLocally[index].landMark = landMark;
      } else {
        if (this.currentAddress.length == 0) {
          this.savedAddress.push({ home, landMark });
          setTimeout(() => {
            console.log('savedAddress ', this.savedAddress);
            localStorage.setItem(
              'savedAddress',
              JSON.stringify(this.savedAddress)
            );
            localStorage.setItem(
              'listOfAddedAddress',
              JSON.stringify(this.savedAddress)
            );
            window.location.reload();
          }, 1000);
        } else {
          this.addressLocally.push({ home, landMark });
          setTimeout(() => {
            localStorage.setItem(
              'listOfAddedAddress',
              JSON.stringify(this.addressLocally)
            );
            window.location.reload();
          }, 2000);
        }
      }
    }
  }

  public getlandMarkDetail(value: string) {
    value != '' || null || undefined
      ? (this.landVal = true)
      : (this.landVal = false);
  }

  public toggleActive(button: string) {
    if (this.activeButton === button) {
      this.activeButton = null;
    } else {
      this.activeButton = button;
    }
    button == 'other' ? (this.otherToggle = true) : (this.otherToggle = false);
  }

  public clearInput(inputElement: HTMLInputElement): void {
    inputElement.value = '';
    this.homeVal = false;
    this.valueExist = false;
    this.landVal = false;
  }
  public getOtherValue(value: string) {
    value != '' || null || undefined
      ? (this.valueExist = true)
      : (this.valueExist = false);
  }

  public removeAddressSelected(index: number) {
    this.deletedAddressIndex = index;
  }

  public deleteAddress() {
    this.addressLocally.splice(this.deletedAddressIndex, 1);
    setTimeout(() => {
      localStorage.setItem(
        'listOfAddedAddress',
        JSON.stringify(this.addressLocally)
      );
      window.location.reload();
      console.log('deleted succes fully');
    }, 2000);
    if (this.addressLocally.length == 0) {
      localStorage.removeItem('savedAddress');
      localStorage.removeItem('serviceLater');
      localStorage.removeItem('serviceDate');
      window.location.reload();
    }
  }

  public back() {
    window.location.reload();
  }

  /*
   For set the detail of address to mapModal for updation
  */
  public updateAddress(addressIndex: any) {
    console.log('addressIndex ', addressIndex);
    if (addressIndex !== null || undefined) {
      this.homeDetailValue = this.addressLocally[addressIndex].home || '';
      this.landMarkValue = this.addressLocally[addressIndex].landMark || '';
      this.updateAddressIndex = addressIndex;
    }
  }

  public finalSubmit() {
    const data = this.updateVal.push(this.updateSavedAddress);
    setTimeout(() => {
      localStorage.setItem('savedAddress', JSON.stringify(this.updateVal));
      window.location.reload();
    }, 1000);
  }
  /*
   For get input value change in mapModal
  */
  public onHomeDetailChange(newValue: string) {
    this.homeDetailValue = newValue;
  }

  public onLandMarkChange(newValue: string) {
    this.landMarkValue = newValue;
  }

  public changeCurrentAddress() {
    // localStorage.setItem("savedAddress",JSON.stringify(this.updateSavedAddress))
  }

  public getCouponId(id: any) {
    if (id !== null || undefined || '') {
      this.idExist = false;
      this.couponId = id;
    } else {
      this.idExist = true;
    }
  }

  public selectedDateFxn(i: number, date: any) {
    this.dateSelected = new Array(this.dates.length).fill(false);
    this.dateSelected[i] = true;
    this.selectedDateOfSlot = date;
  }

  public selectedTimeFxn(i: number, time: any) {
    this.selectedTimeOfSlot = time;
    this.isTimeSelected = new Array(this.dates.length).fill(false);
    this.isTimeSelected[i] = true;
    if (this.isTimeSelected[i]) {
      this.slotSelected = false;
    } else {
      this.slotSelected = true;
    }
  }

  public getDayName(date: Date): string {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[date.getDay()];
  }

  public generateTimeSlots(): void {
    const currentTime = new Date();
    const initialTime = new Date(currentTime.getTime() + 1.5 * 60 * 60 * 1000);

    const interval = 30 * 60 * 1000;

    for (let i = 0; i < 16; i++) {
      const time = new Date(initialTime.getTime() + i * interval);
      this.timeSlots.push(this.formatTimeSlot(time));
    }
  }

  public formatTimeSlot(time: Date): string {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes === 0 ? '00' : minutes < 30 ? '00' : '30';
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  }

  public getSelectedSlot(index: number) {
    this.selectedSlotIndex = index;
    if (index == 0) {
      this.slotSelected = false;
      this.serviceGetLater = false;
    } else {
      this.slotSelected = true;
      this.serviceGetLater = true;
    }
  }

  public submitSlot() {
    if (this.selectedSlotIndex !== 0) {
      const currentDate = this.selectedDateOfSlot;
      const dateString = currentDate.toDateString();
      const parts = dateString.split(' ');
      const formattedDate = `${parts[0]} ${parts[1]} ${parts[2]}`;
      const serviceDate = {
        date: formattedDate,
        time: this.selectedTimeOfSlot,
      };
      localStorage.setItem('serviceDate', JSON.stringify(serviceDate));
      localStorage.removeItem('serviceLater');
      window.location.reload();
    } else {
      localStorage.setItem('serviceLater', this.getServiveLater);
      localStorage.removeItem('serviceDate');
      window.location.reload();
    }
  }

  public onInput(
    currentInput: HTMLInputElement,
    nextInput: HTMLInputElement | null,
    prevInput: HTMLInputElement | null
  ) {
    const value = currentInput.value;
    this.otp6 !== null || undefined ? (this.otp = true) : (this.otp = false);
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

  public signUp(
    otpVal1: any,
    otpVal2: any,
    otpVal3: any,
    otpVal4: any,
    otpVal5: any,
    otpVal6: any
  ) {
    const userOtp = otpVal1
      .toString()
      .concat(
        otpVal2.toString(),
        otpVal3.toString(),
        otpVal4.toString(),
        otpVal5.toString(),
        otpVal6.toString()
      );
    if (userOtp == this.otp_Value) {
      this.otpNumberExist = false;
      this.shouldDismiss = true;
    } else {
      this.otpNumberExist = true;
      this.shouldDismiss = false;
    }
  }

  public resendCode() {
    this.timeUp = false;
    this.seconds = 30;
    this.startTimer();
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

  public onFocus(index: number, event: FocusEvent, input: HTMLInputElement) {
    this.inputActive = index;
    input.select();
  }

  public submitUpiId(upi: any) {
    this.upiId == upi ? alert('success') : (this.wrongUpiIdError = true);
  }

  public getUpiIdVal(upiId: any) {
    if (upiId == '') {
      this.wrongUpiIdError = false;
    }
  }

  public getCardNumber(cardNumber: any) {
    cardNumber.length < 5 && cardNumber.length > 0
      ? (this.numberNotExist = true)
      : (this.numberNotExist = false);
  }

  public formatInput(inputValue: string) {
    const numericValue = inputValue.replace(/\D/g, '');
    if (numericValue.length <= 2) {
      this.formattedDate = numericValue;
    } else if (numericValue.length <= 4) {
      this.formattedDate =
        numericValue.slice(0, 2) + '/' + numericValue.slice(2);
    } else {
      this.formattedDate =
        numericValue.slice(0, 2) + '/' + numericValue.slice(2, 4);
    }
  }

  public getCardExpiry(date: any) {
    //In expiry Input of add card section
  }

  public getCvvCode(cvv: any) {
    if (cvv == this.cvvCode) {
      this.cvvIncorrect = false;
      this.credentialExist = true;
    } else {
      this.cvvIncorrect = true;
    }
  }

  submitCardCredential(date: string) {
    const currentDate = new Date();
    const enteredDateParts = date.split('/');

    const enteredMonth = parseInt(enteredDateParts[0], 10);
    const enteredYear = parseInt(enteredDateParts[1], 10);
    const currentYear = currentDate.getFullYear();
    const currentYearFirstTwoDigits = currentYear.toString().slice(2);
    const currentYear2 = parseInt(currentYearFirstTwoDigits);
    const currentMonth = currentDate.getMonth() + 1;

    if (
      enteredYear > currentYear2 ||
      (enteredYear === currentYear2 && enteredMonth > currentMonth) ||
      enteredMonth === currentMonth
    ) {
      this.expiryNotExist = false;
    } else {
      this.expiryNotExist = true;
    }
  }
}
