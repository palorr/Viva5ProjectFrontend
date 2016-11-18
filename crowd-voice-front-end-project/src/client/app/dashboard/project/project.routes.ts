import { Route } from '@angular/router';

import { ProjectProfileRoutes } from './projectProfile.routes';
import { ProjectCreateRoutes } from './projectCreate.routes';

//import { ProjectListRoutes } from '../projectList/index';

import { ProjectComponent } from './index';

export const ProjectRoutes: Route[] = [
  	{
    	path: 'project',
    	component: ProjectComponent,
    	children: [
        ...ProjectProfileRoutes,
        ...ProjectCreateRoutes,
	    	//...ProjectListRoutes
    	]
  	}
];
