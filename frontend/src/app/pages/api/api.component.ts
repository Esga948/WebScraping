import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InicioAppService } from 'src/app/services/inicio-app.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.scss'],
})
export class ApiComponent implements OnInit {
  userId: string = '';
  genres: { [key: string]: number } = {};
  artistNames: { [trackId: string]: string } = {};
  userAppName: string = '';
  userAppEmail: string = '';

  constructor(
    private route: ActivatedRoute,
    private inicioAppService: InicioAppService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('userId') ?? '';
    this.userAppName = this.inicioAppService.getName();
    this.userAppEmail = this.inicioAppService.getEmail();
  }



  logout(): void {
    this.inicioAppService.logout();
    window.open('https://open.spotify.com/intl-es', '_blank');
    alert('Cierra sesion tambien en Spotify');
    window.location.href = '/loginApp';
  }
}
