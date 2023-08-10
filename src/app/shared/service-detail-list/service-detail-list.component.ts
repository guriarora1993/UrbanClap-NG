import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from '@app/services/loader.service';
import { AppState } from '@app/state/app.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
@Component({
  selector: 'app-service-detail-list',
  templateUrl: './service-detail-list.component.html',
  styleUrls: ['./service-detail-list.component.scss'],
  animations: [
    trigger('accordionContent', [
      state('collapsed', style({ height: '0', opacity: 0 })),
      state('expanded', style({ height: '*', opacity: 1 })),
      transition('collapsed => expanded', animate('300ms ease-out')),
      transition('expanded => collapsed', animate('300ms ease-in')),
    ]),
  ],
})
export class ServiceDetailListComponent {
  @Input() screenName: any;
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
  public totalAmountOfService: number = 0;
  public rotationAngle: number = 180;
  public changeValue: boolean = false;
  public isHome: boolean = false;
  public videoComplete: boolean = false;
  public isOpen: boolean = false;
  public progressPercentage: any = 0;

  public toggleAccordion() {
    this.isOpen = !this.isOpen;
    this.rotationAngle = this.rotationAngle === 180 ? 360 : 180;
  }
  constructor(
    private elementRef: ElementRef,
    private router: Router,
    private store: Store<{ app: AppState }>,
    private toaster: LoaderService,
    private route: ActivatedRoute
  ) {
    this.addedCartsCount = this.store.select(
      (state: { app: AppState }) => state.app.count
    );
  }

  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const value = params['key'];
      this.screenName = value;
    });
  }

  ngAfterViewInit() {
    this.updateProgress();
    this.videoPlayer.nativeElement.addEventListener('timeupdate', () =>
      this.updateProgressSmoothly()
    );
  }

  public initVideo() {
    const video = this.videoPlayer.nativeElement;
    video.addEventListener('timeupdate', () => {
      this.updateProgress();
    });
  }

  playPause() {
    const video = this.videoPlayer.nativeElement;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }

  updateProgress() {
    const video = this.videoPlayer.nativeElement;
    if (video) {
      this.progressPercentage = (video.currentTime / video.duration) * 100;
    }
  }

  updateProgressSmoothly() {
    const video = this.videoPlayer.nativeElement;
    if (video) {
      const newProgress = (video.currentTime / video.duration) * 100;
      const smoothnessFactor = 0.1;

      const animate = () => {
        this.progressPercentage +=
          (newProgress - this.progressPercentage) * smoothnessFactor;

        if (Math.abs(this.progressPercentage - newProgress) > 0.1) {
          requestAnimationFrame(animate);
        } else {
          this.progressPercentage = newProgress;
          if (this.progressPercentage >= 100) {
            this.videoComplete = true;
          } else {
            this.videoComplete = false;
          }
        }
      };

      requestAnimationFrame(animate);
    }
  }

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

  public increment(item: any, index: number) {
    this.changeValue = true;
    setTimeout(() => {
      this.changeValue = false;
    }, 1000);
    const cartCountLimit = 3;
    if (this.demoData[index].cartCount < cartCountLimit) {
      this.demoData[index].cartCount++;
      this.demoData[index].showAddCartButton = false;
      const itemExists = this.demoData2.some((service) => {
        return JSON.stringify(service) === JSON.stringify(item);
      });
      if (!itemExists) {
        for (let index = 0; index < this.demoData.length; index++) {
          const itemAmount =
            this.demoData[index].serviceAmount * this.demoData[index].cartCount;
          if (this.demoData[index].cartCount > 0) {
            const updatedItem = {
              ...this.demoData[index],
              serviceAmount: itemAmount,
            };
            this.selectedServices.push(updatedItem);
            const uniqueServices = this.selectedServices.reduce(
              (acc: any[], curr: any) => {
                const existingServiceIndex = acc.findIndex(
                  (item) => item.serviceName === curr.serviceName
                );
                if (existingServiceIndex !== -1) {
                  if (curr.cartCount > acc[existingServiceIndex].cartCount) {
                    acc.splice(existingServiceIndex, 1, curr);
                  }
                } else {
                  acc.push(curr);
                }
                return acc;
              },
              []
            );
            this.selectedServices = uniqueServices;
            const serviceAmountValues = this.selectedServices.map(
              (item) => item.serviceAmount
            );
            const totalAmount = serviceAmountValues.reduce(
              (accumulator, currentValue) => {
                return accumulator + currentValue;
              },
              0
            );

            this.totalAmountOfService = totalAmount;
          }
        }
      } else {
      }
    } else {
      this.showToaster();
    }
  }

  public decrement(item: any, index: number) {
    const cartCountLimit = 0;
    this.demoData[index].showAddCartButton = true;
    if (this.demoData[index].cartCount > cartCountLimit) {
      this.demoData[index].cartCount--;
      if (this.demoData[index].cartCount < 1) {
        this.demoData[index].showAddCartButton = true;
      } else {
        this.demoData[index].showAddCartButton = false;
      }
      const idx = this.selectedServices.findIndex(
        (el: any) => item.serviceTitle === el.serviceTitle
      );
      if (idx != -1) {
        if (this.demoData[index].cartCount == 0) {
          this.selectedServices.splice(idx, 1);
        } else {
          this.selectedServices[idx].cartCount = this.demoData[index].cartCount;
          this.selectedServices[idx].serviceAmount =
            this.demoData[index].cartCount * item.serviceAmount;
        }
      }
      const serviceAmountValues = this.selectedServices.map(
        (item) => item.serviceAmount
      );

      const totalAmount = serviceAmountValues.reduce(
        (accumulator, currentValue) => {
          return accumulator - currentValue;
        },
        0
      );
      console.log('tOTAL ', totalAmount);
      this.totalAmountOfService = totalAmount;
    } else {
      this.demoData[index].showAddCartButton = true;
    }
  }
  public decrementSelectedServices(item: any, index: number) {
    console.log('Left side ', item);
    this.changeValue = true;
    setTimeout(() => {
      this.changeValue = false;
    }, 1000);
    const cartCountLimit = 0;
    this.demoData[index].showAddCartButton = true;
    if (this.demoData[index].cartCount > cartCountLimit) {
      this.demoData[index].cartCount--;
      if (this.demoData[index].cartCount < 1) {
        this.demoData[index].showAddCartButton = true;
      } else {
        this.demoData[index].showAddCartButton = false;
      }
      const idx = this.selectedServices.findIndex(
        (el: any) => item.serviceTitle === el.serviceTitle
      );
      if (idx != -1) {
        if (this.demoData[index].cartCount == 0) {
          this.selectedServices.splice(idx, 1);
        } else {
          this.selectedServices[idx].cartCount = this.demoData[index].cartCount;
          this.selectedServices[idx].serviceAmount =
            this.demoData[index].cartCount * item.serviceAmount;
        }
      }
      const serviceAmountValues = this.selectedServices.map(
        (item) => item.serviceAmount
      );

      // Calculate the sum of serviceAmount values using reduce
      const totalAmount = serviceAmountValues.reduce(
        (accumulator, currentValue) => {
          return accumulator - currentValue;
        },
        0
      );
      this.totalAmountOfService = totalAmount;
    } else {
      this.demoData[index].showAddCartButton = true;
    }
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
      description: [
        'Beared trimming & styling',
        'Haircut for men',
        '10 min relaxing massage',
      ],
    },
    {
      serviceName: 'Mens/Kids haircut',
      serviceTitle: 'Haircut + Beared grooming + Relaxing head massage',
      reviews: '2.85(5k reviews)',
      serviceAmount: 500,
      serviceImage: '../../../assets/men&kids-haircut.webp',
      showAddCartButton: true,
      cartCount: 0,
      description: [
        'Beared trimming & styling',
        'Haircut for men',
        '10 min relaxing massage',
      ],
    },
    {
      serviceName: 'Face care',
      serviceTitle: 'Facial + Makeup + Relaxing face massage',
      reviews: '0.85(85k reviews)',
      serviceAmount: 300,
      serviceImage: '../../../assets/face-care.webp',
      showAddCartButton: true,
      cartCount: 0,
      description: [
        'Beared trimming & styling',
        'Haircut for men',
        '10 min relaxing massage',
      ],
    },
    {
      serviceName: 'Shave/beared',
      serviceTitle: 'Facial + Makeup + Relaxing face massage',
      reviews: '9.85(80k reviews)',
      serviceAmount: 600,
      serviceImage: '../../../assets/shaved-beared.webp',
      showAddCartButton: true,
      cartCount: 0,
      description: [
        'Beared trimming & styling',
        'Haircut for men',
        '10 min relaxing massage',
      ],
    },
    {
      serviceName: 'Hair colour',
      serviceTitle: 'Smooth + colouring + Beared setting',
      reviews: '41.85(812k reviews)',
      serviceAmount: 800,
      serviceImage: '../../../assets/hair-color.webp',
      showAddCartButton: true,
      cartCount: 0,
      description: [
        'Beared trimming & styling',
        'Haircut for men',
        '10 min relaxing massage',
      ],
    },
    {
      serviceName: 'Massage',
      serviceTitle: 'Smooth + colouring + Relaxing head massage',
      reviews: '400.85(811k reviews)',
      serviceAmount: 200,
      serviceImage: '../../../assets/massage.webp',
      showAddCartButton: true,
      cartCount: 0,
      description: [
        'Beared trimming & styling',
        'Haircut for men',
        '10 min relaxing massage',
      ],
    },
  ];
  public demoData2 = [
    {
      serviceName: 'Packages',
      serviceTitle: 'Combo + Beared grooming + Relaxing head massage',
      reviews: '1.85(85k reviews)',
      serviceAmount: 100,
      serviceImage: '../../../assets/packages.webp',
      showAddCartButton: true,
      cartCount: 0,
    },
    {
      serviceName: 'Mens/Kids haircut',
      serviceTitle: 'Haircut + Beared grooming + Relaxing head massage',
      reviews: '2.85(5k reviews)',
      serviceAmount: 100,
      serviceImage: '../../../assets/men&kids-haircut.webp',
      showAddCartButton: true,
      cartCount: 0,
    },
    {
      serviceName: 'Face care',
      serviceTitle: 'Facial + Makeup + Relaxing face massage',
      reviews: '0.85(85k reviews)',
      serviceAmount: 100,
      serviceImage: '../../../assets/face-care.webp',
      showAddCartButton: true,
      cartCount: 0,
    },
    {
      serviceName: 'Shave/beared',
      serviceTitle: 'Facial + Makeup + Relaxing face massage',
      reviews: '9.85(80k reviews)',
      serviceAmount: 100,
      serviceImage: '../../../assets/shaved-beared.webp',
      showAddCartButton: true,
      cartCount: 0,
    },
    {
      serviceName: 'Hair colour',
      serviceTitle: 'Smooth + colouring + Relaxing head massage',
      reviews: '41.85(812k reviews)',
      serviceAmount: 100,
      serviceImage: '../../../assets/hair-color.webp',
      showAddCartButton: true,
      cartCount: 0,
    },
    {
      serviceName: 'Massage',
      serviceTitle: 'Smooth + colouring + Relaxing head massage',
      reviews: '400.85(811k reviews)',
      serviceAmount: 100,
      serviceImage: '../../../assets/massage.webp',
      showAddCartButton: true,
      cartCount: 0,
    },
  ];
  // ₹
  public activeIndex: number = -1;
  public toggleScroll(index: number, serviceTitle: string, divId: any) {
    const divRef = `#service-${index}`;
    const element = this.elementRef.nativeElement.querySelector(divRef);
    if (element) {
      element.scrollIntoView({ top: 100, behavior: 'smooth' });
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

  public viewCartDetail(cartList: any, totalAmount: number) {
    this.dataLoading = true;
    localStorage.setItem('cartList', JSON.stringify(cartList));
    localStorage.setItem('totalAmount', totalAmount.toString());
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
