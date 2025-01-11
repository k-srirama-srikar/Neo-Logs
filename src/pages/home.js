import React from 'react';
import '../styles/home.css'; // Adjusted the path to point to the styles folder

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to the Blogging Platform</h1>
        <p>Discover and share ideas, thoughts, and stories.</p>
      </header>
      <section className="home-content">
        <div className="home-card">
          <h2>Feature 1</h2>
          <p>Create and manage your blog posts easily.</p>
        </div>
        <div className="home-card">
          <h2>Feature 2</h2>
          <p>Engage with readers through comments and discussions.</p>
        </div>
        <div className="home-card">
          <h2>Feature 3</h2>
          <p>Search and filter blogs to find what you love.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
