import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'order'
})
export class OrderPipe implements PipeTransform {

  transform(value: Array<any>, args?: any): any {
    return value.sort((a, b) => {
      let x = a.datum;
      let y = b.datum;

      if (x > y) {
        return -1;
      } else {
        return 1;
      }
    });
  }
}
