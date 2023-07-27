import { Component, ElementRef, HostListener } from '@angular/core';
import { Store } from '@ngrx/store';
import { decrement, increment } from './state/app.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'urban';

  counter$ = this.store.select('counter');

  constructor(private store: Store<{ counter: number }>) {
    console.log("countetVal ", this.counter$)
  }

  onIncrement() {
    this.store.dispatch(increment());
  }

  onDecrement() {
    this.store.dispatch(decrement());
  }
}
