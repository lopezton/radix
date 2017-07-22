import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplicationsHomeComponent } from './applications/applications-home/applications-home.component';
import { DashboardAuthGuard } from '../authentication/dashboard-auth.guard.service';
import { ApplicationAddComponent } from './applications/application-add/application-add.component';
import { ApplicationEditComponent } from './applications/application-edit/application-edit.component';
import { ApplicationsComponent } from './applications/applications.component';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';

const dashboardRoutes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [ DashboardAuthGuard ],
    children: [
      {
        path: '',
        canActivateChildren: [ DashboardAuthGuard ],
        children: [
          { path: 'home', component: HomeComponent },
          { 
            path: 'applications', 
            component: ApplicationsComponent,
            children: [
              { path: '', component: ApplicationsHomeComponent },
              { path: 'add', component: ApplicationAddComponent },
              { path: 'edit', component: ApplicationEditComponent }
            ]
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(dashboardRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    DashboardAuthGuard
  ]
})
export class DashboardRoutingModule {}
