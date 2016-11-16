import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthGuard } from '../../guards/index';

import { CurrentUserService } from '../../helpers/index';

import { CurrentUser } from '../../models/index';

import { AuthenticationService } from '../../services/index';

@Component({
    moduleId: module.id,
    selector: 'top-nav',
    templateUrl: 'topnav.html',
})

export class TopNavComponent implements OnInit {
	
	isLoggedIn: boolean = false;
	
	currentUser = {}; 
	
	constructor(
		private authGuard: AuthGuard,
		private currentUserService: CurrentUserService,
		private authenticationService: AuthenticationService,
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
		}
	}
	
	logOut() {
		this.authenticationService.logout();
		this.router.navigate(['/login']);
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
