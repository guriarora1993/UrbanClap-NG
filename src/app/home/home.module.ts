import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@app/shared/shared.module';
import { BookingsComponent } from './bookings/bookings.component';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
];

@NgModule({
  declarations: [
    BookingsComponent
  ],
  imports: [CommonModule, RouterModule.forChild(routes),SharedModule],
  exports: [BookingsComponent]
})
export class HomeModule {}
