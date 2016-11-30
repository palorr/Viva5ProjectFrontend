import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Project, ProjectUpdate, VivaWalletToken, UserFunding } from '../models/index';
 
@Injectable()
export class ProjectService {
    
    constructor(private http: Http) { }
    
    getAllProjects() {
        let allProjectsURL = 'http://viva5webapi.azurewebsites.net/api/projects';
        
        let headers = new Headers({
            'Accept': 'application/json', 
        });
        
        let options = new RequestOptions({ headers: headers });
        
        return this.http.get(allProjectsURL, options)
            .map((response: Response) => response.json())
            .catch(res => {
                throw(res.json());
            });
        
    }
    
    getTrendingProjects() {
        let URL = 'http://viva5webapi.azurewebsites.net/api/projects/trending';
        
        let headers = new Headers({
            'Accept': 'application/json'
        });
        
        let options = new RequestOptions({ headers: headers });
        
        return this.http
                   .get(URL, options)
                   .map((response: Response) => response.json())
                   .catch(err => {
                       throw(err.json());
                   });
        
    }

    getLastTenBackedProjects(){
        let URL = 'http://viva5webapi.azurewebsites.net/api/projects/lastTenBackedProjects';
        
        let headers = new Headers({
            'Accept': 'application/json'
        });
        
        let options = new RequestOptions({ headers: headers });
        
        return this.http
                   .get(URL, options)
                   .map((response: Response) => response.json())
                   .catch(err => {
                       throw(err.json());
                   });
    }
    
    getAllProjectsByCategory(projectCategoryId: number) {
        let URL = 'http://viva5webapi.azurewebsites.net/api/projects/getAllProjectsByCategory/'+projectCategoryId;
        
        let headers = new Headers({
            'Accept': 'application/json', 
        });
        
        let options = new RequestOptions({ headers: headers });
        
        return this.http.get(URL, options)
            .map((response: Response) => response.json())
            .catch(res => {
                console.log('CATCH: ', res.json());
                throw(res.json());
            });
        
    }
    
    getAllProjectsByName(searchTerm: string) {
        let URL = 'http://viva5webapi.azurewebsites.net/api/projects/getAllProjectsByName/'+searchTerm;
        
        let headers = new Headers({
            'Accept': 'application/json', 
        });
        
        let options = new RequestOptions({ headers: headers });
        
        return this.http.get(URL, options)
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
            projectURL = 'http://viva5webapi.azurewebsites.net/api/projects/'+projectId;
        
            options = this.jwt();
        }
        else {
            projectURL = 'http://viva5webapi.azurewebsites.net/api/projects/'+projectId+'/allowAll';
            
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
        let projectURL = 'http://viva5webapi.azurewebsites.net/api/projects/projectCategories';
        
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
        let createProjectURL = 'http://viva5webapi.azurewebsites.net/api/projects';
        
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
        let editProjectURL = 'http://viva5webapi.azurewebsites.net/api/projects/'+project.Id;
        
        let options = this.jwt();
        
        let putRequestBody = JSON.stringify(project);
        
        return this.http.put(editProjectURL, putRequestBody, options)
            .map((response: Response) => response)
            .catch(res => {
                console.log('CATCH: ', res.json());
                throw(res.json());
            });
    }
    
    completeVivaPayment(fundingPackageId: number, vivaToken: VivaWalletToken) {
        let URL = 'http://viva5webapi.azurewebsites.net/api/projects/fundingPackages/'+fundingPackageId+'/checkout';
        
        let options = this.jwt();
        
        let postRequestBody = JSON.stringify(vivaToken);
        
        return this.http.post(URL, postRequestBody, options)
                    .map((response: Response) => response.json())
                    .catch(res => {
                        console.log('CATCH: ', res.json());
                        throw(res.json());
                    });
    }
    
    saveTransaction(newFunding: UserFunding, projectId: number) {
        let URL = 'http://viva5webapi.azurewebsites.net/api/projects/'+projectId+'/fundings';
        
        let options = this.jwt();
        
        let postRequestBody = JSON.stringify(newFunding);
        
        return this.http.post(URL, postRequestBody, options)
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