import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProjectService, AlertService, UserService, ProjectCommentService } from '../../services/index';

import { Project, ProjectCommentFromServer } from '../../models/index';

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
export class ChatComponent implements OnInit, OnDestroy{
	currentUserProjectComments: ProjectCommentFromServer[] = [];
	
	isRequestorLoggedIn: boolean;
	
	chatIntervals: Array<any> = [];
	
	constructor(
		private alertService: AlertService,
		private authGuard: AuthGuard,
		private currentUserService: CurrentUserService,
		private projectCommentService: ProjectCommentService
	) {}
	
	ngOnInit() {
		if (this.authGuard.isUserLoggedIn())
				this.isRequestorLoggedIn = true;
				
		if(localStorage.getItem('currentUser')) {
			let self = this;
			this.chatIntervals.push(
				window.setInterval(function() {
					self.projectCommentService
						.getAllCurrentUserCreatedProjectComments()
						.subscribe(
							(data: ProjectCommentFromServer[]) => {
								console.log('Current User Projects Comments in home...');
								self.currentUserProjectComments = data;
							},
							(err: any) => {
								self.alertService.error(err);
								console.log('ERROR: ', err);
							});
				}, 5000)
			);
		}
    }

	ngOnDestroy() {
		for (let i = 0; i < this.chatIntervals.length; i++) {
			console.log('clear chat interval no', i);
			window.clearInterval(this.chatIntervals[i]);
		}
	}
}

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
	
	homeIntervals: Array<any> = [];
	
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
						this.alertService.error(err);
						console.log('ERROR: ', err);
					});	
			
			let self = this;
			this.homeIntervals.push(
				window.setInterval(function() {
					self.userService
						.getUserFundedCompletedProjects(false)
						.subscribe(
							(data: Project[]) => {
								console.log('Projects Com in home...');
								self.projectsToNotify = data;
							},
							(err: any) => {
								self.alertService.error(err);
								console.log('ERROR: ', err);
							});
				}, 5000)
			);
		}
    }

	ngOnDestroy() {
		for (let i = 0; i < this.homeIntervals.length; i++) {
			console.log('clear home interval no', i);
			window.clearInterval(this.homeIntervals[i]);
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
