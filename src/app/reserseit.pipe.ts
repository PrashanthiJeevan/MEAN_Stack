import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reserseit'
})
export class ReserseitPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) {
      return value.reverse();
    }
  }

}
