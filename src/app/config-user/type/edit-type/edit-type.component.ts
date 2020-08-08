import { Type } from './../../models/type';
import { Component, OnInit, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { FormControlName, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/utils/generic-form-validation';
import { LocalStorageUtils } from 'src/app/utils/localstorageutils';
import { ConfigUserService } from '../../services/config-user.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, fromEvent, merge } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-type',
  templateUrl: './edit-type.component.html'
})
export class EditTypeComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef}) formInputElements: ElementRef[];

  displayMessage: DisplayMessage = {};
  genericValidator: GenericValidator;
  validationMessages: ValidationMessages;

  localStorage = new LocalStorageUtils();

  typeForm: FormGroup;
  type: Type;
  errors: any[] = [];

  constructor(private fb: FormBuilder,
              private configUserService: ConfigUserService,
              private toastr: ToastrService,
              private router: Router,
              private route: ActivatedRoute,
              private modalService: NgbModal) {

                this.validationMessages = {

                  name: {
                    required: 'Please, fill up the name.'
                 },
                };
                this.genericValidator = new GenericValidator(this.validationMessages);
              }


  ngOnInit(): void {

    this.typeForm = this.fb.group({
      name: ['', Validators.required]
    });

    this.route.params.subscribe(
      params => {
        this.configUserService.getTypeById(params.id)
        .subscribe(
          type => {

            this.type = type;
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
      this.displayMessage = this.genericValidator.processMessages(this.typeForm);
    });
      }


      processSuccess(response: any) {
        this.errors = [];
        const toast = this.toastr.success('New Type registered succesfully', 'Good Job!', {timeOut: 1000});
        if (toast){
          toast.onHidden.subscribe(() => {
            this.router.navigate(['/type']);
          });
        }

    }

    processFail(fail: any) {
      this.errors = fail.error.errors;
      this.toastr.error('Something went wrong', 'Ops!', {timeOut: 2000});

    }

    fillUpForm() {

      this.typeForm.patchValue({
        id: this.type.id,
        name: this.type.name
      });
}

updateType() {

  this.type = Object.assign({}, this.type, this.typeForm.value);

  this.configUserService.updateType(this.type)
  .subscribe(
    success => {this.processSuccess(success); },
    fail => {this.processFail(fail); }
  );

}
}
