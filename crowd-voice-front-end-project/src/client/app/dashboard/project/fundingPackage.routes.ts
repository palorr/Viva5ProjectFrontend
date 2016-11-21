import { Route } from '@angular/router';

import { FundingPackageCreateComponent } from './fundingPackageCreate.component';
import { FundingPackageEditComponent } from './fundingPackageEdit.component';

import { AuthGuard } from '../../guards/index';

export const FundingPackageRoutes: Route[] = [
  	{
    	path: ':id/fundingPackages/create',
    	component: FundingPackageCreateComponent,
		canActivate: [AuthGuard]
  	},
	{
    	path: ':projectId/fundingPackages/:fundingPackageId/edit',
    	component: FundingPackageEditComponent,
		canActivate: [AuthGuard]
  	}
];