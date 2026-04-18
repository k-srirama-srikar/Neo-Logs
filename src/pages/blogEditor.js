import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import "../styles/blogeditor.css";

const BlogEditor = () => {
  const { id } = useParams();
  const isEditing = !!id;
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isEditing) {
      const token = localStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/blogs/${id}`, { headers })
        .then(res => {
          setTitle(res.data.title);
          setTags(res.data.tags ? res.data.tags.join(", ") : "");
          setContent(res.data.content);
        })
        .catch(err => {
          console.error("Error fetching blog for editing:", err);
          alert("Failed to load blog for editing.");
          navigate("/blogs");
        });
    }
  }, [id, isEditing, navigate]);

  const handleSubmit = (e, explicitStatus) => {
    e.preventDefault();
    const isPublished = explicitStatus === "published";
    const blogData = {
      title,
      content,
      tags: tags.split(",").map(tag => tag.trim()).filter(tag => tag),
      visibility: isPublished,
      status: explicitStatus,
    };

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to save a blog.");
      return;
    }

    const config = { headers: { Authorization: `Bearer ${token}` } };
    const request = isEditing 
      ? axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/blogs/${id}`, blogData, config)
      : axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/blogs`, blogData, config);

    request
      .then((res) => {
        alert(isEditing ? "Blog updated!" : "Blog saved!");
        if (explicitStatus === "draft") {
          try {
            const decoded = jwtDecode(token);
            navigate(`/users/${decoded.username}?tab=drafts`);
          } catch (err) {
            navigate("/");
          }
        } else {
          navigate("/blogs");
        }
      })
      .catch((err) => {
        console.error("Error saving blog:", err);
        alert("Failed to save blog.");
      });
  };

  const insertImage = () => {
    const url = prompt("Enter image URL:");
    if (url) {
      setContent(content + `\n![alt text](${url})\n`);
    }
  };

  return (
    <div className="editor-container">
      <div className="editor-left">
        <h2>{isEditing ? "Edit Blog" : "Create Blog"}</h2>
        <input
          className="editor-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Blog title"
        />
        <input
          className="editor-tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Tags (comma separated)"
        />
        <textarea
          className="editor-textarea"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your blog in Markdown..."
        />
        <div className="editor-buttons">
          <button className="btn-secondary" onClick={insertImage}>Insert Image</button>
          <button className="btn-secondary" onClick={(e) => handleSubmit(e, "draft")}>Save to Drafts</button>
          <button className="btn-primary" onClick={(e) => handleSubmit(e, "published")}>Publish</button>
        </div>
      </div>

      <div className="editor-right">
        <h3>Preview</h3>
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
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default BlogEditor;
