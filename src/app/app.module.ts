import { AuthService } from './services/auth.service';
import { NavComponent } from './components/nav/nav.component';
import { HomeModule } from './components/home/home.module';
import {FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NoPageComponent } from './components/no-page/no-page.component';
import { FooterComponent } from './components/footer/footer.component';

import { routes } from './app.router';
import { AuthGuard } from './guards/auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { ChangePassComponent } from './components/change-pass/change-pass.component';


@NgModule({
  declarations: [NavComponent,
    AppComponent,
    LoginComponent,
    HomeComponent,
    NoPageComponent,
    FooterComponent,
    ChangePassComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes, {useHash: true})
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
