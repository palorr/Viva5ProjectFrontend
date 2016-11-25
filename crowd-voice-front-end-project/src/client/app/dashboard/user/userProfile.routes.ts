import { Route } from '@angular/router';

import { UserProfileComponent } from './userProfile.component';

export const UserProfileRoutes: Route[] = [
  	{
    	path: 'view/:id',
    	component: UserProfileComponent
  	}
];
