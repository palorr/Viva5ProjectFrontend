import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserService, AlertService } from '../../services/index'

import { GenericUser, ProjectFromServer, Project } from '../../models/index';

import { AuthGuard } from '../../guards/index';

@Component({
	moduleId: module.id,
	selector: 'userCreatedProjects-cmp',
	templateUrl: 'userCreatedProjects.component.html'
})

export class UserCreatedProjectsComponent implements OnInit {
	id: number;
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