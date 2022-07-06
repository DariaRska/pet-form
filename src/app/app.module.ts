import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material/material.module';
import { LoginComponent } from './components/login/login.component';
import { PetFormComponent } from './components/pet-form/pet-form.component';
import { RoutingModuleModule } from './routing-module/routing-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './components/pet-form/form/form.component';
import { HttpClientModule } from '@angular/common/http';
import { AddedFormsListComponent } from './components/added-forms-list/added-forms-list.component';
import { FormDetailsComponent } from './components/added-forms-list/form-details/form-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PetFormComponent,
    FormComponent,
    AddedFormsListComponent,
    FormDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    RoutingModuleModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
