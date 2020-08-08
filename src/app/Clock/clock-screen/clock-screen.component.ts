import { Login } from './../models/login';
import { ClockService } from './../service/clock.service';


import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef, Input } from '@angular/core';
import { FormControlName, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/utils/generic-form-validation';
import { LocalStorageUtils } from 'src/app/utils/localstorageutils';

import { User } from 'src/app/main/models/user';

import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ConfigUserService } from 'src/app/config-user/services/config-user.service';
import { CustomValidators } from 'ng2-validation';
import { Observable, fromEvent, merge } from 'rxjs';
import * as moment from 'moment';



@Component({
  selector: 'app-clock-screen',
  templateUrl: './clock-screen.component.html'
})
export class ClockScreenComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef}) formInputElements: ElementRef[];

  displayMessage: DisplayMessage = {};
  genericValidator: GenericValidator;
  validationMessages: ValidationMessages;

  localStorage = new LocalStorageUtils();

 userForm: FormGroup;
 login = new Login();

 loginL: Login[];
 @Input()
  user: User;
  userL: User[];
  errors: any[] = [];


  constructor(private fb: FormBuilder,
              private clockService: ClockService,
              private toastr: ToastrService,
              private router: Router,
              private configUserService: ConfigUserService) {

                this.validationMessages = {

                  code: {
                    required: 'Please, fill up the code.'
                 },
               password: {
                required: 'Please, fill up the password',
                rangeLength: 'The pass must contain between 6 and 15 caractheres'
              }
                };
                this.genericValidator = new GenericValidator(this.validationMessages);
              }


  ngOnInit(): void {

    this.userForm = this.fb.group({
      code: ['', Validators.required],
      password: ['', [Validators.required, CustomValidators.rangeLength([6, 15])]]
    });


  }

  ngAfterViewInit(): void {
    const controlBlurs: Observable<any>[] = this.formInputElements
    .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs)
    .subscribe(() => {
      this.displayMessage = this.genericValidator.processMessages(this.userForm);
    });
      }

      logOut() {
        this.user = Object.assign({}, this.user, this.userForm.value);

        this.clockService.getLogins()
        .subscribe(
          login => {
            this.loginL = login;

            // tslint:disable-next-line: max-line-length
            const found = login.filter(logins => logins.logoutTime === null && logins.user.code === this.user.code && logins.user.password === this.user.password);



            if ( found.length === 0 ){
              console.log('User not logged in or Password/code incorrect');
              this.toastr.error('User not logged in or Password/code incorrect', 'Ops!!!');
            }else{

              found[0].logoutTime = moment().format('LTS');

              const end = moment(found[0].logoutTime, 'LTS');

              console.log(found[0].logoutTime);
              const start = moment(found[0].loginTime, 'LTS');

              const dif = moment.duration(end.diff(start));
              found[0].totalTime = dif.asMinutes();
              this.clockService.logOut(found[0])
        .subscribe(
          success => {this.processSuccess(success); },
          fail => {this.processFail(fail); }
        );


            }
          }
        );


      }


      saveUserLogin() {

        this.user = Object.assign({}, this.user, this.userForm.value);


        this.clockService.getUsers()
        .subscribe(
          user => {
            this.userL = user;


            const found = user.filter(users => users.code === this.user.code && users.password === this.user.password);
            console.log(found);

            if ( found.length === 0 ){
              console.log('User not registered or password/code incorrect');
              this.toastr.error('User not registered or password/code incorrect', 'Ops!!!');
            }else {

              this.clockService.getLogins()
              .subscribe(
                login => {

                  this.loginL = login;

                  // tslint:disable-next-line: max-line-length
                  const logged = login.filter(logins => logins.loginTime !== null && logins.logoutTime === null && logins.user.code === this.user.code);

                  if ( logged.length === 1) {
                    console.log('User is already logged in');
                    this.toastr.error('User is already logged in', 'Ops!!!');
                  }else {

                    console.log(found[0].id);
                    this.login.loginTime = moment().format('LTS');
                    this.login.logoutTime = null;
                    this.login.totalTime = null;
                    this.login.user = found[0];

                    this.clockService.saveLogin(this.login)
        .subscribe(
          success => {this.processSuccess(success); },
          fail => {this.processFail(fail); }
        );

                  }
                }
              );



            }
          }
        );


      }

      processSuccess(response: any) {
        this.errors = [];

        const toast = this.toastr.success('User Logged in Successfully', 'Good Job!', {timeOut: 1000});
        if (toast){
          toast.onHidden.subscribe(() => {
            this.router.navigate(['/main-user']);
          });
        }

    }

    processFail(fail: any) {
      this.errors = fail.error.errors;
      this.toastr.error('Something went wrong', 'Ops!', {timeOut: 2000});

    }


}
