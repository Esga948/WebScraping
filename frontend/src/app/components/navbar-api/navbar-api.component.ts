import { Component, OnInit } from '@angular/core';
import { InicioAppService } from 'src/app/services/inicio-app.service';

@Component({
  selector: 'app-navbar-api',
  templateUrl: './navbar-api.component.html',
  styleUrls: ['./navbar-api.component.scss'],
})

export class NavbarApiComponent implements OnInit {
  userAppName: string = '';
  imag: string = '';

  constructor(private inicioAppService: InicioAppService) {}

  ngOnInit(): void {
    this.userAppName = this.inicioAppService.getName();

    this.inicioAppService.getU().subscribe((res) => {
      if (res == '') {
        this.imag = '../assets/persona.png';
      } else {
        this.imag = `http://localhost:8080/${res}`;
      }
    });
  }

  logout(): void {
    this.inicioAppService.logout();
    window.location.href = '/login';
  }

}
