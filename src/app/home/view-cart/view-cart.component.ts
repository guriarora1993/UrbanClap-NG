import { Component } from '@angular/core';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.scss']
})
export class ViewCartComponent {
  public cartPresent: boolean = false;
  public addCart: boolean = true;
  public counterValue: number = 1;
  public emptyCart: boolean = false
  public increment() {
    if (this.counterValue < 3) {
      this.counterValue++;
    } else {
      alert('limited');
    }
  }

  public decrement() {
    if (this.counterValue > 1) {
      this.counterValue--;
    } else {
      this.addCart = true;
      this.cartPresent = false;
      this.emptyCart = true
    }
  }

}
