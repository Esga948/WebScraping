import { Component, OnInit } from '@angular/core';
import { InicioAppService } from 'src/app/services/inicio-app.service';
import { GuardService } from 'src/app/services/guard.service';
@Component({
  selector: 'app-navbar-api',
  templateUrl: './navbar-api.component.html',
  styleUrls: ['./navbar-api.component.scss'],
})
export class NavbarApiComponent implements OnInit {
  userAppName: string = '';
  imag: string = '';

  constructor(
    private inicioAppService: InicioAppService,
    private guard: GuardService
  ) {}

  ngOnInit(): void {
    this.userAppName = this.inicioAppService.getName();
    if (!this.userAppName) {
      this.userAppName = 'Nombre Usuario';
    }

    this.inicioAppService.getU().subscribe(
      async (res) => {
        console.log( res)
        if (res == '') {
          this.imag = '../assets/p.png';
        } else {
          try {
            const response = await fetch('http://localhost:8080/' + res);
            if (!response.ok) {
              this.imag = '../assets/p.png';
            } else {
              this.imag = `http://localhost:8080/${res}`;
            }
          } catch (error) {
            console.error('Error al obtener la imagen del usuario:', error);
            this.imag = '../assets/p.png';
          }
        }
      },
      (err) => {
        if (err.status === 404) {
          console.log('No se ha iniciado sesión');
        } else {
          console.error('Error al obtener el usuario:', err);
        }
        this.imag = '../assets/p.png';
      }
    );
  }

  logout(): void {
    this.guard.isLogout();
    this.inicioAppService.logout();
    window.location.href = '/login';
  }
}
