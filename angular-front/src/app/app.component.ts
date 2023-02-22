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
  private router$!: Subscription;
  public filterOptions = FILTER_OPTIONS;

  constructor( 
    private filterableContextService: FilterableContextService, 
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.user$ = this.authService.getUser().subscribe(user => {
      this.user = user;
      if (!this.user) {
        this.router.navigate(['/login']);
      }
    });

    this.router$ = this.router.events.subscribe(() => {
      const currentRoute = this.getLastRoute(this.router.url);
      const currentRouteType = this.routesMap.get(currentRoute)
      if (!currentRouteType) return;
      this.filterableContextService.switchService(currentRouteType);
    });
      
  }

  ngOnDestroy() {
    if (!!this.user$) this.user$.unsubscribe();
    if (!!this.router$) this.router$.unsubscribe();
  }

  public isLoggedIn() {
    return !!this.user;
  }

  private routesMap: Map<string, FilterableType> = new Map([
    ['students', 'Student'],
    ['courses', 'Course'],
  ]);

  private secondaryRoutesMap: Map<string, string> = new Map([
    ['student', 'students'],
    ['course', 'courses'],
  ]);


  private getLastRoute(route: string): string {
    const lastRoute = route.split('/').slice(-1)[0];
    if (!lastRoute) return this.getLastRoute(NAV_ROUTES[1].route)
    return lastRoute;
  }

  public changeRoute(route: number) {
    const currentRoute = this.getLastRoute(NAV_ROUTES[route].route);
    if (route === NAV_ROUTES.length - 1) this.authService.logout();
    const currentRouteType = this.routesMap.get(currentRoute)
    if (currentRouteType == null) return;
    this.filterableContextService.switchService(currentRouteType);
    this.router.navigate(['/layout', currentRoute]);
  }

  public getCurrentRoute() {
    const currentRoute = this.getLastRoute(this.router.url);
    let newRoute = NAV_ROUTES.findIndex(route => this.getLastRoute(route.route) === currentRoute);
    if (newRoute === -1) {
      const secondaryRoute = this.router.url.split('/');
      const secondaryRouteName = secondaryRoute.slice(-2)[0];
      const mappedSecondaryRouteName = this.secondaryRoutesMap.get(secondaryRouteName);
      newRoute = NAV_ROUTES.findIndex(route => this.getLastRoute(route.route) === mappedSecondaryRouteName);
      if (newRoute === -1) return 0;
    }
    return newRoute;
  }

  public getNavRoutes() {
    return NAV_ROUTES;
  }

  public getDashboardText() {
    const currentRoute = this.routesMap.get(this.getLastRoute(this.router.url));
    if (currentRoute == null) return;
    return DASHBOARD_TEXT[currentRoute];
  }
}
