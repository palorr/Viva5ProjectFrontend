import { Route } from '@angular/router';
import { ProjectRoutes } from './project/index';
import { HomeRoutes } from './home/index';
import { BlankPageRoutes } from './blank-page/index';
import { ChatPageRoutes } from './chat/index';
import { UserRoutes } from './user/user.routes';
import { DashboardComponent } from './index';

export const DashboardRoutes: Route[] = [
  	{
    	path: 'dashboard',
    	component: DashboardComponent,
    	children: [
        ...ProjectRoutes,
        ...HomeRoutes,
        ...BlankPageRoutes,
        ...UserRoutes,
        ...ChatPageRoutes
    	]
  	}
];
