import { Route } from '@angular/router';
import { ProjectProfileComponent } from './index';

export const ProjectProfileRoutes: Route[] = [
  	{
    	path: 'project/view/:id',
    	component: ProjectProfileComponent
  	}
];