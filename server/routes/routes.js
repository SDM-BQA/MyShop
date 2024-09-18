import express from 'express';
import * as dotenv from 'dotenv';
import fetch from 'node-fetch'; // Ensure node-fetch is installed

dotenv.config();
const router = express.Router();

// Hugging Face query function
async function query(data) {
  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev",
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`, // Use your actual API key
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );

    // Check if the response is an image
    const contentType = response.headers.get("Content-Type");
    if (contentType && contentType.startsWith("image/")) {
      const buffer = await response.buffer();
      return buffer.toString('base64'); // Convert buffer to base64
    } else {
      // If not an image, try to parse it as JSON
      const result = await response.json();
      return result;
    }
  } catch (error) {
    console.error("Error in Hugging Face query:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) return res.status(400).json({ message: "Prompt is required" });

    // Call the Hugging Face API
    const imageBase64 = await query({ "inputs": prompt });

    // Assuming the response is base64-encoded image data
    if (imageBase64) {
      res.status(200).json({ photo: `data:image/png;base64,${imageBase64}` });
    } else {
      res.status(400).json({ message: "Failed to generate image" });
    }
  } catch (error) {
    console.error("Error in POST request:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
});

export default router;
