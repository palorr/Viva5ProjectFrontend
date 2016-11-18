import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
 
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
 
    getProjectById(projectId: number) {
        
        let projectURL = 'http://localhost:56378/api/projects/'+projectId;
        
        let headers = new Headers({
            'Accept': 'application/json', 
        });
        
        let options = new RequestOptions({ headers: headers });
        
        return this.http.get(projectURL, options)
            .map((response: Response) => {
                console.log('Specific Project Response: ', response);
            })
            .catch(res => {
                console.log('CATCH: ', res.json());
                throw(res.json());
            });
    }
 
}