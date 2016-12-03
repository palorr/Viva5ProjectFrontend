import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ProjectUpdate } from '../models/index';

import { CONFIGURATION } from '../shared/app.constants';
 
@Injectable()
export class ProjectUpdateService {
    
    constructor(private http: Http) { }
    
    getProjectUpdates(projectId: number, isLoggedIn: boolean) {
        let projectURL: string;
        let headers: Headers;
        let options: RequestOptions;
        
        if(isLoggedIn) {
            projectURL = CONFIGURATION.azureUrls.webApi+'api/projects/'+projectId+'/updates';
            //projectURL = 'http://viva5webapi.azurewebsites.net/api/projects/'+projectId+'/updates';
        
            options = this.jwt();
        }
        else {
            projectURL = CONFIGURATION.azureUrls.webApi+'api/projects/'+projectId+'/updates/allowAll';
            //projectURL = 'http://viva5webapi.azurewebsites.net/api/projects/'+projectId+'/updates/allowAll';
            
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
    
    getProjectUpdateById(projectId: number, updateId: number, isLoggedIn: boolean) {
        let headers: Headers;
        
        let projectURL = CONFIGURATION.azureUrls.webApi+'api/projects/'+projectId+'/updates/'+updateId;
        //let projectURL = 'http://viva5webapi.azurewebsites.net/api/projects/'+projectId+'/updates/'+updateId;
        
        let options = this.jwt();
        
        return this.http.get(projectURL, options)
            .map((response: Response) => response.json())
            .catch(res => {
                console.log('CATCH: ', res.json());
                throw(res.json());
            });
    }
    
    createNewProjectUpdate(projectId: number, newProjectUpdate: ProjectUpdate) {
        let createProjectUpdateURL = CONFIGURATION.azureUrls.webApi+'api/projects/'+projectId+'/updates';
        //let createProjectUpdateURL = 'http://viva5webapi.azurewebsites.net/api/projects/'+projectId+'/updates';
        
        let options = this.jwt();
        
        let postRequestBody = JSON.stringify(newProjectUpdate);
        
        return this.http.post(createProjectUpdateURL, postRequestBody, options)
            .map((response: Response) => response)
            .catch(res => {
                console.log('CATCH: ', res);
                throw(res);
            });
    }
    
    editProjectUpdate(projectId: number, updateId: number, editedProjectUpdate: ProjectUpdate) {
        let editProjectUpdateURL = CONFIGURATION.azureUrls.webApi+'api/projects/'+projectId+'/updates/'+updateId;
        //let editProjectUpdateURL = 'http://viva5webapi.azurewebsites.net/api/projects/'+projectId+'/updates/'+updateId;
        
        let options = this.jwt();
        
        let postRequestBody = JSON.stringify(editedProjectUpdate);
        
        return this.http.post(editProjectUpdateURL, postRequestBody, options)
            .map((response: Response) => response)
            .catch(res => {
                console.log('CATCH: ', res.json());
                throw(res.json());
            });
    }
    
    deleteProjectUpdate(projectId: number, updateId: number) {
        let deleteProjectUpdateURL = CONFIGURATION.azureUrls.webApi+'api/projects/'+projectId+'/updates/'+updateId;
        //let deleteProjectUpdateURL = 'http://viva5webapi.azurewebsites.net/api/projects/'+projectId+'/updates/'+updateId;
        
        let options = this.jwt();
        
        return this.http.delete(deleteProjectUpdateURL, options)
            .map((response: Response) => response)
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