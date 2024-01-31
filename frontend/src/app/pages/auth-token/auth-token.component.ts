import { Component, OnInit } from '@angular/core';
import { InicioAppService } from 'src/app/services/inicio-app.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-token',
  templateUrl: './auth-token.component.html',
  styleUrls: ['./auth-token.component.scss'],
})

export class AuthTokenComponent implements OnInit {
  constructor(private inicioAppService: InicioAppService, private toast: ToastrService, private router: Router) {}

  ngOnInit(): void {
  }

  onToken(form: NgForm): void {
    const token = form.value.token;
    this.inicioAppService.authToken(token).subscribe((res) => {
      if (res.tokens) {
        this.router.navigate(['/api'])
      }
    });
  }

  sendToken(){
    this.inicioAppService.reenviarTokenAuth();
  }
}
