import {
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { AppState } from '@app/state/app.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LoaderService } from '@app/services/loader.service';
import { variables } from '../../constants/constants';
@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.scss'],
})
export class ViewCartComponent implements OnInit {
  @ViewChild('phoneNumber') phoneNumber: ElementRef<HTMLInputElement>;

  navigate() {
    this.route.navigate(['/login']);
  }
  public message: string = "You can't add anymore of this item";
  public cartLimitOver: boolean = false;
  public isSpanDisabled: boolean = false;
  public cartPresent: boolean = false;
  public addCart: boolean = true;
  public counterValue: number = 1;
  public emptyCart: boolean = false;
  public addedCartsCount: Observable<number>;
  public totalAmount: number = 0;
  public cartList: any[] = [];
  public grandTotal: number = 0;
  public taxOnService: number = 49.0;
  public isPhone: boolean = false;
  public numberExist: boolean = false;
  public otp4: any = null;
  public otp: boolean = false;
  public phoneNumberExist: boolean = false;
  public maxPhoneLimit: number = 10;
  public otp_Value = variables.OTP;
  public shouldDismiss: boolean = false;
  public otpNumberExist: boolean = false;
  public timeUp: boolean = false;
  public inputValues: string[] = ['', '', '', ''];
  public inputActive: number | null = 0;
  public inputEnable: boolean = false;
  public seconds: number = 30;
  public interval: any;
  public cartExist: boolean = false;
  public cartExist2: boolean = false;
  public isInputFocused: boolean = false;
  public modalOpen: boolean = false;
  public openTest: boolean = false;
  @ViewChild('input0', { static: false }) input0: ElementRef | undefined;
  @ViewChild('input1') input1!: ElementRef<HTMLInputElement>;
  @ViewChild('input2') input2!: ElementRef<HTMLInputElement>;
  @ViewChild('input3') input3!: ElementRef<HTMLInputElement>;
  @ViewChild('input4') input4!: ElementRef<HTMLInputElement>;
  constructor(
    private store: Store<{ app: AppState }>,
    private route: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.addedCartsCount = this.store.select(
      (state: { app: AppState }) => state.app.count
    );
  }

  ngOnInit() {
    this.totalAmount = parseFloat(localStorage.getItem('totalAmount') || '0');
    this.grandTotal = this.totalAmount + this.taxOnService;
    this.cartList = JSON.parse(localStorage.getItem('selectedCarts') || '[]');
    this.demoData = JSON.parse(localStorage.getItem('demoData') || '[]');
    const totalAmount = this.calculateTotalAmount(this.cartList);
    this.totalAmount = totalAmount || 0;
    this.grandTotal = totalAmount + this.taxOnService || 0;
  }

  public calculateTotalAmount(dataArray: any) {
    let totalAmount = 0;
    for (const item of dataArray) {
      totalAmount += item.serviceAmount;
    }
    return totalAmount;
  }

  public demoData = [
    {
      serviceName: 'Packages',
      serviceTitle: 'Combo + Beared grooming + Relaxing head massage',
      reviews: '1.85(85k reviews)',
      serviceAmount: 400,
      serviceImage: '../../../assets/packages.webp',
      showAddCartButton: true,
      cartCount: 0,
    },
    {
      serviceName: 'Mens/Kids haircut',
      serviceTitle: 'Haircut + Beared grooming + Relaxing head massage',
      reviews: '2.85(5k reviews)',
      serviceAmount: 500,
      serviceImage: '../../../assets/men&kids-haircut.webp',
      showAddCartButton: true,
      cartCount: 0,
    },
    {
      serviceName: 'Face care',
      serviceTitle: 'Facial + Makeup + Relaxing face massage',
      reviews: '0.85(85k reviews)',
      serviceAmount: 300,
      serviceImage: '../../../assets/face-care.webp',
      showAddCartButton: true,
      cartCount: 0,
    },
    {
      serviceName: 'Shave/beared',
      serviceTitle: 'Facial + Makeup + Relaxing face massage',
      reviews: '9.85(80k reviews)',
      serviceAmount: 600,
      serviceImage: '../../../assets/shaved-beared.webp',
      showAddCartButton: true,
      cartCount: 0,
    },
    {
      serviceName: 'Hair colour',
      serviceTitle: 'Smooth + colouring + Relaxing head massage',
      reviews: '41.85(812k reviews)',
      serviceAmount: 800,
      serviceImage: '../../../assets/hair-color.webp',
      showAddCartButton: true,
      cartCount: 0,
    },
    {
      serviceName: 'Massage',
      serviceTitle: 'Smooth + colouring + Relaxing head massage',
      reviews: '400.85(811k reviews)',
      serviceAmount: 200,
      serviceImage: '../../../assets/massage.webp',
      showAddCartButton: true,
      cartCount: 0,
    },
  ];

  public increment(item: any, index: number) {
    if (this.cartList[index].cartCount >= 3) {
      this.showToaster();
    } else {
      this.cartList[index].cartCount++;
      this.demoData[index].cartCount++;

      const test =
        this.cartList[index].serviceAmount + this.demoData[index].serviceAmount;
      this.cartList[index].serviceAmount = test;

      this.totalAmount = this.totalAmount + this.demoData[index].serviceAmount;
      this.grandTotal = this.grandTotal + this.demoData[index].serviceAmount;
    }
  }

  public decrement(item: any, index: number) {
    if (this.cartList[index].cartCount >= 1) {
      this.cartList[index].cartCount--;
      this.demoData[index].cartCount--;
      if (this.cartList[index].cartCount <= 0) {
        localStorage.setItem('selectedCarts', JSON.stringify(this.cartList));
        localStorage.setItem('demoData', JSON.stringify(this.demoData));
        localStorage.removeItem('cartExist');
      }
      /*
      Change actual demoData here
      */
      if (this.demoData[index].cartCount < 1) {
        localStorage.setItem('selectedCarts', JSON.stringify(this.cartList));
        localStorage.setItem('demoData', JSON.stringify(this.demoData));
        localStorage.removeItem('cartExist');
        this.demoData[index].showAddCartButton = true;
      } else {
        this.demoData[index].showAddCartButton = false;
      }
      const test =
        this.cartList[index].serviceAmount - this.demoData[index].serviceAmount;
      this.cartList[index].serviceAmount = test;
      this.totalAmount = this.totalAmount - this.demoData[index].serviceAmount;
      this.grandTotal = this.grandTotal - this.demoData[index].serviceAmount;
      if (this.cartList[index].cartCount <= 0) {
        this.cartList.splice(index, 1);
      }
    } else {
      this.cartList.splice(index, 1);
      localStorage.setItem('selectedCarts', JSON.stringify(this.cartList));
      localStorage.setItem('demoData', JSON.stringify(this.demoData));
    }
    if (this.cartList.length <= 0) {
      this.emptyCart = true;
    }
  }

  public showToaster() {
    this.cartLimitOver = true;
    this.isSpanDisabled = true;
    setTimeout(() => {
      this.cartLimitOver = false;
    }, 3000);
  }

  public navigateToComponent() {
    localStorage.setItem('selectedCarts', JSON.stringify(this.cartList));
    localStorage.setItem('demoData', JSON.stringify(this.demoData));
    const cartExist = true;
    localStorage.setItem('cartExist', JSON.stringify(cartExist));
    this.route.navigate(['/service-detail-list']);
  }
  public addMoreCards() {
    const newCart = {
      serviceName: 'Head massage',
      serviceTitle: 'Facial + Makeup + Relaxing face massage',
      reviews: '9.85(80k reviews)',
      serviceAmount: 450,
      serviceImage: '../../../assets/shaved-beared.webp',
      showAddCartButton: true,
      cartCount: 1,
    };
    this.cartList.push(newCart);
    this.cartExist = true;
    const addedAmount = newCart.serviceAmount + this.totalAmount;
    this.totalAmount = addedAmount;
    this.grandTotal = this.totalAmount + this.taxOnService;
  }
  public addMoreCards2() {
    const newCart2 = {
      serviceName: 'Body massage',
      serviceTitle: 'Facial + Makeup + Relaxing face massage',
      reviews: '9.85(80k reviews)',
      serviceAmount: 350,
      serviceImage: '../../../assets/shaved-beared.webp',
      showAddCartButton: true,
      cartCount: 1,
    };
    this.cartList.push(newCart2);
    this.cartExist2 = true;
    const addedAmount = newCart2.serviceAmount + this.totalAmount;
    this.totalAmount = addedAmount;
    this.grandTotal = this.totalAmount + this.taxOnService;
  }

  public openModal(): void {
    this.openTest = true;
    const test = this.cdr.detectChanges();
    console.log('output is ', test);
  }

  public getPhoneNumber(value: any) {
    value !== '' || null || undefined
      ? (this.isPhone = true)
      : (this.isPhone = false);
    if (value.length >= 10) {
      this.numberExist = true;
      this.inputEnable = true;
    } else {
      this.numberExist = false;
      this.inputEnable = false;
    }
  }

  public submitLoginCred(cred: any) {
    if (cred.length == 10) {
      this.phoneNumberExist = true;
      this.startTimer();
    } else {
      this.phoneNumberExist = false;
    }
  }

  public clearInput(inputElement: HTMLInputElement): void {
    inputElement.value = '';
    this.numberExist = false;
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

  public onFocus(index: number, event: FocusEvent, input: HTMLInputElement) {
    this.inputActive = index;
    input.select();
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

  public resendCode() {
    this.timeUp = false;
    this.seconds = 30;
    this.startTimer();
  }

  public inputFilled(index: number): boolean {
    return index === 0 || this.inputValues[index - 1].length > 0;
  }

  public signUp(optVal1: any, optVal2: any, optVal3: any, optVal4: any) {
    const userOtp = optVal1
      .toString()
      .concat(optVal2.toString(), optVal3.toString(), optVal4.toString());
    if (userOtp == this.otp_Value) {
      this.otpNumberExist = false;
      this.shouldDismiss = true;
    } else {
      this.otpNumberExist = true;
      this.shouldDismiss = false;
    }
  }

  public navigateToModal() {
    this.route.navigate(['login']);
  }

  public closeModal() {
    const modal = new bootstrap.Modal(document.getElementById('myModal'));
    modal.hide();
  }
}
