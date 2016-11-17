import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { userProfileComponent } from './userProfile.component';

@NgModule({
    imports: [
        CommonModule, 
        RouterModule, 
        FormsModule
    ],
    declarations: [userProfileComponent],
    exports: [userProfileComponent]
})

export class userProfileModule { }
