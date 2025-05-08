import type { Preview } from '@storybook/react';
import '../src/app/styles/index.scss';

document.querySelector('html')!.dataset.theme = 'light';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
