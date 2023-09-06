import { useState } from "react";
import ErrorMessage from "./ErrorMessage";
import axios from "axios";
import { HfInference } from "@huggingface/inference";

const UploadImage = ({
  prompt,
  setPrompt,
  loading,
  setLoading,
  imageURL,
  setImageURL,
  log,
  setLog,
  image,
  setImage,
  generatedText,
  setGeneratedText,
}) => {
  const hf = new HfInference(import.meta.env.VITE_REACT_APP_API_KEY); // Replace with your actual access token

  const [selectedImage, setSelectedImage] = useState();
  const handleImageUpload = (e) => {
    const selectedImage = e.target.files[0];
    setSelectedImage(selectedImage);
    setImageURL(URL.createObjectURL(selectedImage));
  };

  const handleGeneratedCap = async () => {
    try {
      setLoading(true);
      const result = await hf.imageToText({
        data: selectedImage,
        model: "nlpconnect/vit-gpt2-image-captioning", // Replace with your desired model
      });
      setGeneratedText(result.generated_text);
    } catch (error) {
      console.error("Error generating text from image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col">
        <h2 className="text-3xl font-semibold mb-4">Image Caption Generator</h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="py-2 px-4 border rounded-lg mb-4"
        />
        <button
          onClick={handleGeneratedCap}
          disabled={!imageURL}
          className={`py-2 px-4 rounded-lg ${
            image
              ? "bg-blue-500 hover:bg-blue-600 text-white"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          {loading ? "Generating..." : "Generate Caption"}
        </button>
      </div>
    </div>
  );
};

export default UploadImage;
