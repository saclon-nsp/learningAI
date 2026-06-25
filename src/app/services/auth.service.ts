import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export interface User {
  username: string;
  password: string;
  fullName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = signal(false);
  currentUser = signal<User | null>(null);

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    this.checkLoggedIn();
  }

  // ---------------- SIGNUP ----------------
  signup(user: User) {
    return this.http.post<any>(`${this.apiUrl}/auth/signup`, user);
  }

  // ---------------- LOGIN (FIXED) ----------------
  login(username: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, {
      username,
      password
    }).pipe(
      tap((res: any) => {

        // store token in SESSION storage
        sessionStorage.setItem('token', res.token);

        // optional user state (for UI)
        const user: User = {
          username: username,
          password: password
        };

        this.currentUser.set(user);
        this.isLoggedIn.set(true);

        sessionStorage.setItem('currentUser', JSON.stringify(user));
      })
    );
  }

  // ---------------- SESSION RESTORE ----------------
  checkLoggedIn(): void {
    const storedUser = sessionStorage.getItem('currentUser');
    const token = sessionStorage.getItem('token');

    if (storedUser && token) {
      this.currentUser.set(JSON.parse(storedUser));
      this.isLoggedIn.set(true);
    }
  }

  // ---------------- LOGOUT ----------------
  logout(): void {
    this.isLoggedIn.set(false);
    this.currentUser.set(null);

    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('token');
  }
}