import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GuardService {
  constructor() { }

  isLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  isLogin(){
    localStorage.setItem('isLoggedIn', 'true');
  }

  isLogout(){
    localStorage.setItem('isLoggedIn', 'false');
  }
}
