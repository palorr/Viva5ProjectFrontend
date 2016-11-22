import { Route } from '@angular/router';
import { ProjectProfileComponent } from './projectProfile.component';
import { ProjectStatScreenComponent } from './projectStatScreen.component';

import { AuthGuard } from '../../guards/index';

export const ProjectProfileRoutes: Route[] = [
  	{
    	path: 'view/:id',
    	component: ProjectProfileComponent
  	},
	{
    	path: ':id/projectStatScreen',
    	component: ProjectStatScreenComponent,
		canActivate: [AuthGuard]
  	}
];