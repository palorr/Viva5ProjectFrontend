import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { FundingPackageForPaymentView } from '../../models/index';

import { AlertService, FundingPackageService } from '../../services/index';

const jqueryUrl = 'https://code.jquery.com/jquery-1.11.2.min.js';
const vivaUrl = 'https://demo.vivapayments.com/web/checkout/js';

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
	
	_keyPress(event: any) {
		const pattern = /[0-9\+\-\ ]/;
		let inputChar = String.fromCharCode(event.charCode);
		
		if (!pattern.test(inputChar)) {
			// invalid character, prevent input
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
		
		let vivaButton = '<form id="myform" action="/checkout" method="post"><button type="button" data-vp-publickey="ez9tdzoqqoWdLz/3nWXiUXgoq+Wrc3cpblqwBTXg43E=" data-vp-baseurl="https://demo.vivapayments.com" data-vp-lang="el" data-vp-amount="'+amountPaid+'" data-vp-description="A CrowdVoice Project Funding"></button></form>';
		
		window.document.getElementById("viva-wallet-button").innerHTML = vivaButton;
		
		this.loadAPI = new Promise((resolve) => {
            console.log('resolving promise...');
            this.loadScript(jqueryUrl);
			this.loadScript(vivaUrl);
        });
		
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
	
	openViva(isDonation: boolean) {
		let amountPaid: any;
		
		if(isDonation) {
			amountPaid = this.donationAmount * 100;	
		} else {
			amountPaid = this.fundingPackage.PledgeAmount * 100;
		}
		
		this.vivaWalletFrameSrc = "https://demo.vivapayments.com/web/checkout/simplecheckout?publickey=ez9tdzoqqoWdLz%2F3nWXiUXgoq%2BWrc3cpblqwBTXg43E%3D&amp;amount="+amountPaid+"&amp;lang=el&amp;baseurl=https%3A%2F%2Fdemo.vivapayments.com&amp;description=A+CrowdVoice+Project+Funding";
		
		function appendHtml(el: any, str: string) {
			var div = document.createElement('div');
			div.innerHTML = str;
			while (div.children.length > 0) {
				el.appendChild(div.children[0]);
			}
		}
		
		let iFrameVivaElem = '<iframe name="vp_sc_iframe" class="vp_sc_iframe" width="560" height="315" src="'+this.vivaWalletFrameSrc+'" style="position: fixed; overflow-x: hidden; overflow-y: auto; left: 0px; top: 0px; width: 100%; height: 100%; z-index: 9999; border: 0px none;"></iframe>';
		appendHtml(document.body, iFrameVivaElem);
		
	}
}