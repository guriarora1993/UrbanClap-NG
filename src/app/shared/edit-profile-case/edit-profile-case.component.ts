import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-edit-profile-case',
  templateUrl: './edit-profile-case.component.html',
  styleUrls: ['./edit-profile-case.component.scss'],
})
export class EditProfileCaseComponent {
  @Input() caseData: any;
  @Output() toggleCaseBoolean = new EventEmitter<void>();
  public feebackExist: boolean = false;
  public back() {
    this.toggleCaseBoolean.emit();
  }
  public giveFeedback() {
    this.feebackExist = !this.feebackExist;
  }
}
