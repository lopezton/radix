import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './dashboard/home/home.component';
import { ApplicationsHomeComponent } from './dashboard/applications/applications-home/applications-home.component';
import { DashboardHttpService } from './dashboard/dashboard-http.service';
import { DashboardRoutingModule } from './dashboard/dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardService } from './dashboard/dashboard.service';

import { LoginComponent } from './dashboard/login/login.component';
import { UserService } from './authentication/user.service';
import { HeaderComponent } from './dashboard/header/header.component';
import { HeaderTopLinksComponent } from './dashboard/header/header-top-links/header-top-links.component';
import { HeaderSidebarComponent } from './dashboard/header/header-sidebar/header-sidebar.component';
import { ApplicationsComponent } from './dashboard/applications/applications.component';
import { ApplicationAddComponent } from './dashboard/applications/application-add/application-add.component';
import { ApplicationEditComponent } from './dashboard/applications/application-edit/application-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
    HeaderTopLinksComponent,
    HeaderSidebarComponent,
    ApplicationsHomeComponent,
    ApplicationsComponent,
    ApplicationAddComponent,
    ApplicationEditComponent
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
    UserService,
    DashboardService,
    DashboardHttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
