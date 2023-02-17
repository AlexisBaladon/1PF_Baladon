import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Course } from 'src/app/interfaces/course';
import Student from 'src/app/interfaces/student';
import { CoursesService } from 'src/app/services/filterables/concrete-data/courses/courses.service';
import { StudentsService } from 'src/app/services/filterables/concrete-data/students/students.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent {
	constructor(private route: ActivatedRoute, private coursesService: CoursesService, private studentsService: StudentsService) { }
	private id: Course['id'] | null = null;
	private course$!: Subscription;
	private students$!: Subscription;
	public course: Course | undefined;
	public courseDetails = [];
	public courseStudents: Student[] = []

	ngOnInit(): void {
		this.id = this.route.snapshot.paramMap.get('id');
		if (this.id != undefined) {
			this.course$ = this.coursesService.getById(this.id).subscribe(course => {
				this.course = course;
			});
			this.students$ = this.studentsService.getFilteredData().subscribe(students => {
				if (this.course?.studentsId != undefined) {
					this.courseStudents = students.filter(student => this.course?.studentsId?.includes(student.id));
				}
			}
			);
		}

	}

	ngOnDestroy(): void {
		this.course$.unsubscribe();
		this.students$.unsubscribe();
	}


}
