export interface LiveProject {
  liveProjectID: number;
  startDate: string;
  finishDate: string;
  projectName: string;
  projectCreator: string;
  projectUsers: string[];
  projectStatus: number;
  projectPercent: number;
  projectDescription: string;
  githubLink: string;
  projectTasks: {
    completedTasks: {
      taskID: number;
      dateStarted: string;
      dateFinished: string;
      usersOnTask: string[];
      taskDescription: string;
      verified: boolean;
    }[];
    incompleteTasks: {
      taskID: number;
      dateStarted: string;
      taskFinishDate: string;
      usersOnTask: string[];
      taskDescription: string;
      taskCompletionStatus: number;
    }[];
  };
}

export interface User {
  id?: number;
  username: string;
  password: string;
  email: string;
  intro?: string;
  experience?: {
    experienceName: string;
    experienceDescription: string;
  }[];
  previousProjects?: number[];
}

export interface ActiveSession {
  session: boolean;
  id: number;
}

export interface ProjectListing {
  projectTitle: string;
  projectDescription: string;
  projectCategories: string[];
  listedProjectID?: number;
  projectCreatorID: number;
  usersApplied: number[];
}
