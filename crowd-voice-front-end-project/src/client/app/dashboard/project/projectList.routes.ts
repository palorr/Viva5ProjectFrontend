import { Route } from '@angular/router';

import { ProjectListComponent } from './projectList.component';
import { AuthGuard } from '../../guards/index';

export const ProjectListRoutes: Route[] = [
  	{
    	path: 'all',
    	component: ProjectListComponent, 
		data: {
			action: 'getAllProjects'
		}
  	},
	{
		path: 'myProjects',
		component: ProjectListComponent,
		canActivate: [AuthGuard],
		data: {
			action: 'getMyProjects'
		}
	}
];