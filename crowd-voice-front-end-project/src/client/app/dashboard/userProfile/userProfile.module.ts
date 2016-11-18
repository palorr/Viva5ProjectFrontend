import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';


import { userProfileComponent } from './userProfile.component';

@NgModule({
    imports: [RouterModule],
    declarations: [userProfileComponent],
    exports: [userProfileComponent]
})

export class userProfileModule { }
