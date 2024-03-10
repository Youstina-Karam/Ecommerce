import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductDataService } from 'src/app/shared/services/product-data.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  allProductData:any[]=[]
  categoriesData: any[] = []
  subCategoryData: any[] = []
  showSubCat: boolean = false
  showProduct:boolean =false;
  showCat:boolean=true

  constructor(private productDataService: ProductDataService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.productDataService.getCategories().subscribe({
      next: (res) => {
        this.categoriesData = res.data
      }
    })

    this.getAllProductData()
  }

  showSubCategory(categoryId: string): void {
    this.subCategoryData = []
    this.productDataService.getSubCategories(categoryId).subscribe({
      next: (res) => {
        if (res.results !== 0) {
          this.showSubCat = true
          this.showCat= false
          this.showProduct =false;
          this.subCategoryData = res.data
        } else {
          this.toastr.warning("This category not have subCategory")
        }
      }
    })
  }
 
  showProductData(subId:string):void{
    this.getAllProductData()
    this.allProductData =this.allProductData.filter((product) =>{
     return product.subcategory[0]._id == subId
    } 
    );
    if(this.allProductData.length !== 0){
      this.showSubCat =false;
      this.showCat= false
      this.showProduct =true;
    }else{
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
