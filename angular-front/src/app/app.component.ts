import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ConfirmModalComponent } from './components/global/confirm-modal/confirm-modal.component';
import { DASHBOARD_TEXT, FILTER_OPTIONS, NAV_ROUTES } from './constants/text';
import { FilterableType } from './interfaces/filterableTypes';
import User from './interfaces/user';
import { FilterableContextService } from './services/filterables/context/filterableContext.service';
import { getError, getUser, logout, setCurrentPage } from './store/auth/auth.actions';
import { selectLoggedUser } from './store/auth/auth.selectors';

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
    private store: Store,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.user$ = this.store.select(selectLoggedUser).subscribe(user => {
      this.user = user;
    });

    this.router$ = this.router.events.subscribe(() => {
      // Change filterable context
      const currentRoute = this.getLastRoute(this.router.url);
      const currentRouteType = this.routeToType.get(currentRoute)
      if (!currentRouteType) return;
      this.filterableContextService.switchService(currentRouteType);

      // Change dashboard text
      const currentRouteName = this.routeToTitle.get(currentRoute) || currentRoute;
      if (!currentRouteName) {
        this.store.dispatch(setCurrentPage(''))
        return;
      }
      const firstChar = currentRouteName.charAt(0).toUpperCase();
      const pageTitle = firstChar + currentRouteName.slice(1);
      this.store.dispatch(setCurrentPage(pageTitle));
    });
      
  }

  ngOnDestroy() {
    if (!!this.user$) this.user$.unsubscribe();
    if (!!this.router$) this.router$.unsubscribe();
  }

  public isLoggedIn() {
    return !!this.user;
  }

  private routeToTitle = new Map([
    ['students', 'Estudiantes'],
    ['student', 'Estudiantes'],
    ['courses', 'Cursos'],
    ['course', 'Cursos'],
    ['users', 'Usuarios'],
    ['enrollments', 'Inscripciones'],
    ['user', 'Usuario'],
    ['enrollment', 'Inscripción'],
  ]);

  private routeToType: Map<string, FilterableType> = new Map([
    ['students', 'Student'],
    ['courses', 'Course'],
    ['users', 'User'],
    ['enrollments', 'Enrollment']
  ]);

  private getLastRoute(route: string): string {
    const lastRoute = route.split('/').slice(-1)[0];
    if (!lastRoute) return this.getLastRoute(NAV_ROUTES[1].route)
    return lastRoute;
  }

  public changeRoute(route: number) {
    if (this.user?.profile !== 'admin') {
      const userIndex = NAV_ROUTES.findIndex(route => route.route === '/layout/users');
      if (route >= userIndex) route += 1;
    }

    const currentRoute = this.getLastRoute(NAV_ROUTES[route].route);
    if (currentRoute === 'login') {

      this.dialog.open(ConfirmModalComponent, {
        data: {
          title: 'Cerrar sesión',
          message: '¿Está seguro que desea cerrar sesión?',
          confirmButtonText: 'Cerrar sesión',
          cancelButtonText: 'Cancelar',
          onConfirm: () => {
            this.store.dispatch(logout());
            this.router.navigate([currentRoute]);
            this.dialog.closeAll();
          },
          onCancel: () => {
            this.dialog.closeAll();
          }
        }
      });

      return;
    }
    const currentRouteType = this.routeToType.get(currentRoute)
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
      newRoute = NAV_ROUTES.findIndex(route => this.getLastRoute(route.route) === secondaryRouteName);
      if (newRoute === -1) return 0;
    }
    
    if (this.user?.profile !== 'admin') {
      const userIndex = NAV_ROUTES.findIndex(route => route.route === '/layout/users');
      if (newRoute >= userIndex) newRoute -= 1;
    }

    return newRoute;
  }

  public getNavRoutes() {
    if (this.user?.profile !== 'admin') return NAV_ROUTES.filter(route => route.route !== '/layout/users');
    return NAV_ROUTES;
  }

  public getDashboardText() {
    const currentRoute = this.routeToType.get(this.getLastRoute(this.router.url));
    if (currentRoute == null) return;
    return DASHBOARD_TEXT[currentRoute];
  }
}
