
import { PositionComponent } from './position/position.component';
import { TypeComponent } from './type/type.component';
import { NgModule } from '@angular/core';
import { ConfigUserService } from './services/config-user.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ConfigUserRoutingModule } from './config-user.route';
import { ConfigUserAppComponent } from './config-user.app.component';
import { GroupComponent } from './group/group.component';
import { NewTypeComponent } from './type/new-type/new-type.component';
import { EditTypeComponent } from './type/edit-type/edit-type.component';
import { DeleteTypeComponent } from './type/delete-type/delete-type.component';
import { NewPositionComponent } from './position/new-position/new-position.component';
import { EditPositionComponent } from './position/edit-position/edit-position.component';
import { DeletePositionComponent } from './position/delete-position/delete-position.component';
import { NewGroupComponent } from './group/new-group/new-group.component';
import { EditGroupComponent } from './group/edit-group/edit-group.component';
import { DeleteGroupComponent } from './group/delete-group/delete-group.component';



@NgModule({
  declarations: [
    TypeComponent,
    PositionComponent,
    ConfigUserAppComponent,
    GroupComponent,
    NewTypeComponent,
    EditTypeComponent,
    DeleteTypeComponent,
    NewPositionComponent,
    EditPositionComponent,
    DeletePositionComponent,
    NewGroupComponent,
    EditGroupComponent,
    DeleteGroupComponent


  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ConfigUserRoutingModule
  ],
  providers: [ConfigUserService],
  exports: []
})
export class ConfigUserModule {}
