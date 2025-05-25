// import { useState } from "react";
// import CommentBox from "./CommentBox";

// export default function CommentItem({ comment, onReply, onDelete, children }) {
//   const [replying, setReplying] = useState(false);

//   return (
//     <div className="ml-4 my-2 border-l pl-4">
//       <div className="flex justify-between">
//         <span className="text-sm font-semibold">User #{comment.user_id}</span>
//         <span className="text-xs text-gray-400">{new Date(comment.created_at).toLocaleString()}</span>
//       </div>
//       <p className="text-sm">{comment.content}</p>
//       <div className="mt-1 space-x-2 text-xs text-blue-600">
//         <button onClick={() => setReplying(!replying)}>
//           {replying ? "Cancel" : "Reply"}
//         </button>
//         <button onClick={() => onDelete(comment.id)}>Delete</button>
//       </div>
//       {replying && (
//         <CommentBox
//           onSubmit={(text) => {
//             onReply(text, comment.id);
//             setReplying(false);
//           }}
//           parentId={comment.id}
//           autoFocus
//         />
//       )}
//       {children}
//     </div>
//   );
// }


import { useState } from "react";
import CommentBox from "./CommentBox";
import "../../styles/commentBox.css"; // Import the shared CSS file

export default function CommentItem({ comment, onReply, onDelete, children }) {
  const [replying, setReplying] = useState(false);

  return (
    <div className="comment-item">
      <div className="comment-header">
        <span className="comment-user">{comment.user_name}</span>
        <span className="comment-date">
          {new Date(comment.created_at).toLocaleString()}
        </span>
      </div>
      <p className="comment-content">{comment.content}</p>
      <div className="comment-actions">
        <button onClick={() => setReplying(!replying)}>
          {replying ? "Cancel" : "Reply"}
        </button>
        <button onClick={() => onDelete(comment.id)}>Delete</button>
      </div>
      {replying && (
        <CommentBox
          onSubmit={(text) => {
            onReply(text, comment.id);
            setReplying(false);
          }}
          parentId={comment.id}
          autoFocus
        />
      )}
      {children}
    </div>
  );
}
