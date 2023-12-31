interface IndividualProject {
  title: string;
  description: string;
  tasks_remaining: string[];
  date_started?: string;
  percent: number;
}

interface ExampleProjects {
  [projectName: string]: IndividualProject;
}

const exampleProjects: ExampleProjects = {
  project1: {
    title: "ML for strawberry growth",
    description: "Use machine learning to optimize strawberry growth.",
    tasks_remaining: [
      "Research existing ML models for plant growth.",
      "Collect data on strawberry growth conditions.",
      "Train a machine learning model.",
      "Implement the model in a controlled environment.",
    ],
    date_started: "26/02/05",
    percent: 35,
  },
  project2: {
    title: "Web Application Development",
    description: "Build a modern web application for project management.",
    tasks_remaining: [
      "Design the user interface and user experience.",
      "Implement the frontend using React.",
      "Develop the backend using Node.js and Express.",
      "Integrate with a database for data storage.",
    ],
    date_started: "02/05/05",
    percent: 68,
  },
  project3: {
    title: "Mobile App for Fitness Tracking",
    description: "Create a mobile app to track and monitor fitness activities.",
    tasks_remaining: [
      "Design the app interface for iOS and Android.",
      "Implement features for tracking workouts and nutrition.",
      "Integrate with health data APIs for additional insights.",
      "Test the app on various devices and platforms.",
    ],
    date_started: "20/08/05",
    percent: 92,
  },
  project4: {
    title: "Data Visualization Dashboard",
    description: "Develop a dashboard for visualizing data analytics.",
    tasks_remaining: [
      "Design interactive charts and graphs.",
      "Implement data visualization components using D3.js.",
      "Connect the dashboard to a data source.",
      "Optimize performance for large datasets.",
    ],
    date_started: "22/08/05",
    percent: 47,
  },
};

export default exampleProjects;
export type { ExampleProjects, IndividualProject };
