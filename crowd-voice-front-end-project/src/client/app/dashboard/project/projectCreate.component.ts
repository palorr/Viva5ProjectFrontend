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
                    this.alertService.error('I am sorry, something went wrong. Please try again later!');
                }
			);
	}
	
	createProject() {
		this.loading = true;
		
        console.log("Project to send: ", this.project);
        
        //TODO - CONVERT MONTHS TO DATETIME FOR .NET WEB API NOT TO COMPLAIN
        let today = new Date();
        let period = new Date(today.setMonth(today.getMonth() + Number(this.project.FundingEndDate)));
        this.project.FundingEndDate = period.toISOString();
        
        this.projectService.createNewProject(this.project)
            .subscribe(
                (data) => {
                    console.log('NEW PROJECT CREATED: ', data);
                    // set success message and pass true paramater to persist the message after redirecting
                    this.alertService.success('Project created successfully!', true);
                    
                    this.loading = false;
                    
                    this.router.navigate(['/dashboard/projects/edit/'+data]);
                },
                (err) => {
                    this.alertService.error('I am sorry, something went wrong. Please try again later!');
					this.loading = false;
                });
	}
   
}