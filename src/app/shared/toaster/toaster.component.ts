import { Component } from '@angular/core';
import { ToasterService } from '@app/services/toaster.service';
@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss'],
})
export class ToasterComponent {
  public message: string = '';
  public cartLimitOver: boolean = false;

  constructor(private toasterService: ToasterService) {}

  ngOnInit() {
    this.toasterService.getToasterSubject().subscribe((data) => {
      this.message = data.message;
      this.showToaster();
    });
  }

  public showToaster() {
    this.cartLimitOver = true;
    setTimeout(() => {
      this.closeToaster();
    }, 3000);
  }

  private closeToaster() {
    this.cartLimitOver = false;
    this.message = '';
  }
}
