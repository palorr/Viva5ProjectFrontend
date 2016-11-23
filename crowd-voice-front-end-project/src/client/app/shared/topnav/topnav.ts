import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AuthGuard } from '../../guards/index';

import { CurrentUserService } from '../../helpers/index';

import { CurrentUser, Project } from '../../models/index';

import { AuthenticationService, UserService } from '../../services/index';

@Component({
    moduleId: module.id,
    selector: 'top-nav',
    templateUrl: 'topnav.html',
})

export class TopNavComponent implements OnInit {
	
	projectsToNotify: Project[];
	
	isLoggedIn: boolean = false;
	
	currentUser = {}; 
	
	intervals: any[] = [];
	
	constructor(
		private authGuard: AuthGuard,
		private currentUserService: CurrentUserService,
		private userService: UserService,
		private authenticationService: AuthenticationService,
		private route: ActivatedRoute,
        private router: Router
	){}
	
	ngOnInit() {
		
		if(this.authGuard.isUserLoggedIn()) {
			this.isLoggedIn = true;
		}
		
		if(localStorage.getItem('currentUser')) {
			this.currentUserService.getUserMainInfo()
			.subscribe(
                (data) => {
                    this.currentUser = data;
					console.log('Current User: ', this.currentUser);
                },
                (err) => {
                    console.log('ERROR: ', err);
                });	
		
			//this.checkForNotifications();
			
		}
	}
	
	logOut() {
		this.authenticationService.logout();
		this.router.navigate(['/login']);
	}
	
	checkForNotifications() {
		let self = this;
		this.intervals.push(
				window.setInterval(function() {
					self.userService
						.getUserFundedCompletedProjects(false)
						.subscribe(
							(data: Project[]) => {
								self.projectsToNotify = data;
								console.log('Completed Projects: ', self.projectsToNotify);
							},
							(err) => {
								console.log('ERROR: ', err);
							}
						);
				}, 10000)
			);
	}
	
	changeTheme(color: string): void {
		var link: any = $('<link>');
		link
			.appendTo('head')
			.attr({type : 'text/css', rel : 'stylesheet'})
			.attr('href', 'themes/app-'+color+'.css');
	}

	rtl(): void {
		var body: any = $('body');
		body.toggleClass('rtl');
	}

	sidebarToggler(): void  {
		var sidebar: any = $('#sidebar');
		var mainContainer: any = $('.main-container');
		sidebar.toggleClass('sidebar-left-zero');
		mainContainer.toggleClass('main-container-ml-zero');
	}
}
