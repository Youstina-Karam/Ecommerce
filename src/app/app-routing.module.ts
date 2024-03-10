import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { authGuard } from './shared/guards/auth.guard';
import { DetailsComponent } from './components/details/details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { AuthComponent } from './components/auth/auth.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  {
    path: '', component: BlankLayoutComponent,
    canActivate:[authGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'cart', component: CartComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'brands', component: BrandsComponent },
      { path: 'wishList', component: WishlistComponent },
      { path: 'details/:id', component: DetailsComponent },
      { path: 'checkout/:id', component: CheckoutComponent },
      { path: 'allorders', component: AllordersComponent },
      { path: 'profile', component: ProfileComponent },
    ]
  },
  {
    path:'auth', component:AuthComponent,
    loadChildren:()=> import('./components/auth/auth.module').then((m)=>m.AuthModule)
  },
  { path: '404', component: NotfoundComponent },

  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
