import { Component, EventEmitter, Output } from '@angular/core';
import { NAV_ROUTES, DASHBOARD_TEXT, FILTER_OPTIONS } from 'src/app/constants/text';
import { type FilterableType } from 'src/app/interfaces/filterableTypes';
import { FilterablesService } from 'src/app/services/filterables/filterables.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  @Output() public menuItemSelected = new EventEmitter();
  @Output() public loggingOut = new EventEmitter();
  constructor(private filterableService: FilterablesService) { }
  private routes: (string | FilterableType)[] = ['Home', 'Student', 'Course', 'General'];
  private dashboardRoutes: FilterableType[] = ['Student', 'Course'];
  public currentRoute: FilterableType = 'Student';
  public filterOptions = FILTER_OPTIONS;
  
  public changeRoute(route: number) {
    this.currentRoute = this.routes[route] as FilterableType;
    if (this.dashboardRoutes.includes(this.currentRoute)) {
      this.filterableService.switchService(this.currentRoute);
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

  public logOut() {
    this.loggingOut.emit();
  }

}
