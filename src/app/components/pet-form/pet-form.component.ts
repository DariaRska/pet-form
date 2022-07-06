import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PetFormService } from 'src/app/shared/services/pet-form.service';

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

  constructor(
    private petFormService: PetFormService,
    private router: Router,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.subscription.add(this.petFormService.petsArray.subscribe(pets => {
      this.pets = pets;
    }));
    this.mainForm = new FormGroup({
      'petConfirmed': new FormControl(null, [Validators.required]),
  });

  this.subscription.add(this.petFormService.petTypesCounter.subscribe(number => {
    this.petTypesCounter = number;
  }));
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
