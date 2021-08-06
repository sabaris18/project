import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";


@Component({
    selector: 'app-orphan',
    templateUrl: './orphan.component.html'
  })
  export class OrphanIndexComponent implements OnInit {
    constructor(private router:Router) { }
    ngOnInit(): void {
    }
    logout():void{
        sessionStorage.clear();
        this.router.navigate(['login']);
      }
}