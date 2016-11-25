import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProjectService, AlertService } from '../../services/index';
import { Project, ProjectCategory } from '../../models/index';

@Component({
	moduleId: module.id,
    selector: 'project-search-cmp',
    templateUrl: 'projectSearch.component.html'
})

export class ProjectSearchComponent implements OnInit { 
	
	projectCategoryOptions: ProjectCategory[];
	
	projects: Project[];
    
	constructor(
        private route: ActivatedRoute,
        private projectService: ProjectService,
		private alertService: AlertService
	) {}
	
	ngOnInit() {
        this.projectService.getProjectCategories()
			.subscribe(
                (data: ProjectCategory[]) => {
					this.projectCategoryOptions = data;
                    console.log('Project Categories Data: ', this.projectCategoryOptions);
                },
                (err) => {
                    this.alertService.error(err);
                }
			);
    }
    
    onChange(projectCategoryId: number): any {
        if(projectCategoryId == 0) return false;
        
        return this.projectService
                   .getAllProjectsByCategory(projectCategoryId)
                   .subscribe(
                       (data: Project[]) => {
                           this.projects = data;
                           console.log('Projects Data: ', this.projects);
                       },
                       (err) => {
                           this.alertService.error(err);
                       }
                   );
    }
    
    searchByName(searchTerm: string): any {
        if(searchTerm.length > 2) {
            return this.projectService
                       .getAllProjectsByName(searchTerm)
                       .subscribe(
                           (data: Project[]) => {
                               this.projects = data;
                               console.log('Projects Data: ', this.projects);
                           },
                           (err) => {
                               this.alertService.error(err);
                           }
                       );
        }
        
        this.projects = [];
        return;
    }
}
