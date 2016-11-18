import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Project } from '../../models/index';

import { AlertService, ProjectService } from '../../services/index';

/**
*	This class represents the lazy loaded ProjectProfileComponent.
*/

@Component({
	moduleId: module.id,
	selector: 'project-profile-cmp',
	templateUrl: 'projectProfile.component.html'
})
export class ProjectProfileComponent implements OnInit {
	
	project: Project;

    constructor(
		private route: ActivatedRoute,
        private router: Router,
        private alertService: AlertService,
		private projectService: ProjectService
	) { }
 
    ngOnInit() {
		console.log("THIS>ROUTES>PARAMS: ", this.route.params);
    	this.route.params.forEach((params: Params) => {
			let id = +params['id']; // (+) converts string 'id' to a number
			
			this.projectService.getProjectById(id)
            .subscribe(
                (data: Project) => {
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
