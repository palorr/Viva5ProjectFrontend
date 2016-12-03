/// <reference path="../../../../../tools/manual_typings/seed/fbsdk.d.ts" />
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { 
	Project, ProjectFromServer, ProjectUpdateFromServer, ProjectCommentFromServer,
	FundingPackageFromServer, ProjectStat, ProjectStatFromServer,
	ProjectExternalShare
} from '../../models/index';

import { 
	AlertService, ProjectService, ProjectUpdateService, ProjectCommentService,
	FundingPackageService, ProjectStatService, ProjectExternalShareService 
} from '../../services/index';

import { AuthGuard } from '../../guards/index';

/**
*	This class represents the lazy loaded ProjectProfileComponent.
*/

@Component({
	moduleId: module.id,
	selector: 'project-profile-cmp',
	templateUrl: 'projectProfile.component.html'
})
export class ProjectProfileComponent implements OnInit {
	id: number;
	
	projectExternalShare: ProjectExternalShare;
	
	project: ProjectFromServer;
	
	projectUpdates: ProjectUpdateFromServer[];
	
	projectComments: ProjectCommentFromServer[];
	
	fundingPackages: FundingPackageFromServer[];
	
	projectStat: ProjectStatFromServer;
	
	isRequestorProjectCreator: boolean = false;
	
	isRequestorLoggedIn: boolean = false;
	
	completedPercentage: number;

    constructor(
		private route: ActivatedRoute,
        private router: Router,
        private alertService: AlertService,
		private projectService: ProjectService,
		private projectUpdateService: ProjectUpdateService,
		private projectCommentService: ProjectCommentService,
		private fundingPackageService: FundingPackageService,
		private projectStatService: ProjectStatService,
		private projectExternalShareService: ProjectExternalShareService,
		private authGuard: AuthGuard
	) { }
 
    ngOnInit() {
		console.log("THIS.ROUTES: ", this.route);
    	this.route.params.forEach((params: Params) => {
			this.id = +params['id']; // (+) converts string 'id' to a number
			
			if(this.authGuard.isUserLoggedIn())
				this.isRequestorLoggedIn = true;
			
			this.projectService.getProjectById(this.id, this.isRequestorLoggedIn)
				.subscribe(
					(data: ProjectFromServer) => {
						if(data.IsRequestorProjectCreator)
							this.isRequestorProjectCreator = true;
							
						this.project = data;
						console.log('Project Profile View Data: ', this.project);
					},
					(err) => {
						this.alertService.error(err);
					}
				);
				
			this.projectUpdateService.getProjectUpdates(this.id, this.isRequestorLoggedIn)
				.subscribe(
					(data: ProjectUpdateFromServer[]) => {
						this.projectUpdates = data;
						console.log('Project Updates Data: ', this.projectUpdates);
					},
					(err) => {
						this.alertService.error(err);
					}
				);
				
			this.projectCommentService.getProjectComments(this.id, this.isRequestorLoggedIn)
				.subscribe(
					(data: ProjectCommentFromServer[]) => {
						this.projectComments = data;
						console.log('Project Comments Data: ', this.projectComments);
					},
					(err) => {
						this.alertService.error(err);
					}
				);
				
			this.fundingPackageService.getFundingPackages(this.id, this.isRequestorLoggedIn)
				.subscribe(
					(data: FundingPackageFromServer[]) => {
						this.fundingPackages = data;
						console.log('Project Funding Packages Data: ', this.fundingPackages);
					},
					(err) => {
						this.alertService.error(err);
					}
				);
				
			this.projectStatService.getProjectStatById(this.id, this.isRequestorLoggedIn)
				.subscribe(
					(data: ProjectStatFromServer) => {
						this.projectStat = data;
						
						if((this.projectStat.MoneyPledged / this.projectStat.FundingGoal) >= 1)
						{
							this.completedPercentage = 100;	
						}
						
						else 
						{
							this.completedPercentage = (this.projectStat.MoneyPledged / this.projectStat.FundingGoal) * 100;
						}
						console.log('Project Stats Data: ', this.projectStat);
					},
					(err) => {
						this.alertService.error(err);
					}
				);
		});
	}
	
	createExternalShare(targetClicked: string) {
		
		if(targetClicked === "FAC") {
			FB.ui({
				method: 'share',
				display: 'popup',
				href: window.location.href,
			}, function(response: any){});
		}
		
		this.projectExternalShare = new ProjectExternalShare();
		this.projectExternalShare.ProjectId = this.id;
		
		this.projectExternalShare.Target = targetClicked;
		
		if(this.isRequestorProjectCreator)
			this.projectExternalShare.Source = "CRE";
		else 
			this.projectExternalShare.Source = "BAC";
		
		this.projectExternalShareService
			.createExternalShare(this.id, this.projectExternalShare)
			.subscribe(
				(data) => {
					console.log('NEW PROJECT EXTERNAL SHARE CREATED: ', data);
					//this.alertService.success('Project external share created successfully!');
				},
				(err) => {
					this.alertService.error(err);
				}
			);
	}

}
