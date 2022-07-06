import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { PetFormService } from 'src/app/shared/services/pet-form.service';
import { FormDetailsComponent } from './form-details/form-details.component';

@Component({
  selector: 'app-added-forms-list',
  templateUrl: './added-forms-list.component.html',
  styleUrls: ['./added-forms-list.component.scss']
})
export class AddedFormsListComponent implements OnInit {
  pets:any[] = [];
  loading:boolean = false;
  dataSource = new MatTableDataSource<any>(); 


  displayedColumns = [
    'user', 'havePet', 
    'approval'
  ];

  constructor(
    private petFormService: PetFormService,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.loading = true;
    this.pets = this.petFormService.addedPetsArray;
    this.dataSource.data = this.petFormService.exampleUsersForms;
    this.loading = false;
  }

  openDialog(user:string) {
    const dialogRef = this.dialog.open(
      FormDetailsComponent, 
      {
        width: '40%',
        data: user
        })
  }

  approve(user:string) {
    console.log("Approve " + user);
  }

  reject(user:string) {
    console.log("Reject " + user);
  }
}
