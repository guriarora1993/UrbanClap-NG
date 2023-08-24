import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  ViewChild,
  EventEmitter,
  Output
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
  public couponId: any 
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
    if(this.addressLocally.length == 0){
      localStorage.removeItem("savedAddress")
      window.location.reload()
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

  public getCouponId(id: any){
    if(id !== null || undefined || ""){
      this.idExist = false
      this.couponId = id;
    }
    else{
      this.idExist = true
    }
  }
}
