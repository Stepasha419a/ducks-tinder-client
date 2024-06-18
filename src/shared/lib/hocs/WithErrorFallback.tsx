import type { ComponentType, ErrorInfo } from 'react';
import { Component as ReactComponent } from 'react';
import { toast } from 'react-toastify';
// eslint-disable-next-line boundaries/element-types
import { store } from '@app/store';

export function WithErrorFallback<P extends object>(
  Component: ComponentType<P>
) {
  class Wrapper extends ReactComponent<P, { hasError: boolean }> {
    constructor(props: P) {
      super(props);
      this.state = { hasError: false };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
      console.log({ error, errorInfo, store: store.getState() });

      toast('Some error occurred. The view is blocked to prevent an error.', {
        autoClose: 10000,
      });

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
