import { Component } from '@angular/core';

@Component({
  selector: 'app-btn-arriba',
  templateUrl: './btn-arriba.component.html',
  styleUrls: ['./btn-arriba.component.scss'],
})
export class BtnArribaComponent {
  constructor() {}

  goTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
