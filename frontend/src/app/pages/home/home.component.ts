import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InicioAppService } from 'src/app/services/inicio-app.service';
import { Track } from 'src/app/models/track';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  allTracks: { collectionName: string; tracks: Track[]; expanded: boolean }[] = [];

  constructor(private router: Router, private inicioAppService: InicioAppService) {}

  ngOnInit(): void {
    this.getInfo();
  }

  getInfo(): void {
    const generos = ['Global Hits', 'Top Worldwide'];
    
    generos.forEach((collectionName) => {
      this.inicioAppService.getTracks(collectionName).subscribe(
        (tracks) => {
          this.allTracks.push({
            collectionName: collectionName,
            tracks: tracks,
            expanded: false,
          });
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    });
  }

  expanded(track: {
    collectionName: string;
    tracks: Track[];
    expanded: boolean;
  }): void {
    track.expanded = !track.expanded;
  }

  logout(): void {
    this.inicioAppService.logout();
    window.location.href = '/login';
  }

  sendRegister() {
    this.router.navigate(['/register']);
  }
}
