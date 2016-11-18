import { Route } from '@angular/router';

import { ProjectProfileRoutes } from './projectProfile/index';
import { ProjectListRoutes } from './projectList/index';
import { HomeRoutes } from './home/index';
import { ChartRoutes } from './charts/index';
import { BlankPageRoutes } from './blank-page/index';
import { TableRoutes } from './tables/index';
import { FormRoutes } from './forms/index';
import { GridRoutes } from './grid/index';
import { BSComponentRoutes } from './bs-component/index';
import { BSElementRoutes } from './bs-element/index';
import { userProfileRoutes } from './userProfile/index';

import { DashboardComponent } from './index';

export const DashboardRoutes: Route[] = [
  	{
    	path: 'dashboard',
    	component: DashboardComponent,
    	children: [
        ...ProjectProfileRoutes,
	    	...ProjectListRoutes,
	    	...HomeRoutes,
	    	...ChartRoutes,
	    	...BSComponentRoutes,
        ...TableRoutes,
	    	...BlankPageRoutes,
        ...FormRoutes,
        ...GridRoutes,
        ...BSElementRoutes,
		...userProfileRoutes
    	]
  	}
];
