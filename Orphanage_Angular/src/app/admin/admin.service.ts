import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoginService } from '../login.service';
import { throwError, Observable } from 'rxjs';
import { ResponseMessage } from 'src/model/ResponseMessage.model';
import { catchError } from 'rxjs/operators';
import { Category } from 'src/model/Category.model';
import { ViewDonation } from 'src/model/ViewDonation.model';
import { User } from 'src/model/User.model';
import { ManageDonation } from 'src/model/ManageDonation.model';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  
  url:string;

  constructor(private http:HttpClient, private service:LoginService) 
  { 
    this.url = service.url;
  }


  viewDonations():Observable<ViewDonation[]>{
     return this.http.get<ViewDonation[]>(this.url+"admin/viewDonation")
     .pipe(catchError(this.handleError));
  }

  orphanRequest():Observable<User[]>{
    return this.http.get<User[]>(this.url+"admin/orphanRequest")
    .pipe(catchError(this.handleError));
  }

  updateFlag(UserID:string,Flag:string):Observable<ResponseMessage>{
    return this.http.get<ResponseMessage>(this.url+"admin/updateFlag/"+UserID+"/"+Flag)
    .pipe(catchError(this.handleError));
  }

  userList():Observable<User[]>{
    return this.http.get<User[]>(this.url+"admin/getUserList")
    .pipe(catchError(this.handleError));
  }

  manageDonationList():Observable<ManageDonation[]>{
    return this.http.get<ManageDonation[]>(this.url+"admin/manageDonationList")
    .pipe(catchError(this.handleError));
  }

  manageDonation(donation:ManageDonation[]):Observable<ResponseMessage>{
    return this.http.post<ResponseMessage>(this.url+"admin/manageDonation",donation)
    .pipe(catchError(this.handleError));
  }

  

  private handleError(errorResponse : HttpErrorResponse)
    {
       if(errorResponse.error instanceof ErrorEvent)
       {
          // console.log("Client side Error: ",errorResponse.error.message);
       }
       else
       {
           //console.error("Server Side Error: ",errorResponse.error.message);
       }
       return throwError("There is a problem with the service.We are notified & working on it.Please try again later");
   }


}
