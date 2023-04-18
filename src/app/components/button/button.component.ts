import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() type: 'primary' | 'secondary' | 'danger' | 'success' = 'primary';
  @Input() disabled: boolean = false;
  @Input() class?: string = '';
  @Output() onClick = new EventEmitter<MouseEvent>();

  onClickButton(event: MouseEvent) {
    this.onClick.emit(event);
  }
}
