import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-master',
  templateUrl: './user-master.component.html',
  styleUrls: ['./user-master.component.css']
})
export class UserMasterComponent implements OnInit {

  constructor(private router:Router,private toastr:ToastrService) { }

  ngOnInit(): void {
    let type= sessionStorage.getItem('Type');
    if(type == null || type ==''){
      this.toastr.error('Please login','Alert');
      this.router.navigate(['login']);
    }
  }

  logout():void{
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

}
