import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ProjectStat } from '../models/index';

import { CONFIGURATION } from '../shared/app.constants';
 
@Injectable()
export class ProjectStatService {
    
    constructor(private http: Http) { }
    
    getProjectStatById(projectId: number, isLoggedIn: boolean) {
        let projectURL: string;
        let headers: Headers;
        let options: RequestOptions;
		
		if(isLoggedIn) {
            projectURL = CONFIGURATION.azureUrls.webApi+'api/projects/'+projectId+'/stats';
            //projectURL = 'http://viva5webapi.azurewebsites.net/api/projects/'+projectId+'/stats';
        
            options = this.jwt();
        }
        else {
            projectURL = CONFIGURATION.azureUrls.webApi+'api/projects/'+projectId+'/stats/allowAll';
            //projectURL = 'http://viva5webapi.azurewebsites.net/api/projects/'+projectId+'/stats/allowAll';
            
            headers = new Headers({
                'Accept': 'application/json', 
            });
            
            options = new RequestOptions({ headers: headers })
        }
        
        return this.http.get(projectURL, options)
            .map((response: Response) => response.json())
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