import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pet-form',
  templateUrl: './pet-form.component.html',
  styleUrls: ['./pet-form.component.scss']
})
export class PetFormComponent implements OnInit {
  mainForm: FormGroup = new FormGroup({});
  @Output() pets:any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.mainForm = new FormGroup({
      'petConfirmed': new FormControl(null, [Validators.required]),
  });
  }

  petConfirmed() {
    if (this.pets.length === 0 ) {
      this.pets.push('confirmed');
    }
  }

  addNewPet() {
    this.pets.push('pet');
  }

  noPets() {
    this.pets = [];
  }

  deletePet(event:any) {
    // deletes the last one
    this.pets.splice(0, this.pets.length - (this.pets.length - 1));
  }

  onSubmit() {
    console.log(this.mainForm.value);
  }

}
