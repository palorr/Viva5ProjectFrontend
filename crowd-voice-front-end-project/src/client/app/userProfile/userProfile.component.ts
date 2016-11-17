import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../models/user';

import { AlertService, AuthenticationService } from '../services/index';

/**
*	This class represents the lazy loaded LoginComponent.
*/

@Component({
	moduleId: module.id,
	selector: 'login-cmp',
	templateUrl: 'userProfile.component.html'
})

export class userProfileComponent implements OnInit {
	
	user: User = new User();
	
	loading = false;
 
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }
 
    ngOnInit() {
        
    }
 
    clicktest() {
		console.log("all ok!!"); 
    }
}
