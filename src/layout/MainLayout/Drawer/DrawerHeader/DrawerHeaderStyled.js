// material-ui
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

// ==============================|| DRAWER HEADER - STYLED ||============================== //
const DrawerHeaderbg = 'linear-gradient(90deg, rgba(187,255,52,1) 0%, rgba(148,223,51,1) 100%)';
const DrawerHeaderStyled = styled(Box, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  ...theme.mixins.toolbar,
  display: 'flex',
  alignItems: 'center',
  justifyContent: open ? 'flex-start' : 'center',
  paddingLeft: theme.spacing(open ? 3 : 0),
  background: DrawerHeaderbg,
  borderRadius: '0px 0px 15px 15px',
}));

export default DrawerHeaderStyled;
