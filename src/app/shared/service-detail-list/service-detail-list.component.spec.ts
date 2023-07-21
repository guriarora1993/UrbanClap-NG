import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceDetailListComponent } from './service-detail-list.component';

describe('ServiceDetailListComponent', () => {
  let component: ServiceDetailListComponent;
  let fixture: ComponentFixture<ServiceDetailListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceDetailListComponent]
    });
    fixture = TestBed.createComponent(ServiceDetailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
