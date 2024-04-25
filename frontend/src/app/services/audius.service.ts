import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AudiusService {
  APP_SERVER: string = 'http://localhost:8080';

  constructor(private httpClient: HttpClient ) { }

  audiusT(): Observable<string[]>{
    return this.httpClient.get<string[]>(`${this.APP_SERVER}/trackAu`);
  }

  audiusU(): Observable<string[]>{
    return this.httpClient.get<string[]>(`${this.APP_SERVER}/userAu`);
  }

}
