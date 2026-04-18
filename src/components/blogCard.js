import React from "react";
import { Link, useNavigate } from "react-router-dom";
// import "../styles/blogcard.css";

const BlogCard = ({ blog, isDraft }) => {
  const navigate = useNavigate();
  // Strip common markdown characters for the excerpt
  const plainTextContent = blog.content.replace(/[#*`>~_-]/g, "");
  const snippet = plainTextContent.slice(0, 200) + "...";

  const handleCardClick = () => {
    navigate(isDraft ? `/blogs/${blog.id}/edit` : `/blogs/${blog.id}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleCardClick();
    }
  };

  return (
    <div 
      className="blog-card" 
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex="0"
    >
      <h3>{blog.title}</h3>
      <p className="blog-meta">
        By <Link to={`/users/${blog.username}`} onClick={(e) => e.stopPropagation()}>{blog.username}</Link> • {new Date(blog.created_at).toLocaleDateString()}
      </p>
      <p>{snippet}</p>
      <div className="blog-tags">
        {blog.tags && blog.tags.map((tag, idx) => <span key={idx} className="tag">{tag}</span>)}
      </div>
      {isDraft && (
        <div style={{ marginTop: "10px" }}>
          <button 
            className="btn-secondary" 
            style={{ fontSize: "0.8rem", padding: "4px 8px" }}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/blogs/${blog.id}/edit`);
            }}
          >
            Edit Draft
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogCard;
