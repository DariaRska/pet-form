import { Component, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  @ViewChildren(FormComponent) petForm!:QueryList<PetFormComponent>;

  constructor(
    private petFormService: PetFormService,
    private router: Router,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.subscription.add(this.petFormService.petsArray.subscribe(pets => {
      this.pets = pets;
    }));
    this.subscription.add(this.petFormService.petTypesCounter.subscribe(number => {
    this.petTypesCounter = number;
  }));
  this.mainForm = new FormGroup({
    'petConfirmed': new FormControl(null, [Validators.required]),
  });
  }

  petConfirmed() {
      this.petFormService.petConfirmed();
  }

  addNewPet() {
    this.petFormService.addNewPet();
  }

  noPets() {
    this.petFormService.noPets();
  }

  deletePet(event:any, pet:number) {
    this.petFormService.deleteOnePet(pet);
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
