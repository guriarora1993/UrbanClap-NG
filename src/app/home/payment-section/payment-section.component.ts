import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-payment-section',
  templateUrl: './payment-section.component.html',
  styleUrls: ['./payment-section.component.scss'],
})
export class PaymentSectionComponent {
  public totalAmount: any
  constructor(
    private route: Router
  )
  {}
  public methodsContent = [
    {
      img: '../../../assets/add-card-image.png',
      methodTitle: 'Debit or Credit card',
      methodName: 'Add card',
    },
    {
      img: '../../../assets/paytm.png',
      methodTitle: 'Wallet',
      methodName: 'Paytm',
    },
    {
      img: '../../../assets/upi-png.png',
      methodTitle: 'UPI',
      methodName: 'Pay via another UPI ID',
    },
    {
      img: '../../../assets/netbanking-png.png',
      methodTitle: 'Netbanking',
      methodName: 'see all banks',
    },
  ];

  public goBack(){
    this.route.navigate(["view-cart"])
  }

  ngOnInit(){
    this.totalAmount = localStorage.getItem("totalAmount");
    console.log("sss ", this.totalAmount)
  }
}
