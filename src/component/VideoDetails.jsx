import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import CommentSection from "./CommentSection";
import { Link } from "react-router-dom";
import "../Style/VideoDetailsStyle.css";

const VideoDetails = () => {
  const { videoID } = useParams();
  const [productData, setProductData] = useState({});
  const [comments, setComments] = useState([]);
  const [userName, setUserName] = useState("");
  const [userComment, setUserComment] = useState("");

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `https://final-backend-production-a6a4.up.railway.app/comments/${videoID}`
      );
      console.log("API Response for comment data:", response.data);
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const response = await axios.get(
          `https://final-backend-production-a6a4.up.railway.app/product/${videoID}`
        );
        console.log("API Response for video data:", response.data);
        const [product] = response.data;
        setProductData(product);
      } catch (error) {
        console.error("Error fetching video data:", error);
      }
    };

    fetchVideoData();
    fetchComments();
  }, [videoID]);

  const handleCommentSubmit = async (event) => {
    event.preventDefault();

    if (!userName || !userComment) {
      alert("Please enter your name and comment.");
      return;
    }

    try {
      const response = await axios.post(
        `https://final-backend-production-a6a4.up.railway.app/comments/create`,
        {
          userName,
          comment: userComment,
          videoID: videoID,
        }
      );

      // Clear the form input fields after submitting
      setUserName("");
      setUserComment("");

      // Fetch comments again to update the comment section
      fetchComments();
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  return (
    <div className="video-details">
      <iframe
        title="YouTube video player"
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${productData.productID}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>

      {productData.title !== undefined && productData.title !== "" && (
        <div className="product-info">
          <Link to={`/`}>Home</Link>
          <h2>{productData.title}</h2>
          <p>Price: Rp. {productData.price}</p>
          <Link to={productData.productLink}>
            Kunjungi {productData.productLink}
          </Link>
        </div>
      )}

      <div className="comment-form">
        <h3>Leave a Comment</h3>
        <form onSubmit={handleCommentSubmit}>
          <div>
            <label htmlFor="userName">Name:</label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="userComment">Comment:</label>
            <textarea
              id="userComment"
              value={userComment}
              onChange={(e) => setUserComment(e.target.value)}
            />
          </div>
          <button type="submit">Submit Comment</button>
        </form>
      </div>

      <CommentSection comments={comments} />
    </div>
  );
};

export default VideoDetails;
