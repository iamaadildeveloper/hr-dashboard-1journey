// project import

import Navigation from './Navigation';
import SimpleBar from 'components/third-party/SimpleBar';

// ==============================|| DRAWER CONTENT ||============================== //
// const sidebarBgColor = 'linear-gradient(141deg, rgba(199,255,82,1) 0%, rgba(34,198,0,1) 100%)';
const DrawerContent = () => (
  <SimpleBar
    sx={{
      '& .simplebar-content': {
        display: 'flex',
        flexDirection: 'column',
        background: '',
        padding: "10px",
        // bgcolor: sidebarBgColor,
      }
    }}
  >
    <Navigation />
  </SimpleBar>
);

export default DrawerContent;
