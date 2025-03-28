import React, { useState } from "react";
import { convertImage } from "../services/openAi";

const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    setPreviewUrl(URL.createObjectURL(file));
    setGeneratedImage(null); // Reset generated image preview
  };

  const handleSubmit = async () => {
    if (!selectedImage) return alert("Please select an image first!");

    setLoading(true);

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      const response = await convertImage(formData);
      setGeneratedImage(response.generatedImageUrl); // Receive URL of generated image
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to generate image.");
    }

    setLoading(false);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = generatedImage;
    link.download = "ghibli-style-image.png";
    link.click();
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Studio Ghibli Image Converter</h2>

      <input type="file" accept="image/*" onChange={handleImageChange} />
      {previewUrl && (
        <div style={{ margin: "20px" }}>
          <h4>Original Image:</h4>
          <img src={previewUrl} alt="Selected" width={200} />
        </div>
      )}

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Transforming..." : "Convert to Ghibli Style"}
      </button>

      {loading && <p>⏳ Please wait, generating your image...</p>}

      {generatedImage && (
        <div style={{ marginTop: "20px" }}>
          <h4>Ghibli-Styled Image:</h4>
          <img src={generatedImage} alt="Generated Ghibli" width={300} />
          <br />
          <button onClick={handleDownload} style={{ marginTop: "10px" }}>
            Download
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
