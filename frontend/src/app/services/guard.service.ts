import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GuardService {
  loggedIn = false;

  constructor() { }

  isLoggedIn() {
    console.log("guard " + this.loggedIn)
    return this.loggedIn;
  }

  isLogin(){
    this.loggedIn = true;
  }

  isLogout(){
    this.loggedIn = false;
  }
}
