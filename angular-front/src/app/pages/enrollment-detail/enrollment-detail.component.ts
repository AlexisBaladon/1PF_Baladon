import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Enrollment } from 'src/app/models/enrollment';
import { EnrollmentsService } from 'src/app/services/enrollments/enrollments.service';

@Component({
  selector: 'app-enrollment-detail',
  templateUrl: './enrollment-detail.component.html',
  styleUrls: ['./enrollment-detail.component.scss']
})
export class EnrollmentDetailComponent {
  public id: Enrollment['id'] | null = null;
    private enrollment$!: Subscription;
    public enrollment: Enrollment | null = null;
  
    constructor(
      private route: ActivatedRoute,
      private enrollmentsService: EnrollmentsService,
    ) { }
  
    ngOnInit(): void {
      this.id = this.route.snapshot.paramMap.get('id');
      if (this.id != undefined) {
        this.initializeSecondaryServices(this.id);
      }
    }
  
    ngOnDestroy(): void {
      this.enrollment$.unsubscribe();
    }
  
    private initializeSecondaryServices(id: Enrollment['id']) {
      this.enrollment$ = this.enrollmentsService.getById(id).subscribe(enrollment => {
        this.enrollment = Array.isArray(enrollment) ? enrollment[0] : enrollment;
      });
    }
}
