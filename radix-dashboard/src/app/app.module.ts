import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './dashboard/home/home.component';
import { ApplicationsComponent } from './dashboard/applications/applications.component';
import { DashboardAuthService } from './dashboard/authentication/dashboard-auth.service';
import { DashboardRoutingModule } from './dashboard/dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

import { EverestService } from './everest.service';
import { LoginComponent } from './login/login.component';
import { UserService } from './login/user.service';
import { HeaderComponent } from './dashboard/header/header.component';
import { HeaderTopLinksComponent } from './dashboard/header/header-top-links/header-top-links.component';
import { HeaderSidebarComponent } from './dashboard/header/header-sidebar/header-sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    ApplicationsComponent,
    LoginComponent,
    HeaderComponent,
    HeaderTopLinksComponent,
    HeaderSidebarComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    DashboardRoutingModule,
    AppRoutingModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    EverestService,
    UserService,
    DashboardAuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
