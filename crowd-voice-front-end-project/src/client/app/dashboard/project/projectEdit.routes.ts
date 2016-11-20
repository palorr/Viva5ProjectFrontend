import { Route } from '@angular/router';

import { ProjectEditComponent } from './projectEdit.component';
//import { AuthorizationGuard } from '../../guards/index';

export const ProjectEditRoutes: Route[] = [
  	{
    	path: 'edit/:id',
    	component: ProjectEditComponent,
		//canActivate: [AuthorizationGuard]
  	}
];