import { Component, ErrorInfo, ReactNode } from 'react';
import axios from 'axios';
import { ERROR_NOT_DEFINED, ErrorMessages } from '@constants/ErrorMessage';
import Container from '@components/atoms/container/Container';

interface ErrorBoundaryProps {
  fallback?: ReactNode;
  children: ReactNode;
}
interface ErrorBoundaryState {
  statusCode: number;
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      statusCode: ERROR_NOT_DEFINED,
      hasError: false,
    };
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    const { children: prevChildren } = this.props;

    if (prevProps.children !== prevChildren) {
      this.setState({ hasError: false, statusCode: ERROR_NOT_DEFINED });
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(error, errorInfo.componentStack);
  }

  static getDerivedStateFromError(error: Error) {
    const ret: {
      hasError: boolean,
      statusCode: number,
    } = {
      hasError: true,
      statusCode: ERROR_NOT_DEFINED,
    };

    if (axios.isAxiosError(error)) {
      ret.statusCode = error.response?.status || ERROR_NOT_DEFINED;
    }

    return ret;
  }

  render() {
    const {
      statusCode, hasError,
    } = this.state;

    const {
      fallback, children,
    } = this.props;

    if (hasError) {
      return fallback || (
        <Container
          elementSize="full-width"
          justifyContent="center"
          cssProps={{
            padding: '0 20px',
          }}
        >
          <p>{ErrorMessages[statusCode]}</p>
        </Container>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
