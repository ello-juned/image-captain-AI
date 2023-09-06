import { useState } from "react";
// import GenImage from "../components/GenImage";
// import Header from "../components/Header";
import UploadImage from "../component/UploadImage";
import Header from "../component/Header";

const MainApp = () => {
  const [prompt, setPrompt] = useState("");
  const [imageURL, setImageURL] = useState(null);
  const [loading, setLoading] = useState(false);
  const [log, setLog] = useState([]);

  const [image, setImage] = useState("");
  const [generatedText, setGeneratedText] = useState("");

  return (
    <div className="flex h-screen w-screen bg-white">
      {/* Left Side */}
      <div className="w-1/2 border-r-[1px] border-gray-200 ">
        <Header className="w-full bg-white p-0" />
        <UploadImage
          prompt={prompt}
          setPrompt={setPrompt}
          loading={loading}
          setLoading={setLoading}
          imageURL={imageURL}
          setImageURL={setImageURL}
          log={log}
          setLog={setLog}
          image={image}
          setImage={setImage}
          generatedText={generatedText}
          setGeneratedText={setGeneratedText}
        />
      </div>
      {/* Right Side */}
      <div className="w-1/2 ">
        {/* Content for the right side */}
        <div className="h-full w-full flex flex-col justify-center items-center">
          {!loading && !imageURL && (
            <div className="text-red-500 font-bold text-center p-4 border border-red-500 rounded">
              Please Upload an image and click on Generate Caption button.
            </div>
          )}

          {loading && (
            <img
              src="https://i.pinimg.com/originals/c7/e1/b7/c7e1b7b5753737039e1bdbda578132b8.gif"
              alt="loader"
            />
          )}
          {imageURL && !loading && (
            <>
              <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md mt-4">
                <img
                  src={imageURL}
                  alt="Generated Image"
                  className="rounded-xl shadow-xl cursor-pointer hover:scale-105 transform transition-transform duration-300"
                />
              </div>

              {generatedText && (
                <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md mt-4">
                  <h2>Generated Text : {generatedText}</h2>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainApp;
