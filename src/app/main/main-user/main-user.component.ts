import { User } from './../models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from './../services/main.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-user',
  templateUrl: './main-user.component.html'
})
export class MainUserComponent implements OnInit {

  user: User;

  constructor(
    private mainService: MainService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {

  }

}
