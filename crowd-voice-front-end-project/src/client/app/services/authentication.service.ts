import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
 
@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }
 
    login(username: string, password: string) {
        
        let loginURL = 'http://viva5authserver.azurewebsites.net/oauth2/token';
        
        let headers = new Headers({ 
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        
        let postRequestBody = 'grant_type=password&username='+username+'&password='+password+'&client_id=8737e3f7a7984167b4d09f658a76bf32';
        
        //JSON.stringify({ grant_type: 'password', username: username, password: password })
        
        let options = new RequestOptions({ headers: headers });
        
        return this.http.post(loginURL, postRequestBody, options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                console.log('Response: ', response.json());
                let user = response.json();
                if (user && user.access_token) {
                    
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    let userDetails = {
                        'user': user,
                        'username': username
                    }
                    
                    localStorage.setItem('currentUser', JSON.stringify(userDetails));
                }
            })
            .catch(res => {
                console.log('CATCH: ', res.json());
                throw(res.json());
            });
    }
 
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}