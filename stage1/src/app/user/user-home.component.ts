import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin/admin.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {


  constructor(private router:Router, private route:ActivatedRoute) {
   }

  ngOnInit(): void {
    
  }

  

  donateBooks():void{
    this.router.navigate(['user/details/book']);
  }

}
