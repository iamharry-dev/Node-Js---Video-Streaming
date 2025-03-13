// Import required modules
const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const thumbsupply = require("thumbsupply"); // For generating video thumbnails

// Sample video data array
const videos = [
  {
    id: 0,
    poster: "/video/0/poster", // Thumbnail path
    camera: "camera_1",
    name: "Sample 1",
  },
  {
    id: 1,
    poster: "/video/1/poster",
    camera: "camera_2",
    name: "Sample 2",
  },
  {
    id: 2,
    poster: "/video/2/poster",
    camera: "camera_3",
    name: "Sample 3",
  },
];

// Initialize Express app
const app = express();

// Enable CORS for cross-origin requests
app.use(cors());

// Endpoint to serve a single video file
app.get("/video", (req, res) => {
  res.sendFile("assets/sample.mp4", { root: __dirname });
});

// API to get the list of all videos
app.get("/videos", (req, res) => res.json(videos));

// API to get metadata for a specific video by ID
app.get("/video/:id/data", (req, res) => {
  const id = parseInt(req.params.id, 10);
  res.json(videos[id]); // Return the video metadata as JSON
});

// API to stream a video file in chunks
app.get("/video/:id", (req, res) => {
  const videoPath = `assets/${req.params.id}.mp4`;

  // Check if the video file exists
  if (!fs.existsSync(videoPath)) {
    return res.status(404).json({ error: "Video not found" });
  }

  const stat = fs.statSync(videoPath); // Get file details
  const fileSize = stat.size;
  const range = req.headers.range; // Get requested range from headers

  if (range) {
    // Parse the range header
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

    // Calculate chunk size
    const chunksize = end - start + 1;
    const file = fs.createReadStream(videoPath, { start, end });

    // Set response headers for partial content
    const head = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Type": "video/mp4",
    };

    res.writeHead(206, head); // Send partial content response
    file.pipe(res); // Stream video chunk to client
  } else {
    // Serve entire file if no range is requested
    const head = {
      "Content-Length": fileSize,
      "Content-Type": "video/mp4",
    };

    res.writeHead(200, head);
    fs.createReadStream(videoPath).pipe(res);
  }
});

// API to generate and serve a thumbnail for a video
app.get("/video/:id/poster", (req, res) => {
  thumbsupply
    .generateThumbnail(`assets/${req.params.id}.mp4`)
    .then((thumb) => res.sendFile(thumb)) // Send generated thumbnail
    .catch(() => res.status(500).json({ error: "Thumbnail generation failed" }));
});

// Start the server on port 4000
app.listen(4000, () => {
  console.log(" Server is running on port 4000!");
});
