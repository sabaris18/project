import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserMasterComponent } from './user-master.component';
import { UserHomeComponent } from './user-home.component';
import { DonateBookComponent } from './donate-book.component';


const routes: Routes = [
  {path:'user',component:UserMasterComponent,children:
    [
      {path:'home',component:UserHomeComponent},
      {path:'',redirectTo:'home',pathMatch:'full'},
      {path:'details/:type',component:DonateBookComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
