import { Directive, Input, ElementRef, Renderer2 } from '@angular/core';

interface StyleRange {
  style: string;
  styleValue: string;
  min: number; max: number;
}

@Directive({
  selector: '[appInRangeStyle]'
})
export class InRangeStyleDirective {
  @Input() appInRangeStyle!: StyleRange[];
  @Input() appInRangeStyleValue!: number | string;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.appInRangeStyle.forEach((styleRange: StyleRange) => {
      const { style, styleValue, min, max } = styleRange;
      const value = this.appInRangeStyleValue;
      if (value >= min && value <= max) {
        this.renderer.setStyle(this.el.nativeElement, style, styleValue);
      }
    });
  }
}
