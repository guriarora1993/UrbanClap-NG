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
  public getServiveLater: string = "Service in 60-75 minutes";
  public cardFieldExist: boolean = false;
  public expiryExist: boolean = false;
  public cvvExist: boolean = false;
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
  constructor(
    private cdRef: ChangeDetectorRef,
    ) {}

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
    this.generateTimeSlots();
   setTimeout(()=>{ this.selectedDateFxn(0,this.dates[0]);},2000)
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

  public selectedDateFxn(i: number,date: any) {
    this.dateSelected = new Array(this.dates.length).fill(false);
    this.dateSelected[i] = true;
    this.selectedDateOfSlot = date;
  }

  public selectedTimeFxn(i: number,time: any) {
    this.selectedTimeOfSlot = time
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
    const initialTime = new Date(currentTime.getTime() + 1.5 * 60 * 60 * 1000); // Add 1.5 hours

    const interval = 30 * 60 * 1000; // 30 minutes in milliseconds

    for (let i = 0; i < 16; i++) {
      // Generate 16 time slots for 8 hours
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
    this.selectedSlotIndex = index
    if (index == 0) {
      this.slotSelected = false;
      this.serviceGetLater = false
    } else {
      this.slotSelected = true;
      this.serviceGetLater = true;
    }
  }

  public submitSlot(){
    if(this.selectedSlotIndex !== 0){
    const currentDate = this.selectedDateOfSlot; 
    const dateString = currentDate.toDateString();
    const parts = dateString.split(' ');
    const formattedDate = `${parts[0]} ${parts[1]} ${parts[2]}`;
    const serviceDate = {
      date: formattedDate,
      time: this.selectedTimeOfSlot
    }
    localStorage.setItem("serviceDate", JSON.stringify(serviceDate))
    localStorage.removeItem("serviceLater")
    window.location.reload()
    }
    else{
      localStorage.setItem("serviceLater", this.getServiveLater)
      localStorage.removeItem("serviceDate")
      window.location.reload()

    }
  }

}
