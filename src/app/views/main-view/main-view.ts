import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavBar } from '../../components/layout/nav-bar/nav-bar';
import { Header } from '../../components/layout/header/header';

@Component({
  selector: 'app-main-view',
  imports: [
    NavBar,
    Header,
    RouterOutlet
  ],
  templateUrl: './main-view.html',
  styleUrl: './main-view.css',
})
export class MainView {}