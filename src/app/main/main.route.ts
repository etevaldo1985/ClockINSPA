

import { MainUserComponent } from './main-user/main-user.component';
import { MainAppComponent } from './main.app.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


const mainRoutingConfig: Routes = [
  {path: '', component: MainAppComponent,
children: [
  {path: 'main-user', component: MainUserComponent},
  {path: 'config',
loadChildren: () => import('../config-user/config-user.module')
.then(m => m.ConfigUserModule)},
{path: 'clock',
loadChildren: () => import('../Clock/clock.module')
.then(m => m.ClockModule)}
]}
];

@NgModule({
  imports: [RouterModule.forChild(mainRoutingConfig)],
  exports: [RouterModule]
})
export class MainRoutingModule {}
