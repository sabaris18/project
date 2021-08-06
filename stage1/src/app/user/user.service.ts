import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { LoginService } from '../login.service';
import { catchError } from 'rxjs/operators';
import { ResponseMessage } from 'src/model/ResponseMessage.model';
import { Cart } from 'src/model/Cart.model';
import { Category } from 'src/model/Category.model';
import { Books } from 'src/model/Books.model';
import { Donate } from 'src/model/Donate.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url:string;

  constructor(private http:HttpClient, private service:LoginService) {
    this.url = service.url;
  }

  getCategory(type:string):Observable<Category[]>{
    return this.http.get<Category[]>(this.url+"user/getCategory/"+type)
    .pipe(catchError(this.handleError));
  }

  donate(donate:Donate):Observable<ResponseMessage>{
    return this.http.post<ResponseMessage>(this.url+"user/donate",donate).
      pipe(catchError(this.handleError));
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
