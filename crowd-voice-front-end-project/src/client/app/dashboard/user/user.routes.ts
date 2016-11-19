import { Route } from '@angular/router';

import { ViewProfileRoutes } from './viewProfile.routes';

import { UserComponent } from './index';

export const UserRoutes: Route[] = [
  	{
    	path: 'user',
    	component: UserComponent,
    	children: [
        ...ViewProfileRoutes,
        ///...EditProfileRoutes
    	]
  	}
];
