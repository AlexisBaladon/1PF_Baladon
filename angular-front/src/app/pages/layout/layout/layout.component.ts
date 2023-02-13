import { Component, EventEmitter, Output } from '@angular/core';
import { NAV_ROUTES, DASHBOARD_TEXT } from 'src/app/constants/text';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  @Output() public loggingOut = new EventEmitter();
  private dashboardRoutes = ['Students', 'Courses'];
  private currentRoute = 'Students';

  public changeRoute(route: string) {
    this.currentRoute = route;
  }

  public getNavRoutes() {
    return NAV_ROUTES;
  }

  public getDashboardText() {
    console.log(this.currentRoute);
    if (!this.dashboardRoutes.includes(this.currentRoute)) return null;
    console.log(DASHBOARD_TEXT[this.currentRoute]);
    return DASHBOARD_TEXT[this.currentRoute];
  }

  public navRoutes = NAV_ROUTES;
  public dashboardText = DASHBOARD_TEXT;

  public logOut() {
    this.loggingOut.emit();
  }

}
