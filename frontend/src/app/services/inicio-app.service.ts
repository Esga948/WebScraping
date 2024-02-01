import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserApp } from '../models/user-app';
import { JwtResp } from '../models/jwtresp';
import { Track } from '../models/track';
import { tap } from 'rxjs';
import { Observable, BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class InicioAppService {
  APP_SERVER: string = 'http://localhost:8080';
  appSubject = new BehaviorSubject(false);
  private token: string = '';
  private name: string = '';
  private email: string = '';
  constructor(private httpClient: HttpClient, private toast: ToastrService) {}

  registerApp(user: UserApp): Observable<JwtResp> {
    return this.httpClient
      .post<JwtResp>(`${this.APP_SERVER}/registerApp`, user)
      .pipe(
        tap(
          (res: JwtResp) => {
            if (res) {
              // guardar token
              this.saveToken(res.dataUser.aToken, res.dataUser.expiresIn);
              this.saveName(user.name);
              this.saveEmail(user.email);
            }
          },
          (error) => {
            // Manejar errores aquí
            this.toast.error(error.error.msj || 'Error desconocido');
            console.error('Error en el registro:', error);
          }
        )
      );
  }

  loginApp(user: UserApp): Observable<JwtResp> {
    return this.httpClient
      .post<JwtResp>(`${this.APP_SERVER}/loginApp`, user)
      .pipe(
        tap(
          (res: JwtResp) => {
            if (res) {
              // guardar token
              this.saveToken(res.dataUser.aToken, res.dataUser.expiresIn);
              this.saveName(res.dataUser.name);
              this.saveEmail(user.email);
            }
          },
          (error) => {
            // Manejar errores aquí
            this.toast.error(error.error.msj || 'Error desconocido');
            console.error('Error en el registro:', error);
          }
        )
      );
  }

  authToken(frontToken: string): Observable<{ tokens: boolean }> {
    //const email = this.getEmail();
    return this.httpClient
      .post<{ tokens: boolean }>(`${this.APP_SERVER}/authToken`, {
        token: frontToken,
      })
      .pipe(
        tap((res) => {
          if (res.tokens) {
            console.log('Los tokens coinciden');
          } else {
            this.toast.error('Token incorrecto');
            console.log('Los tokens no coinciden');
          }
        })
      );
  }

  authToken2(frontToken: string): Observable<{ tokens: boolean }> {
    const email = this.getEmail();
    return this.httpClient
      .post<{ tokens: boolean }>(`${this.APP_SERVER}/authToken2`, {
        token: frontToken,
        email,
      })
      .pipe(
        tap((res) => {
          if (res.tokens) {
            console.log('Los tokens coinciden');
          } else {
            this.toast.error('Token incorrecto');
            console.log('Los tokens no coinciden');
          }
        })
      );
  }

  reenviarToken(email: string): Observable<any> {
    if (!email) {
      email = this.getEmail();
    }
    this.saveEmail(email);
    return this.httpClient.post(`${this.APP_SERVER}/reenviarToken`, {
      email: email,
    });
  }

  reenviarTokenAuth(): void {
    this.httpClient.post(`${this.APP_SERVER}/reenviarTokenAuth`, {}).subscribe(
      () => {
        this.toast.info('Token enviado');
      },
      (err) => {
        this.toast.error(err.error.msj || 'Error desconocido');
      }
    );
  }

  resetPass(newPass: string): Observable<any> {
    var email = this.getEmail();
    return this.httpClient.post(`${this.APP_SERVER}/resetPass`, {
      email,
      newPass: newPass,
    });
  }

  getCollections(): Observable<string[]> {
    return this.httpClient.get<string[]>(`${this.APP_SERVER}/getCollections`);
  }

  getTracks(collectionName: string): Observable<Track[]> {
    return this.httpClient.get<Track[]>(
      `${this.APP_SERVER}/datsT/${collectionName}`
    );
  }

  changeName(newName: string, email: string): void {
    this.httpClient
      .post(`${this.APP_SERVER}/changeName`, {
        email: email,
        newName: newName,
      })
      .subscribe(
        (resp) => {
          this.toast.info("El nombre se ha actualizado");
        },
        (err) => {
          this.toast.error(err.error.msj || 'Error desconocido');
        }
      );
    this.saveName(newName);
  }

  logout(): void {
    this.token = '';
    this.email = '';
    this.name = '';
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('EXPIRES_IN');
    localStorage.removeItem('NAME');
    localStorage.removeItem('EMAIL');
    this.httpClient.post(`${this.APP_SERVER}/logout`, {});
  }

  private saveToken(token: string, expiresIn: string): void {
    localStorage.setItem('ACCESS_TOKEN', token);
    localStorage.setItem('EXPIRES_IN', expiresIn);
    this.token = token;
  }

  private getToken(): string {
    return (this.token = localStorage.getItem('ACCESS_TOKEN') ?? '');
  }

  private saveName(name: string): void {
    localStorage.setItem('NAME', name);
    this.name = name;
  }

  getName(): string {
    return localStorage.getItem('NAME') ?? '';
  }

  private saveEmail(email: string): void {
    localStorage.setItem('EMAIL', email);
    this.email = email;
  }

  getEmail(): string {
    return localStorage.getItem('EMAIL') ?? '';
  }
}
