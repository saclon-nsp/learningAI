import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-success-popup',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './success-popup.html',
  styleUrl: './success-popup.css'
})
export class SuccessPopup {

  @Input() isVisible = false;

  @Input() title = 'Success';

  @Input() message = '';

  @Input() type: 'success' | 'error' | 'warning' | 'info' = 'success';

  @Output() close = new EventEmitter<void>();

  closePopup(): void {

    this.close.emit();

  }

}