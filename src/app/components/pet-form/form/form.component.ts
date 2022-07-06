import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PetFormService } from 'src/app/shared/services/pet-form.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  petForm: FormGroup = new FormGroup({});
  @Input() pets:any[] = [];
  @Output() deletePet:EventEmitter<void> = new EventEmitter();
  petTypesCounter:number = 0;

  petTypes = [
    'cat', 'dog', 'fox'
  ]

  constructor(private petFormService: PetFormService) { }

  ngOnInit(): void {
    this.petForm = new FormGroup({
      'petName': new FormControl(null, [Validators.required]),
      'petType': new FormControl(null),
      'petAge': new FormControl(null),
  });
  }


  delete() {
    this.deletePet.emit();
  }

  countTypes(type:string) {
    console.log(type);
    // if (this.petTypesCounter > 0) {

    // }
  }

  onSubmit() {
    this.petFormService.addedPetsArray.push(this.petForm.value);
    this.petForm.disable();

    // console.log(this.petForm.value);
  }

}