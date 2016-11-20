/* 
	The authorization guard is used to prevent unauthorized users from accessing restricted routes
*/

import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
 
@Injectable()
export class AuthorizationGuard {
 
    constructor(private router: Router) { }
    
    
    
}