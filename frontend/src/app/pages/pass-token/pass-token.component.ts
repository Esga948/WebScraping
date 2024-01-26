import { Component, OnInit } from '@angular/core';
import { InicioAppService } from 'src/app/services/inicio-app.service';

import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pass-token',
  templateUrl: './pass-token.component.html',
  styleUrls: ['./pass-token.component.scss'],
})
export class PassTokenComponent implements OnInit {
  constructor(
    private inicioAppService: InicioAppService,
    private toast: ToastrService,
    private router: Router
  ) {}

  mostrarDiv = false;

  ngOnInit(): void {}

  onMail(form: NgForm): void {
    var email = form.value.email;
    if (email) {
      this.inicioAppService.reenviarToken(email).subscribe(
        () => {
          this.toast.info('Token enviado');
          this.mostrarDiv = !this.mostrarDiv;
        },
        (err) => {
          this.toast.error(err.error.msj || 'Error desconocido');
        }
      );
    } else {
      this.toast.error('Proporcione un correo electronico');
    }
  }

  onPass(form1: NgForm): void {
    var token = form1.value.token;
    var pass = form1.value.password;
    var pass2 = form1.value.password2;

    this.inicioAppService.authToken(token).subscribe((res) => {
      if (res.tokens) {
        if (pass == '' || pass2 == '') {
          this.toast.error('Introduzca la contraseña dos veces');
        } else {
          if (pass === pass2) {
            this.inicioAppService.resetPass(pass)    
            .subscribe(
              () => {
                this.toast.info('Contraseña cambiada');
                this.router.navigate(['/login'])
              },
              (err) => {
                this.toast.error(err.error.msj || 'Error desconocido');
              }
            );
        
          } else {
            this.toast.error('Las contraseñas no coinciden');
          }
        }
      }
    });
  }

  sendToken() {
    this.inicioAppService.reenviarToken("")
    .subscribe(
      () => {
        this.toast.info('Token enviado');
      },
      (err) => {
        this.toast.error(err.error.msj || 'Error desconocido');
      }
    );
  }
}
