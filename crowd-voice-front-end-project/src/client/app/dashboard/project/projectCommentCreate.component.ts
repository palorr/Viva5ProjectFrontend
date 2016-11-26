import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProjectComment, AuthorizationModel } from '../../models/index';

import { AlertService, ProjectCommentService } from '../../services/index';

import { AuthorizationGuard } from '../../guards/index';

@Component({
	moduleId: module.id,
	selector: 'project-comment-create-cmp',
	templateUrl: 'projectCommentCreate.component.html'
})
export class ProjectCommentCreateComponent implements OnInit {
	projectId: number;
	
	projectComment: ProjectComment = new ProjectComment();
	
	authModel: AuthorizationModel = new AuthorizationModel();
	
	loading = false;
	
	constructor(
		private route: ActivatedRoute,
        private router: Router,
        private alertService: AlertService,
		private projectCommentService: ProjectCommentService,
		private authorizationGuard: AuthorizationGuard
	) { }
	
    ngOnInit() {
		this.route.params.forEach((params: Params) => {
			this.projectId = +params['projectId'];
		});
	}
	
	createProjectComment() {
		this.loading = true;
		
		this.projectCommentService.createNewProjectComment(this.projectId, this.projectComment)
			.subscribe(
				(data) => {
					console.log('NEW PROJECT COMMENT CREATED: ', data);
					this.alertService.success('Project comment created successfully!');
					this.loading = false;
					//this.router.navigate(['/dashboard/projects/view/'+this.projectId]);
				},
				(err) => {
					this.alertService.error(err);
					this.loading = false;
				});
			
	}
   
}