// src/app/state/app.store.ts
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './app.reducer';

@NgModule({
  imports: [StoreModule.forRoot({ app: appReducer })],
})
export class AppStoreModule {
  static forRoot(arg0: { count: (state: number | undefined, action: import("@ngrx/store").Action) => number; }): any[] | import("@angular/core").Type<any> | import("@angular/core").ModuleWithProviders<{}> {
    throw new Error('Method not implemented.');
  }
}
