import { Component, OnInit } from '@angular/core';

@Component({
	moduleId: module.id,
	selector: 'sidebar-cmp',
	templateUrl: 'sidebar.html'
})

export class SidebarComponent implements OnInit {
	isActive = false;
	showMenu: string = '';
	
	isUserLoggedIn: boolean;
	
	ngOnInit() {
		if (localStorage.getItem('currentUser')) {
			this.isUserLoggedIn = true;
		} else {
			this.isUserLoggedIn = false;
		}
	}
	
	eventCalled() {
		this.isActive = !this.isActive;
	}
	
	addExpandClass(element: any) {
		if (element === this.showMenu) {
			this.showMenu = '0';
		} else {
			this.showMenu = element;
		}
	}
	
}
