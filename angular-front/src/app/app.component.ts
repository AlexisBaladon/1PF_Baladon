import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DASHBOARD_TEXT, FILTER_OPTIONS, NAV_ROUTES } from './constants/text';
import { FilterableType } from './interfaces/filterableTypes';
import User from './interfaces/user';
import { AuthService } from './services/auth/auth.service';
import { FilterableContextService } from './services/filterables/context/filterableContext.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private user: User | null = null;
  private user$!: Subscription;
  constructor( private filterableContextService: FilterableContextService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.user$ = this.authService.getUser().subscribe(user => {
      this.user = user;
      if (!this.user) {
        this.router.navigate(['/login']);
      }
    });
  }

  ngOnDestroy() {
    if (!!this.user$) this.user$.unsubscribe();
  }

  public isLoggedIn() {
    return !!this.user;
  }

  private routes: (string | FilterableType)[] = ['Home', 'Student', 'Course', 'General'];
  private dashboardRoutes: FilterableType[] = ['Student', 'Course'];
  private routesMap: Map<FilterableType, string> = new Map([
    ['Student', 'students'],
    ['Course', 'courses'],
  ]);

  public currentRoute: FilterableType = 'Student';
  public filterOptions = FILTER_OPTIONS;
  
  public changeRoute(route: number) {
    this.currentRoute = this.routes[route] as FilterableType;
    if (this.dashboardRoutes.includes(this.currentRoute)) {
      this.filterableContextService.switchService(this.currentRoute);
      this.router.navigate(['/layout', this.routesMap.get(this.currentRoute)]);
    }
  }

  public getCurrentRoute() {
    return this.routes.indexOf(this.currentRoute);
  }

  public getNavRoutes() {
    return NAV_ROUTES;
  }

  public getDashboardText() {
    if (!this.dashboardRoutes.includes(this.currentRoute)) return null;
    return DASHBOARD_TEXT[this.currentRoute];
  }

  public navRoutes = NAV_ROUTES;
  public dashboardText = DASHBOARD_TEXT;
}
