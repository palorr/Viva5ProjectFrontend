import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, RegistrationService } from '../services/index';

import { User } from '../models/user';

/**
*	This class represents the lazy loaded SignupComponent.
*/

@Component({
	moduleId: module.id,
	selector: 'signup-cmp',
	templateUrl: 'signup.component.html'
})

export class SignupComponent {
	
	user: User = new User();
	
	loading = false;
 
    constructor(
        private router: Router,
        private alertService: AlertService,
        private registrationService: RegistrationService
    ) { }
 
    registerUser() {
        this.loading = true;
		
        if(!this.validateEmail(this.user.username)) {
            this.alertService.error("Provided email address is not valid.");
			this.loading = false;
			return;
        }
        
		if(this.user.password !== this.user.repeatPassword) {
            this.alertService.error("Provided passwords do not match.");
			this.loading = false;
			return;
		}
        
		//alert(`registered!!! ${JSON.stringify(this.user)}`);
		
        this.registrationService.registerUser(this.user.username, this.user.password, this.user.repeatPassword)
            .subscribe(
                (data) => {
                    // set success message and pass true paramater to persist the message after redirecting to the login page
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                (err) => {
                    let errorString = "";
                    
                    for(let element in err.modelState) {
                        err.modelState[element].forEach((errorMsg: string) => {
                            errorString += errorMsg + "\n\n"; 
                        });
                    }
                    
                    this.alertService.error(errorString);
                    this.loading = false;
                });
                
    }
    
    validateEmail(email: string) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
}
