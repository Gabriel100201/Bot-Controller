import PropTypes from 'prop-types';
import { useEffect, useContext } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';

import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useResponsive } from 'src/hooks/use-responsive';

import { account } from 'src/_mock/account';
import { URL_AVATAR } from 'src/config/URL_AVATAR';
import { LoginContext } from 'src/context/LoginContext';

import Logo from 'src/components/logo';
import Scrollbar from 'src/components/scrollbar';

import { NAV } from './config-layout';
import navConfig from './config-navigation';

// ----------------------------------------------------------------------

export default function Nav({ openNav, onCloseNav }) {
  const { infoUser } = useContext(LoginContext)
  const pathname = usePathname();

  const upLg = useResponsive('up', 'lg');

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderAccount = (
    <Box
      sx={{
        my: 5,
        mx: 2.5,
        py: 1.5,
        px: 2.5,
        display: 'flex',
        borderRadius: 1.5,
        alignItems: 'center',
        bgcolor: (theme) => alpha(theme.palette.primary.light, 0.2),

      }}
    >
      <Avatar src={URL_AVATAR(infoUser?.userInfo?.userName)} alt="photoURL" />

      <Box sx={{ ml: 2 }}>
        <Typography variant="subtitle2" sx={{ color: (theme) => alpha(theme.palette.tdPrimary[100], 1) }}>{infoUser?.userInfo?.userName}</Typography>

        <Typography variant="body2" sx={{ color: (theme) => alpha(theme.palette.tdPrimary[100], 1) }}>
          {account.role}
        </Typography>
      </Box>
    </Box>
  );

  const renderMenu = (
    <>
      <Stack component="nav" spacing={0.5} sx={{ px: 2, mt: 0 }}>
      {navConfig.map((item) => (
        <NavItem key={item.title} item={item} />
      ))}
    </Stack>
      <Divider sx={{my: 2}} variant="middle"/>
      <Stack component="nav" spacing={0.5} sx={{ px: 2, mt: 0 }}>
      {navConfig.map((item) => (
        <NavItem key={item.title} item={item} />
      ))}
      </Stack>
    </>
  );

  const renderUpgrade = (
    <div className='absolute bottom-[-120px] left-[-120px] w-[400px] opacity-20'>
      <img src="/assets/illustrations/TechnodevsBL.png" alt="" className='w-full' />
    </div >
  );

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Logo sx={{ mt: 3, ml: 4, borderRadius: "100%", border: "2px solid #444" }} />

      {renderAccount}

      {renderMenu}

      <Box sx={{ flexGrow: 1 }} />

      {renderUpgrade}
    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
        bgcolor: (theme) => alpha(theme.palette.tdPrimary[950], 1),
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV.WIDTH,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

// ----------------------------------------------------------------------

function NavItem({ item }) {
  const pathname = usePathname();

  const active = item.path === pathname;

  return (
    <ListItemButton
      component={RouterLink}
      href={item.path}
      sx={{
        minHeight: 44,
        borderRadius: 0.75,
        typography: 'body2',
        color: 'text.secondary',
        textTransform: 'capitalize',
        fontWeight: 'fontWeightMedium',
        ...(active && {
          color: 'text.secondary',
          fontWeight: 'fontWeightLigth',
          bgcolor: (theme) => alpha(theme.palette.primary.light, 0.2),
          '&:hover': {
            bgcolor: (theme) => alpha(theme.palette.primary.light, 0.16),
          },
        }),
      }}
    >
      <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
        {item.icon}
      </Box>

      <Box component="span">{item.title} </Box>
    </ListItemButton>
  );
}

NavItem.propTypes = {
  item: PropTypes.object,
};
