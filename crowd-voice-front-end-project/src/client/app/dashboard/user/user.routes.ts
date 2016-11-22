import { Route } from '@angular/router';

import { UserProfileRoutes } from './userProfile.routes';
import { UserEditRoutes } from './userEdit.routes';
import { UserComponent } from './index';

export const UserRoutes: Route[] = [
  	{
    	path: 'users',
    	component: UserComponent,
    	children: [
        ...UserProfileRoutes,
        ...UserEditRoutes
    	]
  	}
];
