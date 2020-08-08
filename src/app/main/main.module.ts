import { MainRoutingModule } from './main.route';
import { MainAppComponent } from './main.app.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MainService } from './services/main.service';

import { MainUserComponent } from './main-user/main-user.component';
import { fromEventPattern } from 'rxjs';


@NgModule({
  declarations: [
    MainUserComponent,
    MainAppComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MainRoutingModule
  ],
  providers: [MainService],
  exports: []
})
export class MainModule {}
