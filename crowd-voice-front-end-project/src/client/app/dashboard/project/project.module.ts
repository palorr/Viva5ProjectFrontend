import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ProjectProfileComponent } from './projectProfile.component';
import { ProjectCreateComponent } from './projectCreate.component';

import { ProjectComponent } from './project.component';

@NgModule({
    imports: [
        CommonModule, 
        RouterModule, 
        FormsModule
    ],
    declarations: [ProjectComponent, ProjectProfileComponent, ProjectCreateComponent],
    exports: [ProjectComponent, ProjectProfileComponent, ProjectCreateComponent]
})

export class ProjectModule { }