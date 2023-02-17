import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {
    @Input() messages: (string | null)[] = [];

    ngOnChanges() {
        this.messages = this.messages.filter(message => message !== null);
    }
}
