import { Component, OnInit } from '@angular/core';
import { Books } from 'src/model/Books.model';
import { UserService } from './user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Category } from 'src/model/Category.model';
import { Donate } from 'src/model/Donate.model';

@Component({
  selector: 'app-donate-book',
  templateUrl: './donate-book.component.html',
  styleUrls: ['./donate-book.component.css']
})
export class DonateBookComponent implements OnInit {

  type:string='';
  donate:Donate = new Donate();
  category:Category[] = [];

  constructor(private service:UserService,private spinner:NgxSpinnerService,
    private toastr:ToastrService,private router:Router,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.type = this.route.snapshot.params['type'];
    this.fetchCategories(this.type);
  }
  
  fetchCategories(type:string):void{
    this.spinner.show();
    this.service.getCategory(type).subscribe((data)=>{
      this.category = data as Category[],
      this.spinner.hide();
    },(err)=>{
      this.toastr.error(err,'Alert');
      this.spinner.hide();
    });
  }

  donateItems():void{
    this.donate.UserID =+ sessionStorage.getItem('UserID');
    this.spinner.show();
    this.service.donate(this.donate).subscribe((data)=>{
      let message = data.Message;
      this.toastr.success(message,'Alert');
      this.spinner.hide();
    },(err)=>{
      this.toastr.error(err,'Alert');
      this.spinner.hide();
    });
  }

}
