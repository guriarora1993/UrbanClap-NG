import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss'],
})
export class BookingsComponent {
  constructor(private route: Router) {}

  public navigateToHome() {
    this.route.navigate(['home']);
  }
}
