import { Route } from '@angular/router';

import { UserListComponent } from './userList.component';
import { AuthGuard } from '../../guards/index';

export const UserListRoutes: Route[] = [
  	{
    	path: 'all',
    	component: UserListComponent
		
  	}
];