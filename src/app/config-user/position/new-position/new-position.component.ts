import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';
import { FormControlName, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/utils/generic-form-validation';
import { LocalStorageUtils } from 'src/app/utils/localstorageutils';
import { ConfigUserService } from '../../services/config-user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Observable, fromEvent, merge } from 'rxjs';
import { Position } from '../../models/position';

@Component({
  selector: 'app-new-position',
  templateUrl: './new-position.component.html'
})
export class NewPositionComponent implements OnInit, AfterViewInit {

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
              private router: Router) {

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
  }

  ngAfterViewInit(): void {
    const controlBlurs: Observable<any>[] = this.formInputElements
    .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs)
    .subscribe(() => {
      this.displayMessage = this.genericValidator.processMessages(this.positionForm);
    });
      }

      savePosition() {

        this.position = Object.assign({}, this.position, this.positionForm.value);

        this.configUserService.savePosition(this.position)
        .subscribe(
          success => {this.processSuccess(success); },
          fail => {this.processFail(fail); }
        );

      }

      processSuccess(response: any) {
        this.errors = [];
        const toast = this.toastr.success('New Position registered succesfully', 'Good Job!', {timeOut: 1000});
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
