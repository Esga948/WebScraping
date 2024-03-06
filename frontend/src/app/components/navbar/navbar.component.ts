import { Component, OnInit } from '@angular/core';
import { InicioAppService } from 'src/app/services/inicio-app.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  constructor(private inicioAppService: InicioAppService) {}

  ngOnInit(): void {
  }

  logout(): void {
    this.inicioAppService.logout();
    window.location.href = '/login';
  }
}
