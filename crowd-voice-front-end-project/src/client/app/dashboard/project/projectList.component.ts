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
    
    actionPassed: string = 'getAllProjects';
    
	constructor(
        private route: ActivatedRoute,
        private projectService: ProjectService
	) {}
	
	ngOnInit() {
        if(this.route.data) {
            this.route.data
                .subscribe(
                    value => { 
                        this.actionPassed = value['action'];
                    }
                );    
        }
        
        switch(this.actionPassed) {
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
                //TODO 
                break;
            //TODO - ADD MORE ACTIONS FOR PROJECT LISTS
        }
        
        
        
    }
}
