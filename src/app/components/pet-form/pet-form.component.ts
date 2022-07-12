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
    // 'petsForm': new FormGroup({
      // 'petsF': new FormArray([], [this.customValidation.bind(this)]),
    // }),
    'petConfirmed': new FormControl(null, [Validators.required, this.customValidation.bind(this)]),
  }, 
  );
  
  }

  // private buildListItem(): FormGroup {
  //   return new FormGroup({});
  // }

  petConfirmed() {
      this.petFormService.petConfirmed();
  }

  addNewPet() {
    this.petFormService.validateForm.next(false);
    this.petFormService.addNewPet();
  }

  noPets() {
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

  check() {
    if(this.petForm){
      if(this.petForm.length > 0) {
      this.mainForm.controls['petConfirmed'].updateValueAndValidity();
      }
    }
  }

  

  // customValidation(control: FormControl) {
  customValidation(control: AbstractControl): ValidationErrors | null {
    if(this.petForm) {
      if(this.petForm.length > 0) {
        console.log(!this.servisValidation)
        return {'isDisabled' : !this.servisValidation}; 
      }}
    // console.log("validation")
    // if(this.petForm) {
    //   console.log("1stif")
    //   // if(this.petForm.length > 0) {
    //     console.log("2ndif")
    //     this.petForm.toArray().forEach(form => {
    //       console.log("forEach")
    //       console.log(this.petForm.get(0)?.getValidation());
    //       form.getValidation()
    //       console.log(form.petForm.invalid)
    //     // return {'isDisabled' : form.petForm.invalid};
    //     if (form.getValidation() !== undefined){
    //       console.log("not undefined")
    //       return {'isDisabled' : !form.getValidation()};
    //     } else {
    //       console.log("undefined")
    //       return {'isDisabled' : true};
    //     }
    //   });

        // if(this.petForm){
    //       console.log(this.petForm.get(0)?.getValidation());
    //     // }
    // let arr:any[] = [];
    //     this.petForm.toArray().forEach(form => {
    //       console.log(form.petForm.invalid);
    //       arr.push(form.petForm.valid);
          
        //   console.log(form.petForm.valid)
        // return {'isDisabled' : form.petForm.valid};
        // });
        // let isValid:boolean = true;
        // arr.filter(validation => {
        //   if (validation === false) {
        //     isValid = true;
        //   } else {
        //     isValid = false;
          // }
        // })
        // return {'isDisabled' : isValid};
        // if(form.petForm.invalid) {
        //   return {'isDisabled' : true};
        // } else {
        //   return {'isDisabled' : false};
        // }
      // });
      // }
      // this.petForm.toArray().forEach(form => {
      //   // this.isDisabled = form.petForm.invalid;
      //   // return {'isDisabled' : form.petForm.invalid};
      //   if(form.petForm.invalid) {
      //     return {'isDisabled' : true};
      //   } else {
      //     return {'isDisabled' : false};
      //   }
      // });
  // } 
  return null;
}


  onTouched(event:any){
    console.log(event);
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
