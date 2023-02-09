import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent {
  @Input() public size!: number;
  width!: number; height!: number;

  ngOnInit(): void {
    this.width=this.size; this.height=this.size;
  }
}
