import { Outlet } from 'react-router-dom';
import { withAuthHocs } from '../lib';

const AuthPageHocComposition = () => {
  return <Outlet />;
};

export default withAuthHocs(AuthPageHocComposition);
