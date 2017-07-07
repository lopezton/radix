import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplicationsComponent } from './applications/applications.component';
import { DashboardAuthGuard } from '../authentication/dashboard-auth.guard.service';
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
        children: [
          { path: 'home', component: HomeComponent },
          { path: 'applications', component: ApplicationsComponent } 
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
