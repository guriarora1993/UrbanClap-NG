import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeltonComponent } from './skelton.component';

describe('SkeltonComponent', () => {
  let component: SkeltonComponent;
  let fixture: ComponentFixture<SkeltonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SkeltonComponent]
    });
    fixture = TestBed.createComponent(SkeltonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
