import { Component } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  modalHeight: string = '100%'; // Initial small height
    modalTransition: string = 'height 0.5s ease-in-out';

  constructor() { }

  ngOnInit(): void {
    // setTimeout(() => {
    //   this.modalHeight = '100%'; // Expand the height after a delay
    // }, 5000); // Adjust the delay as needed
  }
}
