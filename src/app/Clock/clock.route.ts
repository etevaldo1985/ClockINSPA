import { ClockManualComponent } from './clock-manual/clock-manual.component';
import { ClockScreenComponent } from './clock-screen/clock-screen.component';

import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ClockAppComponent } from './clock.app.component';


const clockRoutingConfig: Routes = [
  {path: '', component: ClockAppComponent,
children: [
  {path: 'clock-screen/:id', component: ClockScreenComponent},
  {path: 'clock-manual', component: ClockManualComponent}
]}
];

@NgModule({
  imports: [RouterModule.forChild(clockRoutingConfig)],
  exports: [RouterModule]
})
export class ClockRoutingModule {}
