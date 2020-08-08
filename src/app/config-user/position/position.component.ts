import { Position } from './../models/position';
import { Component, OnInit } from '@angular/core';
import { ConfigUserService } from '../services/config-user.service';


@Component({
  selector: 'app-position',
  templateUrl: './position.component.html'
})
export class PositionComponent implements OnInit {

  check = false;
  id: number;

  position: Position;

  constructor(private configUserService: ConfigUserService) { }

  ngOnInit(): void {

    this.configUserService.getPosition()
      .subscribe(
        position => {
          this.position = position;
        },
        error => console.log(error));

  }

  checkedBox(id: number) {
    this.check = !this.check;
    this.id = id;
  }


}
