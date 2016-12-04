import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { FundingPackage, FundingPackageFromServer } from '../../models/index';

import { AlertService, FundingPackageService } from '../../services/index';

@Component({
	moduleId: module.id,
	selector: 'funding-package-edit-cmp',
	templateUrl: 'fundingPackageEdit.component.html'
})
export class FundingPackageEditComponent implements OnInit {
	
	fundingPackageFromServer: FundingPackageFromServer = new FundingPackageFromServer();
	
	projectId: number;
	
	fundingPackageId: number;
	
	loading = false;
	
	constructor(
		private route: ActivatedRoute,
        private router: Router,
        private alertService: AlertService,
		private fundingPackageService: FundingPackageService
	) { }
	
    ngOnInit() {
		this.route.params.forEach((params: Params) => {
			this.projectId = +params['projectId'];
			this.fundingPackageId = +params['fundingPackageId'];
			
			let isLoggedIn = false;
			
			let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        
			if (currentUser && currentUser.user.access_token) {
				isLoggedIn = true;
			}
			
			this.fundingPackageService.getFundingPackageById(this.projectId, this.fundingPackageId, isLoggedIn)
					.subscribe(
						(data: FundingPackageFromServer) => {
							console.log('EDIT FUNDING PACKAGE VIEW DATA: ', data);
							
							if(!data.IsRequestorProjectCreator) {
								this.alertService.error("You are not authorized to edit this funding package. You are not the project creator!", true);
								this.router.navigate(['/dashboard/projects/view/', this.projectId]);
								return;
							}
							this.fundingPackageFromServer = data;
							console.log('Funding Package Data: ', this.fundingPackageFromServer);
						},
						(err) => {
							this.alertService.error('I am sorry, something went wrong. Please try again later!');
						}
					);
			
		});
	}
	
	editFundingPackage() {
		
		this.loading = true;
		
		this.fundingPackageService.editFundingPackage(this.projectId, this.fundingPackageId, this.fundingPackageFromServer)
			.subscribe(
				(data) => {
					console.log('SUCCESS IN EDIT: ', data);
					// set success message
					this.alertService.success('Funding Package edited successfully!');
					this.loading = false;
				},
				(err) => {
					console.log('ERROR IN EDIT: ', err);
					
					this.alertService.error('I am sorry, something went wrong. Please try again later!');
					this.loading = false;
				});	
		
	}
	
	deleteFundingPackage() {
		
		var r = confirm("Are you sure you want to delete this funding package?");
		if (!r) {
			return false;
		}
		
		else {
			this.loading = true;
			
			this.fundingPackageService.deleteFundingPackage(this.projectId, this.fundingPackageId)
					.subscribe(
						(data) => {
							console.log('SUCCESS IN DELETE: ', data);
							// set success message
							this.alertService.success('Funding package deleted successfully!', true);
							this.loading = false;
							
							this.router.navigate(['/dashboard/projects/view/'+this.projectId]);
						},
						(err) => {
							this.alertService.error('I am sorry, something went wrong. Please try again later!');
							this.loading = false;
						});	
		}
		
		return true;
		
	}
   
}