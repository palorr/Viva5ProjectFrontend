import { NgModule } from '@angular/core';
import { RouterModule  } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ProjectListComponent } from './projectList.component';

@NgModule({
    imports: [RouterModule, CommonModule],
    declarations: [ProjectListComponent],
    exports: [ProjectListComponent]
})

export class ProjectListModule { }
