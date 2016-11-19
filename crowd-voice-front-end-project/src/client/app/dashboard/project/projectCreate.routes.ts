import { Route } from '@angular/router';

import { ProjectCreateComponent } from './projectCreate.component';
import { AuthGuard } from '../../guards/index';

export const ProjectCreateRoutes: Route[] = [
  	{
    	path: 'create',
    	component: ProjectCreateComponent,
		canActivate: [AuthGuard]
  	}
];