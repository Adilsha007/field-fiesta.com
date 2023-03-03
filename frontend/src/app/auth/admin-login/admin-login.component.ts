import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { adminloginStart } from '../state/auth.actions';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {

  constructor(private store : Store<AppState>){}


  loginUser = {
    email: '',
    password: ''
  }


  loginClicked(adminForm: NgForm){
  const email = adminForm.value.email
  const password = adminForm.value.password

  this.store.dispatch(adminloginStart({email,password}))
  }
  
}
