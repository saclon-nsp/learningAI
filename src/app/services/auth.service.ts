import { Injectable, signal } from '@angular/core';

export interface User {
  email: string;
  password: string;
  fullName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = signal(false);
  currentUser = signal<User | null>(null);

  private users: User[] = [];

  constructor() {
    // Load users from Session Storage
    const stored = sessionStorage.getItem('users');
    if (stored) {
      this.users = JSON.parse(stored);
    }

    const demoUser: User = {
      email: 'test@example.com',
      password: 'test123',
      fullName: 'Demo User'
    };

    if (!this.users.find(u => u.email === demoUser.email)) {
      this.users.push(demoUser);
      sessionStorage.setItem('users', JSON.stringify(this.users));
    }

    this.checkLoggedIn();

  }

  signup(user: User): { success: boolean; message: string } {
    // Check if user already exists
    if (this.users.find(u => u.email === user.email)) {
      return { success: false, message: 'Email already registered' };
    }

    this.users.push(user);
    sessionStorage.setItem('users', JSON.stringify(this.users));
    return { success: true, message: 'Signup successful! Please login.' };
  }

  login(email: string, password: string): { success: boolean; message: string } {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      this.isLoggedIn.set(true);
      this.currentUser.set(user);
      sessionStorage.setItem('currentUser', JSON.stringify(user));
      return { success: true, message: 'Login successful!' };
    }
    return { success: false, message: 'Invalid credentials' };
  }

  logout(): void {
    this.isLoggedIn.set(false);
    this.currentUser.set(null);
    sessionStorage.removeItem('currentUser');
  }

  checkLoggedIn(): void {
    const stored = sessionStorage.getItem('currentUser');
    if (stored) {
      this.currentUser.set(JSON.parse(stored));
      this.isLoggedIn.set(true);
    }
  }
}
