import React from 'react';

class WebGLErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log('WebGL Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>WebGL error occurred. Please refresh the page.</div>;
    }

    return this.props.children;
  }
}

export default WebGLErrorBoundary;
