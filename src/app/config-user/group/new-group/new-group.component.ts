import { Group } from './../../models/group';
import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef, Type } from '@angular/core';
import { FormControlName, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/utils/generic-form-validation';
import { LocalStorageUtils } from 'src/app/utils/localstorageutils';
import { ConfigUserService } from '../../services/config-user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Observable, fromEvent, merge } from 'rxjs';

@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html'
})
export class NewGroupComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef}) formInputElements: ElementRef[];

  displayMessage: DisplayMessage = {};
  genericValidator: GenericValidator;
  validationMessages: ValidationMessages;

  localStorage = new LocalStorageUtils();

  groupForm: FormGroup;
  group: Group;
  errors: any[] = [];

  constructor(private fb: FormBuilder,
              private configUserService: ConfigUserService,
              private toastr: ToastrService,
              private router: Router) {

                this.validationMessages = {

                  name: {
                    required: 'Please, fill up the name.'
                 },
                };
                this.genericValidator = new GenericValidator(this.validationMessages);
              }


  ngOnInit(): void {

    this.groupForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngAfterViewInit(): void {
    const controlBlurs: Observable<any>[] = this.formInputElements
    .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs)
    .subscribe(() => {
      this.displayMessage = this.genericValidator.processMessages(this.groupForm);
    });
      }

      saveGroup() {

        this.group = Object.assign({}, this.group, this.groupForm.value);

        this.configUserService.saveGroup(this.group)
        .subscribe(
          success => {this.processSuccess(success); },
          fail => {this.processFail(fail); }
        );

      }

      processSuccess(response: any) {
        this.errors = [];
        const toast = this.toastr.success('New Group registered succesfully', 'Good Job!', {timeOut: 1000});
        if (toast){
          toast.onHidden.subscribe(() => {
            this.router.navigate(['/group']);
          });
        }

    }

    processFail(fail: any) {
      this.errors = fail.error.errors;
      this.toastr.error('Something went wrong', 'Ops!', {timeOut: 2000});

    }


}
