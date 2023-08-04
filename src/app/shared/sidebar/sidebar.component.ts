import { Component } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  public sidebarVisible = false;
  public sidebarHeading: string = '';
  public animationName: string = '';
  public sidebarContent: any;
  public loginContainer: string = 'login-container';
  public invalidNumber: boolean = false;
  public errorClass: string = 'invalidError';
  public loginPage: boolean = false;
  public navigateToService: Boolean = false;

  constructor(private sidebarService: SidebarService, private router: Router) {}

  ngOnInit() {
    this.sidebarService.getSidebarVisible().subscribe((visible) => {
      if (visible) {
        this.animationName = 'slide-in';
      } else {
        this.animationName = 'slide-out';
      }
      this.sidebarHeading = this.sidebarService.sidebarContent[0].heading;
      this.sidebarContent = this.sidebarService.sidebarContent;
      this.sidebarVisible = visible;
      this.loginPage = this.sidebarContent[0].login;
    });
  }

  public toggleSidebar(content: any) {
    this.sidebarService.toggleSidebar(content);
  }

  public closeToggleSidebar() {
    this.sidebarService.toggleSidebar('');
  }

  public phoneNumber(value: any) {
    value.length > 10
      ? ((this.loginContainer = 'login-container-error'),
        (this.errorClass = 'invalidErrorOccur'),
        (this.invalidNumber = true))
      : ((this.loginContainer = 'login-container'),
        (this.errorClass = 'invalidError'),
        (this.invalidNumber = false));
  }

  countryCodes: string[] = ['+91', '+44', '+61', '+91', '+86'];

  public navigateTo(value: string) {
    this.navigateToService = true;
    // setTimeout(() => {
    //   // this.navigateToService = false;
    //   this.router.navigate(['service-detail-list'], {
    //     queryParams: { key: value },
    //   });
    // }, 2000);
  }
}
