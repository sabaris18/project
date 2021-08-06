import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MasterComponent } from './master.component';

import { HomeComponent } from './home.component';
import { ViewDonationComponent } from './view-donation.component';
import { ListOrphanComponent } from './list-orphan.component';
import { ListUserComponent } from './list-user.component';
import { ManageDonationComponent } from './manage-donation.component';


const routes: Routes = [
  {path:'master',component:MasterComponent,children:
    [
      {path:'home',component:HomeComponent},
    
      {path:'donation',component:ViewDonationComponent},
      {path:'orphan',component:ListOrphanComponent},
      {path:'user',component:ListUserComponent},
      {path:'manage-donation',component:ManageDonationComponent}
    ]
  },
  {path:'',redirectTo:'/master',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
