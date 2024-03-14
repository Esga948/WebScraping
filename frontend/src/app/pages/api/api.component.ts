import { Component, OnInit } from '@angular/core';
import { InicioAppService } from 'src/app/services/inicio-app.service';
import { Track } from 'src/app/models/track';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.scss'],
})
export class ApiComponent implements OnInit {
  allTracks: { collectionName: string; tracks: Track[]; expanded: boolean }[] = [];

  constructor(private inicioAppService: InicioAppService) {}

  ngOnInit(): void {
    this.getCollectionsInfo();
  }

  getCollectionsInfo(): void {
    this.inicioAppService.getCollections().subscribe(
      (data) => {
        data.forEach((collectionName) => {
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
      },
      (error) => {
        console.error('Error: ' + error);
      }
    );
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
