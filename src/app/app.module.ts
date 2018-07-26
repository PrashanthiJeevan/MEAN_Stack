import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './product/product.component';
import { HomeComponent } from './home/home.component';
import {AuthService} from '../app/auth.service';
import{HttpClientModule} from'@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { ReserseitPipe } from './reserseit.pipe';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    NavigationComponent,
    ProductsComponent,
    ProductComponent,
    HomeComponent,
    ReserseitPipe
  ],
  imports: [
    BrowserModule,FormsModule,RouterModule.forRoot([ 
      {path:'home',component:HomeComponent},
      {path:'register',component:RegisterComponent},
      {path:'login',component:LoginComponent},{
        path:'products',component:ProductsComponent
      },{
        path:'product',component:ProductComponent
      },
      {path:'',redirectTo:"home",pathMatch:"full"},
      {path:"**",redirectTo:"home",pathMatch:"full"}

    ]),HttpClientModule
  ],
  providers: [AuthService,CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
