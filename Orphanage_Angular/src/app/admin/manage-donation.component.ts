import { Component, OnInit } from '@angular/core';
import { ManageDonation } from 'src/model/ManageDonation.model';
import { AdminService } from './admin.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-donation',
  templateUrl: './manage-donation.component.html',
  styleUrls: ['./manage-donation.component.css']
})
export class ManageDonationComponent implements OnInit {

  donation:ManageDonation[] = [];

  value:any;
  constructor(private service:AdminService, private spinner:NgxSpinnerService,
    private toastr:ToastrService) { }

  ngOnInit(): void {
    
    this.getManageDonationList();
  }

  getManageDonationList():void{

    this.spinner.show();
    this.service.manageDonationList().subscribe((data)=>{
      this.donation = data as ManageDonation[];
      this.spinner.hide();
    },(err)=>{
      this.toastr.error(err,'Alert'),
      this.spinner.hide();
    });
  }

  submit():void{
    this.spinner.show();
    let oModel = this.donation.map(each => ({...each , Flag : each.Flag === true || each.Flag == 1 ? 1 : 0}))
    console.log(oModel)
    
    this.service.manageDonation(oModel).subscribe((data)=>{
      let message = data.Message;
      if(message == 'List updated'){
        this.toastr.success(message,'Alert');
        this.getManageDonationList();
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

