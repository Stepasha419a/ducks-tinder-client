import type { ComponentType, ErrorInfo } from 'react';
import { Component as ReactComponent } from 'react';
import { toast } from 'react-toastify';
import { COMMON_LIB_SETTINGS } from '../constants';

interface Options {
  redirect?: boolean;
}

export function WithErrorFallback<P extends object>(
  Component: ComponentType<P>,
  options?: Options
): ComponentType<P> {
  class Wrapper extends ReactComponent<P, { hasError: boolean }> {
    constructor(props: P) {
      super(props);
      this.state = { hasError: false };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
      console.log({ error, errorInfo });

      toast(COMMON_LIB_SETTINGS.TEXTS.errorOccurred, {
        autoClose: 10000,
      });

      if (options?.redirect) {
        toast(COMMON_LIB_SETTINGS.TEXTS.redirection, {
          autoClose: 10000,
        });
        toast(COMMON_LIB_SETTINGS.TEXTS.clickToStay, {
          autoClose: 10000,
          toastId: 'prevent-close-toast',
        });

        let redirect = true;
        toast.onChange((item) => {
          if (item.id === 'prevent-close-toast' && item.status === 'removed') {
            redirect = false;

            toast(COMMON_LIB_SETTINGS.TEXTS.redirectionCancelled);
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
