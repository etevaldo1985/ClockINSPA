import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LocalStorageUtils } from 'src/app/utils/localstorageutils';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

public isCollapsed: boolean;

localStorage = new LocalStorageUtils();
token = '';
  user: any;
  email = '';

  constructor(
    private router: Router
  ) {

    this.isCollapsed = true;
  }

  ngOnInit(): void {
  }

  checkUSerLogged(){
    this.user = this.localStorage.getUserToken();

    if (this.user) {
      this.email = this.user;
    }
    return this.user != null;

  }

  logOut() {
    this.localStorage.cleanLocalDataUser();
    this.router.navigate(['home']);
  }

}
