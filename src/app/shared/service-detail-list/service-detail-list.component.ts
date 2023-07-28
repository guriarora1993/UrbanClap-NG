import { Component, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { addCart, removeCart, reset } from '@app/state/app.actions';
import { AppState } from '@app/state/app.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
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
  constructor(
    private elementRef: ElementRef,
    private router: Router,
    private store: Store<{ app: AppState }>
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
  public increment() {
    if (this.counterValue < 3) {
      this.store.dispatch(addCart());
    } else {
      alert('limited');
    }
  }

  public decrement() {
    this.store.dispatch(removeCart());
    this.addedCartsCount.subscribe((data) => {
      const cartsCount = data;
      if (cartsCount >= 1) {
        /*
        Option for implement something if card item is greater then 0
        */
      } else {
        this.addCart = true;
        this.cartPresent = false;
        this.emptyCart = true;
        this.store.dispatch(reset());
      }
    });
  }
  public demoData = [
    {
      serviceName: 'Packages',
      serviceTitle: 'Combo + Beared grooming + Relaxing head massage',
    },
    {
      serviceName: 'Mens/Kids haircut',
      serviceTitle: 'Haircut + Beared grooming + Relaxing head massage',
    },
    {
      serviceName: 'Face care',
      serviceTitle: 'Facial + Makeup + Relaxing face massage',
    },
    {
      serviceName: 'Shave/beared',
      serviceTitle: 'Facial + Makeup + Relaxing face massage',
    },
    {
      serviceName: 'Hair colour',
      serviceTitle: 'Smooth + colouring + Relaxing head massage',
    },
    {
      serviceName: 'Massage',
      serviceTitle: 'Smooth + colouring + Relaxing head massage',
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

  public testData = [
    {
      name: 'sachin',
      age: 22,
    },
    {
      name: 'sourav',
      age: 22,
    },
    {
      name: 'Jashan',
      age: 22,
    },
    {
      name: 'lalit',
      age: 22,
    },
  ];

  public addCartList() {
    this.cartPresent = !this.cartPresent;
    this.addCart = !this.addCart;
    this.emptyCart = !this.emptyCart;
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
}
