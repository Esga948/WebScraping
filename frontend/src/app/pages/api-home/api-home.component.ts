import { Component, OnInit } from '@angular/core';
import { InicioAppService } from 'src/app/services/inicio-app.service';
import { Track } from 'src/app/models/track';

@Component({
  selector: 'app-api-home',
  templateUrl: './api-home.component.html',
  styleUrls: ['./api-home.component.scss'],
})
export class ApiHomeComponent implements OnInit {
  allTracks: { collectionName: string; tracks: Track[]; expanded: boolean }[] = [];

  constructor(private inicioAppService: InicioAppService) {}

  ngOnInit(): void {
    this.getInfo();
  }

  getInfo(): void {
    const generos = ['Global Hits', 'TopWorldwide'];
    
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

}
