import React from "react";
import Navbar from "../common_components/navbar";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="mt-3">
        <div className="text-3xl">What is our plan</div>
        <div className="mt-1">
          🚀 Dive into a world of endless possibilities with our groundbreaking
          platform! Welcome to a dynamic space where innovation knows no bounds
          – a hub tailored for students and engineers seeking to turn their
          dreams into reality.
          <br />
          🌐 Unleash your creativity across diverse domains, from pioneering
          machine learning projects in biomedical sciences to visionary
          architectural endeavors reshaping the very infrastructure of your
          university campus. This is not just a project platform; it's a
          collaborative ecosystem where your ideas flourish.
          <br />
          🤝 Connect with like-minded professionals and students to bring your
          projects to life! Upload your project plans, create a profile with
          your impressive resumé, and seamlessly link your GitHub and LinkedIn
          profiles. Now, you're not just applying for a role; you're showcasing
          your expertise to potential collaborators.
          <br />
          🎖️ As you embark on this journey, each project you contribute to
          becomes a badge of honor on your "Find a Project CV." Accumulate more
          projects, and watch as you attain verified status – a symbol of
          authenticity and excellence. Future collaborators will recognize your
          dedication and proficiency, ensuring your involvement elevates the
          quality of every project you touch.
          <br />
          💼 Your journey to success starts here. Join our community, build your
          project portfolio, and let your achievements speak for themselves.
          Together, let's shape the future of innovation! 💡{" "}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
