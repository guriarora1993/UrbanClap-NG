import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.scss'],
})
export class AdvertisementComponent implements OnInit {
  @Input() adevertisementCred: any;
  ngOnInit(): void {
    this.isImageTrue = this.adevertisementCred[0].imageleft;
  }
  public isImageTrue: boolean = false;
}
