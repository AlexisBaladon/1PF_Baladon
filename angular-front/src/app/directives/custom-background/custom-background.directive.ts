import { Directive, Input } from '@angular/core';
import { ElementRef, Renderer2 } from '@angular/core';

const backgrounds: {
  [key: string]: string;
} = {
  'linear-blue': 'linear-gradient(to right top, #2259ad, #4667b8, #6076c3, #7785ce, #8d95d9)',
  'linear-green': 'linear-gradient(to right top, #1cad76, #3ab479, #4fbb7c, #61c280, #71c984)',
  'linear-red': 'linear-gradient(to right top, #931a1a, #a72e2d, #ba4040, #ce5154, #e16369)',
  'linear-skyblue': 'linear-gradient(to right top, #1c83ad, #3391b4, #489fbb, #5dacc2, #71bac9)',
  'linear-main': 'linear-gradient(to right top, #5792cf, #5b98d6, #5f9dde, #64a3e5, #68a9ed)',
}

@Directive({
  selector: '[appCustomBackground]'
})
export class CustomBackgroundDirective {
  @Input() public appCustomBackground!: string;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    console.log(backgrounds[this.appCustomBackground]);
    this.renderer.setStyle(this.el.nativeElement, 'background', backgrounds[this.appCustomBackground || 'linear-blue']);
  }

}
