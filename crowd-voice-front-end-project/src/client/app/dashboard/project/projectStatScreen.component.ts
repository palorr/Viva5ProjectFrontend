import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProjectStatService, AlertService } from '../../services/index';
import { ProjectStatFromServer, AuthorizationModel } from '../../models/index';

import { AuthorizationGuard } from '../../guards/index';

@Component({
	moduleId: module.id,
    selector: 'project-stats-screen-cmp',
    templateUrl: 'projectStatScreen.component.html'
})

export class ProjectStatScreenComponent implements OnInit { 
	
    projectStatFromServer: ProjectStatFromServer = new ProjectStatFromServer();
    
    percentageOfFundingGoalCompletion: number;
    
    numberOfFundingDaysLeft: number;
    
    fundingPeriodHasPassed: boolean = false;
    
	constructor(
        private route: ActivatedRoute,
        private router: Router,
        private alertService: AlertService,
		private projectStatService: ProjectStatService,
        private authorizationGuard: AuthorizationGuard
	) {}
	
	ngOnInit() {
        this.route.params.forEach((params: Params) => {
			let projectId = +params['id'];
            
            let isLoggedIn = false;
			
			let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        
			if (currentUser && currentUser.user.access_token) {
				isLoggedIn = true;
			}
            
            this.authorizationGuard
                .isRequestorProjectCreator(projectId)
                .subscribe(
                    (data: AuthorizationModel) => {
                        if(!data.IsAllowed) {
                            this.alertService.error("You are not authorized to see the stats screen of this project. You are not the project creator!", true);
                            this.router.navigate(['/dashboard/home']);
                            return;
                        }
                    }, 
                    (err) => {
                        this.alertService.error('I am sorry, something went wrong. Please try again later!');
                    }
                );
			
			this.projectStatService
                .getProjectStatById(projectId, isLoggedIn)
                .subscribe(
                    (data: ProjectStatFromServer) => {
                        if(!data.IsRequestorProjectCreator) {
                            this.alertService.error("You are not authorized to see the stats screen of this project. You are not the project creator!", true);
                            this.router.navigate(['/dashboard/home']);
                            return;
                        }
                        this.projectStatFromServer = data;
                        
                        this.percentageOfFundingGoalCompletion = (data.MoneyPledged / data.FundingGoal) * 100;
                        if(this.percentageOfFundingGoalCompletion > 100) {
                            this.percentageOfFundingGoalCompletion = 100;
                        }
                        
                        let oneDay = 24*60*60*1000;
                        let today = new Date();
                        let fundingEndDate = new Date(data.FundingEndDate);
                        
                        this.numberOfFundingDaysLeft = Math.round((today.getTime() - fundingEndDate.getTime())/(oneDay));
                        
                        if(this.numberOfFundingDaysLeft > 0) {
                            this.fundingPeriodHasPassed = true;
                        } else {
                            this.numberOfFundingDaysLeft = Math.abs(this.numberOfFundingDaysLeft);
                        }
                        
                    },
                    (err) => {
                        this.alertService.error('I am sorry, something went wrong. Please try again later!');
                    }
                );
			
		});
    }
    
}
