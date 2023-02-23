import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
              {title: 'Perfil', icon: 'military_tech', value: user.profile},
          ]
    }
  
    public getMainSectionData(user?: User | null): { title: string, icon: string, description: string } {
      if (user === undefined || user == null) return { title: '', icon: '', description: '' };
      const userName = this.fullNamePipe.transform(user);
      const firstProfileChar = user.profile.charAt(0).toUpperCase();
      return ({title: userName, icon: 'person', description: `Con el perfil de ${firstProfileChar}${user.profile.slice(1)}`});
    }
    
    public getGeneralInfoSectionData(user?: User | null): { title: string, icon: string, description: string } {
      if (user === undefined || user == null) return { title: '', icon: '', description: '' };
      return ({title: 'Información adicional', icon: 'info', description: `Información adicional`});
    }

    public getGeneralInfoData(user?: User | null): { icon: string, title: string, description: string }[] {
      if (user === undefined || user == null) return [];
        return [
          {icon: 'school', title: 'Nombre de usuario', description: user.name},
          {icon: 'school', title: 'Apellido paterno', description: user.surname},
          {icon: 'school', title: 'Correo electrónico', description: user.email},
          {icon: 'school', title: 'Perfil', description: user.profile},
          {icon: 'school', title: 'Teléfono', description: user?.phone ?? 'No especificado'},
          {icon: 'school', title: 'Dirección', description: user?.direction ?? 'No especificado'},
          {icon: 'school', title: 'Dirección', description: user?.direction ?? 'No especificado'},  
          
        ]
    }
  }