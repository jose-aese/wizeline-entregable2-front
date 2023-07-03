import {Component} from '@angular/core';
import {Spiner} from './services/spiner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private spiner: Spiner) {}

  ngOnInit(): void {
    this.spiner.close();
  }


  showMenu() {

    const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

    if (navToggle) {
      navToggle.addEventListener('click', () => {
        // @ts-ignore
        navMenu.classList.add('show-menu')
      })
    }
    if (navClose) {
      navClose.addEventListener('click', () => {
        // @ts-ignore
        navMenu.classList.remove('show-menu')
      })
    }

  }

  navLink() {
    const navMenu = document.getElementById('nav-menu');
    // @ts-ignore
    navMenu.classList.remove('show-menu');
  }

}
