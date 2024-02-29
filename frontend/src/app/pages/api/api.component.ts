import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { InicioAppService } from 'src/app/services/inicio-app.service';
import { Track } from 'src/app/models/track';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.scss'],
})
export class ApiComponent implements OnInit, OnDestroy {
  
  userAppName: string = '';
  userAppEmail: string = '';
  allTracks: { collectionName: string; tracks: Track[]; expanded: boolean }[] =
    [];

  constructor(private inicioAppService: InicioAppService, private renderer: Renderer2) {}
  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'body-api');
  }

  ngOnInit(): void {
    this.renderer.addClass(document.body, 'body-api');

    this.userAppName = this.inicioAppService.getName();
    this.userAppEmail = this.inicioAppService.getEmail();
    this.getCollectionsInfo();
  }

  getCollectionsInfo(): void {
    this.inicioAppService.getCollections().subscribe(
      (data) => {
        // Ordenar los géneros
        data.sort((a, b) => {
          if (a === 'Global Hits') return -1;
          if (b === 'Global Hits') return 1;
          return a.localeCompare(b);
        });

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
