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
import { PostArticleComponent } from './post-article/post-article.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { AddArticleComponent } from './add-article/add-article.component';
import { SignupComponent } from './signup/signup.component';
import { MyhomeComponent } from './myhome/myhome.component';
import {
  HttpClientModule,
  provideHttpClient,
  withFetch,
} from '@angular/common/http';
import { ProductPageComponent } from './product/product.component';
import { FilterComponent } from './filter/filter.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ArticleComponent,
    ProductPageComponent,
    ArticleListComponent,
    NavBarComponent,
    FooterComponent,
    PostArticleComponent,
    ProfileComponent,

    AboutComponent,
    ContactComponent,
    AddArticleComponent,
    SignupComponent,
    MyhomeComponent,
    FilterComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [provideClientHydration(), provideHttpClient(withFetch())],
  bootstrap: [AppComponent],
})
export class AppModule {}
