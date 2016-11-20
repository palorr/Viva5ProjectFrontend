import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Project, ProjectFromServer } from '../../models/index';

import { AlertService, ProjectService } from '../../services/index';

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
	
	project: ProjectFromServer;
	
	isRequestorProjectCreator: boolean = false;
	
	isRequestorLoggedIn: boolean = false;

    constructor(
		private route: ActivatedRoute,
        private router: Router,
        private alertService: AlertService,
		private projectService: ProjectService,
		private authGuard: AuthGuard
	) { }
 
    ngOnInit() {
		console.log("THIS>ROUTES>PARAMS: ", this.route.params);
    	this.route.params.forEach((params: Params) => {
			let id = +params['id']; // (+) converts string 'id' to a number
			
			if(this.authGuard.isUserLoggedIn())
				this.isRequestorLoggedIn = true;
			
			this.projectService.getProjectById(id, this.isRequestorLoggedIn)
				.subscribe(
					(data: ProjectFromServer) => {
						if(data.IsRequestorProjectCreator)
							this.isRequestorProjectCreator = true;
							
						this.project = data;
						console.log('Project Profile View Data: ', this.project);
					},
					(err) => {
						this.alertService.error(err.error_description);
					}
				);
			
		});
	}

}
