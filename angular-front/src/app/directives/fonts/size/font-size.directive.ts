import { Directive, Renderer2, ElementRef, Input } from '@angular/core';
import { fontSize, type fontSizes } from 'src/app/styles/fonts';

@Directive({
  selector: '[appFontSize]'
})
export class FontSizeDirective {
  @Input() public appFontSize!: fontSizes;

  constructor(private renderer: Renderer2, private el: ElementRef) { }

  ngOnInit() {
    //important
    this.renderer.setStyle(
      this.el.nativeElement, 
      'font-size', 
      fontSize.get(this.appFontSize)
    );
  }

}
