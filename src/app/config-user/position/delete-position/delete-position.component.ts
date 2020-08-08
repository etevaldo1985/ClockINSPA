import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { FormControlName, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/utils/generic-form-validation';
import { LocalStorageUtils } from 'src/app/utils/localstorageutils';
import { ConfigUserService } from '../../services/config-user.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { fromEvent, merge } from 'rxjs';
import { Position } from '../../models/position';

@Component({
  selector: 'app-delete-position',
  templateUrl: './delete-position.component.html'
})
export class DeletePositionComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef}) formInputElements: ElementRef[];

  displayMessage: DisplayMessage = {};
  genericValidator: GenericValidator;
  validationMessages: ValidationMessages;

  localStorage = new LocalStorageUtils();

  positionForm: FormGroup;
  position: Position;
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

    this.positionForm = this.fb.group({
      name: ['', Validators.required]
    });

    this.route.params.subscribe(
      params => {
        this.configUserService.getPositionById(params.id)
        .subscribe(
          position => {

            this.position = position;
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
      this.displayMessage = this.genericValidator.processMessages(this.positionForm);
    });
      }

      fillUpForm() {

        this.positionForm.patchValue({
          id: this.position.id,
          name: this.position.name
        });
  }

  deletePosition() {

    this.position = Object.assign({}, this.position, this.positionForm.value);

    this.configUserService.deletePosition(this.position)
    .subscribe(
      success => {this.processSuccess(success); },
      fail => {this.processFail(fail); }
    );

  }




      processSuccess(response: any) {
        this.errors = [];
        const toast = this.toastr.success('Position deleted succesfully', 'Good Job!', {timeOut: 1000});
        if (toast){
          toast.onHidden.subscribe(() => {
            this.router.navigate(['/position']);
          });
        }

    }

    processFail(fail: any) {
      this.errors = fail.error.errors;
      this.toastr.error('Something went wrong', 'Ops!', {timeOut: 2000});

    }


}
