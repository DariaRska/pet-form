import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddedFormsListComponent } from '../components/added-forms-list/added-forms-list.component';
import { LoginComponent } from '../components/login/login.component';
import { PetFormComponent } from '../components/pet-form/pet-form.component';
import { AuthGuard } from '../shared/services/auth.guard';



const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  // needs to add authguard for managers only 
  { path: 'added-forms',
  canActivate: [AuthGuard], 
  component: AddedFormsListComponent },
  { path: 'form', canActivate: [AuthGuard], component: PetFormComponent },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class RoutingModuleModule { }
