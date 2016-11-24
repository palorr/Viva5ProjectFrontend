import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { FundingPackageForPaymentView } from '../../models/index';

import { AlertService, FundingPackageService } from '../../services/index';


@Component({
	moduleId: module.id,
	selector: 'funding-package-pay-cmp',
	templateUrl: 'fundingPackagePay.component.html'
})
export class FundingPackagePayComponent implements OnInit {
	projectId: number;
	
	loading = false;
	
	fundingPackage: FundingPackageForPaymentView = new FundingPackageForPaymentView();
    
    actionPassed: string;
    
    title: string;
	
	isDonationPackage: boolean = false;
	
	donationAmount: number;
	
	constructor(
		private route: ActivatedRoute,
        private router: Router,
        private alertService: AlertService,
		private fundingPackageService: FundingPackageService
	) { }
	
    ngOnInit() {
		
		this.route.params.forEach((params: Params) => {
			let projectId = +params['projectId'];
			let fundingPackageId = +params['fundingPackageId'];
			let isLoggedIn = false;
			
			let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        
			if (currentUser && currentUser.user.access_token) {
				isLoggedIn = true;
			}
			
			this.fundingPackageService.getFundingPackageByIdForPaymentView(projectId, fundingPackageId, isLoggedIn)
				.subscribe(
					(data: FundingPackageForPaymentView) => {
						if(!data.PledgeAmount) this.isDonationPackage = true;
						
						this.fundingPackage = data;
					}, 
					err => {
						this.alertService.error(err);
					}
				);
			
			if(this.route.data) {
			
				this.route.data
					.subscribe(
						value => { 
							this.actionPassed = value['action'];
						}
					);    
			
				switch(this.actionPassed) {
					case 'donate':
						this.title = "Make a donation";
						
						break;
					case 'fundingPackagePay':
						this.title = "Pay specific Funding Package";
						
						break;
				}
			}
			
		});
		
	}
	
	updateAmount(newValue: number) {
		this.donationAmount = newValue;
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
					this.alertService.error(err);
					this.loading = false;
				});
			
	}
   
}