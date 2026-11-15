import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavBar } from './components/layout/nav-bar/nav-bar';
import { Header } from './components/layout/header/header';
import { AuthService } from './services/auth/auth';

@Component({
  selector: 'app-root',
  imports: [NavBar, Header, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected auth = inject(AuthService);
}