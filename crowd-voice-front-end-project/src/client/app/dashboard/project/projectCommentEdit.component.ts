import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProjectComment, ProjectCommentFromServer } from '../../models/index';

import { AlertService, ProjectCommentService } from '../../services/index';

@Component({
	moduleId: module.id,
	selector: 'project-comment-edit-cmp',
	templateUrl: 'projectCommentEdit.component.html'
})
export class ProjectCommentEditComponent implements OnInit {
	
	projectCommentFromServer: ProjectCommentFromServer = new ProjectCommentFromServer();
	
	projectId: number;
	
	commentId: number;
	
	loading = false;
	
	constructor(
		private route: ActivatedRoute,
        private router: Router,
        private alertService: AlertService,
		private projectCommentService: ProjectCommentService
	) { }
	
    ngOnInit() {
		this.route.params.forEach((params: Params) => {
			this.projectId = +params['projectId'];
			this.commentId = +params['commentId'];
			
			let isLoggedIn = false;
			
			let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        
			if (currentUser && currentUser.user.access_token) {
				isLoggedIn = true;
			}
			
			this.projectCommentService.getProjectCommentById(this.projectId, this.commentId)
					.subscribe(
						(data: ProjectCommentFromServer) => {
							console.log('EDIT COMMENT VIEW DATA: ', data);
							
							if(!data.IsRequestorProjectCommentCreator) {
								this.alertService.error("You are not authorized to edit this project comment. You are not the comment creator!", true);
								this.router.navigate(['/dashboard/projects/view/', this.projectId]);
								return;
							}
							this.projectCommentFromServer = data;
							console.log('Project Comment Data: ', this.projectCommentFromServer);
						},
						(err) => {
							this.alertService.error(err.Message);
						}
					);
			
		});
	}
	
	editProjectComment() {
		
		this.loading = true;
		
		this.projectCommentService.editProjectComment(this.projectId, this.commentId, this.projectCommentFromServer)
			.subscribe(
				(data) => {
					console.log('SUCCESS IN COMMENT EDIT: ', data);
					// set success message
					this.alertService.success('Project comment edited successfully!');
					this.loading = false;
				},
				(err) => {
					console.log('ERROR IN COMMENT EDIT: ', err);
					
					this.alertService.error(err);
					this.loading = false;
				});	
		
	}
	
	deleteProjectComment() {
		
		var r = confirm("Are you sure you want to delete this project comment?");
		if (!r) {
			return false;
		}
		
		else {
			this.loading = true;
			
			this.projectCommentService.deleteProjectComment(this.projectId, this.commentId)
					.subscribe(
						(data) => {
							console.log('SUCCESS IN DELETE COMMENT: ', data);
							// set success message
							this.alertService.success('Project comment deleted successfully!', true);
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