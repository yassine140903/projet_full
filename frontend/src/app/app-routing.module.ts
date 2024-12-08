import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductPageComponent } from './product/product.component';
import { ProfileComponent } from './profile/profile.component';
import { ArticleComponent } from './article/article.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { AddArticleComponent } from './add-article/add-article.component';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { MyhomeComponent } from './myhome/myhome.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ChangePwdComponent } from './change-pwd/change-pwd.component';

const routes: Routes = [
  {path : '', component: MyhomeComponent},
  {path : 'login', component: LoginComponent},
  {path : 'signup', component: SignupComponent},
  { path: 'article', component: ArticleComponent},
  { path: 'list', component: ArticleListComponent},
  {path : 'product/:articleId', component: ProductPageComponent},
  { path: 'profile/:userId', component: ProfileComponent },
  {path : 'xhome', component: AppComponent},
  {path : 'about', component: AboutComponent},
  {path : 'contact', component: ContactComponent},
  {path : 'addArticle', component: AddArticleComponent},
  {path : 'editProfile', component: EditProfileComponent},
  {path : 'changePwd', component: ChangePwdComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
