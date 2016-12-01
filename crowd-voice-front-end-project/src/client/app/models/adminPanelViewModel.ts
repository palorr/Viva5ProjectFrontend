import { ProjectCountByStatusModel, ProjectCountByCategoryModel, GlobalProjectStatsModel } from './index';

export class AdminPanelViewModel {
    public NoOfTotalUsers: number;
	public NoOfTotalProjectUpdates: number;
	public NoOfProjectsPerCategory: ProjectCountByCategoryModel[];
	public NoOfProjectsPerStatus: ProjectCountByStatusModel[];
	public GlobalProjectStats: GlobalProjectStatsModel;
	
	constructor(
		noOfTotalUsers: number, noOfTotalProjectUpdates: number,
		noOfProjectsPerCategory: ProjectCountByCategoryModel[], noOfProjectsPerStatus: ProjectCountByStatusModel[],
		globalProjectStats: GlobalProjectStatsModel
	) {
		this.NoOfTotalUsers = noOfTotalUsers;
		this.NoOfTotalProjectUpdates = noOfTotalProjectUpdates;
		this.NoOfProjectsPerCategory = noOfProjectsPerCategory;
		this.NoOfProjectsPerStatus = noOfProjectsPerStatus;
		this.GlobalProjectStats = globalProjectStats
    }
}