import React from "react";
import { Link } from "react-router-dom";
// import "../styles/blogcard.css";

const BlogCard = ({ blog }) => {
  const snippet = blog.content.slice(0, 200) + "...";

  return (
    <div className="blog-card">
      <Link to={`/blogs/${blog.id}`}>
        <h3>{blog.title}</h3>
      </Link>
      <p className="blog-meta">By {blog.username} • {new Date(blog.created_at).toLocaleDateString()}</p>
      <p>{snippet}</p>
      <div className="blog-tags">
        {blog.tags.map((tag, idx) => <span key={idx} className="tag">{tag}</span>)}
      </div>
    </div>
  );
};

export default BlogCard;
