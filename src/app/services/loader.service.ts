import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginModalComponent } from '@app/shared/login-modal/login-modal.component';
@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public toasterValue: string = ""

  constructor(private modalService: NgbModal) {}

  public showToaster(value: string){
    this.toasterValue = value
  }

  openModal(): void {
    this.modalService.open(LoginModalComponent);
  }

  closeModal():void{
    this.modalService.dismissAll()
  }

}
