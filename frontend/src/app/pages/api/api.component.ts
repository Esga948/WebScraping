import { Component, OnInit } from '@angular/core';
import { InicioAppService } from 'src/app/services/inicio-app.service';
import { Track } from 'src/app/models/track';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.scss'],
})
export class ApiComponent implements OnInit {
  userAppName: string = '';
  userAppEmail: string = '';
  allTracksMap: { [collectionName: string]: Track[] } = {};

  constructor(private inicioAppService: InicioAppService) {}

  ngOnInit(): void {
    this.userAppName = this.inicioAppService.getName();
    this.userAppEmail = this.inicioAppService.getEmail();
    this.getCollectionsInfo();
  }

  getCollectionsInfo(): void {
    this.inicioAppService.getCollections().subscribe(
      (data) => {
        data.forEach((collectionName) => {
          this.inicioAppService.getTracks(collectionName).subscribe(
            (tracks) => {
              this.allTracksMap[collectionName] = tracks;
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

  logout(): void {
    this.inicioAppService.logout();
    window.location.href = '/login';
  }
}
