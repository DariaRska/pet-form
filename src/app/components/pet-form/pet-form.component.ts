import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
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

  constructor(private petFormService: PetFormService) { }

  ngOnInit(): void {
    this.subscription = this.petFormService.petsArray.subscribe(pets => {
      this.pets = pets;
    });
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
    console.log(this.mainForm.value);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
