import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ProjectComment } from '../models/index';
 
@Injectable()
export class ProjectCommentService {
    
    constructor(private http: Http) { }
    
    getProjectComments(projectId: number, isLoggedIn: boolean) {
        let URL: string;
        let headers: Headers;
        let options: RequestOptions;
        
        if(isLoggedIn) {
            URL = 'http://localhost:56378/api/projects/'+projectId+'/comments';
        
            options = this.jwt();
        }
        else {
            URL = 'http://localhost:56378/api/projects/'+projectId+'/comments/allowAll';
            
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
        
        URL = 'http://localhost:56378/api/projects/getAllCurrentUserCreatedProjectComments';
        
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
        
        URL = 'http://localhost:56378/api/projects/'+projectId+'/comments/'+commentId;
        
        options = this.jwt();
        
        return this.http.get(URL, options)
            .map((response: Response) => response.json())
            .catch(res => {
                console.log('CATCH: ', res.json());
                throw(res.json());
            });
    }
    
    createNewProjectComment(projectId: number, newProjectComment: ProjectComment) {
        let createProjectCommentURL = 'http://localhost:56378/api/projects/'+projectId+'/comments';
        
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
        let editProjectCommentURL = 'http://localhost:56378/api/projects/'+projectId+'/comments/'+commentId;
        
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
        let deleteProjectCommentURL = 'http://localhost:56378/api/projects/'+projectId+'/comments/'+commentId;
        
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