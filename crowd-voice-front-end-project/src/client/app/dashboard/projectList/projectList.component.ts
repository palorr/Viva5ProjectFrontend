import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/index';
import { Project } from '../../models/index';

@Component({
	moduleId: module.id,
    selector: 'projects-list',
    templateUrl: './project-list.component.html'
})

export class ProjectListComponent implements OnInit { 
	projects: Array<Project> = [];
	
	constructor(
		private projectService: ProjectService
	) {}
	
	ngOnInit() {
        this.projectService.getAllProjects()
            .subscribe(
                (data: Array<Project>) => {
					this.projects = data;
                },
                (err) => {
                    alert(err);
                });
    }
}
