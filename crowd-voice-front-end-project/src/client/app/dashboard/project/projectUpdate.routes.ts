import { Route } from '@angular/router';

import { ProjectUpdateCreateComponent } from './projectUpdateCreate.component';
import { ProjectUpdateEditComponent } from './projectUpdateEdit.component';

import { AuthGuard } from '../../guards/index';

export const ProjectUpdateRoutes: Route[] = [
  	{
    	path: ':id/updates/create',
    	component: ProjectUpdateCreateComponent,
		canActivate: [AuthGuard]
  	},
	{
    	path: ':projectId/updates/:updateId/edit',
    	component: ProjectUpdateEditComponent,
		canActivate: [AuthGuard]
  	}
];