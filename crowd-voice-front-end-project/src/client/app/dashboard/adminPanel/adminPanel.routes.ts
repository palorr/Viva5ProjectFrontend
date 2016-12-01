import { Route } from '@angular/router';

import { AdminPanelComponent } from './index';

import { AuthGuard } from '../../guards/index';

export const AdminPanelRoutes: Route[] = [
	{
		path: 'adminPanel',
		component: AdminPanelComponent,
		canActivate: [AuthGuard]
	}
];