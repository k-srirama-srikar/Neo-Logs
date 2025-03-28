import React, { useEffect, useState } from "react";
import axios from "axios";

const UserBlogs = ({ username }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/users/${username}/blogs`)
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error(err));
  }, [username]);

  return (
    <div className="blogs">
      <h2>{username}'s Blogs</h2>
      {blogs.map((blog) => (
        <div key={blog.id} className="blog-post">
          <h3>{blog.title}</h3>
          <p>{blog.content}</p>
        </div>
      ))}
    </div>
  );
};

export default UserBlogs;
