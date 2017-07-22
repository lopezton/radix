import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 
import { ApplicationsHomeComponent } from './dashboard/applications/applications-home/applications-home.component';
import { HomeComponent } from './dashboard/home/home.component';
import { LoginComponent } from './dashboard/login/login.component';

const appRoutes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  
  // otherwise redirect to home
  { path: '**', redirectTo: '/dashboard/home' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
