import { Injectable, signal } from '@angular/core';

export type PopupType = 'success' | 'error' | 'warning' | 'info';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  isVisible = signal(false);

  title = signal('');

  message = signal('');

  type = signal<PopupType>('success');

  show(
    type: PopupType,
    title: string,
    message: string
  ): void {

    this.type.set(type);

    this.title.set(title);

    this.message.set(message);

    this.isVisible.set(true);

  }

  close(): void {

    this.isVisible.set(false);

  }

  success(message: string, title = 'Success') {

    this.show('success', title, message);

  }

  error(message: string, title = 'Error') {

    this.show('error', title, message);

  }

  warning(message: string, title = 'Warning') {

    this.show('warning', title, message);

  }

  info(message: string, title = 'Information') {

    this.show('info', title, message);

  }

}