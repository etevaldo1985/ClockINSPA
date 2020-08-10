import { User } from './../models/user';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from './../services/main.service';
import { Component, OnInit } from '@angular/core';
import { LocalStorageUtils } from 'src/app/utils/localstorageutils';

@Component({
  selector: 'app-main-user',
  templateUrl: './main-user.component.html'
})
export class MainUserComponent implements OnInit {

  user: User;
  localStorageUtils = new LocalStorageUtils();
  id: any;

  constructor(
    private mainService: MainService,
    private router: Router,
    private route: ActivatedRoute
    ) { }


  ngOnInit(): void {
this.id = this.localStorageUtils.getUser();


  }

}
