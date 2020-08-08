import { NewTypeComponent } from './type/new-type/new-type.component';
import { DeleteTypeComponent } from './type/delete-type/delete-type.component';
import { EditTypeComponent } from './type/edit-type/edit-type.component';
import { GroupComponent } from './group/group.component';
import { PositionComponent } from './position/position.component';
import { TypeComponent } from './type/type.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigUserAppComponent } from './config-user.app.component';
import { NewPositionComponent } from './position/new-position/new-position.component';
import { EditPositionComponent } from './position/edit-position/edit-position.component';
import { DeletePositionComponent } from './position/delete-position/delete-position.component';
import { NewGroupComponent } from './group/new-group/new-group.component';
import { EditGroupComponent } from './group/edit-group/edit-group.component';
import { DeleteGroupComponent } from './group/delete-group/delete-group.component';



const configUserRoutingConfig: Routes = [
  {path: '', component: ConfigUserAppComponent,
children: [
  {path: 'type', component: TypeComponent},
  {path: 'edit-type/:id', component: EditTypeComponent},
  {path: 'new-type', component: NewTypeComponent},
  {path: 'delete-type/:id', component: DeleteTypeComponent},
  {path: 'position', component: PositionComponent},
  {path: 'new-position', component: NewPositionComponent},
  {path: 'edit-position/:id', component: EditPositionComponent},
  {path: 'delete-position/:id', component: DeletePositionComponent},
  {path: 'group', component: GroupComponent},
  {path: 'new-group', component: NewGroupComponent},
  {path: 'edit-group/:id', component: EditGroupComponent},
  {path: 'delete-group/:id', component: DeleteGroupComponent}
]}

];

@NgModule({
  imports: [RouterModule.forChild(configUserRoutingConfig)],
  exports:  [RouterModule]
})
export class ConfigUserRoutingModule {}
