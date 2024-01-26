import { Component, OnInit } from '@angular/core';
import { InicioAppService } from 'src/app/services/inicio-app.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-app',
  templateUrl: './login-app.component.html',
  styleUrls: ['./login-app.component.scss'],
})
export class LoginAppComponent implements OnInit {
  constructor(private inicioAppService: InicioAppService, private router: Router) {}

  ngOnInit(): void {}

  onLogin(form: NgForm): void {
    this.inicioAppService.loginApp(form.value).subscribe(() => {
      this.router.navigate(['/api'])
    });
  }
}
