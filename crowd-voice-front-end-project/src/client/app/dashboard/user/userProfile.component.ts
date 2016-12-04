import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserService, AlertService } from '../../services/index'

import { GenericUser, ProjectFromServer, Project } from '../../models/index';

import { AuthGuard } from '../../guards/index';

@Component({
	moduleId: module.id,
	selector: 'userProfile-cmp',
	templateUrl: 'userProfile.component.html'
})

export class UserProfileComponent implements OnInit {
	id: number;
	user: GenericUser;
	backedProjects: Project[];
	createdProjects: Project[];
	isRequestorLoggedIn: boolean = false;
	isRequestorThisUser: boolean = false;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private authGuard: AuthGuard,
		private userService: UserService,
		private alertService: AlertService,
	) { }

	ngOnInit() {
		console.log("THIS>ROUTES>PARAMS: ", this.route.params);
		this.route.params.forEach((params: Params) => {
			this.id = +params['id'];

			if (this.authGuard.isUserLoggedIn())
				this.isRequestorLoggedIn = true;
				
			//////////////////////////////
			this.userService.getUserMainInfo(this.id)
				.subscribe(
					(data: GenericUser) => {
	
						this.user = data;
						console.log('User Profile View Data: ', this.user);
						if(this.isRequestorLoggedIn)
							this.isRequestorThisUser = this.userService.isRequestorThisUser(this.user.Username);
						
					},
					(err) => {
						this.alertService.error('I am sorry, something went wrong. Please try again later!');
					}
				);
			//////////////////////////////
			
			this.userService.getUserBackedProjects(this.id)
				.subscribe(
				(data: ProjectFromServer[]) => {
					//if(data.isRequestorLoggedIn)   // fix it
					//	this.isRequestorLoggedIn = true;

					this.backedProjects = data;
					console.log('Backed Projects Data: ', this.backedProjects);
				},
				(err) => {
					this.alertService.error('I am sorry, something went wrong. Please try again later!');
				}
			);
				
			//////////////////////////////
			this.userService.getUserCreatedProjects(this.id)
				.subscribe(
				(data: ProjectFromServer[]) => {
					//if(data.isRequestorLoggedIn)   // fix it
					//	this.isRequestorLoggedIn = true;

					this.createdProjects = data;
					console.log('Created Projects Data: ', this.createdProjects);
				},
				(err) => {
					this.alertService.error('I am sorry, something went wrong. Please try again later!');
				}
			);
			///////////////////////////////




		});


	}
}
