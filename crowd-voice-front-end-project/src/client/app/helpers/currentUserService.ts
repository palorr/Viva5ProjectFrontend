import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class CurrentUserService {
    
    constructor(private http: Http) { }
   
    getUserMainInfo() {
        
        let userURL = 'http://localhost:56378/api/users/findByUsername';
        
        let options = this.jwt();
        
        let username = JSON.parse(localStorage.getItem('currentUser')).username;
        
        let postRequestBody = JSON.stringify({
            username: username
        });
        
        return this.http.post(userURL, postRequestBody, options)
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