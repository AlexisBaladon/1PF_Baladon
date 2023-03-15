import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Enrollment } from 'src/app/models/enrollment';
import { EnrollmentsService } from 'src/app/services/filterables/concrete-data/enrollments/enrollments.service';
import { getEnrollment } from 'src/app/store/enrollments/enrollments.actions';
import { selectEnrollment } from 'src/app/store/enrollments/enrollments.selectors';

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
      private store: Store,
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
      this.store.dispatch(getEnrollment(id));
      this.enrollment$ = this.store.select(selectEnrollment).subscribe(enrollment => {
        this.enrollment = enrollment;
      });
    }
}
