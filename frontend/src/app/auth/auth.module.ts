import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { MaterialModule } from '../material/material.module';
import { OtpComponent } from './otp/otp.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { SignoutComponent } from './signout/signout.component';



const routes: Routes = [
  { path: '', children: [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'admin/login', component: AdminLoginComponent },
    { path: 'otp', component: OtpComponent },
    { path: 'logout', component: SignoutComponent }
  ] }
]


@NgModule({
  declarations: [
    LoginComponent,
    OtpComponent,
    AdminLoginComponent,
    SignoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FormsModule
  ]
})
export class AuthModule { }
