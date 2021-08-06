import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { MasterComponent } from './master.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {HttpClientModule} from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTabsModule} from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';

import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';



import { HomeComponent } from './home.component';
import { ViewDonationComponent } from './view-donation.component';
import { ListOrphanComponent } from './list-orphan.component';
import { ListUserComponent } from './list-user.component';
import { ManageDonationComponent } from './manage-donation.component';



@NgModule({
  declarations: [MasterComponent, 
    HomeComponent,  ViewDonationComponent, ListOrphanComponent, ListUserComponent, ManageDonationComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    HttpClientModule,
    NgxSpinnerModule,
    BsDatepickerModule.forRoot(),
    MatGridListModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule
  ],
  providers:[]
})
export class AdminModule { }
