import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './shared/interfaces/product';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products: Product[], terms: string): Product[] {

    let filteredValues = products.filter((product) => product.title.toLowerCase().includes(terms.toLowerCase()));

    if (!filteredValues || filteredValues.length === 0) {
      return [];
    } else {
      return filteredValues
    }

  }

}
