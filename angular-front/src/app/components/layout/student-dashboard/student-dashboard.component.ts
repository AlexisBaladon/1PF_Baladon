import { Component } from '@angular/core';
import { DASHBOARD_TEXT } from 'src/app/constants/text';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss']
})
export class StudentDashboardComponent {
  public getDashboardText() {
    return DASHBOARD_TEXT['Student']
  }
}
