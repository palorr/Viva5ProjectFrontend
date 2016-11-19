import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ViewProfileComponent } from './viewProfile.component';
//import { ProjectCreateComponent } from './projectCreate.component';

import { UserComponent } from './user.component';

@NgModule({
    imports: [
        CommonModule, 
        RouterModule, 
        FormsModule
    ],
    declarations: [UserComponent, ViewProfileComponent],
    exports: [UserComponent, ViewProfileComponent]
})

export class UserModule { }