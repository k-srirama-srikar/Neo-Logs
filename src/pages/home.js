import React from 'react';
import '../styles/home.css'; // Adjusted the path to point to the styles folder

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to Neo Logs - The Blogging Platform</h1>
        <p>Discover and share ideas, thoughts, and stories.</p>
      </header>
      <section className="home-content">
        <div className="home-card">
          <h3><i>Create and manage your blog posts easily.</i></h3>
          {/* <p></p> */}
        </div>
        <div className="home-card">
          <h3><i>Engage with readers through comments and discussions.</i></h3>
          <p></p>
        </div>
        <div className="home-card">
          <h3><i>Configure your profile in a way that you love.</i></h3>
          <p></p>
        </div>
      </section>
    </div>
  );
};

export default Home;
