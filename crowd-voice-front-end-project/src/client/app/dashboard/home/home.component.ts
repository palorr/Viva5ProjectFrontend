import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/index';
import { Project } from '../../models/index';

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
	/* Alert component */
	public alerts:Array<Object> = [
	   {
	     type: 'danger',
	     msg: 'Oh snap! Change a few things up and try submitting again.'
	   },
	   {
	     type: 'success',
	     msg: 'Well done! You successfully read this important alert message.',
	     closable: true
	   }
	 ];

	 public closeAlert(i:number):void {
	   this.alerts.splice(i, 1);
	 }
	/* END*/

	constructor(
		private projectService: ProjectService
	) {
		//for (let i = 0; i < 4; i++) {
			//this.addSlide();
		//}
	}
	
	ngOnInit() {
        this.projectService.getAllProjects()
            .subscribe(
                (data: Array<Project>) => {
					this.projects = data;
					console.log('this.projects: ', this.projects);
					for (let i = 0; i < data.length; i++) {
						this.addSlide();
					}
                },
                (err) => {
                    alert(err);
                });
    }

	/* Carousel */
	addSlide() {
		let i = this.slides.length;
		console.log("Slide " + i + ": " + this.projects[i].Title + " | " +  this.projects[i].Description);
		this.slides.push({
			image: this.imgUrl[i],
			title: this.projects[i].Title,
      		description: this.projects[i].Description
		});
	}
	/* END */
}
