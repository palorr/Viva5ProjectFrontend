import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

//import { Project } from '../models/project';

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
	
	//project: Project = new Project();
	
	loading = false;
 
    constructor(
		private route: ActivatedRoute,
        private router: Router,
        private alertService: AlertService,
		private projectService: ProjectService
	) { }
 
    ngOnInit() {
    	this.route.params.forEach((params: Params) => {
			let id = +params['id']; // (+) converts string 'id' to a number
			
			this.projectService.getAllProjects()
            .subscribe(
                (data) => {
                    console.log('RESPONSE FROM SERVICE: ', data);
                },
                (err) => {
                    this.alertService.error(err.error_description);
                });
			
		});
	}

}
