import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appScrollScale]'
})
export class ScrollScaleDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    const scrollPosition = window.scrollY;
    const scaleFactor = 1 + scrollPosition * 0.0001; // Adjust the scaling factor for a minor scale

    this.renderer.setStyle(this.el.nativeElement, 'transform', `scale(${scaleFactor})`);
    this.renderer.setStyle(this.el.nativeElement, 'transform-origin', 'top center'); // Adjust the transform origin as needed
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'transform 0.3s ease-in-out');
  }
}
