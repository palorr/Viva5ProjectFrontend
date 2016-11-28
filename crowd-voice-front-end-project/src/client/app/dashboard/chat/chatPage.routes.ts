import { Route } from '@angular/router';

import { ChatPageComponent } from './index';

import { AuthGuard } from '../../guards/index';

export const ChatPageRoutes: Route[] = [
	{
		path: 'chat',
		component: ChatPageComponent,
		canActivate: [AuthGuard]
	}
];