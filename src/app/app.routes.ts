import { Routes } from '@angular/router';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { ProductUploadComponent } from './upload-product/upload-product.component';
import { ProductEditComponent } from './product-edit/product-edit.component';

export const routes: Routes = [
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',component:HomeComponent},
    {path:'products',component:ProductsListComponent},
    {path:'cart', component:CartComponent},
    {path:'login', component:LoginComponent},
    {path:'register', component:RegisterComponent},
    {path:'profile', component:ProfileComponent},
    {path:'products/upload', component:ProductUploadComponent},
    {path:'products/edit/:id', component:ProductEditComponent},
    {path:'products/:id',component:ProductDetailsComponent},
    {path:'**',component:NotFoundComponent}
];
