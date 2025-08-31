# AI Voice Tutor

![AI Voice Tutor Showcase](./path/to/your/screenshot-showcase.png)

The AI Voice Tutor is an interactive web application designed to bridge the gap between written content and auditory learning. Users can input text, or upload image and PDF files, to receive intelligent answers from Google's Gemini AI. The application then converts the AI's response into natural-sounding speech using Murf.ai's text-to-speech technology.

## 🚀 Objectives

The primary goal of this project is to create an accessible and versatile tool that:

*   **Transforms Text to Knowledge**: Converts static text from various sources into dynamic, audible information.
*   **Enhances Accessibility**: Provides an audio-based learning alternative for users who may have reading difficulties, visual impairments, or simply prefer auditory learning.
*   **Leverages Modern AI**: Integrates powerful APIs for content understanding (Google Gemini) and voice synthesis (Murf.ai) to provide a seamless and intelligent user experience.
*   **Multi-Modal Input**: Accepts user input through direct text entry, as well as text extraction from images and PDF documents, making it a flexible tool for various use cases.

## ✨ Features

*   **AI-Powered Q&A**: Utilizes the Google Gemini API to understand and respond to user queries from the provided text.
*   **High-Quality Text-to-Speech**: Employs Murf.ai to generate realistic and natural-sounding audio from the AI's answers.
*   **Optical Character Recognition (OCR)**: Extracts text directly from uploaded images (`.jpg`, `.png`, `.jpeg`) using Tesseract.js.
*   **PDF Text Extraction**: Parses and extracts text content from uploaded PDF files using PDF.js.
*   **Interactive Audio Player**: Allows users to play, pause, and listen to the generated speech directly in the browser.
*   **Downloadable Audio**: Provides a direct download link for the generated MP3 audio file.
*   **Responsive Frontend**: A clean and user-friendly interface that works seamlessly across different devices.
*   **Node.js Backend**: A robust server-side application built with Express.js to securely handle API requests.

## 🖼️ Screenshots

***

<p align="center">
  <b>Main Interface & Text Input</b><br>
  <em>The clean and simple user interface for text entry.</em><br>
  <img src="./path/to/your/main-interface-screenshot.png" alt="Main application interface" width="70%">
</p>

***

<p align="center">
  <b>File Upload & Text Extraction</b><br>
  <em>Demonstrating the result of uploading a PDF or image file.</em><br>
  <img src="./path/to/your/file-upload-screenshot.png" alt="File upload and text extraction" width="70%">
</p>

***

<p align="center">
  <b>AI Response & Audio Playback</b><br>
  <em>Showing the AI's generated answer with the audio player ready.</em><br>
  <img src="./path/to/your/audio-playback-screenshot.png" alt="AI response and audio player" width="70%">
</p>

***

## ⚙️ Core Components & Technologies

This project is built upon a modern stack, integrating several powerful libraries and APIs.

### Frontend (`/`)

*   **HTML (`index.html`)**: Structures the web application's user interface.
*   **CSS (`style.css`)**: Provides the styling for a clean and responsive design.
*   **JavaScript (`script.js`)**: Manages all client-side logic, including:
    *   DOM manipulation and event handling.
    *   API calls to the backend server.
    *   Client-side text extraction from files.

### Backend (`server.js`)

*   **Node.js**: A JavaScript runtime for the server-side environment.
*   **Express.js**: A web application framework for Node.js, used to create the API endpoint.
*   **CORS**: A package to enable Cross-Origin Resource Sharing, allowing the frontend to communicate with the backend.
*   **Dotenv**: A module to load environment variables from a `.env` file for secure key management.

### External Services & Libraries

*   **Google Gemini API**: The core AI model used for understanding context and generating intelligent answers from the user's text.
*   **Murf.ai API**: A leading text-to-speech service that provides high-quality, natural-sounding AI voices.
*   **Tesseract.js**: A powerful JavaScript library that performs Optical Character Recognition (OCR) directly in the browser.
*   **PDF.js**: A JavaScript library by Mozilla for rendering and parsing PDF files in the browser.

## 🛠️ Getting Started

### Prerequisites

*   Node.js and npm (or yarn) installed on your machine.
*   A valid API key from Google AI for the Gemini API.
*   A valid API key from Murf.ai.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <repository-folder>
    ```

2.  **Install backend dependencies:**
    ```bash
    npm install
    ```

3.  **Create a `.env` file** in the root directory and add your API keys:
    ```
    GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
    ```

4.  **Add your Murf.ai API Key:**
    Open `script.js` and replace the placeholder with your actual Murf API key:
    ```javascript
    // In script.js
    const MURF_API_KEY = "YOUR_WORKING_MURF_API_KEY_HERE";
    ```

5.  **Start the server:**
    ```bash
    node server.js
    ```
    The server will be running at `http://localhost:3000`.

6.  **Open the application:**
    Open the `index.html` file in your web browser to start using the AI Voice Tutor.

## 📜 License

This project is open-source and available for anyone to use. Please refer to the LICENSE file for more details.