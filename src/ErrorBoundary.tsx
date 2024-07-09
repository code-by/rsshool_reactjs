import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
  resetThrowedError: (f: () => void) => void
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.resetThrowedError = this.resetThrowedError.bind(this);
    this.state = {
      hasError: false,
    }
 }

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error boundary catch Uncaught error:", error, errorInfo);
  }

  resetThrowedError = () : void => {
    this.setState({
      hasError: false,
    });
  }

  componentDidMount(): void {
    this.props.resetThrowedError(this.resetThrowedError);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
