import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ChatPageComponent } from './chatPage.component';

@NgModule({
    imports: [
        CommonModule, 
        RouterModule, 
        FormsModule
    ],
    declarations: [ChatPageComponent],
    exports: [ChatPageComponent]
})

export class ChatPageModule { }
