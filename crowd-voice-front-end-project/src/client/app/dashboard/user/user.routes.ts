import { Route } from '@angular/router';

import { UserProfileRoutes } from './userProfile.routes';
import { UserEditRoutes } from './userEdit.routes';
import { UserSearchRoutes } from './userSearch.routes';
import { UserComponent } from './index';

export const UserRoutes: Route[] = [
  	{
    	path: 'users',
    	component: UserComponent,
    	children: [
        ...UserProfileRoutes,
        ...UserEditRoutes,
		...UserSearchRoutes
    	]
  	}
];
