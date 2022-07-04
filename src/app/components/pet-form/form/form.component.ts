import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  petForm: FormGroup = new FormGroup({});
  @Input() pets:any[] = [];
  @Output() deletePet:EventEmitter<void> = new EventEmitter();

  petTypes = [
    'cat', 'dog', 'cow'
  ]

  constructor() { }

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

  onSubmit() {
    console.log(this.petForm.value);
  }

}