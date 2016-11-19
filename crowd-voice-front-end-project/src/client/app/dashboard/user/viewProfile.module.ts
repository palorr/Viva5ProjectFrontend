import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';


import { ViewProfileComponent } from './viewProfile.component';

@NgModule({
    imports: [RouterModule],
    declarations: [ViewProfileComponent],
    exports: [ViewProfileComponent]
})

export class ViewProfileModule { }
