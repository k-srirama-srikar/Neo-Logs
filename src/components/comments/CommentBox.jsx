import { useState } from "react";

export default function CommentBox({ onSubmit, parentId = null, autoFocus = false }) {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    await onSubmit(content, parentId);
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2 ml-4">
      <textarea
        className="w-full p-2 border rounded"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write a comment..."
        autoFocus={autoFocus}
      />
      <button type="submit" className="mt-1 px-3 py-1 bg-blue-600 text-white rounded">
        Post
      </button>
    </form>
  );
}
