import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private sidebarVisible = new BehaviorSubject<boolean>(false);
  private showModalSubject = new Subject<string>();

  showModal$ = this.showModalSubject.asObservable();
  public sidebarContent: any
  constructor() {}

  public getSidebarVisible() {
    return this.sidebarVisible.asObservable();
  }

  public toggleSidebar(data: any) {
    this.sidebarContent = data
    this.sidebarVisible.next(!this.sidebarVisible.value);
  }

  private openLoginModalSource = new Subject<void>();
  openLoginModal$ = this.openLoginModalSource.asObservable();

  openLoginModal() {
    this.openLoginModalSource.next();
  }
}
