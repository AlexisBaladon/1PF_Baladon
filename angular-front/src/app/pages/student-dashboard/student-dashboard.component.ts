import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DASHBOARD_TEXT } from 'src/app/constants/text';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss']
})
export class StudentDashboardComponent {
  constructor(private router: Router) {}

  public getDashboardText() {
    return DASHBOARD_TEXT['Student']
  }

  public onViewEmitter(id: string) {
    this.router.navigate([`/layout/student/${id}`]);
  }

}
