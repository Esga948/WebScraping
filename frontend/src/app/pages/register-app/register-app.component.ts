import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InicioAppService } from 'src/app/services/inicio-app.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register-app',
  templateUrl: './register-app.component.html',
  styleUrls: ['./register-app.component.scss'],
})
export class RegisterAppComponent implements OnInit {
  
  constructor(private inicioAppService: InicioAppService, private router: Router, private toast: ToastrService) {}
    
  ngOnInit(): void {}

  onRegister(form: NgForm): void {
    if (form.valid) {
      this.inicioAppService.registerApp(form.value).subscribe(() => {
        this.toast.info('Token enviado');
        this.router.navigate(['/authToken'])
      });
    } else {
      this.toast.error('Complete todos los campos para continuar');
    }
  }
}
