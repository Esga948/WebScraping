import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginAppComponent } from './pages/login-app/login-app.component';
import { RegisterAppComponent } from './pages/register-app/register-app.component';
import { InicioAppService } from './services/inicio-app.service';
import { AuthTokenComponent } from './pages/auth-token/auth-token.component';
import { ApiComponent } from './pages/api/api.component';
import { NavbarApiComponent } from './components/navbar-api/navbar-api.component';
import { UserComponent } from './pages/user/user.component';
import { PassTokenComponent } from './pages/pass-token/pass-token.component';
import { ApiHomeComponent } from './pages/api-home/api-home.component';
import { ApiDeComponent } from './pages/api-de/api-de.component';
import { GuardService } from './services/guard.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginAppComponent,
    RegisterAppComponent,
    AuthTokenComponent,
    ApiComponent,
    NavbarApiComponent,
    UserComponent,
    PassTokenComponent,
    ApiHomeComponent,
    ApiDeComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule, NoopAnimationsModule,
  ToastrModule.forRoot({
    timeOut: 5000,
    positionClass: 'toast-top-right',
    preventDuplicates: true,
  })],
  providers: [InicioAppService, GuardService],
  bootstrap: [AppComponent],
})
export class AppModule {}
