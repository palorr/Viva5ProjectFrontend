import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Project } from '../models/index';
 
@Injectable()
export class ProjectService {
    
    constructor(private http: Http) { }
    
    getAllProjects() {
        let allProjectsURL = 'http://localhost:56378/api/projects';
        
        let headers = new Headers({
            'Accept': 'application/json', 
        });
        
        let options = new RequestOptions({ headers: headers });
        
        return this.http.get(allProjectsURL, options)
            .map((response: Response) => response.json())
            .catch(res => {
                console.log('CATCH: ', res.json());
                throw(res.json());
            });
        
    }
 
    getProjectById(projectId: number, isLoggedIn: boolean) {
        let projectURL: string;
        let headers: Headers;
        let options: RequestOptions;
        
        if(isLoggedIn) {
            projectURL = 'http://localhost:56378/api/projects/'+projectId;
        
            options = this.jwt();
        }
        else {
            projectURL = 'http://localhost:56378/api/projects/'+projectId+'/allowAll';
            
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
    
    getProjectCategories() {
        let projectURL = 'http://localhost:56378/api/projects/projectCategories';
        
        let headers = new Headers({
            'Accept': 'application/json', 
        });
        
        let options = new RequestOptions({ headers: headers });
        
        return this.http.get(projectURL, options)
            .map((response: Response) => response.json())
            .catch(res => {
                console.log('CATCH: ', res.json());
                throw(res.json());
            });
    }
    
    createNewProject(newProject: Project) {
        let createProjectURL = 'http://localhost:56378/api/projects';
        
        let options = this.jwt();
        
        let postRequestBody = JSON.stringify(newProject);
        
        return this.http.post(createProjectURL, postRequestBody, options)
            .map((response: Response) => response.json())
            .catch(res => {
                console.log('CATCH: ', res.json());
                throw(res.json());
            });
    }
    
    editProject(project: Project) {
        let editProjectURL = 'http://localhost:56378/api/projects/'+project.Id;
        
        let options = this.jwt();
        
        let putRequestBody = JSON.stringify(project);
        
        return this.http.put(editProjectURL, putRequestBody, options)
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