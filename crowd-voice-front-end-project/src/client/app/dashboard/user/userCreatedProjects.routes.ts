import { Route } from '@angular/router';

import { UserCreatedProjectsComponent } from './userCreatedProjects.component';
import { AuthGuard } from '../../guards/index';

export const UserCreatedProjectsRoutes: Route[] = [
  	{
    	path: 'myProjects/:id',
    	component: UserCreatedProjectsComponent
		
  	}
];