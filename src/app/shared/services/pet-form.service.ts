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

  catchOldType(oldType:string) {
    this.oldPetType = oldType;
  }

  countTypes(choosenFirstTime:boolean, type:string) {
    // console.log('before if');
    // console.log(this.petTypesCounterArray);
    if (choosenFirstTime) {
    //   console.log('first');
    // console.log(this.petTypesCounterArray);
      this.petTypesCounterArray.push(type);
    } else {
      this.petTypesCounterArray.push(type);
      const oldTypeIndex = this.petTypesCounterArray.findIndex(el => {return el === this.oldPetType});
      this.petTypesCounterArray = this.petTypesCounterArray.filter((el, index) => {
        if (index !== oldTypeIndex) {
          return el
        }
        return 
      })
      
    }
    // console.log('after cutting')
    //   console.log(this.petTypesCounterArray);

      console.log("FIND THE SAME TYPES")
      const souldadd = [];
        this.petTypesCounterArray.forEach((item) => {
        if (this.typesWithoutDuplicates.length > 0) {
          
          for (let i=0; i < this.typesWithoutDuplicates.length; i++) {
            if(item !== this.typesWithoutDuplicates[i]) {
              return this.typesWithoutDuplicates.push(item);
            } 
          }




        } else {
          return this.typesWithoutDuplicates.push(item);
        }
        return false;
      })
      this.petTypesCounter.next(this.typesWithoutDuplicates.length)
      console.log(this.typesWithoutDuplicates)
  }


  /*
{
    console.log('before if');
    console.log(this.petTypesCounterArray);
    if (choosenFirstTime) {
      if(this.petTypesCounterArray.length > 0) {
        this.petTypesCounterArray.filter(petTypes => {
          if(petTypes === type) {
            console.log('added earlier')
            console.log(this.petTypesCounterArray);
          } else {
            this.petTypesCounterArray.push(type);
            console.log(this.petTypesCounterArray);
          }
        })
      } else {
        this.petTypesCounterArray.push(type);
      console.log('first')
    console.log(this.petTypesCounterArray);
      }
    } else {
      this.petTypesCounterArray =  this.petTypesCounterArray.filter(petType => {
        if (petType !== this.oldPetType) {
          return petType;
        } 
        return
      });
      console.log('after if');
      console.log(this.petTypesCounterArray);
      // this.oldPetType; 
      this.petTypesCounterArray.push(type);
      console.log('changed')
    }
  }
  */
}
