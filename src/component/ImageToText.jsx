import React, { useState } from "react";
import { HfInference } from "@huggingface/inference";

const ImageToText = () => {
  const [image, setImage] = useState("");
  const [generatedText, setGeneratedText] = useState("");
  const [loading, setLoading] = useState(false);

  const hf = new HfInference("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"); // Replace with your actual access token

  const handleImageUpload = async (e) => {
    const selectedImage = e.target.files[0];
    setImage(URL.createObjectURL(selectedImage));

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
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold mb-4">Image Caption Generator</h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="py-2 px-4 border rounded-lg mb-4"
        />
        {image && (
          <div className="mb-4 border-2 ">
            <img src={image} alt="Uploaded" className=" rounded-lg" />
          </div>
        )}
        {loading ? (
          <p className="text-gray-600">Generating text...</p>
        ) : (
          generatedText && (
            <div>
              <h3 className="text-xl font-semibold mb-2">Generated Text:</h3>
              <p className="text-gray-800">{generatedText}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ImageToText;
