import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { CONFIGURATION } from '../shared/app.constants';

@Injectable()
export class RegistrationService {
    constructor(private http: Http) { }
 
    registerUser(username: string, name: string, password: string, confirmPassword: string) {
        
        let registerURL = CONFIGURATION.azureUrls.authServer+'api/account/register';
        //let registerURL = 'http://viva5authserver.azurewebsites.net/api/account/register';
        //let registerURL = 'http://localhost:56478/api/account/register';
        
        let headers = new Headers({
            'Accept': 'application/json', 
            'Content-Type': 'application/json'
        });
        
        let postRequestBody = JSON.stringify({ 
			username: username, 
            name: name,
            password: password,
			confirmPassword: confirmPassword
		});
        
        let options = new RequestOptions({ headers: headers });
        
        return this.http.post(registerURL, postRequestBody, options)
            .map((response: Response) => {
                //console.log('Register Server Response: ', response);
            })
            .catch(res => {
                console.log('CATCH: ', res.json());
                throw(res.json());
            });
    }
 
}