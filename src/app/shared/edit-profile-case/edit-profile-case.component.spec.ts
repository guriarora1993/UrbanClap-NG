import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileCaseComponent } from './edit-profile-case.component';

describe('EditProfileCaseComponent', () => {
  let component: EditProfileCaseComponent;
  let fixture: ComponentFixture<EditProfileCaseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditProfileCaseComponent]
    });
    fixture = TestBed.createComponent(EditProfileCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
