import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@app/shared/shared.module';
import { BookingsComponent } from './bookings/bookings.component';
import { ProfessionalPageComponent } from './professional-page/professional-page.component';
import { AboutComponent } from './about/about.component';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
];

@NgModule({
  declarations: [BookingsComponent, ProfessionalPageComponent, AboutComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
  exports: [BookingsComponent, ProfessionalPageComponent, AboutComponent],
})
export class HomeModule {}
