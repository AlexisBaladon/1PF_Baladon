import { Pipe, PipeTransform } from '@angular/core';
import User from 'src/app/interfaces/user';

@Pipe({
  name: 'fullName',
  pure: false
})
export class FullNamePipe implements PipeTransform {

  transform(user: {name: string, surname: string}): string {
    return `${user.name} ${user.surname}`;
  }

}
