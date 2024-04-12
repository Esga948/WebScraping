import { Component, OnInit } from '@angular/core';
import { InicioAppService } from 'src/app/services/inicio-app.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { GuardService } from 'src/app/services/guard.service';
@Component({
  selector: 'app-auth-token',
  templateUrl: './auth-token.component.html',
  styleUrls: ['./auth-token.component.scss'],
})

export class AuthTokenComponent implements OnInit {
  constructor(private inicioAppService: InicioAppService, private toast: ToastrService, private router: Router, private guard: GuardService) {}

  ngOnInit(): void {
  }

  onToken(form: NgForm): void {
    const token = form.value.token;
    this.inicioAppService.authToken(token).subscribe((res) => {
      if (res.tokens) {
        this.guard.isLogin();
        this.router.navigate(['/apiHome'])
      }
    });
  }

  sendToken(){
    this.inicioAppService.reenviarTokenAuth();
  }
}
