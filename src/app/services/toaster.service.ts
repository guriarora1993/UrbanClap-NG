import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  private toasterSubject = new Subject<any>();

  constructor() {}

  public getToasterSubject() {
    return this.toasterSubject.asObservable();
  }

  public showToast(message: string) {
    this.toasterSubject.next({ message });
  }
}
