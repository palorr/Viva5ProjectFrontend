import { MomentModule } from 'angular2-moment';

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

import { ProjectCommentCreateComponent } from './projectCommentCreate.component';
import { ProjectCommentEditComponent } from './projectCommentEdit.component';

import { FundingPackageCreateComponent } from './fundingPackageCreate.component';
import { FundingPackageEditComponent } from './fundingPackageEdit.component';

import { FundingPackagePayComponent } from './fundingPackagePay.component';

import { ProjectSearchComponent } from './projectSearch.component';

import { ProjectStatScreenComponent } from './projectStatScreen.component';

import { ProjectComponent } from './project.component';

import {
		TabsModule,
        ModalModule
	} from 'ng2-bootstrap/ng2-bootstrap';

@NgModule({
    imports: [
        CommonModule, 
        RouterModule, 
        FormsModule,
        MomentModule,
        TabsModule,
        ModalModule
    ],
    declarations: [
        ProjectComponent, 
        ProjectProfileComponent, 
        ProjectCreateComponent,
        ProjectEditComponent, 
        ProjectListComponent,
        ProjectUpdateCreateComponent,
        ProjectUpdateEditComponent,
        ProjectCommentCreateComponent,
        ProjectCommentEditComponent,
        FundingPackageCreateComponent,
        FundingPackageEditComponent,
        FundingPackagePayComponent,
        ProjectSearchComponent,
        ProjectStatScreenComponent
    ],
    exports: [
        ProjectComponent, 
        ProjectProfileComponent, 
        ProjectCreateComponent,
        ProjectEditComponent,
        ProjectListComponent,
        ProjectUpdateCreateComponent,
        ProjectUpdateEditComponent,
        ProjectCommentCreateComponent,
        ProjectCommentEditComponent,
        FundingPackageCreateComponent,
        FundingPackageEditComponent,
        FundingPackagePayComponent,
        ProjectSearchComponent,
        ProjectStatScreenComponent
    ]
})

export class ProjectModule { }