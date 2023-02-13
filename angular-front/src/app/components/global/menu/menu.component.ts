import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  @Input() public options: string[] = [];
  @Input() public selectedMenuItem!: number;
  @Output() public menuItemSelected = new EventEmitter();
  
  scrollableOptions = new Map<string,string[]>([[
    "⚙ Ajustes", [
      "📝 Perfil",
      "🔑 Cuenta",
      "🌐 Idioma",
    ],
  ]]);

  public isSelected(option: string) {
    return this.options.indexOf(option) === this.selectedMenuItem;
  }

  public changeRoute(option: string) {
    this.menuItemSelected.emit(this.options.indexOf(option));
  }
}