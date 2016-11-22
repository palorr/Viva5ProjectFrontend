import { Route } from '@angular/router';

import { ProjectProfileRoutes } from './projectProfile.routes';
import { ProjectCreateRoutes } from './projectCreate.routes';
import { ProjectEditRoutes } from './projectEdit.routes';
import { ProjectListRoutes } from './projectList.routes';
import { ProjectUpdateRoutes } from './projectUpdate.routes';
import { FundingPackageRoutes } from './fundingPackage.routes';
import { ProjectSearchRoutes } from './projectSearch.routes';

import { ProjectComponent } from './index';

export const ProjectRoutes: Route[] = [
  	{
    	path: 'projects',
    	component: ProjectComponent,
    	children: [
        ...ProjectProfileRoutes,
        ...ProjectCreateRoutes,
        ...ProjectEditRoutes,
	    	...ProjectListRoutes,
        ...ProjectUpdateRoutes,
        ...FundingPackageRoutes,
        ...ProjectSearchRoutes
    	]
  	}
];
