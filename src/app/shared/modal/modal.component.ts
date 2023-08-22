import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements AfterViewInit {
  @Input() modalOpen: boolean;
  @ViewChild('modalOpenerBtn') modalOpenerBtn: ElementRef | undefined;
  public isOpen: boolean = false;
  public inputExist: boolean = false;
  public homeDetail: string;
  public landMarkDetail: string;
  public homeVal: boolean = false;
  public landVal: boolean = false;
  public activeButton: string | null = null;
  public isInputFocused: boolean = false;
  public isInputFocused2: boolean = false;
  public valueExist: boolean = false;
  public isInputFocused3: boolean = false;
  public otherToggle: boolean = false;
  constructor(private cdRef: ChangeDetectorRef) {}
  ngOnInit() {
    this.isOpen = this.modalOpen;
    this.activeButton = 'home';
  }

  ngAfterViewInit(): void {
    this.isOpen = this.modalOpen;
    this.cdRef.detectChanges();

    if (this.isOpen && this.modalOpenerBtn) {
      this.modalOpenerBtn.nativeElement.click();
    }
  }

  public getInputValue(value: string) {
    value != '' || null || undefined
      ? (this.inputExist = true)
      : (this.inputExist = false);
  }
  public getHomeDetail(value: string) {
    value != '' || null || undefined
      ? (this.homeVal = true)
      : (this.homeVal = false);
  }

  public getlandMarkDetail(value: string) {
    value != '' || null || undefined
      ? (this.landVal = true)
      : (this.landVal = false);
  }

  public toggleActive(button: string) {
    if (this.activeButton === button) {
      this.activeButton = null;
    } else {
      this.activeButton = button;
    }
    button == 'other' ? (this.otherToggle = true) : (this.otherToggle = false);
  }

  public clearInput(inputElement: HTMLInputElement): void {
    inputElement.value = '';
    this.homeVal = false;
    this.valueExist = false;
    this.landVal = false;
  }
  public getOtherValue(value: string) {
    value != '' || null || undefined
      ? (this.valueExist = true)
      : (this.valueExist = false);
  }
}
