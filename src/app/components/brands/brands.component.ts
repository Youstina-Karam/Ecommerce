import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductDataService } from 'src/app/shared/services/product-data.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {
  brandsData: any[] = []
  allProductData: any[] = []
  showProduct: boolean = false;

  constructor(private productDataService: ProductDataService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.productDataService.getBrands().subscribe({
      next: (res) => {
        this.brandsData = res.data
      }
    })

    this.getAllProductData()
  }

  showProductData(brandId: string): void {
    this.getAllProductData()
    this.allProductData = this.allProductData.filter((product) => {
      return product.brand._id == brandId
    }
    );
    if (this.allProductData.length !== 0) {
      this.showProduct = true;
    } else {
      this.toastr.warning("No products to show");
    }
  }

  getAllProductData(){
    this.productDataService.getAllProduct().subscribe({
      next: (res) => {
        this.allProductData = res.data
      }
    })
  }
}
