import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import User from 'src/app/interfaces/user';
import { setCurrentPage } from 'src/app/store/auth/auth.actions';
import { selectCurrentPage, selectLoggedUser } from 'src/app/store/auth/auth.selectors';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  private currentPage$!: Subscription;
  private currentPage!: string;
  private user$!: Subscription;
  public user!: User | null;

  constructor(
    private store: Store,
  ) { }

  ngOnInit() {
    this.user$ = this.store.select(selectLoggedUser).subscribe(user => {
      this.user = user;
    });

    this.currentPage$ = this.store.select(selectCurrentPage).subscribe(currentPage => {
      this.currentPage = currentPage;
    });
  }

  ngOnDestroy() {
    this.user$.unsubscribe();
  }

  public getCurrentPage() {
    return this.currentPage;
  }
}
