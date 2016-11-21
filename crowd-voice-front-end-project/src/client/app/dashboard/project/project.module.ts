import {MomentModule} from 'angular2-moment';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ProjectProfileComponent } from './projectProfile.component';
import { ProjectCreateComponent } from './projectCreate.component';
import { ProjectEditComponent } from './projectEdit.component';
import { ProjectListComponent } from './projectList.component';

import { ProjectUpdateCreateComponent } from './projectUpdateCreate.component';
import { ProjectUpdateEditComponent } from './projectUpdateEdit.component';

import { ProjectComponent } from './project.component';

@NgModule({
    imports: [
        CommonModule, 
        RouterModule, 
        FormsModule,
        MomentModule
    ],
    declarations: [
        ProjectComponent, 
        ProjectProfileComponent, 
        ProjectCreateComponent,
        ProjectEditComponent, 
        ProjectListComponent,
        ProjectUpdateCreateComponent,
        ProjectUpdateEditComponent
    ],
    exports: [
        ProjectComponent, 
        ProjectProfileComponent, 
        ProjectCreateComponent,
        ProjectEditComponent,
        ProjectListComponent,
        ProjectUpdateCreateComponent,
        ProjectUpdateEditComponent
    ]
})

export class ProjectModule { }