import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bg-icon',
  templateUrl: './bg-icon.component.html',
  styleUrls: ['./bg-icon.component.scss']
})
export class BgIconComponent {
  @Input() public icon!: string;
  @Input() public customBackground: string = 'linear-main';

}
