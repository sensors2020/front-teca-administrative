import {Component } from '@angular/core';
import { navItems } from '../../_nav';
import { Router } from '@angular/router';
import { AuthService } from './../../shared/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;

  constructor(
    public authService: AuthService,
    public router: Router
  ) {
  
  }
	  
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  
  public logout() {
	  console.log("Logout...");

		let request = {
			body: {
				token: this.authService.getToken()
			}			
		};
 
	this.authService.signOut(request).subscribe((res) => {
		console.log("LOGIN OK")	
		console.log(res)	
	  
    }, error => ( console.log('Error logout.') )
	)

	this.authService.removeToken();
    this.router.navigate(['login']);


  }
  
}
