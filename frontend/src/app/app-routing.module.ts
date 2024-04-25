import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { RedirectGuard } from './guard/redirect.guard';
import { GuardService } from './services/guard.service';
import { ToastrService } from 'ngx-toastr';

import { HomeComponent } from './pages/home/home.component';
import { LoginAppComponent } from './pages/login-app/login-app.component';
import { RegisterAppComponent } from './pages/register-app/register-app.component';
import { AuthTokenComponent } from './pages/auth-token/auth-token.component';
import { ApiComponent } from './pages/api/api.component';
import { UserComponent } from './pages/user/user.component';
import { PassTokenComponent } from './pages/pass-token/pass-token.component';
import { ApiDeComponent } from './pages/api-de/api-de.component';
import { AudiusComponent } from './pages/audius/audius.component';

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
  { path: 'audius', component:AudiusComponent},
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    { provide: RedirectGuard, useFactory: RedirectGuard, deps: [GuardService, Router, ToastrService]}
  ]
})
export class AppRoutingModule {}
