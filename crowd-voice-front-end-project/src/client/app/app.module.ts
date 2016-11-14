import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { routes } from './app.routes';

import { ProjectProfileModule } from './projectProfile/projectProfile.module';
import { LoginModule } from './login/login.module';
import { SignupModule } from './signup/signup.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { SharedModule } from './shared/shared.module';

import { AlertComponent } from './directives/index';
import { AlertService, AuthenticationService, UserService, ProjectService } from './services/index';

@NgModule({
	imports: [
		BrowserModule,
		HttpModule,
		RouterModule.forRoot(routes),
		FormsModule,
		ProjectProfileModule,
		LoginModule,
		SignupModule,
		DashboardModule,
		SharedModule.forRoot()
	],
	declarations: [
		AppComponent,
        AlertComponent
	],
	providers: [
		{
			provide: APP_BASE_HREF,
			useValue: '<%= APP_BASE %>'
		},
		AlertService,
        AuthenticationService,
		UserService,
		ProjectService
	],
	bootstrap: [AppComponent]

})

export class AppModule { }
