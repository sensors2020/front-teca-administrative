import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { AuthService } from "./auth.service";

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
		console.log("AuthInterceptor...")	
        const authToken = this.authService.getToken();
		console.log("authToken:"+authToken)	
        /*req = req.clone({
            setHeaders: {
                Authorization: authToken
            }
        });*/
		console.log("handle...")	
        //return next.handle(req);
		return null;
    }
}