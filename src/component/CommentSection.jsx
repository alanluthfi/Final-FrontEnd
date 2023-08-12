import React from "react";
import "../Style/CommentStyle.css";

const CommentSection = ({ comments }) => {
  return (
    <div className="comment-section">
      <h3>Comments</h3>
      <ul>
        {comments.map((comment) => (
          <li key={comment._id}>
            <p>{comment.userName}</p>
            <p>{comment.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentSection;
