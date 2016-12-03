import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SignupComponent } from './signup.component';

import { AlertModule } from '../directives/alert.module';

@NgModule({
    imports: [
        CommonModule, 
        RouterModule, 
        FormsModule,
        AlertModule
    ],
    declarations: [SignupComponent],
    exports: [SignupComponent]
})

export class SignupModule { }
