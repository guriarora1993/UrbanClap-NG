import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-service-detail-list',
  templateUrl: './service-detail-list.component.html',
  styleUrls: ['./service-detail-list.component.scss']
})
export class ServiceDetailListComponent {

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
      console.log("Enter in service-detail")
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
      name:"sachin",
      age: 22
    },
    {
      name:"sourav",
      age: 22
    },{
      name:"Jashan",
      age: 22
    },{
      name:"lalit",
      age: 22
    },
  ]
}
