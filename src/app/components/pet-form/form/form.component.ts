import { ThisReceiver } from '@angular/compiler';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PetFormService } from 'src/app/shared/services/pet-form.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy {
  petForm: FormGroup = new FormGroup({});
  @Input() pets:any[] = [];
  @Output() deletePet:EventEmitter<void> = new EventEmitter();
  petType:string = '';
  subscription:Subscription = new Subscription();

  petTypes = [
    'cat', 'dog', 'fox'
  ]

  constructor(private petFormService: PetFormService) { }

  ngOnInit(): void {
    this.petForm = new FormGroup({
      'petName': new FormControl(null, [Validators.required]),
      'petType': new FormControl(null, [Validators.required]),
      'petAge': new FormControl(null),
  });

  this.subscription.add(this.petFormService.getPetTypes().subscribe(petTypes => {
    console.log(petTypes);
  }));
  }


  delete(petType:string) {
    if(petType) {
      this.petFormService.catchOldType(petType);
      this.petFormService.deleteOneType(petType);
    }
    this.deletePet.emit();
  }

  countTypes(type:string) {
    this.getValidation();
    if (this.petType === '') {
      this.petType = type;
      this.petFormService.countTypes(true, type);
    } else {
      const oldType = this.petType;
      this.petType = type;
      this.petFormService.catchOldType(oldType);
      this.petFormService.countTypes(false, type);
    }
      
  }

  getValidation() {
    this.petFormService.validateForm.next(this.petForm.valid);
  }

  onSubmit() {
    this.petFormService.addedPetsArray.push(this.petForm.value);
    this.petForm.disable();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}