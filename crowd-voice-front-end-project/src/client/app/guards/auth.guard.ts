/* 
	The auth guard is used to prevent unauthenticated users from accessing restricted routes
*/

import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AlertService } from '../services/index';
 
@Injectable()
export class AuthGuard implements CanActivate {
 
    constructor(
        private router: Router,
        private alertService: AlertService
    ) { }
    
    isUserLoggedIn() {
        return localStorage.getItem('currentUser');
    }
 
    canActivate() {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            return true;
        }
 
        // not logged in so redirect to login page
        this.alertService.error("You are not authorized to see this content. You must first login to the platform!", true);
        this.router.navigate(['/login']);
        return false;
    }
    
}