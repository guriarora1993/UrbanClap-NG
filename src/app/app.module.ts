import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from './shared/shared.module';
import { ViewCartComponent } from './home/view-cart/view-cart.component';
import { FrequentCardsComponent } from './shared/frequent-cards/frequent-cards.component';
import { AppStoreModule } from './state/app.store';
import { StoreModule } from '@ngrx/store';
import { HelpComponent } from './home/help/help.component';
import { ScrollScaleDirective } from './scroll-scale.directive';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ViewCartComponent,
    FrequentCardsComponent,
    HelpComponent,
    ScrollScaleDirective,
  ],
  imports: [BrowserModule, AppRoutingModule, SharedModule, AppStoreModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
