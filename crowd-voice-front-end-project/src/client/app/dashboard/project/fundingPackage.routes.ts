import { Route } from '@angular/router';

import { FundingPackageCreateComponent } from './fundingPackageCreate.component';
import { FundingPackageEditComponent } from './fundingPackageEdit.component';
import { FundingPackagePayComponent } from './fundingPackagePay.component';

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
  	},
	{
    	path: ':projectId/fundingPackages/:fundingPackageId/donate',
    	component: FundingPackagePayComponent,
		canActivate: [AuthGuard],
		data: {
			action: 'donate'
		}
  	},
	{
    	path: ':projectId/fundingPackages/:fundingPackageId/pay',
    	component: FundingPackagePayComponent,
		canActivate: [AuthGuard],
		data: {
			action: 'fundingPackagePay'
		}
  	}
];