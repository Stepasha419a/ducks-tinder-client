import type { ComponentType, ErrorInfo } from 'react';
import { Component as ReactComponent } from 'react';
import { toast } from 'react-toastify';

interface Options {
  redirect?: boolean;
}

export function WithErrorFallback<P extends object>(
  Component: ComponentType<P>,
  options?: Options
) {
  class Wrapper extends ReactComponent<P, { hasError: boolean }> {
    constructor(props: P) {
      super(props);
      this.state = { hasError: false };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
      console.log({ error, errorInfo });

      toast('Some error occurred! The view is blocked to prevent an error.', {
        autoClose: 10000,
      });

      if (options?.redirect) {
        toast('You will be redirected in 10 seconds.', {
          autoClose: 10000,
        });
        toast('Click here to stay.', {
          autoClose: 10000,
          toastId: 'prevent-close-toast',
        });

        let redirect = true;
        toast.onChange((item) => {
          if (item.id === 'prevent-close-toast' && item.status === 'removed') {
            redirect = false;

            toast('Redirection canceled!');
          }
        });

        setTimeout(() => {
          if (redirect) {
            document.location.href = '/';
          }
        }, 10000);
      }

      this.setState({ hasError: true });
    }

    render() {
      if (this.state.hasError) {
        return null;
      }

      return <Component {...this.props} />;
    }
  }

  return Wrapper;
}
