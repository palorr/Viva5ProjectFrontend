import { Route } from '@angular/router';

import { ProjectProfileRoutes } from './projectProfile.routes';
import { ProjectCreateRoutes } from './projectCreate.routes';
import { ProjectListRoutes } from './projectList.routes';

import { ProjectComponent } from './index';

export const ProjectRoutes: Route[] = [
  	{
    	path: 'projects',
    	component: ProjectComponent,
    	children: [
        ...ProjectProfileRoutes,
        ...ProjectCreateRoutes,
	    	...ProjectListRoutes
    	]
  	}
];
