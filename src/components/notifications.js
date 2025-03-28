import React, { useEffect, useState } from "react";
import axios from "axios";

const Notifications = ({ username }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/users/${username}/notifications`)
      .then((res) => setNotifications(res.data))
      .catch((err) => console.error(err));
  }, [username]);

  return (
    <div className="notifications">
      <h3>New Posts from Followed Users</h3>
      {notifications.length === 0 ? (
        <p>No new updates</p>
      ) : (
        <ul>
          {notifications.map((notif) => (
            <li key={notif.id}>{notif.message}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
