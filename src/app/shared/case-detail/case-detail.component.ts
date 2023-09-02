import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-case-detail',
  templateUrl: './case-detail.component.html',
  styleUrls: ['./case-detail.component.scss']
})
export class CaseDetailComponent {
  @Input() content: any;
  @Output() toggleParentBoolean = new EventEmitter<void>();
  ngOnInit(){
  }

  public back() {
    this.toggleParentBoolean.emit();
  }
}
