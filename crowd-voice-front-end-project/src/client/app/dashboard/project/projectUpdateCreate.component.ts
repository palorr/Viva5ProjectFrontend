import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProjectUpdate, AuthorizationModel } from '../../models/index';

import { AlertService, ProjectUpdateService } from '../../services/index';

import { AuthorizationGuard } from '../../guards/index';
@Component({
	moduleId: module.id,
	selector: 'project-update-create-cmp',
	templateUrl: 'projectUpdateCreate.component.html'
})
export class ProjectUpdateCreateComponent implements OnInit {
	projectId: number;
	
	projectUpdate: ProjectUpdate = new ProjectUpdate();
	
	authModel: AuthorizationModel = new AuthorizationModel();
	
	loading = false;
	
	constructor(
		private route: ActivatedRoute,
        private router: Router,
        private alertService: AlertService,
		private projectUpdateService: ProjectUpdateService,
		private authorizationGuard: AuthorizationGuard
	) { }
	
    ngOnInit() {
		this.route.params.forEach((params: Params) => {
			this.projectId = +params['id'];
			this.authorizationGuard.isRequestorProjectCreator(this.projectId)
			 	.subscribe(
					(data: AuthorizationModel) => {
						console.log('DATA FROM AUTHMODEL: ', data);
						
						if(!data.IsAllowed) {
							this.alertService.error("You are not authorized to create an update for this project. You are not the project creator!", true);
							this.router.navigate(['/dashboard/home']);
							return;	
						}
					},
					error =>  {
						console.log(error);
					}
				);
		});
	}
	
	createProjectUpdate() {
		this.loading = true;
		
		this.projectUpdateService.createNewProjectUpdate(this.projectId, this.projectUpdate)
			.subscribe(
				(data) => {
					console.log('NEW PROJECT UPDATE CREATED: ', data);
					// set success message and pass true paramater to persist the message after redirecting
					this.alertService.success('Project update created successfully!');
					
					this.loading = false;
					
					//this.router.navigate(['/dashboard/projects/view/'+this.projectId]);
				},
				(err) => {
					this.alertService.error(err);
					this.loading = false;
				});
			
	}
   
}