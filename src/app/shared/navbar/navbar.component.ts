import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input() animatioName: any;
  ngOnInit() {
    console.log('animation name ', this.animatioName);
  }
  public inputClear: boolean = false;
  public getInput(text: string) {
    text != '' ? (this.inputClear = true) : (this.inputClear = false);
  }

  public scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
