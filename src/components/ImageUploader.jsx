import React, { useState } from "react";
import { convertImage } from "../services/openai";

const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!selectedImage) return alert("Please select an image first!");

    setLoading(true);
    const transformedImageUrl = await convertImage(selectedImage, "Convert this image to Studio Ghibli style");
    setGeneratedImage(transformedImageUrl);
    setLoading(false);
  };

  return (
    <div>
      <h2>Upload an Image for Ghibli Conversion</h2>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Processing..." : "Convert to Ghibli Style"}
      </button>

      {generatedImage && (
        <div>
          <h3>Converted Image:</h3>
          <img src={generatedImage} alt="Ghibli-style output" style={{ width: "300px" }} />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
