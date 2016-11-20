import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProjectCategory, Project } from '../../models/index';

import { AlertService, ProjectService } from '../../services/index';

@Component({
	moduleId: module.id,
	selector: 'project-edit-cmp',
	templateUrl: 'projectEdit.component.html'
})
export class ProjectEditComponent implements OnInit {
	
	project: Project = new Project();
	
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
			console.log('THE PARAMS IN');
			
			let projectId = +params['id'];
			
			this.projectService.getProjectById(projectId)
				.subscribe(
					(data: Project) => {
						this.project = data;
						console.log('Project Data: ', this.project);
					},
					(err) => {
						this.alertService.error(err.error_description);
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
        
        //TODO - CONVERT MONTHS TO DATETIME FOR .NET WEB API NOT TO COMPLAIN
        let today = new Date();
        let period = new Date(today.setMonth(today.getMonth() + Number(this.project.FundingEndDate)));
        this.project.FundingEndDate = period.toISOString();
        
        this.projectService.createNewProject(this.project)
            .subscribe(
                (data) => {
                    // set success message and pass true paramater to persist the message after redirecting to the login page
                    this.alertService.success('Project created successfully!', true);
                    //this.router.navigate(['/login']);
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