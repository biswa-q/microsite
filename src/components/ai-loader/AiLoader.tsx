import React from "react";

interface AiLoaderProps {
  text?: string;
}

const AiLoader: React.FC<AiLoaderProps> = ({
  text = "AI is processing...",
}) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen absolute top-0 right-0 bottom-0 left-0 bg-black bg-opacity-90">
      <div className="relative w-24 h-24 animate-spin rounded-full bg-gradient-to-r from-purple-400 via-blue-500 to-red-400">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gray-200 rounded-full border-2 border-white"></div>
      </div>
      <div className="absolute flex">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="w-3 h-3 bg-blue-500 rounded-full mx-1 animate-pulse"
            style={{
              animationDelay: `${index * 0.1}s`,
              transform: `rotate(${index * 45}deg) translate(0, -30px)`,
            }}
          ></div>
        ))}
      </div>
      <span className="mt-4 text-center text-[#FFF] text-lg font-medium">
        {text}
      </span>
    </div>
  );
};

export default AiLoader;
