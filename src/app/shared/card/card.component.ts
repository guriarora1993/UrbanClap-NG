import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  constructor(private router: Router){}
 @Input() cardDetails: any;
  public navigateToService: boolean = false
 public navigate(value: string) {
  this.navigateToService = true;
  setTimeout(() => {
    this.navigateToService = false;
    this.router.navigate(['service-detail-list'], {
      queryParams: { key: value },
    });
  }, 2000);
}
}
