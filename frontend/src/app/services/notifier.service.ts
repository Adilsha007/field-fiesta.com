import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs'
import { ErrorSnackbarComponent } from '../shared/components/error-snackbar/error-snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  constructor(private snackbar: MatSnackBar) { }

  showNotification(displayMess:string){
    this.snackbar.openFromComponent(ErrorSnackbarComponent,
      {
       data:{
        message : displayMess,
        buttonTex : 'Try again'
       },
       duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    })
  }


}
