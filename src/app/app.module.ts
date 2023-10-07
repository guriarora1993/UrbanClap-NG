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
<<<<<<< HEAD
=======
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
>>>>>>> 10ed98dc9245dc69eb5662940878387b63b25cac
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
<<<<<<< HEAD
=======
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
>>>>>>> 10ed98dc9245dc69eb5662940878387b63b25cac
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
