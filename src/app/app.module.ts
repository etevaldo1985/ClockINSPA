import { ClockModule } from './Clock/clock.module';
import { UserModule } from './user/user.module';
import { ConfigUserRoutingModule } from './config-user/config-user.route';
import { ConfigUserModule } from './config-user/config-user.module';
import { MainRoutingModule } from './main/main.route';
import { MainModule } from './main/main.module';
import { ToastrModule } from 'ngx-toastr';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CustomFormsModule } from 'ng2-validation';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './navigation/menu/menu.component';
import { HomeComponent } from './navigation/home/home.component';
import { FooterComponent } from './navigation/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeService } from './navigation/home/services/home.service';
import { UserRoutingModule } from './user/user.route';




@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    FooterComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AppRoutingModule,
    CustomFormsModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    MainModule,
    MainRoutingModule,
    ConfigUserModule,
    ConfigUserRoutingModule,
    UserModule,
    UserRoutingModule,
    ClockModule
  ],
  providers: [HomeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
