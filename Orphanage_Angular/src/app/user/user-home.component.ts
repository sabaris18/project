import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin/admin.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../login.service';
import { ManageDonation } from 'src/model/ManageDonation.model';
import { UserService } from './user.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent implements OnInit {


  _searchTerm :string;
  public isMobile: boolean = false;
  donation: ManageDonation[];
  filteredDonation : ManageDonation[];
  imageUrl:string;
  

  get searchTerm():string{
    return this._searchTerm;
  }

  set searchTerm(value :string){
    this._searchTerm = value;
    this.filteredDonation = this.filter(value);
  }
    

  filter(searchString : string){
    return this.donation.filter(donation => donation.DonationName.toLowerCase().indexOf(searchString.toLowerCase()) !== -1 )
  }

  constructor(breakpointObserver: BreakpointObserver,
    private service:UserService,private spinner:NgxSpinnerService,
    private toastr:ToastrService,private router:Router,private loginService:LoginService) {
      breakpointObserver.observe([  
        '(max-width: 837px)'
      ]).subscribe(result => {
        this.isMobile = result.matches;
      });
      this.imageUrl = loginService.imageUrl;
   }

  ngOnInit(): void {
      this.fetchProducts();
  }

  fetchProducts():void{
    this.spinner.show();
    this.service.manageDonation().subscribe((data)=>{
        this.donation = data as ManageDonation[],
        this.filteredDonation = this.donation,
        this.spinner.hide();
    },(err)=>{
       this.toastr.error(err,'Alert'),
       this.spinner.hide();
    });
  }

  Donate(routerLink:string){
    this.router.navigate(['user/details/'+routerLink]);
  }

}
