import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Project, ProjectFromServer, ProjectUpdateFromServer, FundingPackageFromServer } from '../../models/index';

import { AlertService, ProjectService, ProjectUpdateService, FundingPackageService } from '../../services/index';

import { AuthGuard } from '../../guards/index';

/**
*	This class represents the lazy loaded ProjectProfileComponent.
*/

@Component({
	moduleId: module.id,
	selector: 'project-profile-cmp',
	templateUrl: 'projectProfile.component.html'
})
export class ProjectProfileComponent implements OnInit {
	id: number;
	
	project: ProjectFromServer;
	
	projectUpdates: ProjectUpdateFromServer[];
	
	fundingPackages: FundingPackageFromServer[];
	
	isRequestorProjectCreator: boolean = false;
	
	isRequestorLoggedIn: boolean = false;

    constructor(
		private route: ActivatedRoute,
        private router: Router,
        private alertService: AlertService,
		private projectService: ProjectService,
		private projectUpdateService: ProjectUpdateService,
		private fundingPackageService: FundingPackageService,
		private authGuard: AuthGuard
	) { }
 
    ngOnInit() {
		console.log("THIS>ROUTES>PARAMS: ", this.route.params);
    	this.route.params.forEach((params: Params) => {
			this.id = +params['id']; // (+) converts string 'id' to a number
			
			if(this.authGuard.isUserLoggedIn())
				this.isRequestorLoggedIn = true;
			
			this.projectService.getProjectById(this.id, this.isRequestorLoggedIn)
				.subscribe(
					(data: ProjectFromServer) => {
						if(data.IsRequestorProjectCreator)
							this.isRequestorProjectCreator = true;
							
						this.project = data;
						console.log('Project Profile View Data: ', this.project);
					},
					(err) => {
						this.alertService.error(err);
					}
				);
				
			this.projectUpdateService.getProjectUpdates(this.id, this.isRequestorLoggedIn)
				.subscribe(
					(data: ProjectUpdateFromServer[]) => {
						this.projectUpdates = data;
						console.log('Project Updates Data: ', this.projectUpdates);
					},
					(err) => {
						this.alertService.error(err);
					}
				);
				
			this.fundingPackageService.getFundingPackages(this.id, this.isRequestorLoggedIn)
				.subscribe(
					(data: FundingPackageFromServer[]) => {
						this.fundingPackages = data;
						console.log('Project Funding Packages Data: ', this.fundingPackages);
					},
					(err) => {
						this.alertService.error(err);
					}
				);
			
		});
	}

}
