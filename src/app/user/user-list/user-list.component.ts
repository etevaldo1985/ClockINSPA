import { User } from './../../main/models/user';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit{

  user: User;
  check = false;
  id: number;

  constructor(private userService: UserService) { }

  ngOnInit(): void {

      this.userService.getUsers()
      .subscribe(
        user => {
          this.user = user;
        },
        error => console.log(error));

  }

  checkedBox(id: number) {
    this.check = !this.check;
    this.id = id;
  }

}
