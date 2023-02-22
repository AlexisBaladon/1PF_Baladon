import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import User from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  private user$!: Subscription;
  public user!: User | null;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.user$ = this.authService.getUser().subscribe(user => {
      this.user = user;
    });
  }

  ngOnDestroy() {
    this.user$.unsubscribe();
  }

  private routeMap = new Map([
    ['students', 'Estudiantes'],
    ['student', 'Estudiantes'],
    ['courses', 'Cursos'],
    ['course', 'Cursos'],
    ['users', 'Usuarios'],
    ['enrollments', 'Inscripciones'],
  ]);

  public get currentRoute() {
    const currentRoute = this.router.url.split('/')[2];
    const currentRouteName = this.routeMap.get(currentRoute) || currentRoute;
    if (!currentRouteName) {
      return '';
    }
    const firstChar = currentRouteName.charAt(0).toUpperCase();
    return firstChar + currentRouteName.slice(1);
  }
}
