import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProjectCategory, Project, ProjectFromServer } from '../../models/index';

import { AlertService, ProjectService } from '../../services/index';

@Component({
	moduleId: module.id,
	selector: 'project-edit-cmp',
	templateUrl: 'projectEdit.component.html'
})
export class ProjectEditComponent implements OnInit {
	
	project: Project = new Project();
	
	projectFromServer: ProjectFromServer = new ProjectFromServer();
	
	loading = false;
	
	projectCategoryOptions: ProjectCategory[];
	
	constructor(
		private route: ActivatedRoute,
        private router: Router,
        private alertService: AlertService,
		private projectService: ProjectService
	) { }
	
    ngOnInit() {
		this.route.params.forEach((params: Params) => {
			let projectId = +params['id'];
			
			let isLoggedIn = false;
			
			let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        
			if (currentUser && currentUser.user.access_token) {
				isLoggedIn = true;
			}
			
			this.projectService.getProjectById(projectId, isLoggedIn)
					.subscribe(
						(data: ProjectFromServer) => {
							if(!data.IsRequestorProjectCreator) {
								this.alertService.error("You are not authorized to edit this project. You are not the project creator!", true);
								this.router.navigate(['/dashboard/home']);
								return;
							}
							this.project = data;
							console.log('Project Data: ', this.project);
						},
						(err) => {
							this.alertService.error(err.Message);
						}
					);
			
			
			this.projectService.getProjectCategories()
			.subscribe(
                (data: ProjectCategory[]) => {
					this.projectCategoryOptions = data;
                    console.log('Project Categories Data: ', this.projectCategoryOptions);
                },
                (err) => {
                    this.alertService.error(err.error_description);
                }
			);
			
		});
	}
	
	editProject() {
		this.loading = true;
		
        console.log("Project to send: ", this.project);
        
        this.projectService.editProject(this.project)
            .subscribe(
                (data) => {
                    // set success message and pass true paramater to persist the message
                    this.alertService.success('Project edited successfully!', true);
                },
                (err) => {
                    let errorString = "";
                    
                    for(let element in err.modelState) {
                        err.modelState[element].forEach((errorMsg: string) => {
                            errorString += errorMsg + "\n\n"; 
                        });
                    }
                    
                    this.alertService.error(errorString);
                    this.loading = false;
                });
	}
   
}