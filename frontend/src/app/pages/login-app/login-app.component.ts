import { Component, OnInit } from '@angular/core';
import { InicioAppService } from 'src/app/services/inicio-app.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-login-app',
  templateUrl: './login-app.component.html',
  styleUrls: ['./login-app.component.scss'],
})
export class LoginAppComponent implements OnInit {
  constructor(
    private inicioAppService: InicioAppService,
  ) {}

  ngOnInit(): void {}

  onLogin(form: NgForm): void {
    this.inicioAppService.loginApp(form.value).subscribe(() => {
    });
  }
}
