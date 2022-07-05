import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PetFormService {
  
  count:number = 0;
  pets:number[] = [];
  petToDelete:any;

  petsArray = new Subject<number[]>();

  constructor() { }

  petConfirmed() {
    if (this.pets.length === 0 ) {
      this.pets.push(this.count);
      this.petsArray.next(this.pets);
    }
  }

  addNewPet() {
    this.count = this.count + 1;
    this.pets.push(this.count);
    this.petsArray.next(this.pets);
  }

  noPets() {
    this.pets = [];
    this.petsArray.next(this.pets);
  }

  deleteOnePet(petNumber:number) {
    this.pets = this.pets.filter(pet => {
      return pet !== petNumber;
    });
    this.petsArray.next(this.pets);
  }
}
