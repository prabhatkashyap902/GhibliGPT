import axios from "axios";

const API_URL = "https://api.openai.com/v1/images/generations";

export const convertImage = async (imageFile, prompt) => {
  const formData = new FormData();
  formData.append("image", imageFile);
  formData.append("prompt", prompt);
  formData.append("model", "dall-e-3"); // Use "dall-e-2" if you want an older model

  try {
    const response = await axios.post(API_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
    });

    return response.data.data[0].url; // Get the modified image URL
  } catch (error) {
    console.error("Image conversion error:", error);
    return null;
  }
};
