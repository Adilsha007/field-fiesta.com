import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { isAuthenticated } from 'src/app/auth/state/auth.selector';
import { AppState } from 'src/app/store/app.state';
import { SignoutComponent } from '../../../auth/signout/signout.component'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuthenticated! : Observable<boolean>

  constructor(
    private store: Store<AppState>,
    private dialogRef : MatDialog
    ){}


ngOnInit(): void {
  this.isAuthenticated = this.store.select(isAuthenticated)
  
}


  openDialog(){
    this.dialogRef.open(SignoutComponent,{
      data : {
        name : 'Samuel'
      }
    });
  }
  
}
