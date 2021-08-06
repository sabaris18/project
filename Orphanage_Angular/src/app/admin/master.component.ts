import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {

  constructor(private router:Router,private toastr:ToastrService) { }
  unread:number= 1;
  show:boolean = false

  ngOnInit(): void {

    let type= sessionStorage.getItem('Type');
    if(type == null || type ==''){
      this.toastr.error('Please login','Alert');
      this.router.navigate(['login']);
    }


    if(type == 'Admin'){
      this.show = true;
    }
    else{
      this.show = false;
    }

    $('[data-widget="treeview"]').Treeview('init');
  }

  logout():void{
    sessionStorage.removeItem("username");
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

}
