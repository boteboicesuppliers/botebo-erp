
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroBars3,
  heroMagnifyingGlass,
  heroBell,
  heroChevronDown
} from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [NgIcon],
  providers: [
    provideIcons({
      heroBars3,
      heroMagnifyingGlass,
      heroBell,
      heroChevronDown
    })
  ],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar {

  @Input() pageTitle = 'Dashboard';

  @Output() menuToggle = new EventEmitter<void>();

}
