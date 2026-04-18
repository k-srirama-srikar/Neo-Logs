import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import "../styles/blogdetail.css";
import CommentsSection from "../components/comments/CommentSection";

const BlogDetailPage = () => {
  const { id: blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/blogs/${blogId}`, { headers })
      .then(res => setBlog(res.data))
      .catch(err => console.error("Error loading blog details for ID:", blogId, err));
  }, [blogId]);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserId(res.data.id);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };

    fetchUser();
  }, []);

  if (!blog) return <div style={{ padding: "2rem", textAlign: "center" }}>Loading Blog...</div>;

  return (
    <div className="blog-detail">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>{blog.title}</h1>
        {userId === blog.user_id && (
          <button className="btn-secondary" onClick={() => navigate(`/blogs/${blogId}/edit`)}>Edit</button>
        )}
      </div>
      <p className="blog-meta">By <Link to={`/users/${blog.username}`}>{blog.username}</Link> • {new Date(blog.created_at).toLocaleString()}</p>
      <div className="blog-tags">
        {blog.tags && blog.tags.map((tag, idx) => <span key={idx} className="tag">{tag}</span>)}
      </div>
      <div className="markdown-preview">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  style={vscDarkPlus}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {blog.content}
        </ReactMarkdown>
      </div>

      <div className="prose">
        <CommentsSection blogId={blogId} userId={userId} />
      </div>
    </div>
  );
};

export default BlogDetailPage;
