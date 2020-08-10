import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef, Input } from '@angular/core';
import { FormControlName, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/utils/generic-form-validation';
import { LocalStorageUtils } from 'src/app/utils/localstorageutils';
import { Login } from '../models/login';
import { User } from 'src/app/main/models/user';
import { ClockService } from '../service/clock.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ConfigUserService } from 'src/app/config-user/services/config-user.service';
import { CustomValidators } from 'ng2-validation';
import { Observable, fromEvent, merge } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-clock-manual',
  templateUrl: './clock-manual.component.html'
})
export class ClockManualComponent implements OnInit, AfterViewInit {

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
              },
              loginTime: {
                required: 'Please, fill up Login Time.'
             },
             logoutTime: {
              required: 'Please, fill up Logout Time.'
           },
           date: {
            required: 'Please, fill up Date.'
         }
                };
                this.genericValidator = new GenericValidator(this.validationMessages);
              }


  ngOnInit(): void {

    this.userForm = this.fb.group({
      loginTime: ['', Validators.required],
      logoutTime: ['', Validators.required],
      date: ['', Validators.required],

      user: this.fb.group({
        code: ['', Validators.required],
        password: ['', [Validators.required, CustomValidators.rangeLength([6, 15])]],
      })
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



      saveUserLogin() {

        this.login = Object.assign({}, this.login, this.userForm.value);

        console.log(this.login);
        this.clockService.getUsers()
        .subscribe(
          user => {
            this.userL = user;


            const found = user.filter(users => users.code === this.login.user.code && users.password === this.login.user.password);
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
                  const logged = login.filter(logins => logins.loginTime !== null && logins.logoutTime === null && logins.user.code === this.login.user.code);

                  if ( logged.length === 1) {
                    console.log('User is already logged in');
                    this.toastr.error('User is already logged in', 'Ops!!!');
                  }else {

                    console.log(found[0].id);

                    const year = this.login.date.slice(0, 4);
                    const mont = this.login.date.slice(4, 6);
                    const day = this.login.date.slice(6, 8);

                    const slc = this.login.loginTime.slice(0, 2);
                    const slc2 = this.login.loginTime.slice(2, 4);
                    const hour = moment(year + '-' + mont + '-' + day + ' ' + slc + ':' + slc2 + ':00');


                    const slc3 = this.login.logoutTime.slice(0, 2);
                    const slc4 = this.login.logoutTime.slice(2, 4);
                    const hour2 = moment(year + '-' + mont + '-' + day + ' ' + slc3 + ':' + slc4 + ':00');


                    this.login.loginTime = moment(hour).format('YYYY-MM-DD HH:mm:ss');
                    this.login.logoutTime = moment(hour2).format('YYYY-MM-DD HH:mm:ss');

                    const end = moment(this.login.logoutTime);
                    const start = moment(this.login.loginTime);

                    console.log(hour);
                    console.log(hour2);

                    const dif = moment.duration(end.diff(start));
                    this.login.totalTime = dif.asMinutes();
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
