import Navbar from "@/app/common_components/navbar";
import React from "react";

interface Project {
  title: string;
  description: string;
  tasks_remaining: string[];
}

interface ExampleProjects {
  [projectName: string]: Project;
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
  },
};
const Project = ({ params }: { params: { projectid: string } }) => {
  console.log(exampleProjects[params.projectid]);
  return (
    <div>
      <Navbar />
      <div>{exampleProjects[params.projectid].title}</div>
      <div>{exampleProjects[params.projectid].description}</div>
      <ul>
        {exampleProjects[params.projectid].tasks_remaining.map((task) => {
          return <li>{task}</li>;
        })}
      </ul>
    </div>
  );
};

// export const getStaticPaths: GetStaticPaths = async () => {

//     // Map the paths to the required format
//     const paths = exampleProjects.map((post) => ({ params: { slug: post.title } }));

//     return { paths, fallback: false };
// };

// export const getStaticProps: GetStaticProps<ProjectProps> = async ({ params }) => {
//     // Fetch data based on the dynamic path
//     const selectedPost = exampleProjects.find((post) => post.title === params.slug);

//     return {
//       props: {
//         data: selectedPost,
//       },
//     };
// };

export default Project;
