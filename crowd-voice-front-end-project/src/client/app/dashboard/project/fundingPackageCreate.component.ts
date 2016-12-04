import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { FundingPackage, AuthorizationModel } from '../../models/index';

import { AlertService, FundingPackageService } from '../../services/index';

import { AuthorizationGuard } from '../../guards/index';
@Component({
	moduleId: module.id,
	selector: 'funding-package-create-cmp',
	templateUrl: 'fundingPackageCreate.component.html'
})
export class FundingPackageCreateComponent implements OnInit {
	projectId: number;
	
	fundingPackage: FundingPackage = new FundingPackage();
	
	authModel: AuthorizationModel = new AuthorizationModel();
	
	loading = false;
	
	constructor(
		private route: ActivatedRoute,
        private router: Router,
        private alertService: AlertService,
		private fundingPackageService: FundingPackageService,
		private authorizationGuard: AuthorizationGuard
	) { }
	
    ngOnInit() {
		this.route.params.forEach((params: Params) => {
			this.projectId = +params['id'];
			this.authorizationGuard.isRequestorProjectCreator(this.projectId)
			 	.subscribe(
					(data: AuthorizationModel) => {
						console.log('DATA FROM AUTHMODEL: ', data);
						
						if(!data.IsAllowed) {
							this.alertService.error("You are not authorized to create a funding package for this project. You are not the project creator!", true);
							this.router.navigate(['/dashboard/home']);
							return;	
						}
					},
					error =>  {
						console.log(error);
					}
				);
		});
	}
	
	createFundingPackage() {
		this.loading = true;
		
		this.fundingPackageService.createNewFundingPackage(this.projectId, this.fundingPackage)
			.subscribe(
				(data) => {
					console.log('NEW FUNDING PACKAGE CREATED: ', data);
					// set success message and pass true paramater to persist the message after redirecting
					this.alertService.success('Funding Package created successfully!');
					
					this.loading = false;
					
					//this.router.navigate(['/dashboard/projects/view/'+this.projectId]);
				},
				(err) => {
					this.alertService.error('I am sorry, something went wrong. Please try again later!');
					this.loading = false;
				});
			
	}
   
}