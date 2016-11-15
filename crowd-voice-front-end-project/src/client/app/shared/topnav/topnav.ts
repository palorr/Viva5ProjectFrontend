import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthGuard } from '../../guards/index';

import { CurrentUserHelper } from '../../helpers/index';

@Component({
    moduleId: module.id,
    selector: 'top-nav',
    templateUrl: 'topnav.html',
})

export class TopNavComponent implements OnInit {
	
	isLoggedIn: boolean = false;
	
	constructor(
		private authGuard: AuthGuard,
		private currentUserHelper: CurrentUserHelper
	){}
	
	ngOnInit() {
		if(this.authGuard.isUserLoggedIn()) {
			this.isLoggedIn = true;
		}
		
		this.currentUserHelper.getUserMainInfo()
			.subscribe(
                (data) => {
                    console.log('DATA: ', data);
                },
                (err) => {
                    console.log('ERROR: ', err);
                });
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
