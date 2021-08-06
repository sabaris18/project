import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/model/User.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AdminService } from './admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ViewDonation } from 'src/model/ViewDonation.model';

@Component({
  selector: 'app-list-orphan',
  templateUrl: './list-orphan.component.html',
  styleUrls: ['./list-orphan.component.css']
})
export class ListOrphanComponent implements OnInit {

  displayedColumns: string[] = ['FirstName', 'LastName', 'EmailID','Gender','ContactNumber',
  'Address','accept','reject'];
  user:User[] = [];
  dataSource = new MatTableDataSource<User>(this.user);
  isLoaded:boolean = false;

  @ViewChild(MatPaginator, {static: false})
  set paginator(value: MatPaginator) {
    if (this.dataSource){
      this.dataSource.paginator = value;
    }
  }
  @ViewChild(MatSort, {static: false})
  set sort(value: MatSort) {
    if (this.dataSource){
      this.dataSource.sort = value;
    }
  }
  constructor(private service:AdminService,private spinner:NgxSpinnerService,
    private toastr:ToastrService,private router:Router,private dialog:MatDialog) { }

   ngOnInit(): void {
    this.fetchRequest();
   }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  fetchRequest():void{
    this.spinner.show();
    this.service.orphanRequest().subscribe((data)=>{
      this.dataSource.data = data as User[],
      this.isLoaded = true,
      this.spinner.hide();
    },(err)=>{
      this.toastr.error(err,'Alert'),
      this.spinner.hide();
    });
  }

  updateFlag(UserID:number,Flag:number){
    this.spinner.show();
    this.service.updateFlag(UserID.toString(),Flag.toString()).subscribe((data)=>{
      let message = data.Message;
      if(message == 'Status updated'){
        this.toastr.success(message,'Alert');
        this.fetchRequest();
      }
      else{
        this.toastr.error(message,'Alert');
      }
      this.spinner.hide();
    },(err)=>{
      this.toastr.error(err,'Alert');
      this.spinner.hide();
    });
  }
}
