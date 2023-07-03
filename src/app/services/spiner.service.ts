import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Spiner {
  src: HTMLElement | undefined;

  constructor() {
  }

  close(): void {
    // @ts-ignore
    this.src = document.getElementById('nb-global-spinner');
    // @ts-ignore
    this.src.style.display = 'none';
  }

  open() {
    // @ts-ignore
    this.src = document.getElementById('nb-global-spinner');
    // @ts-ignore
    this.src.style.display = 'block';
  }
}
