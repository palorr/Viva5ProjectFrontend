import { Component, NgZone, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserService, AlertService } from '../../services/index';
import { CurrentUserService } from '../../helpers/index';
import { CurrentUser, AdminPanelViewModel, ProjectCountByCategoryModel, ProjectCountByStatusModel, GlobalProjectStatsModel } from '../../models/index';

@Component({
    moduleId: module.id,
    selector: 'admin-panel-component',
    templateUrl: 'adminPanel.component.html'
})

export class AdminPanelComponent implements OnInit {

    currentUser: CurrentUser;
    
    adminPanelView: AdminPanelViewModel;
    
    projectsByCategoryView: ProjectCountByCategoryModel[];
    
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private alertService: AlertService,
        private currentUserService: CurrentUserService,
        private userService: UserService,
        private _ngZone: NgZone
    ) {
        this.adminPanelView = new AdminPanelViewModel(0, 0, [], [], null);
    }
    
    ngOnInit() {
        if (localStorage.getItem('currentUser')) {
			this.currentUserService.getUserMainInfo()
				.subscribe(
				(data: CurrentUser) => {
                    if(!data.IsAdmin) {
                        this.alertService.error("You are not authorized to see the admin panel. You are not a CrowdVoice admin!", true);
                        this.router.navigate(['/dashboard/home']);
                    }
                    
					this.currentUser = data;
                    
                    this.userService
                        .getAdminPanelInfo()
                        .subscribe(
                            (data: AdminPanelViewModel) => {
                                console.log('ADMIN PANEL DATA: ', data);
                                
                                this._ngZone.run(() => {
                                    this.adminPanelView = data;
                                });
                            },
                            (err) => {
                                console.log('ERROR IN ADMIN PANEL: ', err);
                            }
                        )
                    
				},
				(err) => {
					console.log('ERROR: ', err);
				});

		}
            
    }
    
}