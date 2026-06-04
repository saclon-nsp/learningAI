import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = 'learningAI';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Check if user was previously logged in
    this.authService.checkLoggedIn();
  }
}
