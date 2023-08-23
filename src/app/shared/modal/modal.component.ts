import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements AfterViewInit {
  @Input() modalOpen: boolean;
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
  public isDropdownOpen: boolean = false;
  public radioSelected: boolean = false;
  public buttonBackgroundColor: string = 'white';
  public buttonColor: string = 'black';
  public currentAddress: any = [];
  public dropdownStates: boolean[] = [];
  constructor(private cdRef: ChangeDetectorRef) {}

  public toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  public onRadioChange(check: any) {
    if (check == 'on') {
      this.buttonBackgroundColor = 'rgb(121, 79, 231)';
      this.buttonColor = 'white';
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
        this.dropdownStates = new Array(this.addressLocally).fill(false);
      this.currentAddress = JSON.parse(
        localStorage.getItem('savedAddress') || '[]'
      );
    } else {
      console.log('Address not exist');
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
    console.log('value is ', value);
    value != '' || null || undefined
      ? (this.homeVal = true)
      : (this.homeVal = false);
  }

  public submitAddress(home: string, landMark: String) {
    if (home !== '' || null || undefined) {
      if(this.currentAddress.length >= 0 ){
        this.currentAddress.push({home, landMark})
        setTimeout(() => {
          localStorage.setItem('listOfAddedAddress', JSON.stringify(this.currentAddress));
          window.location.reload()
        }, 1000);
      }
      this.savedAddress.push({ home, landMark });
      setTimeout(() => {
        localStorage.setItem('savedAddress', JSON.stringify(this.savedAddress));
        window.location.reload()
      }, 1000);
    } else {
      console.log('valie is empty');
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

  public deleteAddress(){
    localStorage.removeItem("listOfAddedAddress")
    window.location.reload()
  }

  public back(){
    window.location.reload()
  }
}
