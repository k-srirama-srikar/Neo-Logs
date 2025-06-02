import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/userComments.css";

const UserComments = ({ username }) => {
  const [groupedComments, setGroupedComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    axios
      .get(`http://localhost:8000/api/comments/users/${username}`, { headers })
      .then((res) => {
        const comments = res.data || [];
        const grouped = comments.reduce((acc, comment) => {
        const blogId = comment.blog_id;
        if (!acc[blogId]) {
          acc[blogId] = {
            blog_id: blogId,
            blog_title: comment.blog_title,
            comments: []
          };
        }
        acc[blogId].comments.push(comment);
        return acc;
      }, {});

      // Convert object to array
      const groupedArray = Object.values(grouped);
      setGroupedComments(groupedArray);
        setLoading(false);
        console.log(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch comments", err);
        setLoading(false);
      });
  }, [username]);

  if (loading) return <p>Loading comments...</p>;

  return (
    <div className="comments-tab">
      <div className="comments-header">
        <h2>💬 @{username}'s Comments</h2>
      </div>
      {groupedComments.length === 0 ? (
        <p>No comments found.</p>
      ) : (
        groupedComments.map((group) => (
          <div key={group.blog_id} className="comment-group">
            <Link to={`/blogs/${group.blog_id}`} className="comment-blog-title">
              {group.blog_title}
            </Link>
            <div className="comment-list">
              {group.comments.map((comment) => (
                <div key={comment.id} className="comment-box">
                  <p className="comment-content">{comment.content}</p>
                  <span className="comment-date">
                    {new Date(comment.created_at).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default UserComments;
