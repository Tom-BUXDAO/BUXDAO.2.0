import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.log('Error caught by ErrorBoundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.state.error.message.includes('WebGL context lost')) {
        return <h2 className="text-center text-neon-blue">WebGL context lost. Please refresh the page or try a different browser.</h2>
      }
      return <h1 className="text-center text-neon-blue">Something went wrong with the 3D content. Please refresh the page or try a different browser.</h1>
    }

    return this.props.children
  }
}

export default ErrorBoundary
