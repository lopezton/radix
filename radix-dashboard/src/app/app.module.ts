import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ApplicationsComponent } from './applications/applications.component';
import { AuthGuard } from './authentication/auth.guard';
import { EverestService } from './everest.service';
import { AuthenticationService } from './login/authentication.service';
import { fakeBackendProvider } from './login/fake-backend';
import { LoginComponent } from './login/login.component';
import { UserService } from './login/user.service';
import { BaseRequestOptions } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ApplicationsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    HttpModule
  ],
  providers: [
    AuthGuard,
    EverestService,
    AuthenticationService,
    UserService,
    
    // providers used to create fake backend
    fakeBackendProvider,
    MockBackend,
    BaseRequestOptions
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
