import { Component, ElementRef, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  @Output() public loggingOut = new EventEmitter();

  logOut() {
    this.loggingOut.emit();
  }
}
