import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { NotifierService } from 'src/app/services/notifier.service';
import { AppState } from 'src/app/store/app.state';
import { setErrorMessage } from 'src/app/store/shared/shared.actions';
import { getErrorMessage } from 'src/app/store/shared/shared.selector';
import { loginStart, signupStart } from '../state/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  selectedTabIndex = 0;
  myDivClass! : string;
  numberError: boolean = false


  user = {
    username: '',
    email: '',
    phoneno: null,
    password: '',
    repassword: ''
  }  

  loginUser = {
    email: '',
    password: ''
  }

  constructor(
    private store:Store<AppState>
    ){

    }

  
  
  tabChanged() {
  if (this.selectedTabIndex === 0) {
    // Login tab is selected, apply login styles
    this.myDivClass = 'login-style';
  } else if (this.selectedTabIndex === 1) {
    // Signup tab is selected, apply signup styles
     this.myDivClass = 'signup-style';
  }
}


validateNumber(value: number){
  if (value.toString().length != 10 ) {
      this.numberError = true;
    } else {
      this.numberError = false;
    }
}

singnupClick(signupForm: NgForm){
  
  const username = signupForm.value.username
  const email = signupForm.value.email
  const phoneno = signupForm.value.phoneno
  const password = signupForm.value.password

  this.store.dispatch(signupStart({username,email,phoneno,password}))

}


loginClicked(loginForm: NgForm){

  const email = loginForm.value.email
  const password = loginForm.value.password

  this.store.dispatch(loginStart({email,password}))


}




}
