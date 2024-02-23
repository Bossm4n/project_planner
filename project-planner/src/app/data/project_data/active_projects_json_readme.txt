An object in "active_projects.json" has numerous attributes, some that are self-explantory and some that need more explaining.
The fields that should be relatively self-explantory are: 'liveProjectID', 'startDate', 'finishDate', 'projectName', 'projectUsers', 'githubLink'.
The other fields/attributes are explained below:
-> 'projectStatus' - A attribute with 2 possible values: 1 for a in-progress project and 0 for a completed project.
-> 'projectTasks' - Has 2 categories, 'completedTasks' and 'incompleteTasks', futher described below. 
'completedTasks' have objects that have simple categories other than the 'verified' attribute - this is a boolean attribute that is set to true when the completed task has been verified by the project owner, however when tagged for completetion the default value of false shall be set.
'incompleteTasks' are very similiar in their attributes as 'completedTasks' with a few small tweaks like 'dateFinished' -> 'taskFinishDate' for a projected finish date for the class, and instead of 'verified' it has 'taskCompletionStatus' which has 3 categories, 0 for not started, 0.5 for in progress and 1 for finished/nearly finished. 