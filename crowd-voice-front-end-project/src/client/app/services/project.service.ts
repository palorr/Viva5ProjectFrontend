import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Project, ProjectUpdate, VivaWalletToken, UserFunding  ,AttachmentModel} from '../models/index';

import { CONFIGURATION } from '../shared/app.constants';
 
@Injectable()
export class ProjectService {
    
    constructor(private http: Http) { }
    
    getAllProjects() {
        let allProjectsURL = CONFIGURATION.azureUrls.webApi+'api/projects';
        //let allProjectsURL = 'http://viva5webapi.azurewebsites.net/api/projects';
        
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
        let URL = CONFIGURATION.azureUrls.webApi+'api/projects/trending';
        //let URL = 'http://viva5webapi.azurewebsites.net/api/projects/trending';
        
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
        let URL = CONFIGURATION.azureUrls.webApi+'api/projects/lastTenBackedProjects';
        //let URL = 'http://viva5webapi.azurewebsites.net/api/projects/lastTenBackedProjects';
        
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
        let URL = CONFIGURATION.azureUrls.webApi+'api/projects/getAllProjectsByCategory/'+projectCategoryId;
        //let URL = 'http://viva5webapi.azurewebsites.net/api/projects/getAllProjectsByCategory/'+projectCategoryId;
        
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
        let URL = CONFIGURATION.azureUrls.webApi+'api/projects/getAllProjectsByName/'+searchTerm;
        //let URL = 'http://viva5webapi.azurewebsites.net/api/projects/getAllProjectsByName/'+searchTerm;
        
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
            projectURL = CONFIGURATION.azureUrls.webApi+'api/projects/'+projectId;
            //projectURL = 'http://viva5webapi.azurewebsites.net/api/projects/'+projectId;
        
            options = this.jwt();
        }
        else {
            projectURL = CONFIGURATION.azureUrls.webApi+'api/projects/'+projectId+'/allowAll';
            //projectURL = 'http://viva5webapi.azurewebsites.net/api/projects/'+projectId+'/allowAll';
            
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
        let projectURL = CONFIGURATION.azureUrls.webApi+'api/projects/projectCategories';
        //let projectURL = 'http://viva5webapi.azurewebsites.net/api/projects/projectCategories';
        
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
        let createProjectURL = CONFIGURATION.azureUrls.webApi+'api/projects';
        //let createProjectURL = 'http://viva5webapi.azurewebsites.net/api/projects';
        
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
        let editProjectURL = CONFIGURATION.azureUrls.webApi+'api/projects/'+project.Id;
        //let editProjectURL = 'http://viva5webapi.azurewebsites.net/api/projects/'+project.Id;
        
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
        let URL = CONFIGURATION.azureUrls.webApi+'api/projects/fundingPackages/'+fundingPackageId+'/checkout';
        //let URL = 'http://viva5webapi.azurewebsites.net/api/projects/fundingPackages/'+fundingPackageId+'/checkout';
        
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
        let URL = CONFIGURATION.azureUrls.webApi+'api/projects/'+projectId+'/fundings';
        //let URL = 'http://viva5webapi.azurewebsites.net/api/projects/'+projectId+'/fundings';
        
        let options = this.jwt();
        
        let postRequestBody = JSON.stringify(newFunding);
        
        return this.http.post(URL, postRequestBody, options)
            .map((response: Response) => response.json())
            .catch(res => {
                console.log('CATCH: ', res.json());
                throw(res.json());
            });
    }
    
    saveProjectAttachemetImage(attachment:AttachmentModel , projectId:number)
    {
        let URL = CONFIGURATION.azureUrls.webApi+'api/projects/'+projectId+'/image';
        //let URL ='http://viva5webapi.azurewebsites.net/api/projects/'+projectId+'/image';
        
        let options = this.jwt();

        let toSend = JSON.stringify(attachment);

        return this.http.post(URL , toSend , options)
        .map((response:Response) =>response.json())
       .catch(res => {
                console.log('CATCH: ', res.json());
                throw(res.json());
            });
    }

    getProjectAttachments(projectId :number)
    {
        let URL = CONFIGURATION.azureUrls.webApi+'api/projects/'+projectId+'/attachmets';
        //let URL ='http://viva5webapi.azurewebsites.net/api/projects/'+projectId+'/attachmets';
        
        let options = this.jwt();

        return this.http.get(URL ,  options)
        .map((response:Response) =>response.json())
       .catch(res => {
                console.log('CATCH: ', res.json());
                throw(res.json());
            });
    }

    deleteAttachment(attachmentId:number){
        let URL = CONFIGURATION.azureUrls.webApi+'api/projects/'+attachmentId+'/delete';
        //let URL ='http://viva5webapi.azurewebsites.net/api/projects/'+attachmentId+'/delete';
        
        let options = this.jwt();

        return this.http.post(URL ,  null, options)
        .map((response:Response) =>response.json())
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