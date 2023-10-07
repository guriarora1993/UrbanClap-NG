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
import { HelpComponent } from './home/help/help.component';
import { ScrollScaleDirective } from './scroll-scale.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog'; 
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { PaymentSectionComponent } from './home/payment-section/payment-section.component';
import { HomeModule } from './home/home.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UcInterceptorInterceptor } from './interceptors/uc-interceptor.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ViewCartComponent,
    FrequentCardsComponent,
    HelpComponent,
    ScrollScaleDirective,
    PaymentSectionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    AppStoreModule,
    BrowserAnimationsModule,
    MatDialogModule,
    NgbModule,
    FormsModule,
    DatePipe,
    HomeModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UcInterceptorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
