export const convertImage = async (formData) => {
    try {
      const response = await fetch("http://localhost:5001/ghibli-style", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Failed to fetch image");
      }
      return await response.json(); // { generatedImageUrl: <image_url> }
    } catch (error) {
      console.error("Error during image conversion:", error);
      throw error;
    }
  };
  