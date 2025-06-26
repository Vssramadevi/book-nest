import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin shadow-lg"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="w-3 h-3 bg-blue-500 rounded-full animate-ping"></span>
        </div>
      </div>
      <p className="mt-4 text-blue-600 font-medium animate-pulse">Getting books ready for you...</p>
    </div>
  );
};

export default Loading;
