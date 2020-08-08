import { DeleteUserComponent } from './delete-user/delete-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { NewUserComponent } from './new-user/new-user.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UserAppComponent } from './user.app.component';
import { UserRoutingModule } from './user.route';
import { UserListComponent } from './user-list/user-list.component';
import { UserService } from './services/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    NewUserComponent,
    EditUserComponent,
    DeleteUserComponent,
    UserAppComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [UserService],
  exports: []
})
export class UserModule {}
