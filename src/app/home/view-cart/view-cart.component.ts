import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnInit,
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
export class ViewCartComponent implements AfterViewInit, OnInit {
  @ViewChild('phoneNumber') phoneNumber: ElementRef<HTMLInputElement>;

  ngAfterViewInit() {}

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
  public input4: any;
  public otp: boolean = false;
  public phoneNumberExist: boolean = false;
  public maxPhoneLimit: number = 10;
  public otp_Value = variables.OTP;
  public shouldDismiss: boolean = false;
  public otpNumberExist: boolean = false;
  constructor(
    private store: Store<{ app: AppState }>,
    private route: Router,
    private modal: LoaderService,
    private element: ElementRef
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

  public cartExist: boolean = false;
  public cartExist2: boolean = false;
  addMoreCards() {
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
    this.modal.openModal();
  }

  public getPhoneNumber(value: any) {
    value !== '' || null || undefined
      ? (this.isPhone = true)
      : (this.isPhone = false);
    if (value.length >= 10) {
      // this.box1.nativeElement.focus()
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
    } else {
      this.phoneNumberExist = false;
    }
  }

  public clearInput(inputElement: HTMLInputElement): void {
    inputElement.value = '';
    this.numberExist = false;
  }

  @ViewChild('input0', { static: false }) input0: ElementRef | undefined;
  inputValues: string[] = ['', '', '', '']; // Store input values
  inputActive: number = 0; // Store the index of the active input
  public inputEnable: boolean = false;
  onInput(index: number, event: any, value: any) {
    this.inputValues[index] = event.target.value;
    if (index == 3) {
      this.otp = true;
    } else {
      this.otp = false;
    }
    if (event.target.value.length > 0) {
      this.inputActive = index < 3 ? index + 1 : index;
    }
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

  public navigateToModal(){
    this.route.navigate(["login"])
  }
}
