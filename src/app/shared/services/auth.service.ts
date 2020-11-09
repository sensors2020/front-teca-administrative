import { Injectable } from '@angular/core';
//import { User } from './shared/services/user';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
//import  'rxjs/add/operator/catch';
//import  'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  endpoint = 'https://40gxcq6y68.execute-api.us-east-1.amazonaws.com/PROD';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(
    private http: HttpClient,
    public router: Router
  ) {
 
  }
 

  //signIn(user: User) {
	  /*
  public signIn(user) { 
	console.log("signIn");
	console.log(user);
    return this.http.post<any>(this.endpoint}+'/session/login', user)
      .subscribe((res: any) => {
		 if(res.error == null) {
			console.log("Session login..."); 
			console.log(res); 
			localStorage.setItem('token', res.token)
			this.router.navigate(['dashboard']);	 
		 } else {
			console.log("Error Login:"); 			 
		 }
		 
      })
  }*/
  
   public signIn2(user) {
	console.log("signIn");
	console.log(user);
    return this.http.post<any>(`${this.endpoint}/session/login`, user)
      .subscribe((res: any) => {
        
		 if(res.error == null) {
			console.log("Session login..."); 
			console.log(res); 
			localStorage.setItem('token', res.body.token)
			this.router.navigate(['dashboard']);	 
		 } else {
			console.log("Error Login:"); 			 
		 }
		
      })
	  	  
  }

	signOut(request): Observable<any> {
		let api = `${this.endpoint}/session/logout`;
		return this.http.post(api, request ).pipe(
		  map((res: Response) => {
			return res || {}
		  }),
		  catchError(this.handleError)
		)
	}
  
	signIn(request): Observable<any> {
		let api = `${this.endpoint}/session/login`;
		return this.http.post(api, request ).pipe(
		  map((res: Response) => {
			return res || {}
		  }),
		  catchError(this.handleError)
		)
	}
  

  
  sendRequest(url, type, body, params = null): Observable<any> {
        return this.http[type](url, { params: params }, body)
  }



  public getToken() {
    return localStorage.getItem('token');
  }

  public removeToken() {
    localStorage.removeItem('token');
  }

  
	public isLoggedIn() {
		let authToken = localStorage.getItem('token');
		return (authToken !== null) ? true : false;
	}

	// Error 
    public handleError(error: HttpErrorResponse) {
    let msg = '';
	console.log('Init handler');
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
	  console.log('handleError');
	  console.log(msg);
    } else {
	  console.log('handleError..............');
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
	  console.log(msg);
    }
    return throwError(msg);
    } 
  
  
}
