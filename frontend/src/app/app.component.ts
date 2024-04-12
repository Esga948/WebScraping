import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Top Songs';
  // showNavbar = true;
  // showNavbar2 = true;
  constructor(private router: Router) {}

  ngOnInit(): void {
    //   this.router.events.subscribe((event) => {
    //     if (event instanceof NavigationEnd) {
    //       this.showNavbar = !(
    //         event.urlAfterRedirects.includes('api') ||
    //         event.urlAfterRedirects.includes('user') ||
    //         event.urlAfterRedirects.includes('apiHome')||
    //         event.urlAfterRedirects.includes('apiDe')
    //       );
    //     }
    //   });
    //   this.router.events.subscribe((event2) => {
    //     if (event2 instanceof NavigationEnd) {
    //       this.showNavbar2 = !(
    //         event2.urlAfterRedirects.includes('home') ||
    //         event2.urlAfterRedirects.includes('login') ||
    //         event2.urlAfterRedirects.includes('register') ||
    //         event2.urlAfterRedirects.includes('authToken')||
    //         event2.urlAfterRedirects.includes('passToken')||
    //         event2.urlAfterRedirects.includes('pass')
    //       );
    //     }
    //   });
    // }
  }
}
