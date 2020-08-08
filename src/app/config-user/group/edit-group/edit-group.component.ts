import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';
import { FormControlName, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/utils/generic-form-validation';
import { LocalStorageUtils } from 'src/app/utils/localstorageutils';
import { Group } from '../../models/group';
import { ConfigUserService } from '../../services/config-user.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, fromEvent, merge } from 'rxjs';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html'
})
export class EditGroupComponent implements OnInit, AfterViewInit {

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
              private router: Router,
              private route: ActivatedRoute) {

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

    this.route.params.subscribe(
      params => {
        this.configUserService.getGroupById(params.id)
        .subscribe(
          group => {

            this.group = group;
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
      this.displayMessage = this.genericValidator.processMessages(this.groupForm);
    });
      }

      fillUpForm() {

        this.groupForm.patchValue({
          id: this.group.id,
          name: this.group.name
        });
  }

  updateGroup() {

    this.group = Object.assign({}, this.group, this.groupForm.value);

    this.configUserService.updateGroup(this.group)
    .subscribe(
      success => {this.processSuccess(success); },
      fail => {this.processFail(fail); }
    );

  }



      processSuccess(response: any) {
        this.errors = [];
        const toast = this.toastr.success('Group updated succesfully', 'Good Job!', {timeOut: 1000});
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
