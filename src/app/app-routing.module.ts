import { ServiceDetailListComponent } from './shared/service-detail-list/service-detail-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { ViewCartComponent } from './home/view-cart/view-cart.component';
import { LoginModalComponent } from './shared/login-modal/login-modal.component';
import { ModalComponent } from './shared/modal/modal.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'service-detail-list',
    component: ServiceDetailListComponent
  },
  {
    path:'view-cart',
    component: ViewCartComponent
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path:'login',
    component: LoginModalComponent
  },
  {
    path: "modal",
    component: ModalComponent
  },
  {
    path: 'service-detail-list',
    loadChildren: () =>
      import('./shared/shared.module').then((m) => m.SharedModule),
  },
  {
    path: 'skelton',
    loadChildren: () =>
      import('./shared/shared.module').then((m) => m.SharedModule),
  },
  {
    path: 'header',
    loadChildren: () =>
      import('./shared/shared.module').then((m) => m.SharedModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), SharedModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
