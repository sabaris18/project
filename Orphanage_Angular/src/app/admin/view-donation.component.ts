import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AdminService } from './admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ViewDonation } from 'src/model/ViewDonation.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-view-donation',
  templateUrl: './view-donation.component.html',
  styleUrls: ['./view-donation.component.css']
})
export class ViewDonationComponent implements OnInit {

  displayedColumns: string[] = ['UserName', 'ContactNumber', 'CategoryName','Description','DonationDate'];
  donation:ViewDonation[]=[];
  dataSource = new MatTableDataSource<ViewDonation>(this.donation);
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
    this.fetchDonations();
   }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  fetchDonations():void{
    this.spinner.show();
    this.service.viewDonations().subscribe((data)=>{
      this.dataSource.data = data as ViewDonation[],
      this.isLoaded = true,
      this.spinner.hide();
    },(err)=>{
      this.toastr.error(err,'Alert'),
      this.spinner.hide();
    });
  }

}
