# TypeScript LINE/Discord API Server

This is a TypeScript-based API server that integrates with both LINE and Discord platforms. It provides webhook endpoints for both services and includes basic bot functionality.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- LINE Bot account and credentials
- Discord Bot account and credentials

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   # Server Configuration
   PORT=3000
   NODE_ENV=development

   # LINE Bot Configuration
   LINE_CHANNEL_ACCESS_TOKEN=your_line_channel_access_token
   LINE_CHANNEL_SECRET=your_line_channel_secret

   # Discord Bot Configuration
   DISCORD_BOT_TOKEN=your_discord_bot_token
   DISCORD_CLIENT_ID=your_discord_client_id
   DISCORD_GUILD_ID=your_discord_guild_id
   ```

4. Build the project:
   ```bash
   npm run build
   ```

5. Start the server:
   ```bash
   npm start
   ```

For development with hot-reload:
```bash
npm run dev
```

## API Endpoints

### LINE Bot
- `POST /api/line/webhook` - LINE webhook endpoint for receiving messages

### Discord Bot
- `POST /api/discord/webhook` - Send messages to Discord channels
  - Body: `{ "channelId": "channel_id", "message": "your message" }`

## Features

- LINE Bot integration with message echo functionality
- Discord Bot integration with basic command handling
- Express server with TypeScript
- Environment configuration
- Error handling middleware
- CORS and security headers

## Development

- `npm run dev` - Start development server with hot-reload
- `npm run build` - Build the project
- `npm run lint` - Run ESLint
- `npm start` - Start production server

## Video Processing Tool

The project includes a video processing tool that extracts frames from videos for use with the image search API. This tool runs on the client side and is separate from the server instance.

### Video Processing Requirements

- Python 3.7 or higher
- Tesseract OCR installed on your system
- Required Python packages:
  ```bash
  pip install opencv-python tqdm pytesseract Pillow
  ```

### Installing Tesseract OCR

#### Windows
1. Download the installer from: https://github.com/UB-Mannheim/tesseract/wiki
2. Install and add to PATH
3. Restart your terminal

#### Linux
```bash
sudo apt-get install tesseract-ocr
```

#### macOS
```bash
brew install tesseract
```

### Video Processing Usage

1. Place your video files in the `video_processor/input` directory
2. Run the script:
   ```bash
   python video_processor/video_to_frames.py video_processor/input --output-dir custom_output --interval 5 --extensions .mp4 .avi --dedup-mode both --text-region all --lang eng
   ```
   This will automatically save frames to `video_processor/output`

Optional arguments:
```bash
python video_processor/video_to_frames.py video_processor/input --output-dir custom_output --interval 5 --extensions .mp4 .avi --dedup-mode both --text-region all --lang eng
```

### Arguments

- `input_dir`: Directory containing input video files (required)
- `--output-dir`: Directory to save extracted frames (default: video_processor/output)
- `--interval`: Extract every nth frame (default: 1)
- `--extensions`: Video file extensions to process (default: .mp4 .avi .mov)
- `--dedup-mode`: Deduplication mode for saving frames. Options:
    - `ssim`: Only use visual similarity (SSIM)
    - `text`: Only use text similarity
    - `both`: Use both SSIM and text (default)
- `--text-region`: Region of the frame to extract text from. Options:
    - `all`: Use the whole frame (default)
    - `top`: Use only the top third of the frame
    - `bottom`: Use only the bottom third of the frame
- `--lang`: Tesseract OCR language code (default: `eng`). Example values: `eng` (English), `chi_tra` (Traditional Chinese), `chi_sim` (Simplified Chinese)

### Output Structure

```
video_processor/
├── input/          # Place your video files here
│   └── video1.mp4
├── output/         # Processed frames will be saved here
│   ├── video1/     # Subdirectory for each video
│   │   ├── frame_000000.jpg
│   │   ├── frame_000001.jpg
│   │   └── metadata.json      # Contains video info, frame details, and extracted text
│   ├── processing_summary.json # Overall processing summary
│   └── processing_time.txt     # Detailed timing information
├── requirements.txt
└── video_to_frames.py
```

### Output Files

1. **metadata.json** (per video):
   - Video information (resolution, FPS, total frames)
   - Frame information (frame numbers, filenames, timestamps)
   - Extracted text from each frame
   - Estimated and actual processing time

2. **processing_summary.json**:
   - Overall processing information
   - List of processed videos
   - Total processing time
   - Number of frames with text for each video

3. **processing_time.txt**:
   - Processing completion timestamp
   - Total videos processed
   - Total processing time
   - Individual video processing times (estimated and actual)
   - Number of frames with text for each video

### Text Extraction Features

The tool automatically:
- Extracts text directly from video frames using OCR
- Only saves frames that contain text
- Avoids duplicate text frames
- Cleans and formats extracted text
- Includes text information in the metadata

### Time Tracking

The tool provides time estimates and tracking:
- Estimates processing time based on video length and FPS
- Tracks actual processing time for each video
- Records total processing time for all videos
- Saves detailed timing information in `processing_time.txt`

## License

MIT 