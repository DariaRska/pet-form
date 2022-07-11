import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PetFormService {
  
  count:number = 0;
  pets:number[] = [];
  petToDelete:any;
  petTypesCounter = new Subject<number>();
  petTypesCounterArray:string[] = [];
  oldPetType:string = '';
  typesWithoutDuplicates:any[] = []

  addedPetsArray:any[] = [];

  petsArray = new Subject<number[]>();

  exampleUsersForms = [
    {user: 'Max',
    anyPets: 'no',
    pets: []}, 
    {user: 'Alex',
    anyPets: 'yes',
    pets:[ {
      petName: 'Bob',
      petType: 'cat',
      petAge: 2
    },
    {
      petName: 'Scooby',
      petType: 'dog',
      petAge: 4
    }],
  }, 
  {user: 'Amy',
  anyPets: 'yes',
  pets: [{
    petName: 'Red',
    petType: 'fox',
    petAge: 1
  }],}, 
]

  constructor(private http: HttpClient) { }

  getPetTypes() {
    return this.http.get("http://localhost:8080/list");
  }

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

  catchOldType(oldType:string) {
    this.oldPetType = oldType;
  }

  countTypes(choosenFirstTime:boolean, type:string) {
    if (choosenFirstTime) {
      this.petTypesCounterArray.push(type);
    } else {
      this.petTypesCounterArray.push(type);
      this.deleteOneType(type);
      
    }
    this.countedTypes();
  }

  countedTypes() {
      this.typesWithoutDuplicates = this.petTypesCounterArray.filter((item, pos) => {
        return this.petTypesCounterArray.indexOf(item) == pos;
      });
      this.petTypesCounter.next(this.typesWithoutDuplicates.length);
  }

  deleteOneType(type:string) {
    const oldTypeIndex = this.petTypesCounterArray.findIndex(el => {return el === this.oldPetType});
    this.petTypesCounterArray = this.petTypesCounterArray.filter((el, index) => {
      if (index !== oldTypeIndex) {
        return el
      }
      return 
    })
    this.countedTypes();
  }

}
