import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  @Input() public options: {title: string, icon: string, route: string}[] = [];
  @Input() public selectedMenuItem!: number;
  @Output() public menuItemSelected = new EventEmitter();

  ngOnChanges() {
    console.log(this.options, this.selectedMenuItem);
  }

  public isSelected(option: string) {
    return this.options.map(option => option.title).indexOf(option) === this.selectedMenuItem;
  }

  public changeRoute(option: string) {
    this.menuItemSelected.emit(this.options.map(option => option.title).indexOf(option));
  }
}