import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { FundingPackage } from '../../models/index';

import { AlertService, FundingPackageService } from '../../services/index';


@Component({
	moduleId: module.id,
	selector: 'funding-package-pay-cmp',
	templateUrl: 'fundingPackagePay.component.html'
})
export class FundingPackagePayComponent implements OnInit {
	projectId: number;
	
	loading = false;
	
	@Input() fundingPackage: FundingPackage = null;
    
    actionPassed: string;
    
    title: string;
	
	constructor(
		private route: ActivatedRoute,
        private router: Router,
        private alertService: AlertService,
		private fundingPackageService: FundingPackageService
	) { }
	
    ngOnInit() {
		if(this.route.data && this.fundingPackage == null) {
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
                    this.title = "Pay for a specific project Funding Package";
                    
                    break;
            }
        }
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