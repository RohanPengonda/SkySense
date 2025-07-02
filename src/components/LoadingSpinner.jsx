import React from "react";

const LoadingSpinner = () => (
  <div className="flex justify-center items-center my-4" role="status" aria-label="Loading">
    <div className="w-8 h-8 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />
    <span className="sr-only">Loading...</span>
  </div>
);

export default LoadingSpinner; 