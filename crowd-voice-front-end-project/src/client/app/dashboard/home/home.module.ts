import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { CarouselModule, DropdownModule, AlertModule } from 'ng2-bootstrap/ng2-bootstrap';

import { UpdatesTimelineComponent, ChatComponent, NotificationComponent , LastUsersTimelineComponent ,BacksTimelineComponent } from './home.component';

import { TruncatePipe }   from '../../pipes/truncate.pipe';

@NgModule({
    imports: [RouterModule, CommonModule, CarouselModule, DropdownModule, AlertModule],
    declarations: [TruncatePipe, HomeComponent, UpdatesTimelineComponent,LastUsersTimelineComponent, ChatComponent, NotificationComponent, BacksTimelineComponent],
    exports: [HomeComponent, UpdatesTimelineComponent,LastUsersTimelineComponent, ChatComponent, NotificationComponent, BacksTimelineComponent]
})

export class HomeModule { }
