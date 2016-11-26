import { ProjectComment } from './index';

export class ProjectCommentFromServer extends ProjectComment {
    IsRequestorProjectCommentCreator: boolean;
    ProjectTitle: string;
    AvatarImage: string;
}