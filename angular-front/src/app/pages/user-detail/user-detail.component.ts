import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart } from 'chart.js';
import { Subscription } from 'rxjs';
import User from 'src/app/interfaces/user';
import { FullNamePipe } from 'src/app/pipes/users/full-name/full-name.pipe';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {
    public id: User['id'] | null = null;
    private users$!: Subscription;
    public user: User | null = null;
  
    constructor(
      private route: ActivatedRoute,
      private router: Router, 
      private usersService: UsersService,
      private fullNamePipe: FullNamePipe,
    ) { }
  
    ngOnInit(): void {
      this.id = this.route.snapshot.paramMap.get('id');
      if (this.id != undefined) {
        this.initializeSecondaryServices(this.id);
      }
    }
  
    ngOnDestroy(): void {
      this.users$.unsubscribe();
    }
  
    private initializeSecondaryServices(id: User['id']) {
      this.users$ = this.usersService.getById(id).subscribe(user => {
        this.user = user;
      });
    }
  
    public getCardsData(user?: User): { title: string, icon: string, value: string }[] {
      if (user === undefined) return [];
      return [
              {title: 'Créditos obtenidos', icon: 'military_tech', value: String(99)},
          ]
    }
  
    public getMainSectionData(user?: User): { title: string, pictureUrl: string, description: string } {
      if (user === undefined) return { title: '', pictureUrl: '', description: '' };
      const userName = this.fullNamePipe.transform(user);
      return ({title: userName, pictureUrl: user.pictureUrl ?? '', description: `Realizando la carrera de ${user?.email}`});
    }
  
    public getChartSectionData(user?: User): { title: string, icon: string, description: string } {
      if (user === undefined) return { title: '', icon: '', description: '' };
      return ({title: 'Estadísticas', icon: 'equalizer', description: 'Estadísticas de inscripciones'});
    }
  
    public getChartData(user?: User): { label: string, datasetLabels: string[], datasets: number[] } {
      if (user === undefined) return { label: '', datasetLabels: [], datasets: [] };
      return ({label: 'Notas de estudiante', datasetLabels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], datasets: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]});
    }
  
    public getEnrollmentSectionData(user?: User): { title: string, icon: string, description: string } {
      if (user === undefined) return { title: '', icon: '', description: '' };
      return ({title: 'Cursos', icon: 'web_asset', description: 'Cursos del estudiante'});
    }
  
    public getEnrollmentData(user?: User): { id: string, icon: string, title: string, description: string }[] {
      if (user === undefined) return [];
      return []
	//   this.users$.get.map(course => {
    //     return {
    //       id: course.id,
    //       icon: course.icon,
    //       title: course.name,
    //       description: course.description
    //     }
    //   });
    }
  
    public getEnrollmentSeeMoreAction(): () => void {
      return () => {
        this.router.navigate([`/layout/courses`]);
      }
    }

	public getDoughnutSectionData(user?: User): { title: string, icon: string, description: string } {
		if (user === undefined) return { title: '', icon: '', description: '' };
		return ({title: 'Estadísticas', icon: 'equalizer', description: 'Estadísticas de inscripciones'});
	}

	public getEnrollmentSeeDetailAction(): () => void {
		return () => {
			this.router.navigate([`/layout/courses`]);
		}
	}

	public getDoughnutData(user?: User): { label: string, datasetLabels: string[], datasets: number[] } {
		if (user === undefined) return { label: '', datasetLabels: [], datasets: [] };
		return ({label: 'Notas de estudiante', datasetLabels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], datasets: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]});
	}
  }