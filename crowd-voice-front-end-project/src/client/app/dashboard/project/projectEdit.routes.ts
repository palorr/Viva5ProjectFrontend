import { Route } from '@angular/router';

import { ProjectEditComponent } from './projectEdit.component';

export const ProjectEditRoutes: Route[] = [
  	{
    	path: 'edit/:id',
    	component: ProjectEditComponent
  	}
];