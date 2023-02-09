import { Directive, Renderer2, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appValidInput]'
})
export class ValidInputDirective {
  @Input() appValidInput!: boolean;

  constructor(private renderer: Renderer2, private el: ElementRef) { }

  ngOnChanges() {
    if (this.appValidInput) {
      this.renderer.addClass(this.el.nativeElement, 'valid-input');
      this.renderer.removeClass(this.el.nativeElement, 'invalid-input');
    }
    else {
      this.renderer.addClass(this.el.nativeElement, 'invalid-input');
      this.renderer.removeClass(this.el.nativeElement, 'valid-input');
    }
  }

}
