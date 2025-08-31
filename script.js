// --- EXISTING ELEMENTS ---
const btn = document.getElementById("ttsBtn");
const textInput = document.getElementById("textInput");
const player = document.getElementById("player");
const downloadWrap = document.getElementById("downloadWrap");
const downloadLink = document.getElementById("downloadLink");
const answerDiv = document.getElementById("aiAnswer");

// --- NEW ELEMENTS FOR FILE UPLOAD ---
const fileUpload = document.getElementById("fileUpload");
const fileStatus = document.getElementById("fileStatus");

// Use your personal, working Murf API Key
const MURF_API_KEY = "ap2_0b47db35-508e-49e7-b06e-3d8aa5c79570"; // Your working key!

// --- EVENT LISTENERS ---

// Listener for the "Convert to Speech" button
btn.addEventListener("click", handleTextToSpeech);

// NEW: Listener for the file input. When a file is chosen, this runs.
fileUpload.addEventListener("change", handleFileUpload);


// --- MAIN FUNCTIONS ---

// This is your existing function to call the AI and Murf
async function handleTextToSpeech() {
    const text = (textInput.value || "").trim();
    if (!text) {
        alert("Please enter some text or upload a file first.");
        return;
    }

    btn.disabled = true;
    btn.textContent = "Thinking...";
    answerDiv.textContent = "Getting answer from AI...";

    try {
        const geminiResp = await fetch("http://localhost:3000/ask-gemini", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question: text })
        });
        if (!geminiResp.ok) throw new Error("Failed to get response from Gemini AI.");
        
        const geminiData = await geminiResp.json();
        const aiAnswer = geminiData.answer || "Sorry, I couldn't find an answer.";
        answerDiv.textContent = aiAnswer;

        btn.textContent = "Generating Audio...";
        const murfResp = await fetch("https://api.murf.ai/v1/speech/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json", "api-key": MURF_API_KEY },
            body: JSON.stringify({ "voiceId": "en-US-natalie", "text": aiAnswer, "format": "mp3" })
        });
        if (!murfResp.ok) throw new Error(`Murf API error (${murfResp.status})`);
        
        const murfData = await murfResp.json();
        const audioUrl = murfData.audioFile;
        if (!audioUrl) throw new Error("No audio file URL returned by Murf.");

        player.src = audioUrl;
        downloadLink.href = audioUrl;
        downloadWrap.style.display = "block";
        player.play();

    } catch (e) {
        answerDiv.textContent = "Error: " + e.message;
        alert("An error occurred: " + e.message);
    } finally {
        btn.disabled = false;
        btn.textContent = "Convert to Speech";
    }
}

// NEW: This function runs when a file is uploaded
async function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const fileType = file.type;
    textInput.value = ""; // Clear the textbox

    if (fileType.startsWith("image/")) {
        await processImage(file);
    } else if (fileType === "application/pdf") {
        await processPdf(file);
    } else {
        fileStatus.textContent = "Error: Unsupported file type. Please upload an image or PDF.";
        alert("Unsupported file type. Please upload an image or PDF.");
    }
}

// NEW: Function to extract text from an IMAGE using Tesseract.js
async function processImage(file) {
    fileStatus.textContent = "Reading image... this may take a moment.";
    try {
        const { data: { text } } = await Tesseract.recognize(file, 'eng');
        textInput.value = text;
        fileStatus.textContent = `Successfully extracted text from the image.`;
    } catch (error) {
        fileStatus.textContent = "Error reading image.";
        console.error("Tesseract Error:", error);
    }
}

// NEW: Function to extract text from a PDF using PDF.js
async function processPdf(file) {
    fileStatus.textContent = "Reading PDF...";
    try {
        const fileReader = new FileReader();
        fileReader.onload = async function() {
            const typedarray = new Uint8Array(this.result);
            const pdf = await pdfjsLib.getDocument(typedarray).promise;
            let fullText = "";

            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                const pageText = textContent.items.map(item => item.str).join(" ");
                fullText += pageText + "\n\n";
            }
            textInput.value = fullText;
            fileStatus.textContent = `Successfully extracted text from the PDF.`;
        };
        fileReader.readAsArrayBuffer(file);
    } catch (error) {
        fileStatus.textContent = "Error reading PDF.";
        console.error("PDF.js Error:", error);
    }
}