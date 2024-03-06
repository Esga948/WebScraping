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
    if (!this.userAppName) {
      this.userAppName = "Nombre Usuario"
    }

    this.inicioAppService.getU().subscribe(
      async (res) => {
        if (res == '') {
          this.imag = '../assets/persona.png';
        } else {
          const response = await fetch('http://localhost:8080/' + res);
          if (!response.ok) {
            this.imag = '../assets/persona.png';
          } else {
            this.imag = `http://localhost:8080/${res}`;
          }
        }
      },
      (err) => {
        this.imag = '../assets/p.png';
      }
    );
  }

  logout(): void {
    this.inicioAppService.logout();
    window.location.href = '/login';
  }

}
