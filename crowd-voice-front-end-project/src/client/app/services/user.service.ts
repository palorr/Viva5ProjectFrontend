import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { Project,GenericUser } from '../models/index';

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
                throw (res.json());
            });

    }

    getUserMainInfo(userId: number) {

        let userURL = 'http://localhost:56378/api/users/' + userId;

        let headers: Headers;
        let options: RequestOptions;

        headers = new Headers({
                'Accept': 'application/json', 
            });
            
        options = new RequestOptions({ headers: headers })

        return this.http.get(userURL, options)
            .map((response: Response) => response.json())
            .catch(res => {
                console.log('CATCH: ', res.json());
                throw(res.json());
            });
    }

    getUserBackedProjects(userId: number) {

        let projectsURL = 'http://localhost:56378/api/users/' + userId + '/userBackedProjects'

        let headers: Headers;
        let options: RequestOptions;

        headers = new Headers({
                'Accept': 'application/json', 
            });
            
        options = new RequestOptions({ headers: headers })

        return this.http.get(projectsURL, options)
            .map((response: Response) => response.json())
            .catch(res => {
                console.log('CATCH: ', res.json());
                throw(res.json());
            });
    }

    getUserCreatedProjects(userId: number){
        let projectsURL = 'http://localhost:56378/api/users/'+userId+'/userCreatedProjects' ; 

        let headers: Headers;
        let options: RequestOptions;

        headers = new Headers({
                'Accept': 'application/json', 
            });
            
        options = new RequestOptions({ headers: headers })

        return this.http.get(projectsURL, options)
            .map((response: Response) => response.json())
            .catch(res => {
                console.log('CATCH: ', res.json());
                throw(res.json());
            });


    }

    isRequestorThisUser(Username: string){
        
	    if (localStorage.getItem('currentUser').includes(Username)){
			 	
                return true ;
		 }
         return false ;
    }
    
    updateUser(user: GenericUser) {
        let editUserURL = 'http://localhost:56378/api/users/'+user.Id;
        
        let options = this.jwt();
        
        let putRequestBody = JSON.stringify(user);
        
        return this.http.put(editUserURL, putRequestBody, options)
            .map((response: Response) => response)
            .catch(res => {
                console.log('CATCH: ', res.json());
                throw(res.json());
            });
    }

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