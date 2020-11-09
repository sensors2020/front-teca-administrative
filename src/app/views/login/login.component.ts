import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from './../../shared/services/auth.service';
import { NgxSpinnerService } from "ngx-spinner";  

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit { 

  signinForm: FormGroup;
  messages = '';
  public result: any;
 
  constructor(
    public formBuilder: FormBuilder,
	public authService: AuthService,
    public router: Router, 
	private SpinnerService: NgxSpinnerService) {
	this.messages = '';
/**/
    if(this.authService.isLoggedIn()) {
		console.log("Usuario logueado");
        this.router.navigate(['users']);		
	} else {
		console.log("Not logueado");
	}
	 

    this.signinForm = this.formBuilder.group({
      email: [''],
      password: ['']
    })
  }

 
	ngOnInit() {
		this.messages = '';
	}

  login(){
		let request = {
			body: {
				email: this.signinForm.value.email,
				password: this.signinForm.value.password
			}			
		};
	this.SpinnerService.show(); 
	this.authService.signIn(request).subscribe((res) => {
		console.log("LOGIN OK")	
		console.log(res)	
      if (res.body.error == null) {
		console.log('token');		  
		console.log(res.body.body.token);		  
		localStorage.setItem('token', res.body.body.token)
		this.SpinnerService.hide(); 
        this.router.navigate(['users']);
      } else {
		console.log("LOGIN NOT USER")		  
		console.log(res.body.error);
		this.messages = 'Ocurrió un error, volver a intentar'		
		this.SpinnerService.hide(); 
	  }
	  
    }, error => ( this.messages = 'Ocurrió un error, volver a intentar' )
	)
  
  }


public login2() {
	console.log("Form:")
	console.log(this.signinForm.value)
	
	if(this.signinForm.value.email=='admin') {
		console.log("LOGIN OK")	
		localStorage.setItem('token', this.signinForm.value.email)
        this.router.navigate(['users']);
	} else {
		console.log("LOGIN ERROR")	
		this.messages = 'Usuario y/o contraseña no válidos.'
	}	
	
}
  
}
