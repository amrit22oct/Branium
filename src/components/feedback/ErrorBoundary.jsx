import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  // Update state when an error is caught
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  // You can also log the error to an external service
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    // Example: send error to Sentry or other logging service
  }

  // Reset the error boundary
  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6 text-center">
          <h1 className="text-6xl sm:text-8xl font-bold text-gray-800 mb-4">
            Oops!
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 mb-2">
            Something went wrong.
          </p>
          <p className="text-gray-500 mb-6 max-w-md">
            An unexpected error occurred. Please try refreshing the page or go back home.
          </p>
          <div className="flex gap-4">
            <button
              onClick={this.handleRetry}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
            >
              Retry
            </button>
            <a
              href="/"
              className="px-6 py-3 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-400 transition-colors duration-300"
            >
              Home
            </a>
          </div>
        </div>
      );
    }

    // Render children if no error
    return this.props.children;
  }
}

export default ErrorBoundary;
