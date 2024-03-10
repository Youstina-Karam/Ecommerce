import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { DetailsComponent } from './components/details/details.component';
import { NavbarBlankComponent } from './components/navbar-blank/navbar-blank.component';
import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ToastrModule } from 'ngx-toastr';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { MyhttpInterceptor } from './myhttp.interceptor';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { SharedModule } from './shared/shared.module';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CartComponent,
    ProductsComponent,
    BrandsComponent,
    CategoriesComponent,
    NotfoundComponent,
    DetailsComponent,
    NavbarBlankComponent,
    BlankLayoutComponent,
    CheckoutComponent,
    AllordersComponent,
    WishlistComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule,
    SharedModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS,useClass:MyhttpInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
