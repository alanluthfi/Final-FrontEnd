import React from "react";
import { Link } from "react-router-dom";
import "../Style/ThumbStyle.css";

const ThumbnailCard = ({ thumbnailData }) => {
  return (
    <div className="thumbnail-card">
      <iframe
        title="YouTube video player"
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${thumbnailData.videoID}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <Link to={`/details/${thumbnailData.videoID}`}>
        <br></br>
        <img src={thumbnailData.UrlThumb} alt="Details Product" />
      </Link>
    </div>
  );
};

export default ThumbnailCard;
