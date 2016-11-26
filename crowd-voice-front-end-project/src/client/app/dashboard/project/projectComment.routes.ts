import { Route } from '@angular/router';

import { ProjectCommentCreateComponent } from './projectCommentCreate.component';
import { ProjectCommentEditComponent } from './projectCommentEdit.component';

import { AuthGuard } from '../../guards/index';

export const ProjectCommentRoutes: Route[] = [
  	{
    	path: ':projectId/comments/create',
    	component: ProjectCommentCreateComponent,
		canActivate: [AuthGuard]
  	},
	{
    	path: ':projectId/comments/:commentId/edit',
    	component: ProjectCommentEditComponent,
		canActivate: [AuthGuard]
  	}
];