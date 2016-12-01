import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { Project, GenericUser } from '../models/index';

@Injectable()
export class UserService {

    constructor(private http: Http) { }

    getAllUsers() {
        let allUsersURL = 'http://viva5webapi.azurewebsites.net/api/users';

        let headers = new Headers({
            'Accept': 'application/json',
        });

        let options = new RequestOptions({ headers: headers })

        return this.http.get(allUsersURL, options)
            .map((response: Response) => response.json())
            .catch(res => {
                console.log('CATCH: ', res.json());
                throw (res.json());
            });

    }

    getLastTenUsers() {
        let URL = 'http://viva5webapi.azurewebsites.net/api/users/lastTen';

        let headers = new Headers({
            'Accept': 'application/json',
        });

        let options = new RequestOptions({ headers: headers })

        return this.http.get(URL, options)
            .map((response: Response) => response.json())
            .catch(res => {
                console.log('CATCH: ', res.json());
                throw (res.json());
            });

    }

    getUserMainInfo(userId: number) {

        let userURL = 'http://viva5webapi.azurewebsites.net/api/users/' + userId;

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
                throw (res.json());
            });
    }

    getUserBackedProjects(userId: number) {

        let projectsURL = 'http://viva5webapi.azurewebsites.net/api/users/' + userId + '/userBackedProjects'

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
                throw (res.json());
            });
    }

    getUserCreatedProjects(userId: number) {
        let projectsURL = 'http://viva5webapi.azurewebsites.net/api/users/' + userId + '/userCreatedProjects';

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
                throw (res.json());
            });


    }
    
    getAllUsersByName(searchTerm: string) {
        let URL = 'http://viva5webapi.azurewebsites.net/api/users/getAllUsersByName/' + searchTerm;

        let headers = new Headers({
            'Accept': 'application/json',
        });

        let options = new RequestOptions({ headers: headers });

        return this.http.get(URL, options)
            .map((response: Response) => response.json())
            .catch(res => {
                console.log('CATCH: ', res.json());
                throw (res.json());
            });

    }
    
    isRequestorThisUser(Username: string) {

        if (localStorage.getItem('currentUser').includes(Username)) {

            return true;
        }
        return false;
    }

    updateUser(user: GenericUser) {
        let editUserURL = 'http://viva5webapi.azurewebsites.net/api/users/';

        let options = this.jwt();

        let putRequestBody = JSON.stringify(user);

        return this.http.put(editUserURL, putRequestBody, options)
            .map((response: Response) => response)
            .catch(res => {
                console.log('CATCH: ', res.json());
                throw (res.json());
            });
    }

    getUserFundedCompletedProjects(showAll: boolean) {
        let URL = 'http://viva5webapi.azurewebsites.net/api/users/getUserFundedCompletedProjects';

        if (showAll) {
            URL = 'http://viva5webapi.azurewebsites.net/api/users/getUserFundedCompletedProjects/showAll';
        }

        let options = this.jwt();

        return this.http.get(URL, options)
            .map((response: Response) => response.json())
            .catch(res => {
                console.log('CATCH: ', res.json());
                throw (res.json());
            });
    }

    getUserFundedProjectsLatestUpdates() {
        let URL = 'http://viva5webapi.azurewebsites.net/api/users/getAllMyFundedProjectsLatestUpdates';

        let options = this.jwt();
        return this.http.get(URL, options)
            .map((response: Response) => response.json())
            .catch(res => {
                console.log('CATCH: ', res.json());
                throw (res.json());
            });
    }
    
    getAdminPanelInfo() {
        let URL = 'http://viva5webapi.azurewebsites.net/api/users/getAdminPanelInfo';

        let options = this.jwt();
        return this.http
                    .get(URL, options)
                    .map((response: Response) => response.json())
                    .catch(res => {
                        console.log('CATCH: ', res.json());
                        throw (res.json());
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