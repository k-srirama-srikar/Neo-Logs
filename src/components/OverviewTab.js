import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

const OverviewTab = ({ username }) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/users/${username}`, { headers })
      .then((res) => {
        setContent(res.data.user.overview);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to load content");
        setLoading(false);
      });
  }, [username]);

  if (loading) return <p>Loading overview...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="overview-tab">
      {/* <h2>📄 Overview</h2> */}
      <ReactMarkdown>{content || "No overview yet..."}</ReactMarkdown>
    </div>
  );
};

export default OverviewTab;
