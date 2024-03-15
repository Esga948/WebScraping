import { Component, OnInit } from '@angular/core';
import { InicioAppService } from 'src/app/services/inicio-app.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-app',
  templateUrl: './login-app.component.html',
  styleUrls: ['./login-app.component.scss'],
})
export class LoginAppComponent implements OnInit {
  constructor(private inicioAppService: InicioAppService, private router: Router, private toast: ToastrService) {}

  ngOnInit(): void {}

  onLogin(form: NgForm): void {
    if (form.valid) {
      this.inicioAppService.loginApp(form.value).subscribe(() => {
        this.router.navigate(['/apiHome'])
      });
    } else {
      this.toast.error('Complete todos los campos para continuar');
    }
  }
}
