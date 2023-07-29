import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { addCart, removeCart, reset } from '@app/state/app.actions';
import { AppState } from '@app/state/app.reducer';
import { Store } from '@ngrx/store';
import { Observable, count } from 'rxjs';
import { LoaderService } from '@app/services/loader.service';
@Component({
  selector: 'app-service-detail-list',
  templateUrl: './service-detail-list.component.html',
  styleUrls: ['./service-detail-list.component.scss'],
})
export class ServiceDetailListComponent {
  public cartPresent: boolean = false;
  public addCart: boolean = true;
  public counterValue: number = 1;
  public emptyCart: boolean = true;
  public dataLoading: boolean = false;
  public addedCartsCount: Observable<number>;
  public cartLimitOver: boolean = false;
  public isSpanDisabled: boolean = false;
  public message: string = "You can't add anymore of this item";
  public selectedServices: any[] = [];
  constructor(
    private elementRef: ElementRef,
    private router: Router,
    private store: Store<{ app: AppState }>,
    private toaster: LoaderService
  ) {
    this.addedCartsCount = this.store.select(
      (state: { app: AppState }) => state.app.count
    );
  }

  ngOnInit(): void {}

  buttons = [
    {
      title: '20% off on Kotak Silk cards',
      img: '../../../assets/percentage-icon.png',
    },
    {
      title: '20% off on Kotak Silk cards',
      img: '../../../assets/percentage-icon.png',
    },
    {
      title: '20% off on Kotak Silk cards',
      img: '../../../assets/percentage-icon.png',
    },
    {
      title: '20% off on Kotak Silk cards',
      img: '../../../assets/percentage-icon.png',
    },
  ];

  public showContent: boolean = false;

  public toggleAccordion() {
    this.showContent = !this.showContent;
  }

  public increment(item: any, index: number) {
    const cartCountLimit = 3;

    if (this.demoData[index].cartCount < cartCountLimit) {
      this.demoData[index].cartCount++;

      // Check if the item already exists in selectedServices array
      const itemExists = this.selectedServices.some((service) => {
        return JSON.stringify(service) === JSON.stringify(item);
      });
      if (!itemExists) {
        this.selectedServices.push(item);
      } else {
      }
    } else {
      this.showToaster();
    }
  }

  public decrement(item: any, index: number) {
    item > 1
      ? this.demoData[index].cartCount--
      : (this.demoData[index].showAddCartButton = true);
  }
  public demoData = [
    {
      serviceName: 'Packages',
      serviceTitle: 'Combo + Beared grooming + Relaxing head massage',
      reviews: '1.85(85k reviews)',
      serviceAmount: '₹400',
      serviceImage: '../../../assets/packages.webp',
      showAddCartButton: true,
      cartCount: 1,
    },
    {
      serviceName: 'Mens/Kids haircut',
      serviceTitle: 'Haircut + Beared grooming + Relaxing head massage',
      reviews: '2.85(5k reviews)',
      serviceAmount: '₹500',
      serviceImage: '../../../assets/men&kids-haircut.webp',
      showAddCartButton: true,
      cartCount: 1,
    },
    {
      serviceName: 'Face care',
      serviceTitle: 'Facial + Makeup + Relaxing face massage',
      reviews: '0.85(85k reviews)',
      serviceAmount: '₹300',
      serviceImage: '../../../assets/face-care.webp',
      showAddCartButton: true,
      cartCount: 1,
    },
    {
      serviceName: 'Shave/beared',
      serviceTitle: 'Facial + Makeup + Relaxing face massage',
      reviews: '9.85(80k reviews)',
      serviceAmount: '₹600',
      serviceImage: '../../../assets/shaved-beared.webp',
      showAddCartButton: true,
      cartCount: 1,
    },
    {
      serviceName: 'Hair colour',
      serviceTitle: 'Smooth + colouring + Relaxing head massage',
      reviews: '41.85(812k reviews)',
      serviceAmount: '₹800',
      serviceImage: '../../../assets/hair-color.webp',
      showAddCartButton: true,
      cartCount: 1,
    },
    {
      serviceName: 'Massage',
      serviceTitle: 'Smooth + colouring + Relaxing head massage',
      reviews: '400.85(811k reviews)',
      serviceAmount: '₹200',
      serviceImage: '../../../assets/massage.webp',
      showAddCartButton: true,
      cartCount: 1,
    },
  ];
  public activeIndex: number = -1;
  public toggleScroll(index: number, serviceTitle: string, divId: any) {
    const element = this.elementRef.nativeElement.querySelector(divId);

    if (element) {
      element.scrollIntoView({ top: 0, behavior: 'smooth' });
    }
    this.activeIndex = index;
  }

  public serviceCardItems = [
    {
      img: '../../../assets/packages.webp',
      title: 'Packages',
    },
    {
      img: '../../../assets/men&kids-haircut.webp',
      title: 'Mens/kids haircut',
    },
    {
      img: '../../../assets/face-care.webp',
      title: 'Face care',
    },
    {
      img: '../../../assets/shaved-beared.webp',
      title: 'Shave/beared',
    },
    {
      img: '../../../assets/hair-color.webp',
      title: 'Hair colour',
    },
    {
      img: '../../../assets/massage.webp',
      title: 'Massage',
    },
  ];

  public scrollToTop(index: number) {
    this.demoData.splice(0, 0, this.demoData.splice(index, 1)[0]);
    setTimeout(() => {
      const element = this.elementRef.nativeElement.querySelector(
        `#div-${index}`
      );
    }, 0);
  }

  public addCartList(item: any) {
    item.showAddCartButton = false;
  }

  public viewCartDetail() {
    this.dataLoading = true;
    setTimeout(() => {
      if (this.counterValue != 0) {
        this.router.navigate(['/view-cart']);
      }
      this.dataLoading = false;
    }, 2000);
  }

  public showToaster() {
    this.cartLimitOver = true;
    this.isSpanDisabled = true;
    setTimeout(() => {
      this.cartLimitOver = false;
    }, 3000);
  }
}
