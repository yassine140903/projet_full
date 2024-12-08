import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ArticleComponent } from './article/article.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { AddArticleComponent } from './add-article/add-article.component';
import { SignupComponent } from './signup/signup.component';
import { MyhomeComponent } from './myhome/myhome.component';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import { ProductPageComponent } from './product/product.component';
import { FilterComponent } from './filter/filter.component';
import { AuthInterceptor } from './auth.interceptor'; // Import the interceptor
import { HerosectionComponent } from './herosection/herosection.component';
import { AdminComponent } from './admin/admin.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ChangePwdComponent } from './change-pwd/change-pwd.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ArticleComponent,
    ProductPageComponent,
    ArticleListComponent,
    NavBarComponent,
    FooterComponent,
    ProfileComponent,

    AboutComponent,
    ContactComponent,
    AddArticleComponent,
    SignupComponent,
    MyhomeComponent,
    FilterComponent,
    HerosectionComponent,
    AdminComponent,
    EditProfileComponent,
    ChangePwdComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [provideClientHydration(),
     provideHttpClient(withFetch()),
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,  // Register the AuthInterceptor globally
        multi: true,  // Allow multiple interceptors to be used
      },
    ],
  bootstrap: [AppComponent],
})
export class AppModule {}
