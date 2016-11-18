import { Route } from '@angular/router';
import { ProjectProfileComponent } from './projectProfile.component';

export const ProjectProfileRoutes: Route[] = [
  	{
    	path: 'view/:id',
    	component: ProjectProfileComponent
  	}
];