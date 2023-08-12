import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ThumbnailCard from "./component/ThumbnailCard";
import VideoDetails from "./component/VideoDetails";
import axios from "axios";
import "./Style/AppStyle.css";

function App() {
  const [thumbnailData, setThumbnailData] = useState([]);

  useEffect(() => {
    const fetchThumbnails = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3069/thumb/getThumb"
        );
        setThumbnailData(response.data);
      } catch (error) {
        console.error("Error fetching thumbnails:", error);
      }
    };

    fetchThumbnails();
  }, []);

  return (
    <Router>
      <div className="app">
        <header className="header">
          <h1>Tjoped Plei</h1>
        </header>
        <Routes>
          <Route
            path="/"
            element={<ThumbnailList thumbnailData={thumbnailData} />}
          />
          <Route path="/details/:videoID" element={<VideoDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

function ThumbnailList({ thumbnailData }) {
  return (
    <div className="thumbnail-list">
      {thumbnailData.map((thumbnail) => (
        <ThumbnailCard key={thumbnail._id} thumbnailData={thumbnail} />
      ))}
    </div>
  );
}

export default App;
