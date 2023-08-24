import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardSectionComponent } from '../shared/card-section/card-section.component';
import { CardComponent } from '../shared/card/card.component';
import { LineComponent } from '../shared/line/line.component';
import { AdvertisementComponent } from '../shared/advertisement/advertisement.component';
import { LocationModalComponent } from '../shared/location-modal/location-modal.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { SkeltonComponent } from './skelton/skelton.component';
import { ServiceDetailListComponent } from './service-detail-list/service-detail-list.component';
import { CartButtonComponent } from './cart-button/cart-button.component';
import { HeaderComponent } from './header/header.component';
import { ModalComponent } from './modal/modal.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
// import { FrequentCardsComponent } from './frequent-cards/frequent-cards.component';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from './loader/loader.component';
@NgModule({
  declarations: [
    LocationModalComponent,
    CardSectionComponent,
    CardComponent,
    LineComponent,
    AdvertisementComponent,
    SidebarComponent,
    FooterComponent,
    SkeltonComponent,
    ServiceDetailListComponent,
    CartButtonComponent,
    HeaderComponent,
    ModalComponent,
    ModalComponent,
    LoginModalComponent,
    LoaderComponent
    // FrequentCardsComponent,
  ],
  imports: [CommonModule,FormsModule],
  exports: [
    LocationModalComponent,
    CardSectionComponent,
    CardComponent,
    LineComponent,
    AdvertisementComponent,
    LocationModalComponent,
    SidebarComponent,
    FooterComponent,
    SkeltonComponent,
    ServiceDetailListComponent,
    HeaderComponent,
    ModalComponent,
    LoginModalComponent,
    LoaderComponent
  ],
})
export class SharedModule {}
