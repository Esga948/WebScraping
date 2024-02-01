import { Component, OnInit } from '@angular/core';
import { InicioAppService } from 'src/app/services/inicio-app.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit{
  userAppName: string = '';
  userAppEmail: string = '';
  userAppPass: string = 'userPass';

  imag: string = '../assets/persona.png';

  constructor(private inicioAppService: InicioAppService, private router: Router, private toast: ToastrService) {}

  ngOnInit(): void {
    this.userAppName = this.inicioAppService.getName();
    this.userAppEmail = this.inicioAppService.getEmail();
  }

  onPass(form: NgForm): void {
    if (form.valid) {
      this.inicioAppService.registerApp(form.value).subscribe(() => {
        this.toast.info('Token enviado');
      });
    } else {
      this.toast.error('Complete todos los campos para continuar');
    }
  }

  name(): void{
    this.inicioAppService.changeName(this.userAppName, this.userAppEmail);
  }

  cancel(){
    this.userAppName = this.inicioAppService.getName();
  }
}
