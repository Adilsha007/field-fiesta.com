import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialModule } from '../material/material.module';

const routes : Routes = [
  { path : '', children : [
    { path : '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path : 'dashboard', component: DashboardComponent }
  ] }
]

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
  ]
})
export class AdminModule { }
