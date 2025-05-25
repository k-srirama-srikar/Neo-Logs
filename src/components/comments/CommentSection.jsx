// import { useEffect, useState } from "react";
// import CommentBox from "./CommentBox";
// import CommentItem from "./CommentItem";
// import axios from "axios";

// export default function CommentsSection({ blogId, userId }) {
//   const [comments, setComments] = useState([]);

//   useEffect(() => {
//     const fetchComments = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8000/api/blogs/comments/${blogId}`);
//         // Ensure comments is always an array
//         setComments(Array.isArray(response.data) ? response.data : []);
//       } catch (err) {
//         console.error("Failed to load comments", err);
//         setComments([]); // fallback to empty array on error
//       }
//     };

//     fetchComments();
//   }, [blogId]);

//   const fetchComments = async () => {
//     try {
//       const res = await axios.get(`/api/blogs/comments/${blogId}`);
//       setComments(Array.isArray(res.data) ? res.data : []);
//     } catch (err) {
//       console.error("Failed to fetch comments", err);
//       setComments([]);
//     }
//   };

//   const handleAddComment = async (content, parentId = null) => {
//     try {
//       await axios.post(`/api/blogs/${blogId}/comments`, {
//         content,
//         parent_comment_id: parentId,
//       }, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
//       });
//       await fetchComments();
//     } catch (err) {
//       console.error("Failed to add comment", err);
//     }
//   };

//   const handleDeleteComment = async (id) => {
//     try {
//       await axios.delete(`/api/comments/${id}`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
//       });
//       await fetchComments();
//     } catch (err) {
//       console.error("Failed to delete comment", err);
//     }
//   };

//   const buildTree = (flat) => {
//     if (!Array.isArray(flat)) return []; // extra safety
//     const map = {};
//     const tree = [];

//     flat.forEach((comment) => (map[comment.id] = { ...comment, children: [] }));
//     flat.forEach((comment) => {
//       if (comment.parent_comment_id) {
//         map[comment.parent_comment_id]?.children.push(map[comment.id]);
//       } else {
//         tree.push(map[comment.id]);
//       }
//     });

//     return tree;
//   };

//   const renderTree = (nodes) =>
//     nodes.map((comment) => (
//       <CommentItem
//         key={comment.id}
//         comment={comment}
//         onReply={handleAddComment}
//         onDelete={handleDeleteComment}
//       >
//         {renderTree(comment.children || [])}
//       </CommentItem>
//     ));

//   return (
//     <div className="mt-6">
//       <h3 className="text-lg font-bold mb-2 border rounded">Comments</h3>
//       {userId && <CommentBox onSubmit={handleAddComment} />}
//       <div>{renderTree(buildTree(comments))}</div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import CommentBox from "./CommentBox";
import CommentItem from "./CommentItem";
import axios from "axios";
import "../../styles/commentBox.css"; // Import the CSS

export default function CommentsSection({ blogId, userId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/comments/${blogId}`);
        // Ensure comments is always an array
        setComments(Array.isArray(response.data) ? response.data : []);
        console.log(response.data)
      } catch (err) {
        console.error("Failed to load comments", err);
        setComments([]); // fallback to empty array on error
      }
    };

    fetchComments();
  }, [blogId]);

  const fetchComments = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/comments/${blogId}`);
      setComments(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to fetch comments", err);
      setComments([]);
    }
  };

  const handleAddComment = async (content, parentId = null) => {
    try {
      await axios.post(`http://localhost:8000/api/comments/${blogId}`,
        {
          content,
          parent_comment_id: parentId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      await fetchComments();
    } catch (err) {
      console.error("Failed to add comment", err);
    }
  };

  const handleDeleteComment = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/comments/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      await fetchComments();
    } catch (err) {
      console.error("Failed to delete comment", err);
    }
  };

  // const buildTree = (flat) => {
  //   if (!Array.isArray(flat)) return [];
  //   const map = {};
  //   const tree = [];

  //   flat.forEach((comment) => (map[comment.id] = { ...comment, children: [] }));
  //   flat.forEach((comment) => {
  //     if (comment.parent_comment_id) {
  //       map[comment.parent_comment_id]?.children.push(map[comment.id]);
  //     } else {
  //       tree.push(map[comment.id]);
  //     }
  //   });

  //   return tree;
  // };

  const renderTree = (nodes) =>
    nodes.map((comment) => (
      <CommentItem
        key={comment.id}
        comment={comment}
        onReply={handleAddComment}
        onDelete={handleDeleteComment}
      >
        {renderTree(comment.children || [])}
      </CommentItem>
    ));

  return (
    <div className="comments-section">
      <h3 className="comments-header">Comments</h3>
      {<CommentBox onSubmit={handleAddComment} />}
      <div>{renderTree(comments)}</div>
    </div>
  );
}
