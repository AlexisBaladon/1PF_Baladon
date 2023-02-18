import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() title!: string;
  @Input() description!: string;
  @Input() pictureUrl!: string;
  @Input() pictureHeight: number = 50;
  @Input() pictureAlt: string = 'card picture';
  @Input() footerText!: string;
}
