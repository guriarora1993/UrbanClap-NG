import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
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
import { DatabaseService } from '@app/services/database.service';
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
  public isCartExist: boolean = false;
  public editPackageData: any = [];
  public toggleAccordion() {
    this.isOpen = !this.isOpen;
    this.rotationAngle = this.rotationAngle === 180 ? 360 : 180;
  }
  constructor(
    private elementRef: ElementRef,
    private router: Router,
    private store: Store<{ app: AppState }>,
    private route: ActivatedRoute,
    private database: DatabaseService
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
    const myBooleanValue = localStorage.getItem('cartExist');
    if (myBooleanValue !== null) {
      const cartExist = JSON.stringify(myBooleanValue);
      if (cartExist) {
        this.whenServiceSelected();
      }
    } else {
      console.log('Cart does not exist');
    }
  }

  public whenServiceSelected() {
    this.selectedServices = JSON.parse(
      localStorage.getItem('selectedCarts') || '[]'
    );
    console.log('selected Items are ', this.selectedServices);
    this.demoData = JSON.parse(localStorage.getItem('demoData') || '[]');
    this.totalAmountOfService = this.calculateTotalAmount(
      this.selectedServices
    );
  }

  public calculateTotalAmount(dataArray: any) {
    let totalAmount = 0;
    for (const item of dataArray) {
      totalAmount += item.serviceAmount;
    }
    return totalAmount;
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

  public playPause() {
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

  public updateProgressSmoothly() {
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

  public buttons = [
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
        localStorage.setItem('demoData', JSON.stringify(this.demoData));
        localStorage.removeItem('cartExist');
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
      this.totalAmountOfService = totalAmount;
    } else {
      this.demoData[index].showAddCartButton = true;
      localStorage.setItem(
        'selectedCarts',
        JSON.stringify(this.selectedServices)
      );
      localStorage.setItem('demoData', JSON.stringify(this.demoData));
    }
  }
  public decrementSelectedServices(item: any, index: number) {
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
        localStorage.setItem('demoData', JSON.stringify(this.demoData));
        localStorage.removeItem('cartExist');
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
      this.totalAmountOfService = totalAmount;
    } else {
      this.demoData[index].showAddCartButton = true;
    }
  }

  public processContent = [
    {
      index: '1',
      title: 'Consultation',
      subTitle:
        'Professional understands customer needs and hair condition to suggest suitable options',
      gap: '60',
    },
    {
      index: '2',
      title: 'Set-up',
      subTitle:
        'Sanitisation of tools and placement of cape, mirror, floor, sheet',
      gap: '50',
    },
    {
      index: '3',
      title: 'Parting & sectioning',
      subTitle:
        'Detangling of hair followed by dividing it into small sections',
      gap: '50',
    },
    {
      index: '4',
      title: 'Hair cut',
      subTitle:
        'Spraying of water, followed by cutting of hair as per the desired hair style with the cape on',
      gap: '50',
    },
    {
      index: '5',
      title: 'Confirmation',
      subTitle:
        'Rechecking of the output with customer and working on suggestions (if any) for desired results',
      gap: '50',
    },
    {
      index: '6',
      title: 'Clean up',
      subTitle:
        'Removal of all the hair strands, sanitisation of tools and clean up of the surrounding area',
      gap: '50',
    },
  ];

  public feedbackList = [
    {
      name: 'Kritika',
      when: 'Sep 2023',
      feedback: 'Good Experiance',
      stars:5
    },
    {
      name: 'Satish',
      when: 'Sep 2023',
      feedback: 'Good Staff and service',
      stars:4
    },
    {
      name: 'Virat Kohli',
      when: 'Sep 2023',
      feedback: 'Cleaning is Good',
      stars:5
    },
    {
      name: 'Chahal',
      when: 'Sep 2023',
      feedback: 'Good Experiance',
      stars:3
    },
    {
      name: 'Ishan',
      when: 'Sep 2023',
      feedback: 'Nice Experiance',
      stars:5
    },
    {
      name: 'Thanku @ajay',
      when: 'Sep 2023',
      feedback: 'Good Experiance',
      stars:2
    },
    {
      name: 'Sachin Chobey',
      when: 'Sep 2023',
      feedback: 'Good Servive and nice behaviour',
      stars:5
    },
    {
      name: 'Anjali Pandey',
      when: 'Sep 2023',
      feedback: 'Good Experiance',
      stars:4
    },
    {
      name: 'Smith',
      when: 'Sep 2023',
      feedback: 'Good Experiance',
      stars:5
    },
    {
      name: 'Jhonson',
      when: 'Sep 2023',
      feedback: 'Good Experiance',
      stars:3
    },
    {
      name: 'David',
      when: 'Sep 2023',
      feedback: 'Good Experiance',
      stars:5
    },
    {
      name: 'Mitchel',
      when: 'Sep 2023',
      feedback: 'Good Experiance',
      stars:2,
    },
    {
      name: 'Lathon',
      when: 'Sep 2023',
      feedback: 'Good Experiance',
      stars:5
    },
    {
      name: 'Williamson',
      when: 'Sep 2023',
      feedback: 'Good Experiance',
      stars:4
    },
    {
      name: 'Trent',
      when: 'Sep 2023',
      feedback: 'Good Experiance',
      stars:3
    },
    {
      name: 'Azam',
      when: 'Sep 2023',
      feedback: 'bad Experiance',
      stars:1
    },
  ];

  public reviewList = [
    {
      star: 5,
      percentage: '80',
      count: '120.6k',
    },
    {
      star: 4,
      percentage: '70',
      count: '100.6k',
    },
    {
      star: 3,
      percentage: '70',
      count: '80.60k',
    },
    {
      star: 2,
      percentage: '50',
      count: '50.60k',
    },
    {
      star: 1,
      percentage: '10',
      count: '06.00k',
    },
  ];

  public questionsList = [
    {
      question: 'Is hair wash include in the service?',
      answer: 'No, you can book the hair wash service separately',
    },
    {
      question:
        'Will the professional bring salon cape, hand mirror and other required material?',
      answer:
        'Yes, the professional will bring all the tools required for the service. Please ensure you have a comfortable chair handy',
    },
    {
      question: 'Will there be hair all over my place after the service?',
      answer:
        'No, our professional will clean the service area to ensure a mess-free service delivery.',
    },
    {
      question: 'Do UC salon professionals carry capes?',
      answer: 'Yes, we bring our own re-usable capes for all services.',
    },
  ];

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
        'Haircut for men',
        'Beared trimming & styling',
        '10 min relaxing massage',
      ],
      title: ['Haircut', 'Beared grooming', 'Massage'],
      viewExist: false,
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
      viewExist: true,
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
      viewExist: true,
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
      viewExist: true,
    },
    {
      serviceName: 'Hair colour',
      serviceTitle: 'Smooth + colouring + Beared setting',
      reviews: '41.85(812k reviews)',
      serviceAmount: 800,
      serviceImage: '../../../assets/hair-color.webp',
      showAddCartButton: true,
      cartCount: 0,
      description: ['Hair Cut', 'Deep black (shade 1)'],
      title: ['Haircut', 'Garnier colors'],
      viewExist: false,
    },
    {
      serviceName: 'Massage',
      serviceTitle: 'Smooth + colouring + Relaxing head massage',
      reviews: '400.85(811k reviews)',
      serviceAmount: 200,
      serviceImage: '../../../assets/massage.webp',
      showAddCartButton: true,
      cartCount: 0,
      description: ['Massage', 'Head massage'],
      title: ['Neck & shoulder', 'Hair strengthening'],
      viewExist: false,
    },
  ];
  public demoData2 = [
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

  public editableService: any = [];
  public viewCartDetail(cartList: any, totalAmount: number) {
    const selectedData = {
      cartList,
    };
    this.dataLoading = true;
    this.database.addServiceCart('selectedService', selectedData, 'addedCart');
    localStorage.setItem(
      'selectedCarts',
      JSON.stringify(this.selectedServices)
    );
    localStorage.setItem('demoData', JSON.stringify(this.demoData));
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

  public closeModal() {
    const modalContainer = document.getElementById('editModal');
    modalContainer?.classList.remove('show');
  }

  public editService(serviceId: any) {
    // const titleData = JSON.stringify(this.demoData[serviceId].serviceTitle.split("+"));
    // this.demoData[serviceId].serviceTitle = titleData;
    this.editableService.push(this.demoData[serviceId]);
  }

  public editPackage(index: any) {
    this.editPackageData = [this.demoData[index]];
  }
}
