import { Route } from '@angular/router';

import { UserEditComponent } from './userEdit.component';
import { AuthGuard } from '../../guards/index';

export const UserEditRoutes: Route[] = [
  	{
    	path: 'edit/:id',
    	component: UserEditComponent,
		canActivate: [AuthGuard]
  	}
];