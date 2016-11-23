import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ProjectExternalShare } from '../models/index';
 
@Injectable()
export class ProjectExternalShareService {
    
    constructor(private http: Http) { }
    
    createExternalShare(projectId: number, newProjectExternalShare: ProjectExternalShare) {
        
		let URL = 'http://localhost:56378/api/projects/'+projectId+'/externalShares';
        
        let postRequestBody = JSON.stringify(newProjectExternalShare);
        
        let options = this.jwt();
        
        return this.http.post(URL, postRequestBody, options)
            			.map((response: Response) => response)
						.catch(res => {
							console.log('CATCH: ', res);
							throw(res);
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