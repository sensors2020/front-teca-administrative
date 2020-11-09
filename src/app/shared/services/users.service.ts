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
export class UsersService {
  httpOptions = { };
  endpoint = 'https://40gxcq6y68.execute-api.us-east-1.amazonaws.com/PROD';
  currentUser = {};
  constructor(
    private http: HttpClient,
    public router: Router
  ) {
	this.httpOptions = {
	  headers: new HttpHeaders({
		'Content-Type':  'application/json',
		'Authorization': 'my-auth-token',
		'token': this.getToken()
	  })
	};
 
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

  
	listUsers(request): Observable<any> {
		let api = `${this.endpoint}/usuario/list`;
		return this.http.post(api, request).pipe(
		  map((res: Response) => {
			return res || []
		  }),
		  catchError(this.handleError)
		)
	}
  
	addUser(request): Observable<any> {
		let api = `${this.endpoint}/usuario/insert`;
		return this.http.post(api, request).pipe(
		  map((res: Response) => {
			return res || {}
		  }),
		  catchError(this.handleError)
		)
	}

	addService(request): Observable<any> {
		let api = `${this.endpoint}/usuario/services/insert`;
		return this.http.post(api, request).pipe(
		  map((res: Response) => {
			return res || {}
		  }),
		  catchError(this.handleError)
		)
	}

	deleteService(request): Observable<any> {
		let api = `${this.endpoint}/usuario/services/aqua/delete`;
		return this.http.post(api, request).pipe(
		  map((res: Response) => {
			return res || {}
		  }),
		  catchError(this.handleError)
		)
	}

	statusUser(request): Observable<any> {
		let api = `${this.endpoint}/usuario/status`;
		return this.http.post(api, request ).pipe(
		  map((res: Response) => {
			return res || {}
		  }),
		  catchError(this.handleError)
		)
	}

	statusServicio(request): Observable<any> {
		let api = `${this.endpoint}/usuario/services/status`;
		return this.http.post(api, request ).pipe(
		  map((res: Response) => {
			return res || {}
		  }),
		  catchError(this.handleError)
		)
	}
	
	
	updateUser(request): Observable<any> {
		let api = `${this.endpoint}/usuario/update`;
		return this.http.post(api, request).pipe(
		  map((res: Response) => {
			return res || {}
		  }),
		  catchError(this.handleError)
		)
	}
  
 
	listUsersServices(request): Observable<any> {
		let api = `${this.endpoint}/usuario/services/aqua/list`;
		return this.http.post(api, request).pipe(
		  map((res: Response) => {
			return res || []
		  }),
		  catchError(this.handleError)
		)
	} 

	listTxServices(request): Observable<any> {
		let api = `${this.endpoint}/usuario/transacciones`;
		return this.http.post(api, request).pipe(
		  map((res: Response) => {
			return res || []
		  }),
		  catchError(this.handleError)
		)
	} 


	listDistritos(request): Observable<any> {
		let api = `${this.endpoint}/ubigeo/distritos`;
		return this.http.post(api, request).pipe(
		  map((res: Response) => {
			return res || []
		  }),
		  catchError(this.handleError)
		)
	}
  
	updateTarifa(request): Observable<any> {
		let api = `${this.endpoint}/ubigeo/tarifa`;
		return this.http.post(api, request).pipe(
		  map((res: Response) => {
			return res || {}
		  }),
		  catchError(this.handleError)
		)
	}

	rptDashBoard(request): Observable<any> {
		let api = `${this.endpoint}/reporte/dashboard`;
		return this.http.post(api, request).pipe(
		  map((res: Response) => {
			return res || {}
		  }),
		  catchError(this.handleError)
		)
	}


 	rptDashBoardService(request): Observable<any> {
		let api = `${this.endpoint}/reporte/aqua/dashboard`;
		return this.http.post(api, request).pipe(
		  map((res: Response) => {
			return res || {}
		  }),
		  catchError(this.handleError)
		)
	}
 
 
	rptAquaMonth(request): Observable<any> {
		let api = `${this.endpoint}/reporte/aqua/month`;
		return this.http.post(api, request).pipe(
		  map((res: Response) => {
			return res || []
		  }),
		  catchError(this.handleError)
		)
	}

	rptAquaDate(request): Observable<any> {
		let api = `${this.endpoint}/reporte/aqua/date`;
		return this.http.post(api, request).pipe(
		  map((res: Response) => {
			return res || []
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
