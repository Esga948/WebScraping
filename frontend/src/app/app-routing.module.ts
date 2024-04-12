import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { RedirectGuard } from './guard/redirect.guard';
import { GuardService } from './services/guard.service';

import { HomeComponent } from './pages/home/home.component';
import { LoginAppComponent } from './pages/login-app/login-app.component';
import { RegisterAppComponent } from './pages/register-app/register-app.component';
import { AuthTokenComponent } from './pages/auth-token/auth-token.component';
import { ApiComponent } from './pages/api/api.component';
import { UserComponent } from './pages/user/user.component';
import { PassTokenComponent } from './pages/pass-token/pass-token.component';
import { ApiDeComponent } from './pages/api-de/api-de.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterAppComponent },
  { path: 'login', component: LoginAppComponent },
  { path: 'authToken', component: AuthTokenComponent },
  { path: 'api', canActivate: [RedirectGuard], component: ApiComponent },
  { path: 'user', canActivate: [RedirectGuard], component: UserComponent },
  { path: 'passToken', component: PassTokenComponent },
  { path: 'apiDe', canActivate: [RedirectGuard], component: ApiDeComponent },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    GuardService,
    { provide: RedirectGuard, useFactory: RedirectGuard, deps: [GuardService, Router]}
  ]
})
export class AppRoutingModule {}
