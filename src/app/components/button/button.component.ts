import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() level: 'primary' | 'secondary' | 'danger' = 'primary';
  @Input() disabled: boolean = false;
  @Input() type?: 'submit' | 'button' = 'button';
  @Input() class?: string = '';
  @Output() onClick = new EventEmitter();

  onClickButton(event: MouseEvent) {
    this.onClick.emit(event);
  }
}
