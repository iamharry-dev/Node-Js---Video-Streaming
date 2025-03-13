# 📌 Node.js Video Streaming Server  

🚀 A simple **Node.js** server for streaming videos with support for **range requests**, **thumbnails**, and **CORS**.  

---

## 🎯 Features  
- ✅ **Efficient video streaming** with range requests  
- ✅ **Generate video thumbnails dynamically**  
- ✅ **Serve multiple videos with metadata**  
- ✅ **CORS enabled** for smooth frontend integration  

---

## ⚙️ Installation & Setup  

### 🔹 Prerequisites  
- 📌 **Node.js (v16+)**  
- 📦 **npm or yarn**  

### 🔹 Install Dependencies & Run the Server  

```bash
# Clone the repository
git clone https://github.com/your-repo.git
cd your-repo

# Install dependencies
npm install  # or yarn install

# Start the server
node server.js  

# Server will run on: http://localhost:4000
```

## 🎬 Video Streaming

The server streams videos efficiently using range-based requests, allowing users to seek through videos smoothly.
Videos should be placed inside the assets/ directory.
Thumbnails for videos are generated dynamically using thumbsupply.
The server exposes API endpoints to fetch video metadata and thumbnails.

## 🚀 API Endpoints

### Method	Endpoint	Description
```bash
GET	/videos	               Get a list of available videos
GET	/video/:id/data         Get metadata for a specific video
GET	/video/:id	         Stream the selected video
GET	/video/:id/poster	  Get a thumbnail for the video
```

Example Request to Fetch Videos:

```bash
curl http://localhost:4000/videos
```
