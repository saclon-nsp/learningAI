import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CaptchaService } from '../../services/captcha.service';

@Component({
  selector: 'app-captcha',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.css']
})
export class CaptchaComponent implements OnInit {
  captchaAnswer = '';
  @Output() captchaValid = new EventEmitter<boolean>();

  constructor(public captchaService: CaptchaService) {}

  ngOnInit(): void {
    this.captchaService.generateChallenge();
    this.captchaValid.emit(false);
  }

  onAnswerChange(): void {
    const answer = String(this.captchaAnswer || '').trim();
    if (!answer) {
      this.captchaValid.emit(false);
      return;
    }

    const isValid = this.captchaService.validateAnswer(answer);
    this.captchaValid.emit(isValid);
  }

  refreshCaptcha(): void {
    this.captchaAnswer = '';
    this.captchaService.generateChallenge();
    this.captchaValid.emit(false);
  }

  getCaptchaImageUrl(): string {
    return this.captchaService.challenge()?.imageUrl || '';
  }
}
