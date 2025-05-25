import { useState } from "react";
import CommentBox from "./CommentBox";

export default function CommentItem({ comment, onReply, onDelete, children }) {
  const [replying, setReplying] = useState(false);

  return (
    <div className="ml-4 my-2 border-l pl-4">
      <div className="flex justify-between">
        <span className="text-sm font-semibold">User #{comment.user_id}</span>
        <span className="text-xs text-gray-400">{new Date(comment.created_at).toLocaleString()}</span>
      </div>
      <p className="text-sm">{comment.content}</p>
      <div className="mt-1 space-x-2 text-xs text-blue-600">
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
