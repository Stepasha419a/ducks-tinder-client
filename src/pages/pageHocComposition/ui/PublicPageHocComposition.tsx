import { Outlet } from 'react-router-dom';
import { withPublicHocs } from '../lib';

const PrivatePageHocComposition = () => {
  return <Outlet />;
};

export default withPublicHocs(PrivatePageHocComposition);
