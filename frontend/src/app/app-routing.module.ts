import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginAppComponent } from './pages/login-app/login-app.component';
import { RegisterAppComponent } from './pages/register-app/register-app.component';
import { AuthTokenComponent } from './pages/auth-token/auth-token.component';
import { ApiComponent } from './pages/api/api.component';
import { UserComponent } from './pages/user/user.component';
import { PassTokenComponent } from './pages/pass-token/pass-token.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterAppComponent },
  { path: 'login', component: LoginAppComponent },
  { path: 'authToken', component: AuthTokenComponent },
  { path: 'api', component: ApiComponent },
  { path: 'user', component: UserComponent },
  { path: 'passToken', component: PassTokenComponent },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
