import { Component, ElementRef, ViewChild } from '@angular/core';
import { AppState } from '@app/state/app.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LoginModalComponent } from '@app/shared/login-modal/login-modal.component';
import { LoaderService } from '@app/services/loader.service';
@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.scss'],
})
export class ViewCartComponent {
  @ViewChild('phoneNumber', { static: false }) phoneNumber:
    | ElementRef<HTMLInputElement>
    | undefined;
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
  constructor(
    private store: Store<{ app: AppState }>,
    private route: Router,
    private dialog: MatDialog,
    private modal: LoaderService
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
      this.numberExist = true;
    } else {
      this.numberExist = false;
    }
  }

  public clearInput(inputElement: HTMLInputElement): void {
    inputElement.value = '';
    this.numberExist = false;
  }
}
