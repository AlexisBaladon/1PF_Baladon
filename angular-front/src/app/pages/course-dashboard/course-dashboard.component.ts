import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DASHBOARD_TEXT } from 'src/app/constants/text';

@Component({
  selector: 'app-course-dashboard',
  templateUrl: './course-dashboard.component.html',
  styleUrls: ['./course-dashboard.component.scss']
})
export class CourseDashboardComponent {
  constructor(private routes: Router) {}

  public getDashboardText() {
    return DASHBOARD_TEXT['Course']
  }

  public onView(id: string) {
    this.routes.navigate(['layout','course', id]);
  }
}
