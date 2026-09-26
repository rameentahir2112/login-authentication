"use client";

import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by Error Boundary:", error);
    console.error("Error information:", errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center">
          <h1 className="text-3xl font-bold">
            Something went wrong.
          </h1>

          <p className="mt-4 text-gray-600">
            An unexpected error occurred. Please try again.
          </p>

          <button
            onClick={() => window.location.reload()}
            className="mt-6 rounded-lg bg-black px-6 py-3 text-white"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;