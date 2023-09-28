import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from '@app/services/sidebar.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
  constructor(private sidebarService: SidebarService, private router: Router) {}
  ngOnInit():void{
    this.sidebarService.getSidebarVisible().subscribe((visible) => {
      this.sidebarVisible = visible;
    });
  }
  public userCredExist: boolean = false;
  public sidebarVisible!: boolean;
  public cartLimitOver: boolean = false;
  public childVariable: boolean = false;

  public informationData = [
    {
      counts: '45,000+',
      title: 'Trained Professionals',
    },
    {
      counts: '10 Million+',
      title: 'Happy Customers',
    },
    {
      counts: '62',
      title: 'Cities',
    },
    {
      counts: '5',
      title: 'Countries',
    },
  ];

  public founderDetail = [
    {
      profileImage: '../../../assets/founder-1.jpeg',
      founderName: 'Abhiraj Bhal',
      founderRole: 'CEO & Co-founder, Urban Company',
      about:
        "Abhiraj is responsible for marketing and product growth at Urban Company. When not busy at Urban Company, Abhiraj enjoys immersing himself in interesting experiences be it running marathons, skydiving in Spain, scuba diving in the Andamans or cooking his wife Urvi's favourite dishes.",
    },
    {
      profileImage: '../../../assets/founder2.jpeg',
      founderName: 'Raghav Chandra',
      founderRole: 'CPTO & Co-founder, Urban Company',
      about:
        'Raghav leads technology and product development at Urban Company. In his free time, Raghav loves to venture outdoors and try his balance while slacklining and bouldering. Raghav is a dance enthusiast who does not miss any opportunity to groove to Westcoast Swing and Rock-n-Roll.',
    },
    {
      profileImage: '../../../assets/founder3.jpeg',
      founderName: 'Varun Khaitan',
      founderRole: 'COO & Co-founder, Urban Company',
      about:
        'Varun is responsible for operations and service provider on-boarding at Urban Company. When not building Urban Company, Varun likes to check out new coffee shops, explore Delhi with his Polaroid and go for a run at Lodhi Gardens - his favourite spot in the city.',
    },
  ];

  public boxes: any[] = [
    '../../../assets/inv1.png',
    '../../../assets/inv2.png',
    '../../../assets/inv3.png',
    '../../../assets/inv4.png',
    '../../../assets/inv5.png',
    '../../../assets/inv7.png',
    '../../../assets/inv8.png',
    '../../../assets/inv9.png',
    '../../../assets/inv10.png',
  ];

  public InvestorsImage = [
    {
      img: '../../../assets/p1.png',
      name: 'Ratan Naval Tata',
    },
    {
      img: '../../../assets/p2.png',
      name: 'Anjali Pandey',
    },
    {
      img: '../../../assets/p3.png',
      name: 'Deepinder Goyal',
    },
    {
      img: '../../../assets/p4.png',
      name: 'Kalyan Krishnamoorthy',
    },
    {
      img: '../../../assets/p5.png',
      name: 'Kunal Bahi',
    },
    {
      img: '../../../assets/p6.png',
      name: 'Kunal Shah',
    },
    {
      img: '../../../assets/p7.png',
      name: 'Mekin Maheshwary',
    },
    {
      img: '../../../assets/p8.png',
      name: 'Prashant malik',
    },
    {
      img: '../../../assets/p9.png',
      name: 'Ristesh Agarwal',
    },
    {
      img: '../../../assets/p10.png',
      name: 'Rohit Bansal',
    },
  ];

  public logOut() {
    localStorage.removeItem('userExist');
    window.location.reload();
  }

  public loginContent = [
    {
      heading: 'Please login to continue',
      login: true,
    },
  ];

  public toggleSidebar(data: any) {
    this.sidebarService.toggleSidebar(data);
  }

  public navigateToHelp() {
    this.router.navigate(['help']);
  }

  public navigateToBooking() {
    this.router.navigate(['booking']);
  }

  public openInNewTab(routePath: string) {
    const url = window.location.origin + routePath;
    window.open(url, '_blank');
  }

  public onVariableChange(newValue: boolean) {
    if (newValue === true) {
      this.showToaster();
    }
  }

  public showToaster() {
    this.cartLimitOver = true;
    setTimeout(() => {
      this.closeToaster();
    }, 3000);
  }

  private closeToaster() {
    this.cartLimitOver = false;
  }
}
