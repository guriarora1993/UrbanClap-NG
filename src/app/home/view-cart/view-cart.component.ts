import { Component } from '@angular/core';
import { addCart, removeCart, reset } from '@app/state/app.actions';
import { AppState } from '@app/state/app.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.scss'],
})
export class ViewCartComponent {
  public cartPresent: boolean = false;
  public addCart: boolean = true;
  public counterValue: number = 1;
  public emptyCart: boolean = false;
  public addedCartsCount: Observable<number>;
  constructor(private store: Store<{ app: AppState }>) {
    this.addedCartsCount = this.store.select(
      (state: { app: AppState }) => state.app.count
    );
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
}
