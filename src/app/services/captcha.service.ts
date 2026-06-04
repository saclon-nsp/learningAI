import { Injectable, signal } from '@angular/core';

export interface CaptchaChallenge {
  value: string;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class CaptchaService {
  challenge = signal<CaptchaChallenge | null>(null);

  generateChallenge(): CaptchaChallenge {
    const value = this.generateCode(5);
    const imageUrl = this.createSvgCaptcha(value);
    const newChallenge: CaptchaChallenge = { value, imageUrl };
    this.challenge.set(newChallenge);
    return newChallenge;
  }

  validateAnswer(userAnswer: string): boolean {
    const challenge = this.challenge();
    if (!challenge) return false;
    return challenge.value.toLowerCase() === userAnswer.trim().toLowerCase();
  }

  refreshChallenge(): void {
    this.generateChallenge();
  }

  private generateCode(length: number): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  }

  private createSvgCaptcha(text: string): string {
    const width = 240;
    const height = 80;
    const background = `<rect width="100%" height="100%" fill="#f2f7ff"/>`;
    const noise = Array.from({ length: 6 }, () => {
      const x1 = Math.random() * width;
      const y1 = Math.random() * height;
      const x2 = Math.random() * width;
      const y2 = Math.random() * height;
      const color = this.randomColor();
      return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="1" opacity="0.5"/>`;
    }).join('');

    const dots = Array.from({ length: 20 }, () => {
      const cx = Math.random() * width;
      const cy = Math.random() * height;
      const r = Math.random() * 2 + 1;
      const color = this.randomColor(0.2);
      return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${color}"/>`;
    }).join('');

    const textElements = text.split('').map((char, index) => {
      const x = 25 + index * 40;
      const y = 50 + (index % 2 ? 6 : -6);
      const rotate = Math.random() * 18 - 9;
      const color = this.randomColor();
      return `<text x="${x}" y="${y}" font-family="Verdana, Geneva, sans-serif" font-size="34" fill="${color}" transform="rotate(${rotate} ${x} ${y})">${char}</text>`;
    }).join('');

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">` +
      background +
      noise +
      dots +
      `<rect x="0" y="0" width="100%" height="100%" fill="none" stroke="#c3cfe2" stroke-width="2"/>` +
      textElements +
      `</svg>`;

    return `data:image/svg+xml;base64,${this.base64Encode(svg)}`;
  }

  private randomColor(alpha = 1): string {
    const r = Math.floor(80 + Math.random() * 120);
    const g = Math.floor(80 + Math.random() * 120);
    const b = Math.floor(80 + Math.random() * 120);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  private base64Encode(value: string): string {
    if (typeof window !== 'undefined' && typeof window.btoa === 'function') {
      return window.btoa(unescape(encodeURIComponent(value)));
    }

    const utf8 = encodeURIComponent(value).replace(/%([0-9A-F]{2})/g, (_match, hex) =>
      String.fromCharCode(parseInt(hex, 16))
    );

    let binary = '';
    for (let i = 0; i < utf8.length; i += 1) {
      binary += String.fromCharCode(utf8.charCodeAt(i));
    }

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let result = '';

    for (let i = 0; i < binary.length; i += 3) {
      const byte1 = binary.charCodeAt(i);
      const byte2 = binary.charCodeAt(i + 1);
      const byte3 = binary.charCodeAt(i + 2);

      const enc1 = byte1 >> 2;
      const enc2 = ((byte1 & 3) << 4) | (byte2 >> 4);
      const enc3 = isNaN(byte2) ? 64 : (((byte2 & 15) << 2) | (byte3 >> 6));
      const enc4 = isNaN(byte3) ? 64 : (byte3 & 63);

      result += chars.charAt(enc1) + chars.charAt(enc2) + chars.charAt(enc3) + chars.charAt(enc4);
    }

    return result;
  }
}
