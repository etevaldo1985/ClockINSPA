import { Type } from './../models/type';
import { ConfigUserService } from './../services/config-user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html'
})
export class TypeComponent implements OnInit {

  type: Type;
  check = false;
  id: number;

  constructor(private configUserService: ConfigUserService) { }

  ngOnInit(): void {

      this.configUserService.getTypes()
      .subscribe(
        type => {
          this.type = type;
        },
        error => console.log(error));

  }

  checkedBox(id: number) {
    this.check = !this.check;
    this.id = id;
  }

}
