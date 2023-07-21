import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private sidebarVisible = new BehaviorSubject<boolean>(false);
  public sidebarContent: any
  constructor() {}

  public getSidebarVisible() {
    return this.sidebarVisible.asObservable();
  }

  public toggleSidebar(data: any) {
    this.sidebarContent = data
    this.sidebarVisible.next(!this.sidebarVisible.value);
  }
}
