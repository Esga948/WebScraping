import { Component, OnInit } from '@angular/core';
import { AudiusService } from 'src/app/services/audius.service';
@Component({
  selector: 'app-audius',
  templateUrl: './audius.component.html',
  styleUrls: ['./audius.component.scss']
})
export class AudiusComponent implements OnInit{
  track: {}[] = [];
  user: {}[] = [];

  constructor(private audiusService: AudiusService){}

  ngOnInit(): void {
    this.getInfo();
    //this.getInfo2();
  }

  getInfo(): void{
    this.audiusService.audiusT().subscribe(
      (track) => {
        this.track = track;
      },
      (err) => {
        console.error("Error: ", err);
      }
    )
  }

  getInfo2(): void{
    this.audiusService.audiusU().subscribe(
      (user) => {
        this.user = user;
      },
      (err) => {
        console.error("Error: ", err);
      }
    )
  }
}
