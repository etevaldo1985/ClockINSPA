import { Group } from './../models/group';
import { Component, OnInit } from '@angular/core';
import { ConfigUserService } from '../services/config-user.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html'
})
export class GroupComponent implements OnInit {

  check = false;
  id: number;

  group: Group;

  constructor(private configUserService: ConfigUserService) { }

  ngOnInit(): void {

    this.configUserService.getGroup()
      .subscribe(
        group => {
          this.group = group;
        },
        error => console.log(error));

  }

  checkedBox(id: number) {
    this.check = !this.check;
    this.id = id;
  }

}
