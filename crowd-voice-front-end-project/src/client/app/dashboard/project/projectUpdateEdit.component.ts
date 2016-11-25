import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProjectUpdate, ProjectUpdateFromServer } from '../../models/index';

import { AlertService, ProjectUpdateService } from '../../services/index';

@Component({
	moduleId: module.id,
	selector: 'project-update-edit-cmp',
	templateUrl: 'projectUpdateEdit.component.html'
})
export class ProjectUpdateEditComponent implements OnInit {
	
	projectUpdateFromServer: ProjectUpdateFromServer = new ProjectUpdateFromServer();
	
	projectId: number;
	
	updateId: number;
	
	loading = false;
	
	constructor(
		private route: ActivatedRoute,
        private router: Router,
        private alertService: AlertService,
		private projectUpdateService: ProjectUpdateService
	) { }
	
    ngOnInit() {
		this.route.params.forEach((params: Params) => {
			this.projectId = +params['projectId'];
			this.updateId = +params['updateId'];
			
			let isLoggedIn = false;
			
			let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        
			if (currentUser && currentUser.user.access_token) {
				isLoggedIn = true;
			}
			
			this.projectUpdateService.getProjectUpdateById(this.projectId, this.updateId, isLoggedIn)
					.subscribe(
						(data: ProjectUpdateFromServer) => {
							console.log('EDIT UPDATE VIEW DATA: ', data);
							
							if(!data.IsRequestorProjectCreator) {
								this.alertService.error("You are not authorized to edit this project update. You are not the project creator!", true);
								this.router.navigate(['/dashboard/projects/view/', this.projectId]);
								return;
							}
							this.projectUpdateFromServer = data;
							console.log('Project Update Data: ', this.projectUpdateFromServer);
						},
						(err) => {
							this.alertService.error(err.Message);
						}
					);
			
		});
	}
	
	editProjectUpdate() {
		
		this.loading = true;
		
		this.projectUpdateService.editProjectUpdate(this.projectId, this.updateId, this.projectUpdateFromServer)
			.subscribe(
				(data) => {
					console.log('SUCCESS IN EDIT: ', data);
					// set success message
					this.alertService.success('Project update edited successfully!');
					this.loading = false;
				},
				(err) => {
					console.log('ERROR IN EDIT: ', err);
					
					this.alertService.error(err);
					this.loading = false;
				});	
		
	}
	
	deleteProjectUpdate() {
		
		var r = confirm("Are you sure you want to delete this project update?");
		if (!r) {
			return false;
		}
		
		else {
			this.loading = true;
			
			this.projectUpdateService.deleteProjectUpdate(this.projectId, this.updateId)
					.subscribe(
						(data) => {
							console.log('SUCCESS IN DELETE: ', data);
							// set success message
							this.alertService.success('Project update deleted successfully!', true);
							this.loading = false;
							
							this.router.navigate(['/dashboard/projects/view/'+this.projectId]);
						},
						(err) => {
							this.alertService.error(err);
							this.loading = false;
						});	
		}
		
		return true;
		
	}
   
}