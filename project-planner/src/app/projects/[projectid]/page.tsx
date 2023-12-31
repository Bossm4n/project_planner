import Navbar from "@/app/common_components/navbar";
import React from "react";
import exampleProjects from "../projects";

const Project = ({ params }: { params: { projectid: string } }) => {
  return (
    <div>
      <Navbar />
      <div className="mt-3 text-2xl">
        {exampleProjects[params.projectid].title}
      </div>
      <div className="mt-1">
        {exampleProjects[params.projectid].description}
      </div>
      <ul className="mt-2">
        <div className="text-lg">Tasks Remaing:</div>
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
