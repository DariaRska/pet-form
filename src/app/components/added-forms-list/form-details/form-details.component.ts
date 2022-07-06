import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { PetFormService } from 'src/app/shared/services/pet-form.service';

@Component({
  selector: 'app-form-details',
  templateUrl: './form-details.component.html',
  styleUrls: ['./form-details.component.scss']
})
export class FormDetailsComponent implements OnInit {
  dataSource = new MatTableDataSource<any>(); 

  displayedColumns = [
    'petName', 'petType', 'petAge', 
  ];

  pets:any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private petFormService: PetFormService
    ) { }

  ngOnInit(): void {
    this.petFormService.exampleUsersForms.filter(item => {
      if(item.user == this.data) {
        this.pets.push(Object.values(item)[2]);
        this.dataSource.data = this.pets[0];
      }
    })
  }

}
