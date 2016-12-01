import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DropdownModule } from 'ng2-bootstrap/ng2-bootstrap';
import { ModalModule } from 'ng2-bootstrap/ng2-bootstrap';

import { ProjectModule } from './project/project.module';

import { UserModule } from './user/user.module' ; 

import { HomeModule } from './home/home.module';

import { BlankPageModule } from './blank-page/blankPage.module';

import { ChatPageModule } from './chat/chatPage.module';

import { AdminPanelModule } from './adminPanel/adminPanel.module';

import { DashboardComponent } from './dashboard.component';

import {TopNavComponent} from '../shared/index';
import {SidebarComponent} from '../shared/index';


@NgModule({
    imports: [
        CommonModule,
    	RouterModule,
    	DropdownModule,
        ModalModule,
        ProjectModule,
    	HomeModule,
        ChatPageModule,
        AdminPanelModule,
        BlankPageModule,
        UserModule
    ],
    declarations: [DashboardComponent, TopNavComponent, SidebarComponent],
    exports: [DashboardComponent, TopNavComponent, SidebarComponent]
})

export class DashboardModule { }
