import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-section-header',
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.scss']
})
export class SectionHeaderComponent {
  @Input() title!: string;
  @Input() description!: string;
  @Input() icon!: string;
  @Input() customBackground: string = 'linear-main';
}
