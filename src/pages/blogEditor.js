import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import "../styles/blogeditor.css";

const BlogEditor = () => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("draft");
  const [visibility, setVisibility] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const blogData = {
      title,
      content,
      tags: tags.split(",").map(tag => tag.trim()),
      visibility,
      status,
    };

    axios
      .post("http://localhost:8000/api/blogs", blogData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Adjust based on how you store token
        },
      })
      .then((res) => {
        alert("Blog saved!");
        // redirect or reset form
      })
      .catch((err) => {
        console.error("Error saving blog:", err);
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
          <button onClick={() => setStatus("draft")}>Save Draft</button>
          <button onClick={() => {setStatus("published");setVisibility(true);}}>Publish</button>
          <button onClick={insertImage}>Insert Image</button>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>

      <div className="editor-right">
        <h3>Preview</h3>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
};

export default BlogEditor;
