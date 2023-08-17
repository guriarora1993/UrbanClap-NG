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
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { MatDialogModule } from '@angular/material/dialog'; 
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
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
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    AppStoreModule,
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    MatDialogModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
