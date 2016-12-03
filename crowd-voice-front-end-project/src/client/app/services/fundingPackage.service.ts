import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
 
import { FundingPackage } from '../models/index';
 
import { CONFIGURATION } from '../shared/app.constants';
 
@Injectable()
export class FundingPackageService {
    
    constructor(private http: Http) { }
    
    getFundingPackages(projectId: number, isLoggedIn: boolean) {
        let URL: string;
        let headers: Headers;
        let options: RequestOptions;
        
        if(isLoggedIn) {
            URL = CONFIGURATION.azureUrls.webApi+'api/projects/'+projectId+'/fundingPackages';
            //URL = 'http://viva5webapi.azurewebsites.net/api/projects/'+projectId+'/fundingPackages';
        
            options = this.jwt();
        }
        else {
            URL = CONFIGURATION.azureUrls.webApi+'api/projects/'+projectId+'/fundingPackages/allowAll';
            //URL = 'http://viva5webapi.azurewebsites.net/api/projects/'+projectId+'/fundingPackages/allowAll';
            
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
    
    getFundingPackageById(projectId: number, fundingPackageId: number, isLoggedIn: boolean) {
        
        let URL = CONFIGURATION.azureUrls.webApi+'api/projects/'+projectId+'/fundingPackages/'+fundingPackageId;
        //let URL = 'http://viva5webapi.azurewebsites.net/api/projects/'+projectId+'/fundingPackages/'+fundingPackageId;
        
        let options = this.jwt();
        
        return this.http.get(URL, options)
            .map((response: Response) => response.json())
            .catch(res => {
                console.log('CATCH: ', res.json());
                throw(res.json());
            });
    }
    
    getFundingPackageByIdForPaymentView(projectId: number, fundingPackageId: number, isLoggedIn: boolean) {
        
        let URL = CONFIGURATION.azureUrls.webApi+'api/projects/'+projectId+'/fundingPackages/'+fundingPackageId+'/forPaymentsView';
        //let URL = 'http://viva5webapi.azurewebsites.net/api/projects/'+projectId+'/fundingPackages/'+fundingPackageId+'/forPaymentsView';
        
        let options = this.jwt();
        
        return this.http.get(URL, options)
            .map((response: Response) => response.json())
            .catch(res => {
                console.log('CATCH: ', res.json());
                throw(res.json());
            });
    }
    
    createNewFundingPackage(projectId: number, newFundingPackage: FundingPackage) {
        
        let createFundingPackageURL = CONFIGURATION.azureUrls.webApi+'api/projects/'+projectId+'/fundingPackages';
        //let createFundingPackageURL = 'http://viva5webapi.azurewebsites.net/api/projects/'+projectId+'/fundingPackages';
        
        let options = this.jwt();
        
        let postRequestBody = JSON.stringify(newFundingPackage);
        
        return this.http.post(createFundingPackageURL, postRequestBody, options)
            .map((response: Response) => response)
            .catch(res => {
                console.log('CATCH: ', res);
                throw(res);
            });
    }
    
    editFundingPackage(projectId: number, fundingPackageId: number, editedFundingPackage: FundingPackage) {
        
        let editFundingPackageURL = CONFIGURATION.azureUrls.webApi+'api/projects/'+projectId+'/fundingPackages/'+fundingPackageId;
        //let editFundingPackageURL = 'http://viva5webapi.azurewebsites.net/api/projects/'+projectId+'/fundingPackages/'+fundingPackageId;
        
        let options = this.jwt();
        
        let postRequestBody = JSON.stringify(editedFundingPackage);
        
        return this.http.put(editFundingPackageURL, postRequestBody, options)
            .map((response: Response) => response)
            .catch(res => {
                console.log('CATCH: ', res.json());
                throw(res.json());
            });
    }
    
    deleteFundingPackage(projectId: number, fundingPackageId: number) {
        
        let deleteFundingPackageURL = CONFIGURATION.azureUrls.webApi+'api/projects/'+projectId+'/fundingPackages/'+fundingPackageId;
        //let deleteFundingPackageURL = 'http://viva5webapi.azurewebsites.net/api/projects/'+projectId+'/fundingPackages/'+fundingPackageId;
        
        let options = this.jwt();
        
        return this.http.delete(deleteFundingPackageURL, options)
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