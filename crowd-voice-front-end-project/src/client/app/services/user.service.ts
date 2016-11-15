import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
 
@Injectable()
export class UserService {
    
    constructor(private http: Http) { }
    
    getAllUsers() {
        let allUsersURL = 'http://localhost:56378/api/users';
        
        let headers = new Headers({
            'Accept': 'application/json', 
        });
        
        let options = new RequestOptions({ headers: headers });
        
        return this.http.get(allUsersURL, options)
            .map((response: Response) => {
                console.log('All Users Server Response: ', response);
            })
            .catch(res => {
                console.log('CATCH: ', res.json());
                throw(res.json());
            });
        
    }
 
    getUserMainInfo(userId: number) {
        
        let userURL = 'http://localhost:56378/api/users/'+userId;
        
        let headers = new Headers({
            'Accept': 'application/json', 
        });
        
        let options = new RequestOptions({ headers: headers });
        
        return this.http.get(userURL, options)
            .map((response: Response) => {
                console.log('Specific User Response: ', response);
            })
            .catch(res => {
                console.log('CATCH: ', res.json());
                throw(res.json());
            });
    }
 
}