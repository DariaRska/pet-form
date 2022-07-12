import { Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PetFormService } from 'src/app/shared/services/pet-form.service';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-pet-form',
  templateUrl: './pet-form.component.html',
  styleUrls: ['./pet-form.component.scss']
})
export class PetFormComponent implements OnInit, OnDestroy {
  mainForm: FormGroup = new FormGroup({});
  pets:any[] = [];
  subscription:Subscription = new Subscription();
  petTypesCounter:number = 0;

  isDisabled:boolean = true;

  @ViewChildren(FormComponent) petForm!:QueryList<FormComponent>;


  servisValidation:any;

  constructor(
    private petFormService: PetFormService,
    private router: Router,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.subscription.add(this.petFormService.validateForm.subscribe(isValid => {
      this.servisValidation = isValid;
    }))
    this.subscription.add(this.petFormService.petsArray.subscribe(pets => {
      this.pets = pets;
    }));
    this.subscription.add(this.petFormService.petTypesCounter.subscribe(number => {
    this.petTypesCounter = number;
  }));
  this.mainForm = new FormGroup({
    'petConfirmed': new FormControl(null, [Validators.required
    ]),
  }, 
  );
  
  }

  petConfirmed() {
    this.servisValidation = false;
    this.petFormService.petConfirmed();
  }

  addNewPet() {
    let value = this.servisValidation;
    this.petFormService.praviousValidateForm = value;
    this.petFormService.validateForm.next(false);
    this.petFormService.addNewPet();
  }

  noPets() {
    this.servisValidation = true;
    this.petFormService.noPets();
  }

  deletePet(pet:number) {
    this.petFormService.deleteOnePet(pet);
  }

  checkValidation() {
      if(this.petForm.length > 0) {
        this.petForm.toArray().forEach(form => {
          console.log(form.petForm.invalid);
          this.isDisabled = form.petForm.invalid;
        });
    } else {
      console.log(this.mainForm.invalid);
      this.isDisabled = this.mainForm.invalid;
    }
  }

  onSubmit() {
    if (this.petForm) {
      this.petForm.toArray().forEach(form => {
        return form.onSubmit();
      });
    };
    this.router.navigate(['/added-forms']);
    this.petFormService.exampleUsersForms.push({
      user: this.authService.getLoggedUser(),
      anyPets: this.mainForm.value.petConfirmed,
      pets: this.petFormService.addedPetsArray
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
