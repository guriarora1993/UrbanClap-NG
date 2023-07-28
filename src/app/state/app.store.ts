import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { serviceCartsReducer } from './app.reducer';

@NgModule({
  imports: [StoreModule.forRoot({ app: serviceCartsReducer })],
})
export class AppStoreModule {}
