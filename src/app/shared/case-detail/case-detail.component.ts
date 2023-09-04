import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-case-detail',
  templateUrl: './case-detail.component.html',
  styleUrls: ['./case-detail.component.scss'],
})
export class CaseDetailComponent {
  @Input() content: any;
  @Output() toggleParentBoolean = new EventEmitter<void>();
  public feebackExist: boolean = false;
  ngOnInit() {}

  public back() {
    this.toggleParentBoolean.emit();
  }

  public giveFeedback() {
    this.feebackExist = !this.feebackExist;
  }
}
