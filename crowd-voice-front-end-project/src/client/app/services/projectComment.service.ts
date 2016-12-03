import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ProjectComment } from '../models/index';

import { CONFIGURATION } from '../shared/app.constants';
 
@Injectable()
export class ProjectCommentService {
    
    constructor(private http: Http) { }
    
    getProjectComments(projectId: number, isLoggedIn: boolean) {
        let URL: string;
        let headers: Headers;
        let options: RequestOptions;
        
        if(isLoggedIn) {
            URL = CONFIGURATION.azureUrls.webApi+'api/projects/'+projectId+'/comments';
            //URL = 'http://viva5webapi.azurewebsites.net/api/projects/'+projectId+'/comments';
        
            options = this.jwt();
        }
        else {
            URL = CONFIGURATION.azureUrls.webApi+'api/projects/'+projectId+'/comments/allowAll';
            //URL = 'http://viva5webapi.azurewebsites.net/api/projects/'+projectId+'/comments/allowAll';
            
            headers = new Headers({
                'Accept': 'application/json', 
            });
            
            options = new RequestOptions({ headers: headers })
        }
        
        return this.http.get(URL, options)
            .map((response: Response) => response.json())
            .catch(res => {
                console.log('CATCH: ', res.json());
                throw(res.json());
            });
    }
    
    getAllCurrentUserCreatedProjectComments() {
        let URL: string;
        let headers: Headers;
        let options: RequestOptions;
        
        URL = CONFIGURATION.azureUrls.webApi+'api/projects/getAllCurrentUserCreatedProjectComments';
        //URL = 'http://viva5webapi.azurewebsites.net/api/projects/getAllCurrentUserCreatedProjectComments';
        
        options = this.jwt();
        
        return this.http.get(URL, options)
            .map((response: Response) => response.json())
            .catch(res => {
                console.log('CATCH: ', res.json());
                throw(res.json());
            });
    }
    
    getProjectCommentById(projectId: number, commentId: number) {
        let URL: string;
        let headers: Headers;
        let options: RequestOptions;
        
        URL = CONFIGURATION.azureUrls.webApi+'api/projects/'+projectId+'/comments/'+commentId;
        //URL = 'http://viva5webapi.azurewebsites.net/api/projects/'+projectId+'/comments/'+commentId;
        
        options = this.jwt();
        
        return this.http.get(URL, options)
            .map((response: Response) => response.json())
            .catch(res => {
                console.log('CATCH: ', res.json());
                throw(res.json());
            });
    }
    
    createNewProjectComment(projectId: number, newProjectComment: ProjectComment) {
        
        let createProjectCommentURL = CONFIGURATION.azureUrls.webApi+'api/projects/'+projectId+'/comments';
        //let createProjectCommentURL = 'http://viva5webapi.azurewebsites.net/api/projects/'+projectId+'/comments';
        
        let options = this.jwt();
        
        let postRequestBody = JSON.stringify(newProjectComment);
        
        return this.http.post(createProjectCommentURL, postRequestBody, options)
            .map((response: Response) => response)
            .catch(res => {
                console.log('CATCH: ', res);
                throw(res);
            });
    }
    
    editProjectComment(projectId: number, commentId: number, editedProjectComment: ProjectComment) {
        
        let editProjectCommentURL = CONFIGURATION.azureUrls.webApi+'api/projects/'+projectId+'/comments/'+commentId;
        //let editProjectCommentURL = 'http://viva5webapi.azurewebsites.net/api/projects/'+projectId+'/comments/'+commentId;
        
        let options = this.jwt();
        
        let postRequestBody = JSON.stringify(editedProjectComment);
        
        return this.http.post(editProjectCommentURL, postRequestBody, options)
            .map((response: Response) => response)
            .catch(res => {
                console.log('CATCH: ', res.json());
                throw(res.json());
            });
    }
    
    deleteProjectComment(projectId: number, commentId: number) {
        
        let deleteProjectCommentURL = CONFIGURATION.azureUrls.webApi+'api/projects/'+projectId+'/comments/'+commentId;
        //let deleteProjectCommentURL = 'http://viva5webapi.azurewebsites.net/api/projects/'+projectId+'/comments/'+commentId;
        
        let options = this.jwt();
        
        return this.http.delete(deleteProjectCommentURL, options)
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