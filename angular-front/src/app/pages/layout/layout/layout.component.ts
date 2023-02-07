import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  @Output() public loggingOut = new EventEmitter();

  public logOut() {
    this.loggingOut.emit();
    console.log('logOutEvent emitted');
  }

}
