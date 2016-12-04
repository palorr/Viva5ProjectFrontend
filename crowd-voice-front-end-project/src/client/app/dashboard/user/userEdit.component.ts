import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GenericUser } from '../../models/index';

import { AlertService, UserService } from '../../services/index';

@Component({
	moduleId: module.id,
	selector: 'user-edit-cmp',
	templateUrl: 'userEdit.component.html'
})
export class UserEditComponent implements OnInit {
    id:number ;
    user: GenericUser = new GenericUser();
    isRequestorThisUser : boolean = false;
    isRequestorLoggedIn : boolean = false;
    loading = false;

    constructor(
		private route: ActivatedRoute,
        private router: Router,
        private alertService: AlertService,
		private userService: UserService
	) { }
    
    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            this.id = +params['id'];
            let isLoggedIn = false;
            let currentUser = JSON.parse(localStorage.getItem('currentUser'));
            ///
            if (currentUser && currentUser.user.access_token) {
				isLoggedIn = true;
			}
            // if (this.authGuard.isUserLoggedIn())
			// 	this.isRequestorLoggedIn = true;
            ///
            this.userService.getUserMainInfo(this.id)
				.subscribe(
				(data: GenericUser) => {

					this.user = data;
					console.log('User Profile View Data: ', this.user);
					if(isLoggedIn)
						this.isRequestorThisUser = this.userService.isRequestorThisUser(this.user.Username);
					if(!isLoggedIn || !this.isRequestorThisUser){
                        this.alertService.error("You are not authorized to edit this profile!", true);
                        this.router.navigate(['/dashboard/home']);
                    }
				},
				(err) => {
					this.alertService.error('I am sorry, something went wrong. Please try again later!');
				}
				);


        });

    }
    editUser() {
		this.loading = true;
		
        console.log("User to send: ", this.user);
        
        this.userService.updateUser(this.user)
            .subscribe(
                (data) => {
					console.log('SUCCESS IN EDIT: ', data);
                    // set success message
                    this.alertService.success('User edited successfully!');
                	this.loading = false;
				},
                (err) => {
					console.log('ERROR IN EDIT: ', err);
                    let errorString = "";
                    
                    for(let element in err.modelState) {
                        err.modelState[element].forEach((errorMsg: string) => {
                            errorString += errorMsg + "\n\n"; 
                        });
                    }
                    
                    this.alertService.error('I am sorry, something went wrong. Please try again later!');
                    this.loading = false;
                });
	}

}