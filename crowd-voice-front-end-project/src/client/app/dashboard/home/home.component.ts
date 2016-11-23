import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProjectService, AlertService } from '../../services/index';

import { Project } from '../../models/index';

import { CurrentUserService } from '../../helpers/index';

import { AuthGuard } from '../../guards/index';

/**
*	This class represents the lazy loaded HomeComponent.
*/

@Component({
	moduleId: module.id,
	selector: 'timeline-cmp',
	templateUrl: 'timeline.html',
	styleUrls: ['timeline.css'],
})
export class TimelineComponent { }

@Component({
	moduleId: module.id,
	selector: 'chat-cmp',
	templateUrl: 'chat.html'
})
export class ChatComponent {}

@Component({
	moduleId: module.id,
	selector: 'notifications-cmp',
	templateUrl: 'notifications.html'
})
export class NotificationComponent { }

@Component({
	moduleId: module.id,
	selector: 'home-cmp',
	templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
	isRequestorLoggedIn: boolean = false;
	
	currentUser: any = null;
	
	/* Carousel Variable */
	
	projects: Array<Project> = [];
	
	myInterval: number = 5000;
	index: number = 0;
	
	slides: Array<any> = [];
	imgUrl: Array<any> = [
		`assets/img/slider1.jpg`,
		`assets/img/slider2.jpg`,
		`assets/img/slider3.jpg`,
		`assets/img/slider0.jpg`
	];
	
	/* END */

	constructor(
		private projectService: ProjectService,
		private alertService: AlertService,
		private authGuard: AuthGuard,
		private currentUserService: CurrentUserService
	) {}
	
	ngOnInit() {
		if (this.authGuard.isUserLoggedIn())
				this.isRequestorLoggedIn = true;
		
        this.projectService.getTrendingProjects()
            .subscribe(
                (data: Array<Project>) => {
					this.projects = data;
					console.log('this.projects: ', this.projects);
					for (let i = 0; i < data.length; i++) {
						this.addSlide();
					}
                },
                (err) => {
                    this.alertService.error(err);
                });
				
		if(localStorage.getItem('currentUser')) {
			this.currentUserService.getUserMainInfo()
				.subscribe(
					(data) => {
						this.currentUser = data;
					},
					(err) => {
						console.log('ERROR: ', err);
					});	
		}
    }

	/* Carousel */
	
	addSlide() {
		let i = this.slides.length;
		
		this.slides.push({
			image: this.imgUrl[i],
			title: this.projects[i].Title,
      		description: this.projects[i].Description
		});
	}
	/* END */
}
