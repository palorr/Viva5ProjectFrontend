import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserService, AlertService } from '../../services/index';
import { GenericUser } from '../../models/index';

@Component({
	moduleId: module.id,
    selector: 'user-search-cmp',
    templateUrl: 'userSearch.component.html'
})

export class UserSearchComponent{

    users: GenericUser[];

    constructor(
        private route: ActivatedRoute,
        private userService: UserService,
		private alertService: AlertService
	) {}

    
    searchByName(searchTerm: string): any {
        if(searchTerm.length > 1) {
            return this.userService
                       .getAllUsersByName(searchTerm)
                       .subscribe(
                           (data: GenericUser[]) => {
                               this.users = data;
                               console.log('Projects Data: ', this.users);
                           },
                           (err) => {
                               this.alertService.error('I am sorry, something went wrong. Please try again later!');
                           }
                       );
        }
        
        this.users = [];
        return;
    }
}