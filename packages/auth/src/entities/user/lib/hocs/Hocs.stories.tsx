import type { Meta, StoryObj } from '@storybook/react';
import {
  HocComposition,
  HocCompositionStage,
  WithTanstackQueryProvider,
} from '@ducks-tinder-client/common';
import { BrowserRouter } from 'react-router-dom';
import {
  useAuthStore,
  WithAuthRedirect,
  WithInitialLoading,
  WithUserData,
} from '@entities/user';
import { useUserStore } from '@entities/user/model/user';

const meta = {
  title: 'Hocs',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const hocComposition = new HocComposition();

hocComposition.addHocs(HocCompositionStage.BOOTSTRAPPING, [WithInitialLoading]);
hocComposition.addHocs(HocCompositionStage.AUTH_CHECK, [WithAuthRedirect]);
hocComposition.addHocs(HocCompositionStage.USER_HYDRATION, [WithUserData]);

export const Primary: Story = {
  render: () => {
    const Component = WithTanstackQueryProvider(
      hocComposition.appendHocs(() => {
        const user = useUserStore((state) => state.currentUser);
        const isAuth = useAuthStore((state) => state.isAuth);

        return (
          <div>
            <div>isAuth: {isAuth === true ? 'true' : 'false'}</div>
            <div>
              user: <pre>{JSON.stringify(user, null, 2)}</pre>
            </div>
          </div>
        );
      })
    );

    return (
      <BrowserRouter>
        <Component />
      </BrowserRouter>
    );
  },
};
