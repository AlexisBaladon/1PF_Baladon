import { Component, EventEmitter, Output } from '@angular/core';
import { NAV_ROUTES, DASHBOARD_TEXT, FILTER_OPTIONS } from 'src/app/constants/text';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  @Output() public menuItemSelected = new EventEmitter();
  @Output() public loggingOut = new EventEmitter();
  private routes = ['Home', 'Students', 'Courses', 'General'];
  private dashboardRoutes = ['Students', 'Courses'];
  public currentRoute = 'Students';
  public filterOptions = FILTER_OPTIONS;
  
  public changeRoute(route: number) {
    this.currentRoute = this.routes[route];
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

  public logOut() {
    this.loggingOut.emit();
  }

}
