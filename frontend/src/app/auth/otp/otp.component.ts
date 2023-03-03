import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { NotifierService } from 'src/app/services/notifier.service';
import { AppState } from 'src/app/store/app.state';
import { setErrorMessage } from 'src/app/store/shared/shared.actions';
import { getErrorMessage } from 'src/app/store/shared/shared.selector';
import { otpStart } from '../state/auth.actions';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent {


  constructor(
    private store:Store<AppState>,
    private notifierService : NotifierService
  ){}

  otp! : number

  otpSubmited(otpForm: NgForm){
    console.log('otp clickitng');
    
    const otp = otpForm.value.otp
    this.store.dispatch(otpStart({otp}))

  

  }

}
