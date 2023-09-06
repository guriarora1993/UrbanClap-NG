import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { SidebarService } from '../services/sidebar.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  @ViewChild('searchVal') searchVal: any;
  public selectLocation: boolean = false;
  public sidebarVisible!: boolean;
  public searchInput: boolean = false;
  public navigateToService: boolean = false;
  public isHome: boolean = true;
  public userCredExist: boolean = false;
  public childVariable: boolean = false;
  constructor(private sidebarService: SidebarService, private router: Router) {}
  ngOnInit() {
    this.sidebarService.getSidebarVisible().subscribe((visible) => {
      this.sidebarVisible = visible;
      console.log("Home 1 ", this.sidebarVisible)
    });
    if (localStorage.getItem('userExist') !== null || undefined || '') {
      this.userCredExist = true;
    } else {
      this.userCredExist = false;
    }
  }

  public isNavbarVisible = false;
  public animatioName: string = '';
  @HostListener('window:scroll', ['$event'])
  public onWindowScroll(event: Event) {
    const scrolledPartHeight = window.innerHeight + window.scrollY;
    scrolledPartHeight >= 1545
      ? ((this.isNavbarVisible = true), (this.animatioName = 'slide-in'))
      : ((this.isNavbarVisible = false), (this.animatioName = 'slide-out'));
  }

  public getSearchVal(value: string) {
    value != '' ? (this.searchInput = true) : (this.searchInput = false);
  }
  public toggleSidebar(data: any) {
    this.sidebarService.toggleSidebar(data);
  }
  public headerData: any = [
    {
      mainHeading: 'Best Offers',
      subHeading: 'Redsky advance solutions pvt. ltd.',
    },
  ];

  public headerData2: any = [
    {
      mainHeading: 'Appliances',
      subHeading: 'Servicing, Repair, Installation & Uninstallation',
    },
  ];

  public headerData3: any = [
    {
      mainHeading: 'UC Luxury Experience',
      subHeading: 'Too Professionals | Best Brands | Premium Experience',
    },
  ];

  public headerData4: any = [
    {
      mainHeading: 'Cleaning & Pest Control',
      subHeading: '',
    },
  ];

  public headerData5: any = [
    {
      mainHeading: 'Salon, Spa and Massage services ',
      subHeading: 'Hygenic & Single use Products | Low-contact services',
    },
  ];

  public headerData6: any = [
    {
      mainHeading: 'Home Repairs',
      subHeading: '',
    },
  ];
  public cardDetails: any = [
    {
      image: '../../assets/salon-prime.webp',
      heading: 'Salon Prime For Kids and Mens',
      subHeading: 'Haircut at ₹199',
    },
    {
      image: '../../assets/salon-prime-women.webp',
      heading: 'Salon Prime',
      subHeading: 'Up to 50% Off',
    },
    {
      image: '../../assets/massage-men.webp',
      heading: 'Massage For Men',
      subHeading: 'Free head massage',
    },
    {
      image: '../../assets/cleaning.webp',
      heading: 'Bathroom & Kitchen Cleaning',
      subHeading: '',
    },
  ];

  public cardDetails2: any = [
    {
      image: '../../assets/giser.webp',
      heading: 'Geyser Repair',
      subHeading: '',
    },
    {
      image: '../../assets/washing-machine.webp',
      heading: 'Water Purifier Repair',
      subHeading: 'Up to 45% Off',
    },
    {
      image: '../../assets/ro.webp',
      heading: 'Washing Machine Repair',
      subHeading: '',
    },
  ];

  public cardDetails3: any = [
    {
      image: '../../assets/salon-luxe.webp',
      heading: 'Saloon-Luxe',
      subHeading: 'Free Waxing',
    },
  ];

  public cardDetails4: any = [
    {
      image: '../../assets/cleaning.webp',
      heading: 'cleaning',
      subHeading: '',
    },
    {
      image: '../../assets/full-home-cleaning.webp',
      heading: 'Full Home Cleaning',
      subHeading: '',
    },
    {
      image: '../../assets/sofa-cleaning.webp',
      heading: 'Sofa Cleaning',
      subHeading: '',
    },
  ];

  public cardDetails5: any = [
    {
      image: '../../assets/salon-prime.webp',
      heading: 'Salon Prime For Kids and Mens',
      subHeading: 'Haircut at ₹199',
    },
    {
      image: '../../assets/salon-prime-women.webp',
      heading: 'Salon Prime',
      subHeading: 'Up to 50% Off',
    },
    {
      image: '../../assets/massage-men.webp',
      heading: 'Massage For Men',
      subHeading: 'Free head massage',
    },
    {
      image: '../../assets/cleaning.webp',
      heading: 'Bathroom & Kitchen Cleaning',
      subHeading: '',
    },
  ];

  public cardDetails6: any = [
    {
      image: '../../assets/carpenter.webp',
      heading: 'Carpenter',
      subHeading: '',
    },
    {
      image: '../../assets/electrician.webp',
      heading: 'Electrician',
      subHeading: '',
    },
    {
      image: '../../assets/plumber.jpeg',
      heading: 'Plumber',
      subHeading: '',
    },
  ];

  public adevertisementCred = [
    {
      img: '../../assets/carpenter.webp',
      title: 'UrbanCompany Insurance Protection',
      subTitle: 'Upto Rs. 10,000 insurance cover with every service requests.',
      imageleft: false,
    },
  ];

  public adevertisementCred2 = [
    {
      img: '../../assets/plumber.jpeg',
      title: 'UrbanCompany Insurance Protection',
      subTitle: 'Upto Rs. 10,000 insurance cover with every service requests.',
      imageleft: true,
    },
  ];

  public adevertisementCred3 = [
    {
      img: '../../assets/electrician.webp',
      title: 'UrbanCompany Insurance Protection',
      subTitle: 'Upto Rs. 10,000 insurance cover with every service requests.',
      imageleft: false,
    },
  ];

  public sidebarContent1 = [
    {
      img: '../../assets/salon-prime.jpeg',
      heading: 'Salon for Women',
      title: 'Salon Prime',
    },
    {
      img: '../../assets/salon-classic.jpeg',
      heading: 'Salon for Women',
      title: 'Salon Classic',
    },
  ];

  public sidebarContent2 = [
    {
      img: '../../assets/nail-studio.png',
      heading: 'Please Select',
      title: 'Nail Studio for Women',
    },
    {
      img: '../../assets/hair-studio.png',
      title: 'Hair Studio for Women',
    },
  ];

  public sidebarContent3 = [
    {
      img: '../../assets/cleaning.webp',
      heading: 'Professional Cleaning Services',
      title: 'Bathroom & Kitchen',
    },
    {
      img: '../../assets/home-repairs.jpeg',
      title: 'Full Home Cleaning',
    },
    {
      img: '../../assets/sofa-cleaning.jpeg',
      title: 'Sofa & Carpet Cleaning',
    },
    {
      img: '../../assets/disinfection.jpeg',
      title: 'Disinfection Services',
    },
  ];

  public sidebarContent4 = [
    {
      img: '../../assets/electrician.webp',
      heading: 'Please Select',
      title: 'Electrician',
    },
    {
      img: '../../assets/plumber.jpeg',
      title: 'Plumbers',
    },
    {
      img: '../../assets/carpenter.webp',
      title: 'Carpenters',
    },
  ];

  public sidebarContent5 = [
    {
      img: '../../assets/ac-repair.jpeg',
      heading: 'Appliance Repair',
      title: 'AC Service and Repair',
    },
    {
      img: '../../assets/microwave-repair.jpeg',
      title: 'Microwave Repair',
    },
    {
      img: '../../assets/refrigrator-repair.jpeg',
      title: 'Refrigerator Repair',
    },
    {
      img: '../../assets/washing-machine.webp',
      title: 'Washing Machine Repair',
    },
    {
      img: '../../assets/ro.webp',
      title: 'Water Purifier Repair',
    },
    {
      img: '../../assets/chimney-repair.jpeg',
      title: 'Chimney Repair',
    },
    {
      img: '../../assets/giser.webp',
      title: 'Geyser Repair',
    },
  ];

  public loginContent = [
    {
      heading: 'Please login to continue',
      login: true,
    },
  ];
  public showLocationModal() {
    this.selectLocation = !this.selectLocation;
  }

  public navigate(value: string) {
    this.navigateToService = true;
    setTimeout(() => {
      this.navigateToService = false;
      this.router.navigate(['service-detail-list'], {
        queryParams: { key: value },
      });
    }, 2000);
  }

  public clearInput() {
    this.searchVal.nativeElement.value = '';
  }

  public navigateToHelp() {
    this.router.navigate(['help']);
  }

  public navigateToBooking() {
    this.router.navigate(['booking']);
  }

  public cartLimitOver: boolean = false;
  public message: string = 'Welcome back! You are now logged in';

  public showToaster() {
    this.cartLimitOver = true;
    setTimeout(() => {
      this.closeToaster();
    }, 3000);
  }

  private closeToaster() {
    this.cartLimitOver = false;
  }

  public onVariableChange(newValue: boolean) {
    if (newValue === true) {
      this.showToaster();
    }
  }

  public logOut() {
    localStorage.removeItem('userExist');
    window.location.reload();
  }

  public openInNewTab(routePath: string) {
    const url = window.location.origin + routePath;
    window.open(url, '_blank');
  }
}
