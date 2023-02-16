import { Component } from '@angular/core';
import { DASHBOARD_TEXT } from 'src/app/constants/text';

@Component({
  selector: 'app-course-dashboard',
  templateUrl: './course-dashboard.component.html',
  styleUrls: ['./course-dashboard.component.scss']
})
export class CourseDashboardComponent {
  public getDashboardText() {
    return DASHBOARD_TEXT['Course']
  }
}
