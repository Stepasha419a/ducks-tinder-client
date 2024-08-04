import { Outlet } from 'react-router-dom';
import { withPrivateHocs } from '../lib';

const PrivatePageHocComposition = () => {
  return <Outlet />;
};

export default withPrivateHocs(PrivatePageHocComposition);
