
import { Component } from '@angular/core';

import { NavBar } from './components/layout/nav-bar/nav-bar';
import { Header } from './components/layout/header/header';
import { Dashboard } from './components/main-view-components/dashboard/dashboard';

@Component({
  selector: 'app-root',
  imports: [
    NavBar,
    Header,
    Dashboard
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}
