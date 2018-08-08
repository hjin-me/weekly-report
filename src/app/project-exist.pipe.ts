import { Pipe, PipeTransform } from '@angular/core';
import { Work } from './project';

@Pipe({
  name: 'projectExist'
})
export class ProjectExistPipe implements PipeTransform {
  transform(id: string, works: Work[]): boolean {
    return works.findIndex(w => w.project === id) > -1;
  }
}
