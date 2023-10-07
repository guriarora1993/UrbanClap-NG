import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalOpenSubject = new Subject<void>();
  modalOpen$ = this.modalOpenSubject.asObservable();

  openModal() {
    this.modalOpenSubject.next();
  }

}
