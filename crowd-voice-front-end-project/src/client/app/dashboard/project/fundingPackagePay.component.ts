import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { FundingPackageForPaymentView, VivaWalletToken, UserFunding, TransactionResult } from '../../models/index';

import { AlertService, FundingPackageService, ProjectService } from '../../services/index';

const jqueryUrl = 'https://code.jquery.com/jquery-1.11.2.min.js';
const vivaUrl = 'https://demo.vivapayments.com/web/checkout/js';

import * as jQuery from 'jquery';

@Component({
	moduleId: module.id,
	selector: 'funding-package-pay-cmp',
	templateUrl: 'fundingPackagePay.component.html'
})
export class FundingPackagePayComponent implements OnInit {
	
	vivaWalletFrameSrc: string;
	
	loadAPI: Promise<any>;
	
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
		private fundingPackageService: FundingPackageService,
		private projectService: ProjectService
	) { }
	
    ngOnInit() {
		
		this.route.params.forEach((params: Params) => {
			this.projectId = +params['projectId'];
			let fundingPackageId = +params['fundingPackageId'];
			let isLoggedIn = false;
			
			let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        
			if (currentUser && currentUser.user.access_token) {
				isLoggedIn = true;
			}
			
			this.fundingPackageService.getFundingPackageByIdForPaymentView(this.projectId, fundingPackageId, isLoggedIn)
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
	
	_keyPress(event: any) {
		const pattern = /[0-9\+\-\ ]/;
		let inputChar = String.fromCharCode(event.charCode);
		
		if (!pattern.test(inputChar)) {
			// invalid character, prevent input (not if is delete or backspace)
			let key = event.keyCode || event.charCode;

    		if( key != 8 && key != 46 )
				event.preventDefault();
		}
	}
	
	initVivaButton(isDonation: boolean) {
		let amountPaid: any;
		
		if(isDonation) {
			amountPaid = this.donationAmount * 100;	
		} else {
			amountPaid = this.fundingPackage.PledgeAmount * 100;
		}
		
		let vivaButton = '<form id="myform"><button type="button" data-vp-publickey="P9davVVAOYBWF/AT+oxDUoM6jukHD1r7DGkiHxD47fM=" data-vp-baseurl="https://demo.vivapayments.com" data-vp-lang="el" data-vp-amount="'+amountPaid+'" data-vp-description="A CrowdVoice Project Funding"></button></form>';
		
		window.document.getElementById("viva-wallet-button").innerHTML = vivaButton;
		
		this.loadAPI = new Promise((resolve) => {
            console.log('resolving promise...');
            this.loadScript(jqueryUrl);
			this.loadScript(vivaUrl);
        });
		
		jQuery("#amountbox").prop('disabled', true);
		jQuery(".initVivaButtonHref").hide();
		
		let self = this;
		document.getElementById('myform').onsubmit = function(e: Event) {
			e.preventDefault();
			
			let vivaToken = new VivaWalletToken();
			vivaToken.vivaWalletPaymentMethod = jQuery("input[name=vivaWalletPaymentMethod]").val();
			vivaToken.vivaWalletToken = jQuery("input[name=vivaWalletToken]").val();
			
			self.projectService.completeVivaPayment(self.fundingPackage.Id, vivaToken)
				.subscribe(
					(data: TransactionResult) => {
						console.log('SUCCESS IN BACKING: ', data);
						
						window.document.getElementById("viva-wallet-button").innerHTML = '<span id="viva-wallet-button"></span>';
						
						if(data.TransactionId && data.ErrorCode === 0)
							self.saveTransactionToDB(data.TransactionId, self.isDonationPackage);
					},
					(err) => {
						self.alertService.error(err);
						self.loading = false;
					}
				);	
		};
		
	}
	
	saveTransactionToDB (transcationId: string, isDonation: boolean) {
		let newFunding = new UserFunding();
		
		if(isDonation)
			newFunding.amountPaid = this.donationAmount;
		else
			newFunding.amountPaid = this.fundingPackage.PledgeAmount;
			
		newFunding.fundingPackageId = this.fundingPackage.Id;
		newFunding.transactionId = transcationId;
		
		this.projectService
			.saveTransaction(newFunding, this.projectId)
			.subscribe(
				(data) => {
					console.log('SUCCESS IN SAVING BACKING: ', data);
					// set success message
					alert('Successfully backed project!');
					
					//this.alertService.success('Payment done successfully!');
					
					window.location.href = "http://viva5webapp.azurewebsites.net/";
					
					this.loading = false;
				},
				(err) => {
					this.alertService.error(err);
					this.loading = false;
				}
			);
	}
	
	loadScript(scriptUrl: string) {
		console.log('preparing to load...')
		let node = document.createElement('script');
		node.src = scriptUrl;
		node.type = 'text/javascript';
		node.async = true;
		node.charset = 'utf-8';
		document.getElementsByTagName('head')[0].appendChild(node);
	}

}