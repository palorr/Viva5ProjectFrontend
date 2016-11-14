import { Routes } from '@angular/router';

import { userProfileRoutes} from './userProfile/index' ;
import { LoginRoutes } from './login/index';
import { SignupRoutes } from './signup/index';
import { DashboardRoutes } from './dashboard/index';

import { LoginComponent } from './login/index';

export const routes: Routes = [
	...LoginRoutes,
	...SignupRoutes,
	...DashboardRoutes,
	...userProfileRoutes,
	{ path: '**', redirectTo: '' }
];
