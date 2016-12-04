import { Component, NgZone,OnInit , } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SafeResourceUrl } from '@angular/platform-browser';
import { ProjectCategory, Project, ProjectFromServer ,AttachmentModel } from '../../models/index';

import { AlertService, ProjectService } from '../../services/index';

import {DomSanitizer } from '@angular/platform-browser';

@Component({
	moduleId: module.id,
	selector: 'project-edit-cmp',
	templateUrl: 'projectEdit.component.html'
})
export class ProjectEditComponent implements OnInit {
	
	project: Project = new Project();
	
	projectFromServer: ProjectFromServer = new ProjectFromServer();
	
	newAttachment:AttachmentModel = new AttachmentModel();
	videoAttachment:AttachmentModel = new AttachmentModel();

	loading = false;
	attachments :AttachmentModel[];
	
	projectCategoryOptions: ProjectCategory[];
	
	constructor(
		private route: ActivatedRoute,
        private router: Router,
        private alertService: AlertService,
		private projectService: ProjectService,
		private _ngZone: NgZone,
		private sanitizer: DomSanitizer
		
	) { }
	
    ngOnInit() {
		this.route.params.forEach((params: Params) => {
			let projectId = +params['id'];
			
			let isLoggedIn = false;
			
			let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        
			if (currentUser && currentUser.user.access_token) {
				isLoggedIn = true;
			}
			
			this.projectService.getProjectById(projectId, isLoggedIn)
					.subscribe(
						(data: ProjectFromServer) => {
							if(!data.IsRequestorProjectCreator) {
								this.alertService.error("You are not authorized to edit this project. You are not the project creator!", true);
								this.router.navigate(['/dashboard/home']);
								return;
							}
							this.project = data;
							this.getAttachments();
							console.log('Project Data: ', this.project);
						},
						(err) => {
							this.alertService.error('I am sorry, something went wrong. Please try again later!');
						}
					);
			
			
			this.projectService.getProjectCategories()
			.subscribe(
                (data: ProjectCategory[]) => {
					this.projectCategoryOptions = data;
                    console.log('Project Categories Data: ', this.projectCategoryOptions);
                },
                (err) => {
                    this.alertService.error('I am sorry, something went wrong. Please try again later!');
                }
			);
			
		});
	}
	
	editProject() {
		this.loading = true;
		
        console.log("Project to send: ", this.project);
        
        this.projectService.editProject(this.project)
            .subscribe(
                (data) => {
					console.log('SUCCESS IN EDIT: ', data);
                    // set success message
                    this.alertService.success('Project edited successfully!');
                	this.loading = false;
				},
                (err) => {
					console.log('ERROR IN EDIT: ', err);
                    let errorString = "";
                    
                    for(let element in err.modelState) {
                        err.modelState[element].forEach((errorMsg: string) => {
                            errorString += errorMsg + "\n\n"; 
                        });
                    }
                    
                    this.alertService.error('I am sorry, something went wrong. Please try again later!');
                    this.loading = false;
                });
	}
		////////////////////


fileChange(event:any) {


	let fileList :FileList =event.target.files;

	if(fileList.length > 0)
	{
		let file:File = fileList[0];
		this.readImage(file);
		
	}
}

readImage(file:File) {
 var  useBlob = false && window.URL;
var reader = new FileReader();
var scope = this;
  reader.addEventListener("load", function () {

  
    var image  = new Image();
    image.addEventListener("load", function () {

      
      var imageInfo = file.name    +' '+ 
                      image.width  +'×'+
                      image.height +' '+
                      file.type    +' '+
                      Math.round(file.size/1024) +'KB';

                      scope.newAttachment.FilePath = this.src;
    });

    image.src = useBlob ? window.URL.createObjectURL(file) : reader.result;
    

    // if (useBlob) {
    
    //   window.URL.revokeObjectURL(file);
    // }
  });

  
  reader.readAsDataURL(file); 
    
}

saveimage(){

	
	this.saveAttachment(this.newAttachment);

	  
}

saveAttachment(source:AttachmentModel)
{
		
	   this.projectService.saveProjectAttachemetImage( source, this.project.Id ) .subscribe(
                (data) => {
					// set success message
                    this.alertService.success('Project attachment saved successfully!');
                	this.loading = false;
					this.newAttachment = new AttachmentModel();
					this.videoAttachment = new AttachmentModel();
					this.getAttachments();
				},
                (err) => {
					this.getAttachments();
					this.newAttachment = new AttachmentModel();
					this.videoAttachment = new AttachmentModel();
					console.log('ERROR IN EDIT: ', err);
                    let errorString = "";
                    
                    for(let element in err.modelState) {
                        err.modelState[element].forEach((errorMsg: string) => {
                            errorString += errorMsg + "\n\n"; 
                        });
						
						
                    }
                    
                    //this.alertService.error('I am sorry, something went wrong. Please try again later!');
                    this.loading = false;
                });
}

saveVideo(){
	if(this.videoAttachment != null)
	{
		if(this.videoAttachment.HtmlCode != null)
		{
			let str = this.videoAttachment.HtmlCode.split('?v=')[1];
			let code = `https://www.youtube.com/embed/${str}`;
			this.videoAttachment.HtmlCode = code;
		}

		this.saveAttachment(this.videoAttachment);

	}
}
getAttachments(){
	this.attachments= null;
	this.projectService.getProjectAttachments(this.project.Id).subscribe((data :AttachmentModel[])=>{
			 this._ngZone.run(() => {
				 for(var e in data )
				 {
					 data[e].url = this.sanitizer.bypassSecurityTrustResourceUrl(data[e].HtmlCode);
				 }
                   this.attachments = data;
                });
		
	});
}

deleteAttachment(id:number){
	this.projectService.deleteAttachment(id).subscribe((data)=>{
		this.getAttachments();
	},(error)=>{
this.getAttachments();
	});
}

   
}