import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AdminPanelComponent } from './adminPanel.component';

@NgModule({
    imports: [
        CommonModule, 
        RouterModule, 
        FormsModule
    ],
    declarations: [AdminPanelComponent],
    exports: [AdminPanelComponent]
})

export class AdminPanelModule { }
