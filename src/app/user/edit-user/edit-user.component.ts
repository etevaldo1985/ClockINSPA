import { Type } from './../../config-user/models/type';
import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef, Input } from '@angular/core';
import { FormControlName, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/utils/generic-form-validation';
import { LocalStorageUtils } from 'src/app/utils/localstorageutils';
import { Group } from 'src/app/config-user/models/group';
import { User } from 'src/app/main/models/user';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfigUserService } from 'src/app/config-user/services/config-user.service';
import { CustomValidators } from 'ng2-validation';
import { Observable, fromEvent, merge } from 'rxjs';
import { Position } from 'src/app/config-user/models/position';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html'
})
export class EditUserComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef}) formInputElements: ElementRef[];

  displayMessage: DisplayMessage = {};
  genericValidator: GenericValidator;
  validationMessages: ValidationMessages;

  localStorage = new LocalStorageUtils();

 userForm: FormGroup;
 position: Position;
 type: Type;
 group: Group;


 @Input()
  user: User;
  errors: any[] = [];


  constructor(private fb: FormBuilder,
              private userService: UserService,
              private toastr: ToastrService,
              private router: Router,
              private configUserService: ConfigUserService,
              private route: ActivatedRoute) {

                this.validationMessages = {

                  name: {
                    required: 'Please, fill up the name.'
                 },
                 email: {
                  required: 'Please, fill up email.',
                  email: 'Incorret email format'
               },
               password: {
                required: 'Please, fill up the password',
                rangeLength: 'The pass must contain between 6 and 15 caractheres'
              },
              passConfirm: {
                required: 'Please, fill up the password confirmation',
                rangeLength: 'The pass must contain between 6 and 15 caractheres',
                equalTo: 'The pass does not match'
              },
              type: {
                required: 'Please, choose the type.'
             },
             position: {
              required: 'Please, choose the position.'
           },
           group: {
            required: 'Please, choose the group.'
         },
                };
                this.genericValidator = new GenericValidator(this.validationMessages);
              }


  ngOnInit(): void {

    const pass = new FormControl('', [Validators.required, CustomValidators.rangeLength([6, 15])]);
    // tslint:disable-next-line: max-line-length
    const passConfirmation = new FormControl('', [Validators.required, CustomValidators.rangeLength([6, 15]), CustomValidators.equalTo(pass)]);

    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: pass,
      passConfirm: passConfirmation,
      type: ['', Validators.required],
      position: ['', Validators.required],
      group: ['', Validators.required],
      active: ['', Validators.required],
      code: ['', Validators.required]
    });

    this.configUserService.getPosition()
    .subscribe(
      position => {
        this.position = position;
      },
      error => console.log(error));
    this.configUserService.getGroup()
    .subscribe(
      group => {
        this.group = group;
      },
      error => console.log(error));
    this.configUserService.getTypes()
    .subscribe(
      type => {
        this.type = type;
      },
      error => console.log(error));

    this.route.params.subscribe(
        params => {
          this.userService.getUserById(params.id)
          .subscribe(
            user => {

              this.user = user;
              this.fillUpForm();

              },
              error => console.log(error));
        }
      );






  }

  ngAfterViewInit(): void {
    const controlBlurs: Observable<any>[] = this.formInputElements
    .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs)
    .subscribe(() => {
      this.displayMessage = this.genericValidator.processMessages(this.userForm);
    });
      }

      updateUser() {

        this.user = Object.assign({}, this.user, this.userForm.value);

        this.userService.updateUser(this.user)
        .subscribe(
          success => {this.processSuccess(success); },
          fail => {this.processFail(fail); }
        );

      }

      fillUpForm() {

        this.userForm.patchValue({
          id: this.user.id,
          name: this.user.name,
          email: this.user.email,
          password: this.user.password,
          passConfirm: this.user.passConfirm,
          type: this.user.type,
          group: this.user.group,
          position: this.user.position,
          active: this.user.active,
          code: this.user.code
        });
  }

      processSuccess(response: any) {
        this.errors = [];

        const toast = this.toastr.success('User Updated succesfully', 'Good Job!', {timeOut: 1000});
        if (toast){
          toast.onHidden.subscribe(() => {
            this.router.navigate(['/user-list']);
          });
        }

    }

    processFail(fail: any) {
      this.errors = fail.error.errors;
      this.toastr.error('Something went wrong', 'Ops!', {timeOut: 2000});

    }


}
