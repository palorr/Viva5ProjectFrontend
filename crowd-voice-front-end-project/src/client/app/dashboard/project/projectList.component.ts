import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProjectService } from '../../services/index';
import { Project } from '../../models/index';

@Component({
	moduleId: module.id,
    selector: 'all-projects-list',
    templateUrl: 'projectList.component.html'
})

export class ProjectListComponent implements OnInit { 
	projects: Array<Project> = [];
	
	constructor(
        private route: ActivatedRoute,
        private projectService: ProjectService
	) {}
	
	ngOnInit() {
        console.log("This.Route: ", this.route.data.value['action']);
        
        if (this.route.data && this.route.data.value['action']) {
            alert(this.route.data.value['action']);
            
            switch(this.route.data.value['action']) {
                case 'getAllProjects':
                    this.projectService
                        .getAllProjects()
                        .subscribe(
                            (data: Array<Project>) => {
                                this.projects = data;
                            },
                            (err) => {
                                alert(err);
                            });
                    break;
                case 'getMyProjects':
                    this.projectService
                        .getProjectById(17)
                        .subscribe(
                            (data: Project) => {
                                this.projects.push(data);
                            },
                            (err) => {
                                alert(err);
                            });
            }
        }
        
        
    }
}
