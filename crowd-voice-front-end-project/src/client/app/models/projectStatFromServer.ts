import { ProjectStat } from './index';

export class ProjectStatFromServer extends ProjectStat {
    IsRequestorProjectCreator: boolean;
    FundingGoal: number;
    FundingEndDate: string;
}