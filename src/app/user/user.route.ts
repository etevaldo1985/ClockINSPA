import { DeleteUserComponent } from './delete-user/delete-user.component';
import { NewUserComponent } from './new-user/new-user.component';
import { UserListComponent } from './user-list/user-list.component';



import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { UserAppComponent } from './user.app.component';
import { EditUserComponent } from './edit-user/edit-user.component';


const userRoutingConfig: Routes = [
  {path: '', component: UserAppComponent,
children: [
  {path: 'user-list', component: UserListComponent},
  {path: 'new-user', component: NewUserComponent},
  {path: 'edit-user/:id', component: EditUserComponent},
  {path: 'delete-user/:id', component: DeleteUserComponent}
]}
];

@NgModule({
  imports: [RouterModule.forChild(userRoutingConfig)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
