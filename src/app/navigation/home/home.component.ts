import { User } from './../../main/models/user';
import { HomeService } from './services/home.service';
import { Component, OnInit, ViewChildren, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { FormControlName, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/utils/generic-form-validation';
import { CustomValidators } from 'ng2-validation';
import { Observable } from 'rxjs/internal/Observable';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { merge } from 'rxjs/internal/observable/merge';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LocalStorageUtils } from 'src/app/utils/localstorageutils';







@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef}) formInputElements: ElementRef[];




  displayMessage: DisplayMessage = {};
  genericValidator: GenericValidator;
  validationMessages: ValidationMessages;


  token = '';
  userL: any;
  email = '';
  localStorageUtils = new LocalStorageUtils();



  user: User[];
  loginUser: User;
  errors: any[] = [];

  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private homeService: HomeService,
              private toastr: ToastrService,
              private router: Router) {
    this.validationMessages = {


      email: {
        required: 'Please, fill up the email.',
        email: 'not a valid email'
      },
      password: {
        required: 'Please, fill up the password',
        rangeLength: 'The pass must contain between 6 and 15 caractheres'
     }

   };
    this.genericValidator = new GenericValidator(this.validationMessages);
 }


ngOnInit(): void {

  this.loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, CustomValidators.rangeLength([6, 15])]]
  });
  }

  ngAfterViewInit(): void {
    const controlBlurs: Observable<any>[] = this.formInputElements
    .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs)
    .subscribe(() => {
      this.displayMessage = this.genericValidator.processMessages(this.loginForm);
    });
      }



      login() {
        this.loginUser = Object.assign({}, this.loginUser, this.loginForm.value);


        this.homeService.getUsers()
        .subscribe(
          user => {
            this.user = user;
            console.log(user);
            const found = user.filter(users => users.email === this.loginUser.email && users.password === this.loginUser.password );
            console.log(found);
            if ( found.length === 0 ){
              console.log('User not registered or password incorrect');
              this.toastr.error('User not registered or password incorrect', 'Ops!!!');
            }else {

                this.homeService.localStorage.saveToken(this.loginUser.email);
                const id = found[0].id;
                this.homeService.localStorage.saveUser(id.toString());
                const toast = this.toastr.success('Client logged in succesfully', 'Good Job!', { timeOut: 1000 });

                if (toast){
                toast.onHidden.subscribe(() => {

                  this.router.navigate(['/main/main-user']);
                });
              }
            }
          }
        );

      }

      userLogged() {

        this.token = this.localStorageUtils.getUserToken();
        this.userL = this.localStorageUtils.getUser();

        if (this.userL) {
      this.email = this.userL.email;
        }

        return this.token !== null;

      }


}
