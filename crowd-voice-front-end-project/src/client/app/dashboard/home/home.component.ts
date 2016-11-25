import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProjectService, AlertService, UserService } from '../../services/index';

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
export class NotificationComponent {
	@Input() projects: Project[] = [];	
}

@Component({
	moduleId: module.id,
	selector: 'home-cmp',
	templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit, OnDestroy {
	isRequestorLoggedIn: boolean = false;
	
	currentUser: any = null;
	
	projectsToNotify: Project[] = [];
	
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
		private currentUserService: CurrentUserService,
		private userService: UserService
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
			
			let self = this;
			window.setInterval(function() {
				self.userService
					.getUserFundedCompletedProjects(false)
					.subscribe(
						(data: Project[]) => {
							console.log('Projects Com in home...');
							self.projectsToNotify = data;
						},
						(err: any) => {
							console.log('ERROR: ', err);
						});
			}, 5000);
		}
    }

	ngOnDestroy() {
		let interval_id = window.setInterval("", 9999); // Get a reference to the last
														// interval +1
		//for clearing all intervals
		for (var i = 1; i < interval_id; i++)
				window.clearInterval(i);
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
