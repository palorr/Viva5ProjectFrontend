/* 
	The authorization guard is used to prevent unauthorized users from accessing restricted routes
*/

import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, CanActivate, Params } from '@angular/router';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
 
@Injectable()
export class AuthorizationGuard {
 
    constructor(
		private router: Router,
		private http: Http,
        private activatedRoute: ActivatedRoute
	) { }
    
    isRequestorProjectCreator(projectId: number): boolean {
		
		if(!localStorage.getItem('currentUser'))
			return false;
        
		let url = 'http://localhost:56378/api/projects/'+projectId+'/isCurrentUserProjectCreator';
        
        let options = this.jwt();
        
        return this.http.get(url, options)
            .map((response: Response) => {
				console.log('ISREQUESTORCREATOR: ', response);
				return response.json();
			})
            .catch(res => {
                console.log('CATCH: ', res.json());
                throw(res.json());
            });
		
	}
	
	// private helper methods
 
    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        
        if (currentUser && currentUser.user.access_token) {
            
            let headers = new Headers({
                'Content-Type': 'application/json', 
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + currentUser.user.access_token
            });
            
            return new RequestOptions({ headers: headers });
        } 
        
        else {
            return new RequestOptions({});
        }
    }
    
}