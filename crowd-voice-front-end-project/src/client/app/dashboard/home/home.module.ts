import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { CarouselModule, DropdownModule, AlertModule } from 'ng2-bootstrap/ng2-bootstrap';

import { UpdatesTimelineComponent, ChatComponent, NotificationComponent , LastUsersTimelineComponent } from './home.component';

@NgModule({
    imports: [RouterModule, CommonModule, CarouselModule, DropdownModule, AlertModule],
    declarations: [HomeComponent, UpdatesTimelineComponent,LastUsersTimelineComponent, ChatComponent, NotificationComponent],
    exports: [HomeComponent, UpdatesTimelineComponent,LastUsersTimelineComponent, ChatComponent, NotificationComponent]
})

export class HomeModule { }
