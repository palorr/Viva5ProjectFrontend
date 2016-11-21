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

import { FundingPackageCreateComponent } from './fundingPackageCreate.component';
import { FundingPackageEditComponent } from './fundingPackageEdit.component';

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
        ProjectUpdateEditComponent,
        FundingPackageCreateComponent,
        FundingPackageEditComponent
    ],
    exports: [
        ProjectComponent, 
        ProjectProfileComponent, 
        ProjectCreateComponent,
        ProjectEditComponent,
        ProjectListComponent,
        ProjectUpdateCreateComponent,
        ProjectUpdateEditComponent,
        FundingPackageCreateComponent,
        FundingPackageEditComponent
    ]
})

export class ProjectModule { }