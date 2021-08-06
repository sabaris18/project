import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoginService } from '../login.service';
import { throwError, Observable } from 'rxjs';
import { ResponseMessage } from 'src/model/ResponseMessage.model';
import { catchError } from 'rxjs/operators';
import { Category } from 'src/model/Category.model';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  
  url:string;

  constructor(private http:HttpClient, private service:LoginService) 
  { 
    this.url = service.url;
  }



  // deleteProduct(ProductID:string):Observable<ResponseMessage>{
  //   return this.http.get<ResponseMessage>(this.url+"admin/deleteProduct/"+ProductID)
  //   .pipe(catchError(this.handleError));
  // }

  // getOrders():Observable<OrderDetails[]>{
  //   return this.http.get<OrderDetails[]>(this.url+"admin/getOrders")
  //   .pipe(catchError(this.handleError));
  // }

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
