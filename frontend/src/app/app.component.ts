import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { AppState } from './store/app.state';
import { getErrorMessage } from './store/shared/shared.selector';
import { NotifierService } from './services/notifier.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'project';

  errorMessage$ = new BehaviorSubject<string>('');

  constructor(
    protected router:Router,
    private store : Store<AppState>,
    private notifierService : NotifierService
    ){  }

ngOnInit(): void {

  this.store.select(getErrorMessage).subscribe((data)=>{
    this.errorMessage$.next(data);
  })

  this.errorMessage$.subscribe((errorMessage) => {
      if (errorMessage) {
        this.notifierService.showNotification(errorMessage);
      }
    });
  
}


}
