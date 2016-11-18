import { Route } from '@angular/router';

import { ProjectListComponent } from './index';

export const ProjectListRoutes: Route[] = [
	{
		path: 'projects/all',
		component: ProjectListComponent
	}
];
