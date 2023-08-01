import { Component } from '@angular/core';
import { AppState } from '@app/state/app.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.scss'],
})
export class ViewCartComponent {
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
  constructor(private store: Store<{ app: AppState }>, private route: Router) {
    this.addedCartsCount = this.store.select(
      (state: { app: AppState }) => state.app.count
    );
  }

  ngOnInit() {
    this.totalAmount = parseFloat(localStorage.getItem('totalAmount') || '0');
    this.cartList = JSON.parse(localStorage.getItem('cartList') || '[]');
    this.grandTotal = this.totalAmount + this.taxOnService
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
      const test =
        this.cartList[index].serviceAmount + this.demoData[index].serviceAmount;
      this.cartList[index].serviceAmount = test;
    }
  }

  public decrement(item: any, index: number) {
    if (this.cartList[index].cartCount > 1) {
      this.cartList[index].cartCount--;
      const test =
        this.cartList[index].serviceAmount - this.demoData[index].serviceAmount;
      this.cartList[index].serviceAmount = test;
    } else {
      this.cartList.splice(index, 1);
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
    this.route.navigate(['/service-detail-list']);
  }
}
