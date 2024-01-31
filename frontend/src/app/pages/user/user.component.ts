import { Component, OnInit } from '@angular/core';
import { InicioAppService } from 'src/app/services/inicio-app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit{
  userAppName: string = '';
  userAppEmail: string = '';
  userAppPass: string = 'userAppPassword';

  imag: string = '../assets/persona.png';

  constructor(private inicioAppService: InicioAppService, private router: Router) {}

  ngOnInit(): void {
    this.userAppName = this.inicioAppService.getName();
    this.userAppEmail = this.inicioAppService.getEmail();
  }

  password(): void{
    this.router.navigate(['/passToken'])
  }
}
