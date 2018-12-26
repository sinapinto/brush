import React from 'react';
import FallbackComponent from './FallbackComponent';

type Props = {
  fallback?: React.ComponentType;
};

type State = {
  hasError: boolean;
};

class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static defaultProps = {
    fallback: FallbackComponent,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    if (process.env.NODE_ENV === 'development') {
      console.error(error, info);
    }
  }

  render() {
    if (this.state.hasError) {
      return React.createElement(this.props.fallback!);
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
