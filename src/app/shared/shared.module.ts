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
  ],
  imports: [CommonModule],
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
  ],
})
export class SharedModule {}
