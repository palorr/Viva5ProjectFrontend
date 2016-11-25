import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserService } from '../../services/index';
import { GenericUser } from '../../models/index';

@Component({
    moduleId: module.id,
    selector: 'all-users-list',
    templateUrl: 'userList.component.html'
})

export class UserListComponent implements OnInit {

    @Input() users: GenericUser[] = null;

    constructor(
        private route: ActivatedRoute,
        private userService: UserService
    ) { }

    ngOnInit() {
        if (this.route.data && this.users == null) {
            this.userService
                .getAllUsers()
                .subscribe(
                    (data: GenericUser[]) => {
                        this.users = data;
                        console.log('All Users Data: ', this.users);
                    },
                    (err) => {
                        alert(err);
                    }
                );
        }
    }
}