import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProjectCategory, Project } from '../../models/index';

import { AlertService, ProjectService } from '../../services/index';

@Component({
	moduleId: module.id,
	selector: 'project-create-cmp',
	templateUrl: 'projectCreate.component.html'
})
export class ProjectCreateComponent implements OnInit {
	
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
        //this.authGuard.canActivate();
        
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
	}
	
	createProject() {
		this.loading = true;
		
        console.log("Project to send: ", this.project);
        
        //TODO - CONVERT MONTHS TO DATETIME FOR .NET WEB API NOT TO COMPLAIN
        this.project.FundingEndDate = "2016-12-16 16:14:03.247";
        
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