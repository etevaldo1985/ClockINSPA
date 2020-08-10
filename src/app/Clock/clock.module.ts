import { ClockRoutingModule } from './clock.route';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ClockAppComponent } from './clock.app.component';
import { ClockScreenComponent } from './clock-screen/clock-screen.component';
import { ClockService } from './service/clock.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClockManualComponent } from './clock-manual/clock-manual.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule, IConfig } from 'ngx-mask';





@NgModule({
  declarations: [
    ClockAppComponent,
    ClockScreenComponent,
    ClockManualComponent

  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ClockRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxMaskModule.forRoot()
  ],
  providers: [ClockService],
  exports: []
})
export class ClockModule {}
