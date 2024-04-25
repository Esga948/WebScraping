import { Component, OnInit } from '@angular/core';
import { InicioAppService } from 'src/app/services/inicio-app.service';
import { Track } from 'src/app/models/track';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-api-home',
  templateUrl: './api-home.component.html',
  styleUrls: ['./api-home.component.scss'],
})
export class ApiHomeComponent implements OnInit {
  allTracks: { collectionName: string; tracks: Track[]; expanded: boolean }[] = [];

  constructor(private inicioAppService: InicioAppService, private toast: ToastrService) {}

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
          this.toast.error('Error con la base de datos');
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
