import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ProjectService, AlertService, UserService, ProjectCommentService } from '../../services/index';

import { Project, ProjectCommentFromServer, ProjectUpdate, GenericUser , backedProject } from '../../models/index';

import { CurrentUserService } from '../../helpers/index';

import { AuthGuard } from '../../guards/index';

///////////////////////////////////////////////////////////////////////
@Component({
	moduleId: module.id,
	selector: 'updatesTimeline-cmp',
	templateUrl: 'updatesTimeline.html',
	styleUrls: ['timeline.css'],
})
export class UpdatesTimelineComponent implements OnInit, OnDestroy {

	currentUserFundedProjectUpdates: ProjectUpdate[] = [];

	isRequestorLoggedIn: boolean;

	timelineIntervals: Array<any> = [];

	constructor(
		private alertService: AlertService,
		private authGuard: AuthGuard,
		private userService: UserService
	) { }

	ngOnInit() {

		if (this.authGuard.isUserLoggedIn())
			this.isRequestorLoggedIn = true;

		if (localStorage.getItem('currentUser')) {
			let self = this;
			// first loading
			self.userService
				.getUserFundedProjectsLatestUpdates()
				.subscribe(
				(data: ProjectUpdate[]) => {
					console.log('Current User Funded Projects Updates in home...');
					self.currentUserFundedProjectUpdates = data;
				},
				(err: any) => {
					self.alertService.error(err);
					console.log('ERROR: ', err);
				});
			// interval loading	
			this.timelineIntervals.push(
				window.setInterval(function () {
					self.userService
						.getUserFundedProjectsLatestUpdates()
						.subscribe(
						(data: ProjectUpdate[]) => {
							console.log('Current User Funded Projects Updates in home...');
							self.currentUserFundedProjectUpdates = data;
						},
						(err: any) => {
							self.alertService.error(err);
							console.log('ERROR: ', err);
						});
				}, 30000)
			);
		}
	}

	ngOnDestroy() {
		for (let i = 0; i < this.timelineIntervals.length; i++) {
			console.log('clear chat interval no', i);
			window.clearInterval(this.timelineIntervals[i]);
		}
	}

}
///////////////////////////////////////////////////////////////////////
@Component({
	moduleId: module.id,
	selector: 'lastBacks-cmp',
	templateUrl: 'lastTenBackedProjects.html'
})
export class BacksTimelineComponent implements OnInit, OnDestroy {

	backedProjects: backedProject[] = [];

	isRequestorLoggedIn: boolean;

	timelineIntervals: Array<any> = [];

	constructor(
		private alertService: AlertService,
		private authGuard: AuthGuard,
		private projectService: ProjectService,
	) { }

	ngOnInit() {

		if (this.authGuard.isUserLoggedIn())
			this.isRequestorLoggedIn = true;

		if (!localStorage.getItem('currentUser')) {
			let self = this;
			// first loading
			self.projectService
				.getLastTenBackedProjects()
				.subscribe(
				(data: backedProject[]) => {
					console.log('Last 10 backed projects in home ...');
					self.backedProjects = data;
				},
				(err: any) => {
					self.alertService.error(err);
					console.log('ERROR: ', err);
				});
			// interval loading	
			this.timelineIntervals.push(
				window.setInterval(function () {
					self.projectService
						.getLastTenBackedProjects()
						.subscribe(
						(data: backedProject[]) => {
							console.log('Last 10 backed projects in home ...');
							self.backedProjects = data;
						},
						(err: any) => {
							self.alertService.error(err);
							console.log('ERROR: ', err);
						});
				}, 10000)
			);
		}
	}

	ngOnDestroy() {
		for (let i = 0; i < this.timelineIntervals.length; i++) {
			console.log('clear chat interval no', i);
			window.clearInterval(this.timelineIntervals[i]);
		}
	}

}
///////////////////////////////////////////////////////////////////////
@Component({
	moduleId: module.id,
	selector: 'lastUsersTimeline-cmp',
	templateUrl: 'lastUsersTimeline.html',
	styleUrls: ['timeline.css'],
})
export class LastUsersTimelineComponent implements OnInit, OnDestroy {

	lastUsers: GenericUser[] = [];

	
	lastUsersIntervals: Array<any> = [];

	constructor(
		private alertService: AlertService,
		private authGuard: AuthGuard,
		private userService: UserService
	) { }

	ngOnInit() {

		
		if (!localStorage.getItem('currentUser')) {
			let self = this;
			// first loading
			self.userService
				.getLastTenUsers()
				.subscribe(
				(data: GenericUser[]) => {
					console.log('Last Ten Registered Users in home...');
					self.lastUsers = data;
				},
				(err: any) => {
					self.alertService.error(err);
					console.log('ERROR: ', err);
				});
			// interval loading	
			this.lastUsersIntervals.push(
				window.setInterval(function () {
					self.userService
						.getLastTenUsers()
						.subscribe(
						(data: GenericUser[]) => {
							console.log('Last Ten Registered Users in home...');
							self.lastUsers = data;
						},
						(err: any) => {
							self.alertService.error(err);
							console.log('ERROR: ', err);
						});
				}, 50000)
			);
		}
	}

	ngOnDestroy() {
		for (let i = 0; i < this.lastUsersIntervals.length; i++) {
			console.log('clear chat interval no', i);
			window.clearInterval(this.lastUsersIntervals[i]);
		}
	}

}
///////////////////////////////////////////////////////////////////////
@Component({
	moduleId: module.id,
	selector: 'chat-cmp',
	templateUrl: 'chat.html'
})
export class ChatComponent implements OnInit, OnDestroy {
	currentUserProjectComments: ProjectCommentFromServer[] = [];

	isRequestorLoggedIn: boolean;

	chatIntervals: Array<any> = [];

	constructor(
		private alertService: AlertService,
		private authGuard: AuthGuard,
		private currentUserService: CurrentUserService,
		private projectCommentService: ProjectCommentService
	) { }

	ngOnInit() {
		if (this.authGuard.isUserLoggedIn())
			this.isRequestorLoggedIn = true;

		if (localStorage.getItem('currentUser')) {
			let self = this;
			// first loading
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
			// interval loading
			this.chatIntervals.push(
				window.setInterval(function () {
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
				}, 30000)
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
///////////////////////////////////////////////////////////////////////
@Component({
	moduleId: module.id,
	selector: 'notifications-cmp',
	templateUrl: 'notifications.html'
})
export class NotificationComponent {
	@Input() projects: Project[] = [];
}
///////////////////////////////////////////////////////////////////////
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

	myInterval: number = 6000;
	index: number = 0;

	slides: Array<any> = [];
	imgUrl: Array<any> = [
		`assets/img/trending0.jpg`,
		`assets/img/trending1.jpg`,
		`assets/img/trending2.jpg`,
		`assets/img/trending3.jpg`,
		`assets/img/trending4.jpg`,
		`assets/img/trending5.jpg`,
		`assets/img/trending6.jpg`,
		`assets/img/trending7.jpg`,
		`assets/img/trending8.jpg`,
		`assets/img/trending9.jpg`,
	];

	/* END */

	constructor(
		private projectService: ProjectService,
		private alertService: AlertService,
		private authGuard: AuthGuard,
		private currentUserService: CurrentUserService,
		private userService: UserService
	) { }

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

		if (localStorage.getItem('currentUser')) {
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
			//first loading
			self.userService
						.getUserFundedCompletedProjects(false)
						.subscribe(
						(data: Project[]) => {
							console.log('Projects Completed in home...');
							self.projectsToNotify = data;
						},
						(err: any) => {
							self.alertService.error(err);
							console.log('ERROR: ', err);
						});
			//intervals
			this.homeIntervals.push(
				window.setInterval(function () {
					self.userService
						.getUserFundedCompletedProjects(false)
						.subscribe(
						(data: Project[]) => {
							console.log('Projects Completed in home...');
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
			description: this.projects[i].Description,
			projectId: this.projects[i].Id
		});
	}
	/* END */
}
///////////////////////////////////////////////////////////////////////