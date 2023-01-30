import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {
    //input message with initializer
    @Input() messages: (string | null)[] = [];

    ngOnChanges() {
        this.messages = this.messages.filter(message => message !== null);
    }

    //list of angular lifecycle
    //1: ngOnChanges
    //2: ngOnInit
    //3: ngDoCheck
    //4: ngAfterContentInit
    //5: ngAfterContentChecked
    //6: ngAfterViewInit
    //7: ngAfterViewChecked
    //8: ngOnDestroy

}
