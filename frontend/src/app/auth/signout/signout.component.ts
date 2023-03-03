import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialogRef } from '@angular/material/dialog';
import { AppState } from 'src/app/store/app.state';
import { logout } from '../state/auth.actions';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.css'],
})
export class SignoutComponent {
  constructor(
    private store: Store<AppState>,
    public dialogRef: MatDialogRef<SignoutComponent>
  ) {}

  onSignout(event: Event) {
    event.preventDefault();
    this.store.dispatch(logout());
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
